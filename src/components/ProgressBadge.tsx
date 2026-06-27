"use client";

import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { isPoiListened } from "@/lib/progress";

export function ProgressBadge({ poiId }: { poiId: string }) {
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

  if (!listened) {
    return null;
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-moss/10 px-2.5 py-1 text-xs font-medium text-moss">
      <Check size={13} aria-hidden="true" />
      已听
    </span>
  );
}
