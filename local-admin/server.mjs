import { createServer } from "node:http";
import { access, copyFile, mkdir, readFile, readdir, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HOST = "127.0.0.1";
const PORT = Number(process.env.ADMIN_PORT) || 4178;
const ADMIN_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(ADMIN_DIR, "..");
const PUBLIC_DIR = path.join(ADMIN_DIR, "public");
const BACKUP_DIR = path.join(PROJECT_ROOT, ".local-backups", "admin");
const LISTING_IMAGES_DIR = path.join(PROJECT_ROOT, "source", "listings_image");
const ASSETS_DIR = path.join(PROJECT_ROOT, "src", "assets");
const IMAGE_MAP_FILES = [
  path.join(PROJECT_ROOT, "src", "data", "images.js"),
  path.join(PROJECT_ROOT, "src", "data", "soldImages.js"),
  path.join(PROJECT_ROOT, "src", "data", "exclusiveImages.js"),
];
const MAX_BODY_SIZE = 2 * 1024 * 1024;
const MAX_UPLOAD_BODY_SIZE = 45 * 1024 * 1024;
const MAX_IMAGE_SIZE = 12 * 1024 * 1024;
const MAX_IMAGE_COUNT = 12;

const DATA_FILES = {
  active: path.join(PROJECT_ROOT, "src/data/activeListings.json"),
  exclusive: path.join(PROJECT_ROOT, "src/data/exclusiveListings.json"),
  sold: path.join(PROJECT_ROOT, "src/data/soldListings.json"),
  comments: path.join(PROJECT_ROOT, "src/data/comments.json"),
};

const CONTENT_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

const IMAGE_TYPES = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

function sendJson(response, status, payload) {
  response.writeHead(status, { "Content-Type": CONTENT_TYPES[".json"] });
  response.end(JSON.stringify(payload));
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function readBody(request, maxSize = MAX_BODY_SIZE) {
  const chunks = [];
  let size = 0;

  for await (const chunk of request) {
    size += chunk.length;
    if (size > maxSize) {
      const error = new Error(`请求数据超过 ${Math.floor(maxSize / 1024 / 1024)} MB 限制`);
      error.status = 413;
      throw error;
    }
    chunks.push(chunk);
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    const error = new Error("请求内容不是有效的 JSON");
    error.status = 400;
    throw error;
  }
}

function isValidImage(buffer, type) {
  if (type === "image/jpeg") {
    return buffer.length >= 3 &&
      buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }
  if (type === "image/png") {
    return buffer.length >= 8 &&
      buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  }
  if (type === "image/webp") {
    return buffer.length >= 12 &&
      buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
      buffer.subarray(8, 12).toString("ascii") === "WEBP";
  }
  return false;
}

function normalizeFolderPart(value) {
  const normalized = String(value || "listing")
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return normalized || "listing";
}

function safePathPart(value, label) {
  const part = String(value || "");
  if (!part || part !== path.basename(part) || part.includes("\0")) {
    throw Object.assign(new Error(`${label}无效`), { status: 400 });
  }
  return part;
}

function isSupportedImage(filename) {
  return [".jpg", ".jpeg", ".png", ".webp"].includes(path.extname(filename).toLowerCase());
}

function removeFrontMarker(filename) {
  const extension = path.extname(filename);
  const basename = path.basename(filename, extension)
    .replace(/(?:[-_ ]?front)(?=$|[-_ ])/gi, "")
    .replace(/[-_ ]+$/g, "");
  return `${basename || "image"}${extension.toLowerCase()}`;
}

async function listListingImages(folderValue) {
  const folder = safePathPart(folderValue, "图片目录");
  const targetDir = path.join(LISTING_IMAGES_DIR, folder);
  let entries;
  try {
    entries = await readdir(targetDir, { withFileTypes: true });
  } catch {
    throw Object.assign(new Error("未找到该房源的图片目录"), { status: 404 });
  }

  return entries
    .filter((entry) => entry.isFile() && isSupportedImage(entry.name))
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }));
}

async function resolveLegacyImage(imageKeyValue) {
  const imageKey = safePathPart(imageKeyValue, "图片键");

  for (const mapFile of IMAGE_MAP_FILES) {
    const content = await readFile(mapFile, "utf8");
    const importPattern = new RegExp(
      `import\\s+${imageKey.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s+from\\s+['"]([^'"]+)['"]`,
    );
    const match = content.match(importPattern);
    if (!match) continue;

    const filePath = path.resolve(path.dirname(mapFile), match[1]);
    if (!filePath.startsWith(`${ASSETS_DIR}${path.sep}`) || !isSupportedImage(filePath)) {
      throw Object.assign(new Error("旧图片路径无效"), { status: 400 });
    }
    await access(filePath);
    return filePath;
  }

  throw Object.assign(new Error("未找到该房源的旧图片"), { status: 404 });
}

async function setCoverImage(folderValue, filenameValue) {
  const folder = safePathPart(folderValue, "图片目录");
  const filename = safePathPart(filenameValue, "图片文件名");
  const files = await listListingImages(folder);
  if (!files.includes(filename)) {
    throw Object.assign(new Error("未找到要设置的主图"), { status: 404 });
  }

  const targetDir = path.join(LISTING_IMAGES_DIR, folder);
  const stamp = `${process.pid}-${Date.now()}`;
  const staged = [];

  for (const [index, currentName] of files.entries()) {
    const extension = path.extname(currentName).toLowerCase();
    const cleanName = removeFrontMarker(currentName);
    const cleanBase = path.basename(cleanName, path.extname(cleanName));
    const nextName = currentName === filename
      ? `${cleanBase}-Front${extension}`
      : `${cleanBase}${extension}`;
    const temporaryName = `.cover-${stamp}-${index}${extension}`;
    await rename(
      path.join(targetDir, currentName),
      path.join(targetDir, temporaryName),
    );
    staged.push({ temporaryName, nextName });
  }

  for (const { temporaryName, nextName } of staged) {
    await rename(
      path.join(targetDir, temporaryName),
      path.join(targetDir, nextName),
    );
  }
  return staged.find(({ nextName }) => nextName.toLowerCase().includes("front")).nextName;
}

function decodeUploadedImages(files) {
  if (!Array.isArray(files) || files.length === 0) {
    throw Object.assign(new Error("请至少选择一张图片"), { status: 400 });
  }
  if (files.length > MAX_IMAGE_COUNT) {
    throw Object.assign(new Error(`每个房源最多上传 ${MAX_IMAGE_COUNT} 张图片`), { status: 400 });
  }

  return files.map((file, index) => {
    const extension = IMAGE_TYPES[file?.type];
    if (!extension) {
      throw Object.assign(new Error(`第 ${index + 1} 张图片格式不支持`), { status: 400 });
    }
    if (typeof file.data !== "string" || !/^[a-zA-Z0-9+/]+={0,2}$/.test(file.data)) {
      throw Object.assign(new Error(`第 ${index + 1} 张图片数据无效`), { status: 400 });
    }

    const buffer = Buffer.from(file.data, "base64");
    if (!buffer.length || buffer.length > MAX_IMAGE_SIZE) {
      throw Object.assign(new Error(`第 ${index + 1} 张图片必须小于 12 MB`), { status: 400 });
    }
    if (!isValidImage(buffer, file.type)) {
      throw Object.assign(new Error(`第 ${index + 1} 张图片内容与格式不符`), { status: 400 });
    }
    return { buffer, extension };
  });
}

function assertArray(value, label) {
  if (!Array.isArray(value)) {
    const error = new Error(`${label} 必须是数组`);
    error.status = 400;
    throw error;
  }
}

function validateListings(listings, label) {
  assertArray(listings, label);
  const ids = new Set();

  listings.forEach((listing, index) => {
    const row = `${label}第 ${index + 1} 条`;
    if (!listing || typeof listing !== "object" || Array.isArray(listing)) {
      throw Object.assign(new Error(`${row}格式无效`), { status: 400 });
    }

    const id = String(listing.id ?? "").trim();
    if (!id) throw Object.assign(new Error(`${row}缺少 ID`), { status: 400 });
    if (ids.has(id)) throw Object.assign(new Error(`${label}存在重复 ID：${id}`), { status: 400 });
    ids.add(id);

    if (!String(listing.address ?? "").trim()) {
      throw Object.assign(new Error(`${row}缺少地址`), { status: 400 });
    }

    for (const field of ["price", "bedrooms"]) {
      if (typeof listing[field] !== "number" || !Number.isFinite(listing[field]) || listing[field] < 0) {
        throw Object.assign(new Error(`${row}的 ${field} 必须是非负数字`), { status: 400 });
      }
    }

    const bathroomsValid =
      (typeof listing.bathrooms === "number" &&
        Number.isFinite(listing.bathrooms) &&
        listing.bathrooms >= 0) ||
      (typeof listing.bathrooms === "string" &&
        listing.bathrooms.trim().length > 0 &&
        listing.bathrooms.length <= 80);
    if (!bathroomsValid) {
      throw Object.assign(new Error(`${row}的 bathrooms 必须是非负数字或简短说明`), { status: 400 });
    }

    if (listing.sqft !== null && listing.sqft !== undefined &&
        (typeof listing.sqft !== "number" || !Number.isFinite(listing.sqft) || listing.sqft < 0)) {
      throw Object.assign(new Error(`${row}的 sqft 必须为空或非负数字`), { status: 400 });
    }

    for (const field of ["features", "features_zh"]) {
      if (listing[field] !== undefined &&
          (!Array.isArray(listing[field]) || listing[field].some((item) => typeof item !== "string"))) {
        throw Object.assign(new Error(`${row}的 ${field} 必须是文本数组`), { status: 400 });
      }
    }
  });
}

function validateComments(comments) {
  assertArray(comments, "评论");
  const ids = new Set();

  comments.forEach((comment, index) => {
    const row = `评论第 ${index + 1} 条`;
    if (!comment || typeof comment !== "object" || Array.isArray(comment)) {
      throw Object.assign(new Error(`${row}格式无效`), { status: 400 });
    }

    const id = String(comment.id ?? "").trim();
    if (!id) throw Object.assign(new Error(`${row}缺少 ID`), { status: 400 });
    if (ids.has(id)) throw Object.assign(new Error(`评论存在重复 ID：${id}`), { status: 400 });
    ids.add(id);

    if (!String(comment.name ?? "").trim()) {
      throw Object.assign(new Error(`${row}缺少用户名`), { status: 400 });
    }
    if (!String(comment.content ?? "").trim()) {
      throw Object.assign(new Error(`${row}缺少英文评论内容`), { status: 400 });
    }
    if (!Number.isInteger(comment.star) || comment.star < 1 || comment.star > 5) {
      throw Object.assign(new Error(`${row}的评分必须是 1 到 5 的整数`), { status: 400 });
    }
    if (!Number.isInteger(comment.reviewsCount) || comment.reviewsCount < 0) {
      throw Object.assign(new Error(`${row}的评论数必须是非负整数`), { status: 400 });
    }
  });
}

function backupStamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

async function writeJsonAtomically(filePath, data, stamp) {
  await mkdir(BACKUP_DIR, { recursive: true });
  const backupPath = path.join(
    BACKUP_DIR,
    `${path.basename(filePath, ".json")}-${stamp}.json`,
  );
  await copyFile(filePath, backupPath);

  const tempPath = `${filePath}.${process.pid}.tmp`;
  await writeFile(tempPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  await rename(tempPath, filePath);
}

async function loadAllData() {
  const [active, exclusive, sold, comments] = await Promise.all([
    readJson(DATA_FILES.active),
    readJson(DATA_FILES.exclusive),
    readJson(DATA_FILES.sold),
    readJson(DATA_FILES.comments),
  ]);
  return { listings: { active, exclusive, sold }, comments };
}

async function handleApi(request, response, pathname) {
  if (request.method === "GET" && pathname === "/api/data") {
    sendJson(response, 200, await loadAllData());
    return true;
  }

  if (request.method === "GET" && pathname === "/api/images") {
    const url = new URL(request.url, `http://${request.headers.host || HOST}`);
    const folderValue = url.searchParams.get("folder");
    const imageKeyValue = url.searchParams.get("imageKey");

    try {
      const folder = safePathPart(folderValue, "图片目录");
      const files = await listListingImages(folder);
      sendJson(response, 200, {
        folder,
        files: files.map((filename) => ({
          filename,
          isCover: filename.toLowerCase().includes("front"),
          url: `/api/image-file?folder=${encodeURIComponent(folder)}&file=${encodeURIComponent(filename)}`,
        })),
      });
    } catch (error) {
      if (!imageKeyValue || (error.status !== 400 && error.status !== 404)) throw error;
      await resolveLegacyImage(imageKeyValue);
      sendJson(response, 200, {
        folder: null,
        files: [{
          filename: imageKeyValue,
          isCover: true,
          legacy: true,
          url: `/api/legacy-image?key=${encodeURIComponent(imageKeyValue)}`,
        }],
      });
    }
    return true;
  }

  if (request.method === "GET" && pathname === "/api/legacy-image") {
    const url = new URL(request.url, `http://${request.headers.host || HOST}`);
    const filePath = await resolveLegacyImage(url.searchParams.get("key"));
    const content = await readFile(filePath);
    response.writeHead(200, {
      "Content-Type": CONTENT_TYPES[path.extname(filePath).toLowerCase()],
      "Cache-Control": "no-store",
    });
    response.end(content);
    return true;
  }

  if (request.method === "GET" && pathname === "/api/image-file") {
    const url = new URL(request.url, `http://${request.headers.host || HOST}`);
    const folder = safePathPart(url.searchParams.get("folder"), "图片目录");
    const filename = safePathPart(url.searchParams.get("file"), "图片文件名");
    if (!isSupportedImage(filename)) {
      throw Object.assign(new Error("图片格式不支持"), { status: 400 });
    }
    const filePath = path.join(LISTING_IMAGES_DIR, folder, filename);
    try {
      const content = await readFile(filePath);
      response.writeHead(200, {
        "Content-Type": CONTENT_TYPES[path.extname(filename).toLowerCase()],
        "Cache-Control": "no-store",
      });
      response.end(content);
    } catch {
      throw Object.assign(new Error("图片不存在"), { status: 404 });
    }
    return true;
  }

  if (request.method === "POST" && pathname === "/api/images") {
    const body = await readBody(request, MAX_UPLOAD_BODY_SIZE);
    const images = decodeUploadedImages(body?.files);
    const coverIndex = Number(body?.coverIndex ?? 0);
    if (!Number.isInteger(coverIndex) || coverIndex < 0 || coverIndex >= images.length) {
      throw Object.assign(new Error("请选择有效的主图"), { status: 400 });
    }
    const folder = `admin-${normalizeFolderPart(body?.listingId)}-${Date.now()}`;
    const targetDir = path.join(LISTING_IMAGES_DIR, folder);
    await mkdir(targetDir, { recursive: true });

    await Promise.all(images.map(({ buffer, extension }, index) => {
      const sequence = String(index + 1).padStart(2, "0");
      const filename = index === coverIndex ? `${sequence}-Front${extension}` : `${sequence}${extension}`;
      return writeFile(path.join(targetDir, filename), buffer);
    }));

    sendJson(response, 201, { folder, count: images.length });
    return true;
  }

  if (request.method === "PUT" && pathname === "/api/images/cover") {
    const body = await readBody(request);
    const filename = await setCoverImage(body?.folder, body?.filename);
    sendJson(response, 200, { ok: true, filename });
    return true;
  }

  if (request.method === "PUT" && pathname === "/api/listings") {
    const body = await readBody(request);
    const listings = body?.listings;
    if (!listings || typeof listings !== "object") {
      throw Object.assign(new Error("缺少房源数据"), { status: 400 });
    }

    validateListings(listings.active, "待售房源");
    validateListings(listings.exclusive, "独家房源");
    validateListings(listings.sold, "已售房源");

    const stamp = backupStamp();
    await Promise.all([
      writeJsonAtomically(DATA_FILES.active, listings.active, stamp),
      writeJsonAtomically(DATA_FILES.exclusive, listings.exclusive, stamp),
      writeJsonAtomically(DATA_FILES.sold, listings.sold, stamp),
    ]);
    sendJson(response, 200, { ok: true, savedAt: new Date().toISOString() });
    return true;
  }

  if (request.method === "PUT" && pathname === "/api/comments") {
    const body = await readBody(request);
    validateComments(body?.comments);
    await writeJsonAtomically(DATA_FILES.comments, body.comments, backupStamp());
    sendJson(response, 200, { ok: true, savedAt: new Date().toISOString() });
    return true;
  }

  if (pathname.startsWith("/api/")) {
    sendJson(response, 404, { error: "接口不存在" });
    return true;
  }
  return false;
}

async function serveStatic(response, pathname) {
  const requestedPath = pathname === "/" ? "index.html" : pathname.slice(1);
  const filePath = path.resolve(PUBLIC_DIR, requestedPath);
  if (!filePath.startsWith(`${PUBLIC_DIR}${path.sep}`)) {
    sendJson(response, 403, { error: "禁止访问" });
    return;
  }

  try {
    await access(filePath);
    const content = await readFile(filePath);
    response.writeHead(200, {
      "Content-Type": CONTENT_TYPES[path.extname(filePath)] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    response.end(content);
  } catch {
    sendJson(response, 404, { error: "页面不存在" });
  }
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || HOST}`);

  try {
    if (await handleApi(request, response, url.pathname)) return;
    if (request.method !== "GET") {
      sendJson(response, 405, { error: "不支持该请求方法" });
      return;
    }
    await serveStatic(response, url.pathname);
  } catch (error) {
    console.error(error);
    sendJson(response, error.status || 500, {
      error: error.status ? error.message : "保存失败，请查看终端日志",
    });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`本地管理后台已启动：http://${HOST}:${PORT}`);
  console.log("按 Ctrl+C 停止服务");
});
