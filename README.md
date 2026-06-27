# 一路听

一个移动优先的中文旅行语音导览 MVP。它是浏览器里的 PWA，不是原生 App。第一版使用本地静态数据，包含阿尔萨斯、因特拉肯与伯尔尼高地、蒙特勒湖区和巴黎的 21 个导览点。

## 功能

- 目的地首页和目的地详情页
- 21 个 POI 的中文导览词、坐标、标签、时长、上一站和下一站
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

真实 TTS 音频生成后，把 mp3 文件放到 `public/audio/`，文件名和 `src/data/pois.ts` 里的 `audioUrl` 对上即可。例如：

```text
public/audio/alsace-petite-france.mp3
```

## 后续接入位置

- TTS 和音频上传：保留 `audioUrl` 字段，生成后的音频可以先传到 `public/audio/`，以后也可以换成对象存储或 CDN 地址。
- Supabase：当前进度逻辑都在 `src/lib/progress.ts`，以后要做跨设备同步时，把 localStorage 换成 Supabase 读写即可，组件不用跟着大改。
- Stripe：第一版不做付费；以后如果要卖离线音频包或完整路线，可以在 POI 详情页的音频下载、离线包入口附近加 Stripe gating。
- 地图：第一版只提供 Google Maps 跳转链接；以后如果要内嵌地图，可以直接用 POI 里的经纬度接 Mapbox、Google Maps 或 Apple Maps。

## 依赖审计

当前 `npm audit --omit=dev` 会报告 Next.js 间接依赖的 PostCSS advisory。npm 给出的自动修复需要 `--force`，而且会把 Next 降到旧版本，所以这里没有执行破坏性修复。后续等 Next 稳定版本更新后，再升级即可。
