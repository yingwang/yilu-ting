"use client";

import Link from "next/link";
import { Headphones, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { getLastPoiId } from "@/lib/progress";
import { getPoiById } from "@/data/pois";
import type { Poi } from "@/data/types";

export function HomeProgress() {
  const [lastPoi, setLastPoi] = useState<Poi | null>(null);

  useEffect(() => {
    const update = () => {
      const id = getLastPoiId();
      setLastPoi(id ? getPoiById(id) ?? null : null);
    };
    update();
    window.addEventListener("storage", update);
    window.addEventListener("yilu-ting-progress", update);
    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("yilu-ting-progress", update);
    };
  }, []);

  if (!lastPoi) {
    return null;
  }

  return (
    <Link
      href={`/pois/${lastPoi.id}`}
      className="mt-6 block rounded-[0.5rem] border border-brass/30 bg-white/75 p-4 shadow-sm"
    >
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-brass/20 p-2 text-brass">
          <RotateCcw size={20} aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-medium text-ink/50">继续听</p>
          <h2 className="mt-1 text-base font-semibold text-ink">{lastPoi.title}</h2>
          <p className="mt-1 inline-flex items-center gap-1 text-sm text-ink/60">
            <Headphones size={14} aria-hidden="true" />
            {lastPoi.destination} · {lastPoi.audioDuration}
          </p>
        </div>
      </div>
    </Link>
  );
}
