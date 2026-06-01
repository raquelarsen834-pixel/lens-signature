# 镜头签 - 手机独立版

手机扫码/点击链接 → 打开摄像头 → 手势签名。**无需电脑开服务器，只需部署一次。**

## 🚀 部署（5分钟，只需做一次）

### 方式一：GitHub Pages（推荐，免费）

1. 注册 [GitHub](https://github.com) 账号
2. 新建仓库：点击右上角 **+** → **New repository**
   - Repository name: `lens-signature`
   - 勾选 **Public**
   - 不要勾选任何初始化选项
3. 上传文件：把本目录所有文件拖到 GitHub 网页中
4. 启用 Pages：仓库 → **Settings** → **Pages** →
   - Source: `main` 分支, root 目录
   - 点 **Save**
5. 等 1 分钟，访问 `https://你的用户名.github.io/lens-signature/`

### 方式二：Cloudflare Pages（国内访问更快）

1. 注册 [Cloudflare](https://dash.cloudflare.com/sign-up)
2. Workers & Pages → Pages → 上传资产 → 拖入本目录

---

## 📱 手机使用

1. 手机浏览器打开部署好的链接
2. 点击「📷 启动摄像头」
3. 授权摄像头权限
4. **张开手掌激活** → 移动食指书写 → **握拳停止**
5. 保存签名

Android 用户可**添加到主屏幕**变成独立 APP（iPhone 用 Safari 分享菜单 → 添加到主屏幕）。

## ⚠️ 注意

- 首次加载需下载 AI 模型（~5MB），建议在 WiFi 下打开
- CDN 使用 jsDelivr，国内可能较慢但可用
- 摄像头需要 HTTPS（GitHub Pages 已自带）
