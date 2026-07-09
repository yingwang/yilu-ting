import { destinations, getPoisByDestination } from "@/data/pois";
import { allLouvreGuidePois } from "@/data/louvreGuide";
import { getPoiWorks } from "@/data/poiWorks";
import { withBasePath } from "@/lib/assetPath";

// 与 public/sw.js 里的音频缓存名保持一致。更新外壳时不清这个缓存。
export const AUDIO_CACHE = "yilu-audio-v1";

export function isOfflineAudioSupported() {
  return (
    typeof window !== "undefined" &&
    "caches" in window &&
    "serviceWorker" in navigator
  );
}

// 某个目的地离线要存的全部音频地址（含目的地介绍、每个导览点与单馆作品讲解）。
// 巴黎额外带上卢浮宫整套解说，这样「存巴黎到手机」一次把馆内音频也备齐。
export function getDestinationAudioUrls(slug: string): string[] {
  const urls = new Set<string>();
  const destination = destinations.find((item) => item.slug === slug);
  if (destination?.guideAudioUrl) {
    urls.add(withBasePath(destination.guideAudioUrl));
  }

  for (const poi of getPoisByDestination(slug)) {
    if (poi.audioUrl) urls.add(withBasePath(poi.audioUrl));
    for (const work of getPoiWorks(poi.id)) {
      urls.add(withBasePath(`/audio/${work.id}.mp3`));
    }
  }

  if (slug === "paris") {
    urls.add(withBasePath("/audio/intro-louvre.mp3"));
    for (const item of allLouvreGuidePois) {
      urls.add(withBasePath(`/audio/${item.id}.mp3`));
    }
  }

  return Array.from(urls);
}

// 已经缓存了几个（用来显示「已存 / 部分已存」）。
export async function countCachedAudio(urls: string[]): Promise<number> {
  if (!isOfflineAudioSupported()) return 0;
  const cache = await caches.open(AUDIO_CACHE);
  let count = 0;
  for (const url of urls) {
    const hit = await cache.match(url, { ignoreVary: true });
    if (hit) count += 1;
  }
  return count;
}

export type DownloadProgress = {
  done: number;
  total: number;
  bytes: number;
  failed: number;
};

// 逐个拉取并写入缓存，边下边回报进度。已经存过的直接跳过。
export async function downloadDestinationAudio(
  urls: string[],
  onProgress?: (progress: DownloadProgress) => void
): Promise<DownloadProgress> {
  const total = urls.length;
  const progress: DownloadProgress = { done: 0, total, bytes: 0, failed: 0 };
  if (!isOfflineAudioSupported()) return progress;

  const cache = await caches.open(AUDIO_CACHE);

  for (const url of urls) {
    try {
      const existing = await cache.match(url, { ignoreVary: true });
      if (existing) {
        const len = Number(existing.headers.get("Content-Length") || 0);
        progress.done += 1;
        progress.bytes += Number.isNaN(len) ? 0 : len;
        onProgress?.({ ...progress });
        continue;
      }

      const response = await fetch(url, { cache: "no-store" });
      if (response && response.status === 200) {
        await cache.put(url, response.clone());
        const len = Number(response.headers.get("Content-Length") || 0);
        progress.done += 1;
        progress.bytes += Number.isNaN(len) ? 0 : len;
      } else {
        progress.failed += 1;
      }
    } catch {
      progress.failed += 1;
    }
    onProgress?.({ ...progress });
  }

  return progress;
}

// 清掉某个目的地的离线音频（腾空间用）。
export async function removeDestinationAudio(urls: string[]): Promise<void> {
  if (!isOfflineAudioSupported()) return;
  const cache = await caches.open(AUDIO_CACHE);
  for (const url of urls) {
    await cache.delete(url, { ignoreVary: true });
  }
}

export function formatMB(bytes: number): string {
  if (!bytes) return "";
  return `${(bytes / 1024 / 1024).toFixed(0)} MB`;
}
