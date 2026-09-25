const STATUS_LABELS = {
  active: "待售",
  exclusive: "独家",
  sold: "已售",
};

const state = {
  data: null,
  view: "listings",
  filter: "all",
  search: "",
  editor: null,
  pendingImages: [],
  existingImages: [],
  existingImageFolder: null,
  removedImages: new Set(),
  selectedCover: null,
  loadingImages: false,
  saving: false,
};

const elements = {
  addButton: document.querySelector("#add-button"),
  closeDialog: document.querySelector("#close-dialog"),
  commentCount: document.querySelector("#comment-count"),
  contentPanel: document.querySelector("#content-panel"),
  deleteButton: document.querySelector("#delete-button"),
  dialog: document.querySelector("#editor-dialog"),
  dialogEyebrow: document.querySelector("#dialog-eyebrow"),
  dialogTitle: document.querySelector("#dialog-title"),
  filter: document.querySelector("#listing-filter"),
  form: document.querySelector("#editor-form"),
  formFields: document.querySelector("#form-fields"),
  listingCount: document.querySelector("#listing-count"),
  pageTitle: document.querySelector("#page-title"),
  reloadButton: document.querySelector("#reload-button"),
  saveStatus: document.querySelector("#save-status"),
  searchInput: document.querySelector("#search-input"),
  summaryGrid: document.querySelector("#summary-grid"),
  toast: document.querySelector("#toast"),
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatPrice(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function formatBathrooms(value) {
  return typeof value === "number" ? `${value} 卫` : value;
}

function showToast(message, isError = false) {
  elements.toast.textContent = message;
  elements.toast.className = `toast show${isError ? " error" : ""}`;
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    elements.toast.className = "toast";
  }, 3200);
}

function setSaveStatus(text) {
  elements.saveStatus.textContent = text;
}

async function request(url, options) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  const payload = await response.json();
    if (!response.ok) {
      if (response.status === 404 && url.startsWith("/api/images")) {
        throw new Error("后台图片接口已更新，请重启本地管理后台后再保存");
      }
      throw new Error(payload.error || "请求失败");
    }
  return payload;
}

async function loadData({ quiet = false } = {}) {
  try {
    setSaveStatus("正在读取...");
    state.data = await request("/api/data");
    render();
    setSaveStatus("数据已同步");
    if (!quiet) showToast("已读取最新 JSON 数据");
  } catch (error) {
    setSaveStatus("读取失败");
    showToast(error.message, true);
  }
}

function allListings() {
  return Object.entries(state.data.listings).flatMap(([status, items]) =>
    items.map((item, index) => ({ item, index, status })),
  );
}

function nextNumericId(records) {
  const numericIds = records
    .map(({ item }) => Number(item.id))
    .filter(Number.isFinite);
  return String((numericIds.length ? Math.max(...numericIds) : 0) + 1);
}

function createListingId() {
  return `listing-${Date.now().toString(36)}`;
}

function summaryCard(label, value) {
  return `
    <article class="summary-card">
      <small>${escapeHtml(label)}</small>
      <strong>${escapeHtml(value)}</strong>
    </article>
  `;
}

function renderSummary() {
  const { active, exclusive, sold } = state.data.listings;
  if (state.view === "listings") {
    elements.summaryGrid.innerHTML = [
      summaryCard("全部房源", active.length + exclusive.length + sold.length),
      summaryCard("待售房源", active.length),
      summaryCard("独家房源", exclusive.length),
      summaryCard("已售房源", sold.length),
    ].join("");
  } else {
    const comments = state.data.comments;
    const average = comments.length
      ? (comments.reduce((sum, item) => sum + item.star, 0) / comments.length).toFixed(1)
      : "0.0";
    const translated = comments.filter((item) => item.content_zh?.trim()).length;
    elements.summaryGrid.innerHTML = [
      summaryCard("全部评论", comments.length),
      summaryCard("平均评分", `${average} / 5`),
      summaryCard("已有中文翻译", translated),
      summaryCard("待补充翻译", comments.length - translated),
    ].join("");
  }
}

function matchesSearch(...values) {
  if (!state.search) return true;
  const haystack = values.join(" ").toLowerCase();
  return haystack.includes(state.search.toLowerCase());
}

function renderListings() {
  const rows = allListings().filter(({ item, status }) => {
    const matchesFilter = state.filter === "all" || state.filter === status;
    return matchesFilter &&
      matchesSearch(item.address, item.id, item.mlsId, item.imageKey);
  });

  if (!rows.length) {
    elements.contentPanel.innerHTML = '<div class="empty-state">没有找到符合条件的房源</div>';
    return;
  }

  elements.contentPanel.innerHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th>房源</th>
          <th>状态</th>
          <th>价格</th>
          <th>户型</th>
          <th>MLS ID</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        ${rows.map(({ item, status, index }) => `
          <tr>
            <td class="address-cell">
              <strong>${escapeHtml(item.address)}</strong>
              <small>房源编号：${escapeHtml(item.id)}</small>
            </td>
            <td><span class="badge ${status}">${STATUS_LABELS[status]}</span></td>
            <td>${formatPrice(item.price)}</td>
            <td>${escapeHtml(item.bedrooms)} 室 · ${escapeHtml(formatBathrooms(item.bathrooms))}</td>
            <td class="muted">${escapeHtml(item.mlsId || "—")}</td>
            <td>
              <button class="row-action" data-action="edit-listing"
                data-status="${status}" data-index="${index}">编辑</button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function renderComments() {
  const rows = state.data.comments
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => matchesSearch(item.name, item.content, item.content_zh, item.date));

  if (!rows.length) {
    elements.contentPanel.innerHTML = '<div class="empty-state">没有找到符合条件的评论</div>';
    return;
  }

  elements.contentPanel.innerHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th>用户</th>
          <th>评分</th>
          <th>发布时间</th>
          <th>评论摘要</th>
          <th>中文</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        ${rows.map(({ item, index }) => `
          <tr>
            <td class="person-cell">
              <strong>${escapeHtml(item.name)}</strong>
              <small>${escapeHtml(item.stats || `${item.reviewsCount} reviews`)}</small>
            </td>
            <td><span class="rating">${"★".repeat(item.star)}${"☆".repeat(5 - item.star)}</span></td>
            <td class="muted">${escapeHtml(item.date)}</td>
            <td title="${escapeHtml(item.content)}">${escapeHtml(item.content.slice(0, 72))}${item.content.length > 72 ? "…" : ""}</td>
            <td>${item.content_zh?.trim() ? "已翻译" : "待补充"}</td>
            <td>
              <button class="row-action" data-action="edit-comment" data-index="${index}">编辑</button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function render() {
  if (!state.data) return;
  const listingTotal = allListings().length;
  elements.listingCount.textContent = listingTotal;
  elements.commentCount.textContent = state.data.comments.length;
  elements.pageTitle.textContent = state.view === "listings" ? "房源管理" : "评论管理";
  elements.addButton.textContent = state.view === "listings" ? "新增房源" : "新增评论";
  elements.filter.hidden = state.view !== "listings";
  elements.searchInput.placeholder = state.view === "listings"
    ? "搜索地址、MLS ID 或房源编号..."
    : "搜索用户名或评论内容...";
  renderSummary();
  if (state.view === "listings") renderListings();
  else renderComments();
}

function field({
  name,
  label,
  value = "",
  type = "text",
  required = false,
  full = false,
  hint = "",
  options,
  step,
}) {
  const requiredAttr = required ? " required" : "";
  const stepAttr = step ? ` step="${step}"` : "";
  let control;
  if (type === "textarea") {
    control = `<textarea id="${name}" name="${name}"${requiredAttr}>${escapeHtml(value)}</textarea>`;
  } else if (type === "select") {
    control = `
      <select id="${name}" name="${name}"${requiredAttr}>
        ${options.map(([optionValue, optionLabel]) =>
          `<option value="${escapeHtml(optionValue)}"${String(value) === String(optionValue) ? " selected" : ""}>${escapeHtml(optionLabel)}</option>`
        ).join("")}
      </select>
    `;
  } else {
    control = `<input id="${name}" name="${name}" type="${type}" value="${escapeHtml(value)}"${stepAttr}${requiredAttr} />`;
  }
  return `
    <div class="field${full ? " full" : ""}">
      <label for="${name}">${escapeHtml(label)}${required ? " *" : ""}</label>
      ${control}
      ${hint ? `<span class="field-hint">${escapeHtml(hint)}</span>` : ""}
    </div>
  `;
}

function listingFields(item, status) {
  const hasExistingImages = Boolean(item.imgid || item.mlsId || item.imageKey);
  return [
    `<input name="id" type="hidden" value="${escapeHtml(item.id)}" />`,
    field({
      name: "status",
      label: "房源状态",
      type: "select",
      value: status,
      required: true,
      options: Object.entries(STATUS_LABELS),
    }),
    field({ name: "address", label: "房源地址", value: item.address, required: true, full: true }),
    field({ name: "price", label: "价格（美元）", type: "number", value: item.price, required: true, step: "any" }),
    field({ name: "mlsId", label: "MLS ID", value: item.mlsId }),
    field({ name: "bedrooms", label: "卧室", type: "number", value: item.bedrooms, required: true, step: "any" }),
    field({
      name: "bathrooms",
      label: "卫生间",
      value: item.bathrooms,
      required: true,
      hint: "可填写 3.5，或 6 baths 2 half baths 等说明",
    }),
    field({ name: "sqft", label: "面积（sqft）", type: "number", value: item.sqft ?? "", step: "any" }),
    `
      <div class="field full image-field">
        <label for="listing-images">房源图片${hasExistingImages ? "" : " *"}</label>
        <label class="upload-zone" for="listing-images">
          <strong>选择图片</strong>
          <span>支持 JPG、PNG、WebP，可多选，选择后点击缩略图设置主图</span>
          <input id="listing-images" name="listingImages" type="file"
            accept="image/jpeg,image/png,image/webp" multiple />
        </label>
        <div class="image-selection-status">
          ${hasExistingImages ? "当前房源已有图片；不重新选择将保留原图。" : "新增房源请至少上传一张图片。"}
        </div>
        <div class="image-preview-grid" id="image-preview-grid"></div>
      </div>
    `,
    field({
      name: "features",
      label: "英文特色",
      type: "textarea",
      value: (item.features || []).join("\n"),
      full: true,
      hint: "每行一项",
    }),
    field({
      name: "features_zh",
      label: "中文特色",
      type: "textarea",
      value: (item.features_zh || []).join("\n"),
      full: true,
      hint: "每行一项",
    }),
  ].join("");
}

function commentFields(item) {
  return [
    `<input name="id" type="hidden" value="${escapeHtml(item.id)}" />`,
    field({ name: "name", label: "用户姓名", value: item.name, required: true }),
    field({ name: "star", label: "评分", type: "number", value: item.star, required: true }),
    field({ name: "reviewsCount", label: "用户评论数", type: "number", value: item.reviewsCount, required: true }),
    field({ name: "date", label: "发布时间", value: item.date, required: true }),
    field({ name: "stats", label: "用户统计文本", value: item.stats, hint: "例如 Local Guide · 6 reviews" }),
    field({ name: "avatar", label: "头像地址", value: item.avatar, full: true }),
    field({ name: "content", label: "英文评论", type: "textarea", value: item.content, required: true, full: true }),
    field({ name: "content_zh", label: "中文评论", type: "textarea", value: item.content_zh, full: true }),
  ].join("");
}

function openEditor(editor) {
  state.editor = editor;
  state.pendingImages.forEach(({ url }) => URL.revokeObjectURL(url));
  state.pendingImages = [];
  state.existingImages = [];
  state.existingImageFolder = null;
  state.removedImages = new Set();
  state.selectedCover = null;
  state.loadingImages = false;
  const isNew = editor.index === null;
  const isListing = editor.type === "listing";

  elements.dialogEyebrow.textContent = isListing ? "LISTING" : "TESTIMONIAL";
  elements.dialogTitle.textContent = `${isNew ? "新增" : "编辑"}${isListing ? "房源" : "评论"}`;
  elements.deleteButton.hidden = isNew;

  if (isListing) {
    const item = isNew
      ? { id: createListingId(), address: "", price: 0, bedrooms: 0, bathrooms: 0, sqft: null }
      : state.data.listings[editor.status][editor.index];
    elements.formFields.innerHTML = listingFields(item, editor.status || "active");
    if (!isNew) loadExistingImages(item);
  } else {
    const item = isNew
      ? {
          id: Number(nextNumericId(state.data.comments.map((comment) => ({ item: comment })))),
          name: "",
          reviewsCount: 0,
          star: 5,
          date: "",
          content: "",
          content_zh: "",
          avatar: "",
          stats: "",
        }
      : state.data.comments[editor.index];
    elements.formFields.innerHTML = commentFields(item);
  }
  elements.dialog.showModal();
}

function lines(value) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

function numberOrNull(value) {
  return value === "" ? null : Number(value);
}

function numberOrText(value) {
  const trimmed = value.trim();
  const numericValue = Number(trimmed);
  return trimmed !== "" && Number.isFinite(numericValue) ? numericValue : trimmed;
}

function renderImagePreviews() {
  const previewGrid = document.querySelector("#image-preview-grid");
  const status = document.querySelector(".image-selection-status");
  if (!previewGrid || !status) return;

  const existing = state.existingImages
    .filter((image) => !state.removedImages.has(image.filename))
    .map((image) => ({ kind: "existing", id: image.filename, name: image.filename, url: image.url }));
  const pending = state.pendingImages
    .map(({ file, url }, index) => ({ kind: "pending", id: index, name: file.name, url }));
  const images = [...existing, ...pending];
  if (!images.some(({ kind, id }) => state.selectedCover?.kind === kind && state.selectedCover.id === id)) {
    state.selectedCover = images.length ? { kind: images[0].kind, id: images[0].id } : null;
  }

  previewGrid.innerHTML = images.map(({ kind, id, name, url }) => {
    const selected = state.selectedCover.kind === kind && state.selectedCover.id === id;
    return `
      <div class="image-preview${selected ? " selected" : ""}">
        <button class="image-cover-button" type="button" data-cover-kind="${kind}"
          data-cover-id="${escapeHtml(id)}" aria-label="设为主图：${escapeHtml(name)}">
          <img src="${escapeHtml(url)}" alt="${escapeHtml(name)}" />
          <span class="cover-badge">${selected ? "主图" : "设为主图"}</span>
          <span class="image-caption">${escapeHtml(name)}</span>
        </button>
        <button class="image-remove-button" type="button" data-remove-kind="${kind}"
          data-remove-id="${escapeHtml(id)}" aria-label="删除图片：${escapeHtml(name)}">删除</button>
      </div>
    `;
  }).join("");
  status.textContent = `共 ${images.length} 张图片${state.pendingImages.length ? `，新增 ${state.pendingImages.length} 张` : ""}；保存房源后生效。`;
}

async function loadExistingImages(item) {
  const editor = state.editor;
  const folder = item.imgid || item.mlsId;
  const params = new URLSearchParams();
  if (folder) params.set("folder", folder);
  if (item.imageKey) params.set("imageKey", item.imageKey);
  if (![...params].length) return;

  state.loadingImages = true;
  try {
    const payload = await request(`/api/images?${params}`);
    if (state.editor !== editor) return;
    state.existingImages = payload.files;
    state.existingImageFolder = payload.folder;
    const cover = payload.files.find((image) => image.isCover) || payload.files[0];
    if (cover && !state.selectedCover) {
      state.selectedCover = { kind: "existing", id: cover.filename };
    }
    renderImagePreviews();
  } catch (error) {
    if (error.message !== "未找到该房源的图片目录") {
      showToast(error.message, true);
    }
  } finally {
    if (state.editor === editor) state.loadingImages = false;
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1]);
    reader.onerror = () => reject(new Error(`无法读取图片：${file.name}`));
    reader.readAsDataURL(file);
  });
}

async function saveImages(listingId, imageKey) {
  if (!state.pendingImages.length && !state.removedImages.size &&
      state.selectedCover?.kind === "existing" &&
      state.existingImages.find((image) => image.filename === state.selectedCover.id)?.isCover) {
    return null;
  }
  const totalSize = state.pendingImages.reduce((sum, { file }) => sum + file.size, 0);
  const remaining = state.existingImages.length - state.removedImages.size;
  if (remaining + state.pendingImages.length > 24) throw new Error("每个房源最多保留 24 张图片");
  if (state.pendingImages.some(({ file }) => file.size > 12 * 1024 * 1024)) {
    throw new Error("每张图片必须小于 12 MB");
  }
  if (totalSize > 32 * 1024 * 1024) throw new Error("本次图片总大小必须小于 32 MB");

  setSaveStatus("正在保存图片...");
  const files = await Promise.all(state.pendingImages.map(async ({ file }) => ({
    name: file.name,
    type: file.type,
    data: await fileToBase64(file),
  })));
  return request("/api/images/update", {
    method: "POST",
    body: JSON.stringify({
      listingId,
      folder: state.existingImageFolder,
      imageKey: !state.existingImageFolder && remaining ? imageKey : null,
      removedFiles: [...state.removedImages],
      cover: state.selectedCover,
      files,
    }),
  });
}

async function saveData(type) {
  if (state.saving) return;
  state.saving = true;
  setSaveStatus("正在保存...");

  try {
    if (type === "listing") {
      await request("/api/listings", {
        method: "PUT",
        body: JSON.stringify({ listings: state.data.listings }),
      });
    } else {
      await request("/api/comments", {
        method: "PUT",
        body: JSON.stringify({ comments: state.data.comments }),
      });
    }
    setSaveStatus("刚刚已保存");
    showToast("修改已写入主站 JSON，并已创建本地备份");
  } catch (error) {
    setSaveStatus("保存失败");
    showToast(error.message, true);
    await loadData({ quiet: true });
      error.reported = true;
    throw error;
  } finally {
    state.saving = false;
  }
}

async function submitEditor(event) {
  event.preventDefault();
  const formData = new FormData(elements.form);
  const editor = state.editor;

  try {
    if (editor.type === "listing") {
      const oldItem = editor.index === null
        ? {}
        : state.data.listings[editor.status][editor.index];
      const targetStatus = formData.get("status");
      const listingId = formData.get("id").trim();
      if (state.loadingImages) throw new Error("图片尚未加载完成，请稍后保存");
      const hasExistingImages = Boolean(oldItem.imgid || oldItem.mlsId || oldItem.imageKey);
      if (!hasExistingImages && !state.pendingImages.length) {
        throw new Error("请至少选择一张房源图片");
      }
      if (state.existingImages.length - state.removedImages.size + state.pendingImages.length === 0) {
        throw new Error("请至少保留一张房源图片");
      }
      const upload = await saveImages(listingId, oldItem.imageKey);
      const updated = {
        ...oldItem,
        id: listingId,
        address: formData.get("address").trim(),
        price: Number(formData.get("price")),
        bedrooms: Number(formData.get("bedrooms")),
        bathrooms: numberOrText(formData.get("bathrooms")),
        sqft: numberOrNull(formData.get("sqft")),
      };
      if (targetStatus === "sold" && (editor.index === null || editor.status !== "sold")) {
        updated.addedAt = new Date().toISOString();
      }

      const optionalValues = {
        mlsId: formData.get("mlsId").trim(),
        imgid: upload?.folder || oldItem.imgid || "",
        features: lines(formData.get("features")),
        features_zh: lines(formData.get("features_zh")),
      };
      for (const [key, value] of Object.entries(optionalValues)) {
        if ((Array.isArray(value) && value.length) || (!Array.isArray(value) && value)) updated[key] = value;
        else delete updated[key];
      }

      if (editor.index !== null) state.data.listings[editor.status].splice(editor.index, 1);
      state.data.listings[targetStatus].unshift(updated);
      await saveData("listing");
    } else {
      const oldItem = editor.index === null ? {} : state.data.comments[editor.index];
      const updated = {
        ...oldItem,
        id: Number(formData.get("id")),
        name: formData.get("name").trim(),
        reviewsCount: Number(formData.get("reviewsCount")),
        star: Number(formData.get("star")),
        date: formData.get("date").trim(),
        content: formData.get("content").trim(),
        content_zh: formData.get("content_zh").trim(),
        avatar: formData.get("avatar").trim(),
        stats: formData.get("stats").trim(),
      };
      if (editor.index === null) state.data.comments.unshift(updated);
      else state.data.comments[editor.index] = updated;
      await saveData("comment");
    }
    elements.dialog.close();
    render();
  } catch (error) {
    if (!error.reported) {
      setSaveStatus("保存失败");
      showToast(error.message, true);
    }
  }
}

async function deleteRecord() {
  const editor = state.editor;
  const noun = editor.type === "listing" ? "房源" : "评论";
  if (!window.confirm(`确认删除这条${noun}吗？保存前的数据仍可在 .local-backups 中找回。`)) return;

  try {
    if (editor.type === "listing") {
      state.data.listings[editor.status].splice(editor.index, 1);
      await saveData("listing");
    } else {
      state.data.comments.splice(editor.index, 1);
      await saveData("comment");
    }
    elements.dialog.close();
    render();
  } catch {
    // saveData has already restored source data and shown the error.
  }
}

document.querySelectorAll(".nav-button").forEach((button) => {
  button.addEventListener("click", () => {
    state.view = button.dataset.view;
    state.search = "";
    elements.searchInput.value = "";
    document.querySelectorAll(".nav-button").forEach((item) => item.classList.toggle("active", item === button));
    render();
  });
});

elements.filter.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-filter]");
  if (!button) return;
  state.filter = button.dataset.filter;
  elements.filter.querySelectorAll("button").forEach((item) => item.classList.toggle("active", item === button));
  renderListings();
});

elements.searchInput.addEventListener("input", (event) => {
  state.search = event.target.value.trim();
  if (state.view === "listings") renderListings();
  else renderComments();
});

elements.contentPanel.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  if (button.dataset.action === "edit-listing") {
    openEditor({
      type: "listing",
      status: button.dataset.status,
      index: Number(button.dataset.index),
    });
  } else {
    openEditor({ type: "comment", index: Number(button.dataset.index) });
  }
});

elements.addButton.addEventListener("click", () => {
  openEditor(
    state.view === "listings"
      ? { type: "listing", status: state.filter === "all" ? "active" : state.filter, index: null }
      : { type: "comment", index: null },
  );
});

elements.form.addEventListener("submit", submitEditor);
elements.formFields.addEventListener("change", (event) => {
  if (event.target.id !== "listing-images") return;
  state.pendingImages.push(...Array.from(event.target.files, (file) => ({
    file,
    url: URL.createObjectURL(file),
  })));
  event.target.value = "";
  renderImagePreviews();
});
elements.formFields.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-remove-kind]");
  if (removeButton) {
    const id = removeButton.dataset.removeId;
    if (removeButton.dataset.removeKind === "existing") {
      state.removedImages.add(id);
    } else {
      const index = Number(id);
      const [{ url }] = state.pendingImages.splice(index, 1);
      URL.revokeObjectURL(url);
      if (state.selectedCover?.kind === "pending") {
        if (state.selectedCover.id === index) state.selectedCover = null;
        else if (state.selectedCover.id > index) state.selectedCover.id -= 1;
      }
    }
    renderImagePreviews();
    return;
  }
  const coverButton = event.target.closest("[data-cover-kind]");
  if (coverButton) {
    state.selectedCover = {
      kind: coverButton.dataset.coverKind,
      id: coverButton.dataset.coverKind === "pending"
        ? Number(coverButton.dataset.coverId)
        : coverButton.dataset.coverId,
    };
    renderImagePreviews();
  }
});
elements.deleteButton.addEventListener("click", deleteRecord);
elements.reloadButton.addEventListener("click", () => loadData());
elements.closeDialog.addEventListener("click", () => elements.dialog.close());
elements.dialog.addEventListener("cancel", (event) => {
  event.preventDefault();
});

loadData({ quiet: true });
