"use client";

import { AlertCircle, Headphones, RotateCcw, RotateCw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { withBasePath } from "@/lib/assetPath";

const RATE_KEY = "yilu-ting-rate";
const SKIP_SECONDS = 15;
const SPEEDS = [0.75, 1, 1.25, 1.5];

function positionKey(audioUrl: string) {
  return `yilu-ting-pos:${audioUrl}`;
}

export function AudioGuidePlayer({
  audioUrl,
  title,
  album,
  prevHref,
  prevTitle,
  nextHref,
  nextTitle
}: {
  audioUrl: string;
  title: string;
  album?: string;
  prevHref?: string;
  prevTitle?: string;
  nextHref?: string;
  nextTitle?: string;
}) {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasError, setHasError] = useState(false);
  const [rate, setRate] = useState(1);
  const resolvedAudioUrl = withBasePath(audioUrl);

  // 载入上次选择的播放速度。
  useEffect(() => {
    try {
      const saved = Number(window.localStorage.getItem(RATE_KEY));
      if (saved && SPEEDS.includes(saved)) setRate(saved);
    } catch {
      // 忽略：读不到就用默认 1 倍速。
    }
  }, []);

  // 速度变化时应用到音频并记下来。
  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = rate;
    try {
      window.localStorage.setItem(RATE_KEY, String(rate));
    } catch {
      // 忽略写入失败。
    }
  }, [rate]);

  // 锁屏 / 通知栏媒体控制与播放进度记忆。
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let restored = false;

    const savePosition = () => {
      try {
        if (audio.currentTime > 3 && audio.currentTime < audio.duration - 2) {
          window.localStorage.setItem(positionKey(audioUrl), String(audio.currentTime));
        }
      } catch {
        // 忽略写入失败。
      }
    };

    const clearPosition = () => {
      try {
        window.localStorage.removeItem(positionKey(audioUrl));
      } catch {
        // 忽略。
      }
    };

    const updatePositionState = () => {
      if (
        "mediaSession" in navigator &&
        "setPositionState" in navigator.mediaSession &&
        Number.isFinite(audio.duration) &&
        audio.duration > 0
      ) {
        try {
          navigator.mediaSession.setPositionState({
            duration: audio.duration,
            position: Math.min(audio.currentTime, audio.duration),
            playbackRate: audio.playbackRate || 1
          });
        } catch {
          // 某些浏览器参数校验较严，忽略即可。
        }
      }
    };

    const onLoadedMetadata = () => {
      audio.playbackRate = rate;
      if (!restored) {
        restored = true;
        try {
          const saved = Number(window.localStorage.getItem(positionKey(audioUrl)));
          if (saved && saved < audio.duration - 2) {
            audio.currentTime = saved;
          }
        } catch {
          // 忽略读取失败。
        }
      }
      updatePositionState();
    };

    let lastSaved = 0;
    const onTimeUpdate = () => {
      const now = audio.currentTime;
      if (Math.abs(now - lastSaved) > 4) {
        lastSaved = now;
        savePosition();
        updatePositionState();
      }
    };

    const setupMediaSession = () => {
      if (!("mediaSession" in navigator)) return;
      try {
        navigator.mediaSession.metadata = new MediaMetadata({
          title,
          artist: album ? `一路听 · ${album}` : "一路听",
          album: "一路听",
          artwork: [
            { src: withBasePath("/icon-192.png"), sizes: "192x192", type: "image/png" },
            { src: withBasePath("/icon-512.png"), sizes: "512x512", type: "image/png" }
          ]
        });

        navigator.mediaSession.setActionHandler("play", () => audio.play());
        navigator.mediaSession.setActionHandler("pause", () => audio.pause());
        navigator.mediaSession.setActionHandler("seekbackward", (details) => {
          audio.currentTime = Math.max(0, audio.currentTime - (details.seekOffset || SKIP_SECONDS));
        });
        navigator.mediaSession.setActionHandler("seekforward", (details) => {
          audio.currentTime = Math.min(
            audio.duration || audio.currentTime,
            audio.currentTime + (details.seekOffset || SKIP_SECONDS)
          );
        });
        try {
          navigator.mediaSession.setActionHandler("seekto", (details) => {
            if (details.seekTime != null) audio.currentTime = details.seekTime;
          });
        } catch {
          // 部分浏览器不支持 seekto。
        }
        navigator.mediaSession.setActionHandler(
          "previoustrack",
          prevHref ? () => router.push(prevHref) : null
        );
        navigator.mediaSession.setActionHandler(
          "nexttrack",
          nextHref ? () => router.push(nextHref) : null
        );
      } catch {
        // MediaSession 不可用时静默降级。
      }
    };

    const onPlay = () => {
      setupMediaSession();
      if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "playing";
      updatePositionState();
    };
    const onPause = () => {
      savePosition();
      if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "paused";
    };
    const onEnded = () => {
      clearPosition();
      if (nextHref) router.push(nextHref);
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      savePosition();
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
    // audioUrl / 导航目标变化时重挂事件。
  }, [audioUrl, title, album, prevHref, nextHref, rate, router]);

  const skip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(
      0,
      Math.min(audio.duration || audio.currentTime + seconds, audio.currentTime + seconds)
    );
  };

  return (
    <section className="rounded-[0.5rem] border border-moss/15 bg-moss/10 p-4">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-moss p-2 text-white">
            <Headphones size={20} aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-semibold text-ink">语音导览</h2>
            <p className="text-xs text-ink/55">{title}</p>
          </div>
        </div>
      </div>

      {hasError ? (
        <div className="flex gap-2 rounded-[0.5rem] border border-brass/30 bg-white/70 p-3 text-sm leading-6 text-ink/65">
          <AlertCircle className="mt-0.5 shrink-0 text-brass" size={18} aria-hidden="true" />
          <p>这段音频暂时放不出来。可能还没缓存到手机上：请在有网时先打开一次，或在目的地页点「存到手机」。导览词可以先读。</p>
        </div>
      ) : (
        <div className="space-y-3">
          <audio
            ref={audioRef}
            className="w-full"
            controls
            preload="none"
            onError={() => setHasError(true)}
          >
            <source src={resolvedAudioUrl} type="audio/mpeg" />
            你的浏览器暂时不能播放音频。
          </audio>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => skip(-SKIP_SECONDS)}
                className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1.5 text-xs font-medium text-ink/65 ring-1 ring-ink/10"
                aria-label="后退 15 秒"
              >
                <RotateCcw size={14} aria-hidden="true" />
                15
              </button>
              <button
                type="button"
                onClick={() => skip(SKIP_SECONDS)}
                className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1.5 text-xs font-medium text-ink/65 ring-1 ring-ink/10"
                aria-label="快进 15 秒"
              >
                <RotateCw size={14} aria-hidden="true" />
                15
              </button>
            </div>

            <div className="flex items-center gap-1 rounded-full bg-white/60 p-1 ring-1 ring-ink/10">
              {SPEEDS.map((speed) => (
                <button
                  key={speed}
                  type="button"
                  onClick={() => setRate(speed)}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${
                    rate === speed ? "bg-moss text-white" : "text-ink/55"
                  }`}
                  aria-pressed={rate === speed}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>

          {(prevTitle || nextTitle) ? (
            <p className="text-[11px] text-ink/40">
              锁屏时可用上一段 / 下一段切换导览
            </p>
          ) : null}
        </div>
      )}
    </section>
  );
}
