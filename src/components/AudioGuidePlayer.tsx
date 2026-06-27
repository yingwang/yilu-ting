"use client";

import { AlertCircle, Headphones } from "lucide-react";
import { useState } from "react";
import { withBasePath } from "@/lib/assetPath";

export function AudioGuidePlayer({
  audioUrl,
  title,
  audioDuration
}: {
  audioUrl: string;
  title: string;
  audioDuration: string;
}) {
  const [hasError, setHasError] = useState(false);
  const resolvedAudioUrl = withBasePath(audioUrl);

  return (
    <section className="rounded-[0.5rem] border border-moss/15 bg-moss/10 p-4">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-moss p-2 text-white">
            <Headphones size={20} aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-semibold text-ink">语音导览</h2>
            <p className="text-xs text-ink/55">{title} · {audioDuration}</p>
          </div>
        </div>
      </div>

      {hasError ? (
        <div className="flex gap-2 rounded-[0.5rem] border border-brass/30 bg-white/70 p-3 text-sm leading-6 text-ink/65">
          <AlertCircle className="mt-0.5 shrink-0 text-brass" size={18} aria-hidden="true" />
          <p>这段音频还没有放进来，导览词已经可以先读。以后把真实 TTS 文件放到对应路径，播放器会自动可用。</p>
        </div>
      ) : (
        <audio
          className="w-full"
          controls
          preload="none"
          onError={() => setHasError(true)}
        >
          {/* Real TTS generation can upload edited MP3 files later and replace these placeholder paths. */}
          <source src={resolvedAudioUrl} type="audio/mpeg" />
          你的浏览器暂时不能播放音频。
        </audio>
      )}
    </section>
  );
}
