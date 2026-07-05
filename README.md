# 一路听

一个移动优先的中文景点语音导览 MVP。它是浏览器里的 PWA，不是原生 App。第一版使用本地静态数据，包含汉堡、阿尔萨斯、因特拉肯与伯尔尼高地、蒙特勒湖区和巴黎的 40 个导览点；巴黎下加入卢浮宫专题导览，用应用内互动地图、楼层和展品结构组织博物馆内容。整个应用可以离线使用：在有网时把某座城市的音频存进手机，之后漫游或没信号也能听。

## 链接

- GitHub: <https://github.com/yingwang/yilu-ting>
- 在线 Demo: <https://yingwang.github.io/yilu-ting/>

## 功能

- 目的地首页和目的地详情页
- 40 个 POI 的中文导览词、自然导游补充、坐标、标签、上一段和下一段导览
- 目的地页增加城市 / 区域导游词，参考 travel-book 的景点背景资料改写
- 巴黎 / 卢浮宫专题：按 Denon / Sully / Richelieu 三翼、楼层和重点展品建立应用内可点击互动地图
- 卢浮宫 Top 100 内容结构：先拆成 10 个章节，再用 Prompt 批量生成作品解说 JSON
- 卢浮宫 Prompt 页面：`/destinations/paris/louvre/prompt` 可直接复制给 ChatGPT 生成解说文字
- 音频播放器接入 MediaSession：锁屏和通知栏显示标题、封面、上一段 / 下一段，支持后退快进
- 记忆每段音频的收听位置，退出再进接着听；可切换 0.75x 到 1.5x 播放速度
- 音频文件缺失时显示友好提示，不会让页面崩掉
- localStorage 保存已听状态和继续收听位置
- 进度页显示已听和未听导览点

## 离线使用（PWA）

- `public/sw.js` 是手写的 service worker：应用外壳随用随缓存，离线也能打开、能读导览词
- 目的地页提供「存到手机」按钮，把该城市（巴黎含卢浮宫整套）的音频预取到 Cache API；更新外壳不会清掉已下载的音频
- service worker 针对音频的 Range 请求做了处理，离线时按 Range 切出 206 分片，保证 iOS Safari 也能正常播放
- 图标提供 192 / 512 PNG 与 180 的 apple-touch-icon，iOS 和 Android 都能正常「添加到主屏幕」

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

## 依赖审计

当前 `npm audit --omit=dev` 会报告 Next.js 间接依赖的 PostCSS advisory。npm 给出的自动修复需要 `--force`，而且会把 Next 降到旧版本，所以这里没有执行破坏性修复。后续等 Next 稳定版本更新后，再升级即可。

## 授权

这个仓库里几类材料适用不同的授权，完整说明见 [CREDITS.md](CREDITS.md)：

- 代码(Next.js/TypeScript、service worker、脚本)：[MIT](LICENSE)。
- 导览词(`src/data/` 下的 `pois.ts`、`spotGuide.ts` 等)：原创，[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)。
- 导览音频(`public/audio/`)：由微软 edge-tts 神经语音合成，受 Azure 语音相关条款约束，此处仅作个人非商业用途分发；二次利用请自行重新生成并核对条款。
