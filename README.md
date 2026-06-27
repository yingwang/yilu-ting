# 一路听

一个移动优先的中文景点语音导览 MVP。它是浏览器里的 PWA，不是原生 App。第一版使用本地静态数据，包含汉堡、阿尔萨斯、因特拉肯与伯尔尼高地、蒙特勒湖区和巴黎的 34 个导览点；巴黎下加入卢浮宫专题导览，用应用内互动地图、楼层和展品结构组织博物馆内容。

## 链接

- GitHub: <https://github.com/yingwang/yilu-ting>
- 在线 Demo: <https://yingwang.github.io/yilu-ting/>

## 功能

- 目的地首页和目的地详情页
- 34 个 POI 的中文导览词、自然导游补充、坐标、标签、上一段和下一段导览
- 目的地页增加城市 / 区域导游词，参考 travel-book 的景点背景资料改写
- 巴黎 / 卢浮宫专题：按 Denon / Sully / Richelieu 三翼、楼层和重点展品建立应用内可点击互动地图
- 卢浮宫 Top 100 内容结构：先拆成 10 个章节，再用 Prompt 批量生成作品解说 JSON
- 卢浮宫 Prompt 页面：`/destinations/paris/louvre/prompt` 可直接复制给 ChatGPT 生成解说文字
- 原生 HTML audio 播放器，先使用 `/audio/*.mp3` 占位路径
- 音频文件缺失时显示友好提示，不会让页面崩掉
- localStorage 保存已听状态和继续收听位置
- 进度页显示已听和未听导览点
- PWA manifest 和移动端底部导航

## 运行

```bash
npm install
npm run dev -- --hostname 127.0.0.1 --port 3017
```

打开 `http://127.0.0.1:3017`。

## 构建检查

```bash
npm run typecheck
npm run build
```

## 音频接入

导览音频使用 edge-tts 生成到 `public/audio/`。文件名和 `src/data/pois.ts` 里的 `audioUrl` 一一对应，实际朗读文本优先使用 `src/data/spotGuide.ts` 里的新版自然导游词。例如：

```text
public/audio/alsace-petite-france.mp3
```

生成缺失音频，或重新生成音频：

```bash
npm run generate:audio -- --force
```

默认声音是 `zh-CN-XiaoxiaoNeural`，语速是 `-8%`。如果以后想换声音或语速，可以这样运行：

```bash
YILU_TTS_VOICE=zh-CN-YunxiNeural YILU_TTS_RATE=-5% npm run generate:audio -- --force
```

## 后续接入位置

- TTS 和音频上传：保留 `audioUrl` 字段，当前音频先放在 `public/audio/`，以后也可以换成对象存储或 CDN 地址。
- Supabase：当前进度逻辑都在 `src/lib/progress.ts`，以后要做跨设备同步时，把 localStorage 换成 Supabase 读写即可，组件不用跟着大改。
- Stripe：第一版不做付费；以后如果要卖离线音频包或完整导览合集，可以在 POI 详情页的音频下载、离线包入口附近加 Stripe gating。
- 地图：城市景点页提供 Google Maps 跳转链接；卢浮宫专题使用应用内简化互动地图，不依赖外部地图跳转。官方地图和房间开放状态会变化，导入展品数据时应保留 `lastVerified` 和 `locationNote`。
- 现场播放：当前不做自动播放。卢浮宫内容先按地图、楼层、作品手动点播；以后如要做现场模式，再评估用户授权、浏览器音频限制和室内定位问题。

## 依赖审计

当前 `npm audit --omit=dev` 会报告 Next.js 间接依赖的 PostCSS advisory。npm 给出的自动修复需要 `--force`，而且会把 Next 降到旧版本，所以这里没有执行破坏性修复。后续等 Next 稳定版本更新后，再升级即可。
