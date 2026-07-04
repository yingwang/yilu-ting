/*
 * 一路听 service worker
 *
 * 目标：让这个旅行导览在漫游 / 无信号时也能用。
 * - 应用外壳（HTML、_next 静态资源、图标）随用随缓存，离线也能打开、能读导览词。
 * - 音频（/audio/*.mp3）单独放在一个持久缓存里：既在播放时顺手缓存，也支持在
 *   目的地页用「存到手机」按钮整城预取。更新外壳时不会清掉已经下载的音频。
 * - 关键难点：iOS Safari 播放音频会先发 Range 请求，如果直接把整段 200 响应丢回去，
 *   离线时会放不出声。这里在离线命中缓存时，自己按 Range 把整段切成 206 分片返回。
 */

const SHELL_CACHE = "yilu-shell-v3";
const AUDIO_CACHE = "yilu-audio-v1";

// 安装：立即接管，不用等旧 worker 退出。
self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

// 激活：清掉旧版本的外壳缓存，但保留音频缓存（用户下载过的城市音频不能丢）。
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key.startsWith("yilu-shell-") && key !== SHELL_CACHE)
          .map((key) => caches.delete(key))
      );
      await self.clients.claim();
    })()
  );
});

function isAudioRequest(url) {
  return url.pathname.includes("/audio/") && url.pathname.endsWith(".mp3");
}

function isStaticAsset(url) {
  return (
    url.pathname.includes("/_next/") ||
    /\.(?:css|js|woff2?|ttf|png|jpg|jpeg|svg|webp|ico|webmanifest)$/i.test(url.pathname)
  );
}

// 把一段完整的缓存响应按 Range 头切成 206 分片，供离线播放使用。
async function buildRangeResponse(fullResponse, rangeHeader) {
  const buffer = await fullResponse.clone().arrayBuffer();
  const total = buffer.byteLength;
  const match = /bytes=(\d*)-(\d*)/.exec(rangeHeader || "");
  let start = match && match[1] ? parseInt(match[1], 10) : 0;
  let end = match && match[2] ? parseInt(match[2], 10) : total - 1;

  if (Number.isNaN(start)) start = 0;
  if (Number.isNaN(end) || end >= total) end = total - 1;

  if (start > end || start >= total) {
    return new Response(null, {
      status: 416,
      statusText: "Range Not Satisfiable",
      headers: { "Content-Range": `bytes */${total}` }
    });
  }

  const chunk = buffer.slice(start, end + 1);
  return new Response(chunk, {
    status: 206,
    statusText: "Partial Content",
    headers: {
      "Content-Type": fullResponse.headers.get("Content-Type") || "audio/mpeg",
      "Content-Range": `bytes ${start}-${end}/${total}`,
      "Content-Length": String(chunk.byteLength),
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=31536000"
    }
  });
}

async function handleAudio(request) {
  const cache = await caches.open(AUDIO_CACHE);
  const range = request.headers.get("range");
  const cached = await cache.match(request.url, { ignoreVary: true });

  if (cached) {
    return range ? buildRangeResponse(cached, range) : cached.clone();
  }

  // 没缓存过：拉整段（去掉 Range 以便完整存下来），存进音频缓存，再按需切片返回。
  try {
    const fullResponse = await fetch(new Request(request.url, { headers: {} }));
    if (fullResponse && fullResponse.status === 200) {
      await cache.put(request.url, fullResponse.clone());
      return range ? buildRangeResponse(fullResponse, range) : fullResponse;
    }
    return fetch(request);
  } catch {
    // 离线且从未缓存：只能失败，让页面的音频组件显示友好提示。
    return fetch(request);
  }
}

async function handleNavigation(request) {
  const cache = await caches.open(SHELL_CACHE);
  try {
    const network = await fetch(request);
    if (network && network.ok) {
      cache.put(request, network.clone());
    }
    return network;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;
    const home = await cache.match(self.registration.scope);
    if (home) return home;
    return new Response(
      "<!doctype html><meta charset=utf-8><body style='font-family:sans-serif;padding:2rem;color:#3a3a3a'>这一页还没缓存到手机上。请在有网时先打开一次，或在目的地页点「存到手机」。",
      { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }
}

async function handleStatic(request) {
  const cache = await caches.open(SHELL_CACHE);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((response) => {
      if (response && response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => cached);
  return cached || network;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (isAudioRequest(url)) {
    event.respondWith(handleAudio(request));
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(handleNavigation(request));
    return;
  }

  if (isStaticAsset(url)) {
    event.respondWith(handleStatic(request));
  }
});
