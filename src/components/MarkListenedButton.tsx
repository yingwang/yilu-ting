"use client";

import { Check, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { isPoiListened, markPoiAsListened } from "@/lib/progress";

export function MarkListenedButton({ poiId }: { poiId: string }) {
  const [listened, setListened] = useState(false);

  useEffect(() => {
    const update = () => setListened(isPoiListened(poiId));
    update();
    window.addEventListener("storage", update);
    window.addEventListener("yilu-ting-progress", update);
    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("yilu-ting-progress", update);
    };
  }, [poiId]);

  return (
    <button
      type="button"
      onClick={() => {
        markPoiAsListened(poiId, !listened);
        setListened(!listened);
      }}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-[0.5rem] px-4 py-3 text-sm font-semibold transition ${
        listened ? "bg-white text-moss ring-1 ring-moss/25" : "bg-moss text-white hover:bg-moss/90"
      }`}
    >
      {listened ? <RotateCcw size={17} aria-hidden="true" /> : <Check size={17} aria-hidden="true" />}
      {listened ? "已听过，点此取消" : "标记为已听"}
    </button>
  );
}
