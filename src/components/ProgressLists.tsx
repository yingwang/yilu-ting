"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { destinations, pois } from "@/data/pois";
import { getListenedPoiIds } from "@/lib/progress";

export function ProgressLists() {
  const [listenedIds, setListenedIds] = useState<string[]>([]);

  useEffect(() => {
    const update = () => setListenedIds(getListenedPoiIds());
    update();
    window.addEventListener("storage", update);
    window.addEventListener("yilu-ting-progress", update);
    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("yilu-ting-progress", update);
    };
  }, []);

  const listened = useMemo(
    () => pois.filter((poi) => listenedIds.includes(poi.id)),
    [listenedIds]
  );

  return (
    <div className="space-y-6">
      <section className="rounded-[0.5rem] border border-ink/10 bg-white/75 p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-ink">已听导览</h2>
        {listened.length === 0 ? (
          <p className="mt-3 text-sm leading-7 text-ink/60">还没有标记听过的地点。打开任意导览，点一下 “Mark as listened”，这里就会开始记录。</p>
        ) : (
          <div className="mt-4 space-y-3">
            {listened.map((poi) => (
              <Link
                key={poi.id}
                href={`/pois/${poi.id}`}
                className="block rounded-[0.5rem] border border-moss/15 bg-moss/5 p-3"
              >
                <p className="font-medium text-ink">{poi.title}</p>
                <p className="mt-1 text-sm text-ink/55">{poi.destination} · {poi.audioDuration}</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="px-1 text-lg font-semibold text-ink">未听导览</h2>
        {destinations.map((destination) => {
          const remaining = pois.filter(
            (poi) => poi.destinationSlug === destination.slug && !listenedIds.includes(poi.id)
          );
          return (
            <div
              key={destination.slug}
              className="rounded-[0.5rem] border border-ink/10 bg-white/65 p-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-ink">{destination.name}</h3>
                <span className="text-xs text-ink/50">{remaining.length} 个未听</span>
              </div>
              {remaining.length === 0 ? (
                <p className="mt-3 text-sm text-moss">这一站都听完了。</p>
              ) : (
                <div className="mt-3 flex flex-wrap gap-2">
                  {remaining.map((poi) => (
                    <Link
                      key={poi.id}
                      href={`/pois/${poi.id}`}
                      className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-ink/65 ring-1 ring-ink/10"
                    >
                      {poi.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}
