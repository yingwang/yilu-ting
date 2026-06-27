import Link from "next/link";
import { ArrowRight, Clock3, MapPin } from "lucide-react";
import type { Poi } from "@/data/types";
import { ProgressBadge } from "./ProgressBadge";

export function PoiCard({ poi }: { poi: Poi }) {
  return (
    <article className="rounded-[0.5rem] border border-ink/10 bg-white/75 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-mist px-2.5 py-1 text-xs font-medium text-ink/65">
              {poi.category}
            </span>
            <ProgressBadge poiId={poi.id} />
          </div>
          <h3 className="mt-3 text-lg font-semibold text-ink">{poi.title}</h3>
          <p className="mt-1 text-sm leading-6 text-ink/65">{poi.subtitle}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-3 text-xs text-ink/55">
        <span className="inline-flex items-center gap-1">
          <MapPin size={14} aria-hidden="true" />
          {poi.locationName}
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock3 size={14} aria-hidden="true" />
          {poi.recommendedVisitDuration}
        </span>
      </div>
      <Link
        href={`/pois/${poi.id}`}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-[0.5rem] bg-ink px-4 py-3 text-sm font-semibold text-white transition hover:bg-ink/90"
      >
        查看导览
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </article>
  );
}
