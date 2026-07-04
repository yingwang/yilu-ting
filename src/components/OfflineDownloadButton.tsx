"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Download, Loader2, Trash2, WifiOff } from "lucide-react";
import {
  countCachedAudio,
  downloadDestinationAudio,
  formatMB,
  getDestinationAudioUrls,
  isOfflineAudioSupported,
  removeDestinationAudio,
  type DownloadProgress
} from "@/lib/offlineAudio";

type Status = "unsupported" | "idle" | "partial" | "downloading" | "done";

export function OfflineDownloadButton({
  slug,
  destinationName
}: {
  slug: string;
  destinationName: string;
}) {
  const urls = useMemo(() => getDestinationAudioUrls(slug), [slug]);
  const total = urls.length;
  const [status, setStatus] = useState<Status>("idle");
  const [cached, setCached] = useState(0);
  const [progress, setProgress] = useState<DownloadProgress | null>(null);

  useEffect(() => {
    let active = true;
    if (!isOfflineAudioSupported()) {
      setStatus("unsupported");
      return;
    }
    countCachedAudio(urls).then((count) => {
      if (!active) return;
      setCached(count);
      setStatus(count === 0 ? "idle" : count >= total ? "done" : "partial");
    });
    return () => {
      active = false;
    };
  }, [urls, total]);

  if (status === "unsupported" || total === 0) {
    return null;
  }

  const handleDownload = async () => {
    setStatus("downloading");
    setProgress({ done: cached, total, bytes: 0, failed: 0 });
    const result = await downloadDestinationAudio(urls, (p) => setProgress({ ...p }));
    const count = await countCachedAudio(urls);
    setCached(count);
    setStatus(count >= total ? "done" : "partial");
    setProgress(result);
  };

  const handleRemove = async () => {
    await removeDestinationAudio(urls);
    setCached(0);
    setProgress(null);
    setStatus("idle");
  };

  const sizeHint = progress?.bytes ? ` · ${formatMB(progress.bytes)}` : "";

  return (
    <section className="rounded-[0.5rem] border border-moss/20 bg-moss/5 p-4">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 rounded-full bg-moss/15 p-2 text-moss">
          <WifiOff size={18} aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="font-semibold text-ink">离线收听</h2>
          <p className="mt-1 text-xs leading-5 text-ink/55">
            出发前在有网时，把{destinationName}的 {total} 段音频存进手机，途中漫游或没信号也能听。
          </p>

          <div className="mt-3">
            {status === "downloading" ? (
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-moss">
                  <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                  正在存 {progress?.done ?? cached}/{total}
                  {sizeHint}
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-moss/15">
                  <div
                    className="h-full rounded-full bg-moss transition-all"
                    style={{ width: `${Math.round(((progress?.done ?? 0) / total) * 100)}%` }}
                  />
                </div>
              </div>
            ) : status === "done" ? (
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-moss">
                  <CheckCircle2 size={16} aria-hidden="true" />
                  已存到手机，可离线收听
                </span>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="inline-flex items-center gap-1 text-xs text-ink/45 underline-offset-2 hover:underline"
                >
                  <Trash2 size={13} aria-hidden="true" />
                  清除
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 rounded-[0.5rem] bg-moss px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-moss/90"
                >
                  <Download size={16} aria-hidden="true" />
                  {status === "partial" ? `继续存到手机（已存 ${cached}/${total}）` : "存到手机（离线可听）"}
                </button>
                {status === "partial" ? (
                  <button
                    type="button"
                    onClick={handleRemove}
                    className="inline-flex items-center gap-1 text-xs text-ink/45 underline-offset-2 hover:underline"
                  >
                    <Trash2 size={13} aria-hidden="true" />
                    清除
                  </button>
                ) : null}
              </div>
            )}
            {progress && progress.failed > 0 && status !== "downloading" ? (
              <p className="mt-2 text-xs text-brass">
                有 {progress.failed} 段没存成功，联网后再点一次即可补齐。
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
