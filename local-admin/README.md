# Emma Estate 本地管理后台

这是一个与主站完全分离的本地数据管理工具。它不会被 Vite 打包，也没有添加任何主站路由。

## 启动

需要 Node.js 18 或更高版本，不需要安装额外依赖。

```bash
cd local-admin
npm start
```

浏览器访问 [http://127.0.0.1:4178](http://127.0.0.1:4178)。使用完毕后，在终端按 `Ctrl+C` 停止服务。

如需更换端口：

```bash
ADMIN_PORT=4180 npm start
```

## 数据流程

1. 在后台维护待售、独家、已售房源或用户评论。
2. 点击表单中的“保存修改”，数据会直接写入主站的 JSON：
   - `src/data/activeListings.json`
   - `src/data/exclusiveListings.json`
   - `src/data/soldListings.json`
   - `src/data/comments.json`
3. 回到项目根目录运行 `npm run dev` 预览主站。
4. 确认无误后运行 `npm run build` 或 `npm run deploy`。

后台保存前会将旧数据备份到 `.local-backups/admin/`。该目录已被 Git 忽略，不会发布到 GitHub Pages。

## 房源图片

运营人员不需要填写图片键或目录标识：

1. 在新增或编辑房源时点击“选择图片”。
2. 可以一次选择多张 JPG、PNG 或 WebP 图片。
3. 选择图片后，点击任意缩略图即可将其设为主图；默认选择第一张。
4. 保存房源时，后台会自动存放图片并更新 JSON 关联字段。

每个房源最多保留 24 张图片，单张不超过 12 MB，一次上传总大小不超过 32 MB。编辑已有房源时，如果不重新选择图片，会继续保留原图片。

编辑已有多图房源时，后台会显示当前目录中的全部图片。点击目标缩略图并保存，即可更换主图。

上传的图片保存在 `source/listings_image/admin-*/`，会在下一次主站构建时进入网站资源。

## 隔离边界

- 服务只监听 `127.0.0.1`，局域网和公网无法直接访问。
- 后台只使用 Node.js 内置模块，没有生产依赖。
- 主站 `App.jsx`、Vite 配置和构建入口均不引用 `local-admin/`。
- GitHub Pages 的 `dist/` 中不会包含管理后台。
