# 日本語上手 · 日语学习助手

[中文](#中文) · [English](#english)

## 中文

基于 React Router 7 和 Cloudflare Workers 的日语学习应用，覆盖 N4、N3、N2 的语法、词汇与汉字学习内容。

![日本語上手桌面端首页](docs/home.jpg)

## 功能

- N4 / N3 / N2 的语法、词汇、汉字课程，按周与每日内容组织
- 全站搜索、语法辨析、接续表、活用表与数字表达参考
- 假名注音、日语 TTS 朗读、中文 / 英文切换与深色模式
- 收藏、生词本、错题本与记忆卡
- 手机底部导航与桌面侧栏的响应式布局
- 通过 Cloudflare KV 同步收藏和错题数据；KV 不可用时自动回退到浏览器 `localStorage`

## 技术架构

- 前端：React 19、React Router 7、TypeScript、Vite
- 服务端：Cloudflare Worker（React Router SSR）
- 数据：课程内容作为带内容哈希的静态 JSON 资源缓存；收藏与错题使用 Cloudflare KV

为保证迁移前后的 UI 和交互完全一致，当前版本保留了原学习应用的成熟客户端运行时，并由 React Router 提供页面外壳、静态资源和 Worker API。后续可以逐页拆分为原生 React 组件，而不会改变现有体验。

## 本地开发

```bash
npm ci
CHOKIDAR_USEPOLLING=1 npm run dev -- --host 127.0.0.1 --port 5175
```

打开 [http://127.0.0.1:5175](http://127.0.0.1:5175)。

`CHOKIDAR_USEPOLLING=1` 用于规避部分 macOS 环境下的文件监听上限。

## 课程资源同步

课程数据、样式与客户端运行时存放在 `public/`，已随仓库提交。若本机同时存在相邻的旧项目 `../日语学习`，可使用以下命令重新同步其最新课程资源：

```bash
npm run sync:study-assets
```

`npm run dev` 与 `npm run build` 会自动执行这一步。

## API

| Endpoint | Methods | 用途 |
| --- | --- | --- |
| `/api/favorites` | `GET`、`PUT`、`POST` | 读取和保存收藏数据 |
| `/api/mistakes` | `GET`、`PUT`、`POST` | 读取和保存错题本数据 |

接口限制请求体最大为 500 KB，并返回 JSON。当前数据模型保持原项目的单用户行为；如需公开给多位用户使用，应在部署前加入认证与按用户隔离的存储键。

## 构建与部署

```bash
npm run cf-typegen
npm run build
npm run deploy
```

部署前，请在 Cloudflare 中确认 `FAVORITES_KV` 与 `MISTAKES_KV` 已绑定到对应的 KV 命名空间。开发环境默认使用本地 KV 模拟存储。

## English

**Nihongo Jozu** is a Japanese-learning application built with React Router 7 and Cloudflare Workers. It includes N4, N3, and N2 grammar, vocabulary, and kanji study materials.

### Features

- N4 / N3 / N2 grammar, vocabulary, and kanji courses organized by week and day
- Global search, grammar comparisons, conjugation and connection references, and number-expression references
- Furigana, Japanese text-to-speech, Chinese / English switching, and dark mode
- Favorites, vocabulary notebook, mistake notebook, and flashcards
- Responsive mobile bottom navigation and desktop sidebar
- Favorites and mistakes sync through Cloudflare KV, with automatic browser `localStorage` fallback

### Architecture

- Frontend: React 19, React Router 7, TypeScript, and Vite
- Backend: Cloudflare Worker with React Router SSR
- Data: content-hashed static JSON for course material, plus Cloudflare KV for favorites and mistakes

To preserve the original product's UI and behavior exactly, this release retains the established study-app client runtime while React Router provides the application shell, static assets, and Worker APIs. The runtime can be incrementally split into native React components without changing the current experience.

### Local development

```bash
npm ci
CHOKIDAR_USEPOLLING=1 npm run dev -- --host 127.0.0.1 --port 5175
```

Open [http://127.0.0.1:5175](http://127.0.0.1:5175).

`CHOKIDAR_USEPOLLING=1` works around file-watcher limits on some macOS environments.

### Sync course assets

Course data, styles, and the client runtime are committed under `public/`. If the adjacent legacy project exists at `../日语学习`, sync its latest assets with:

```bash
npm run sync:study-assets
```

The command also runs automatically before `npm run dev` and `npm run build`.

### API

| Endpoint | Methods | Purpose |
| --- | --- | --- |
| `/api/favorites` | `GET`, `PUT`, `POST` | Read and save favorites |
| `/api/mistakes` | `GET`, `PUT`, `POST` | Read and save mistake-notebook entries |

Requests are limited to 500 KB and return JSON. The current data model intentionally retains the legacy single-user behavior. Add authentication and per-user storage keys before making the application publicly available to multiple users.

### Build and deploy

```bash
npm run cf-typegen
npm run build
npm run deploy
```

Before deployment, make sure `FAVORITES_KV` and `MISTAKES_KV` are bound to the appropriate Cloudflare KV namespace. Local development uses KV simulation by default.
