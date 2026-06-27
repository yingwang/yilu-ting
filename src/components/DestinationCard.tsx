import Link from "next/link";
import { ArrowRight, MapPinned } from "lucide-react";
import type { Destination } from "@/data/types";
import { getPoisByDestination } from "@/data/pois";

export function DestinationCard({ destination }: { destination: Destination }) {
  const count = getPoisByDestination(destination.slug).length;

  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className={`block rounded-[0.5rem] border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft ${destination.accent}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/45">
            {destination.region}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-normal text-ink">
            {destination.name}
          </h2>
        </div>
        <span className="rounded-full bg-white/70 p-2 text-moss">
          <MapPinned size={20} aria-hidden="true" />
        </span>
      </div>
      <p className="mt-4 text-sm leading-7 text-ink/70">{destination.intro}</p>
      <div className="mt-5 flex items-center justify-between text-sm text-ink/60">
        <span>{count} 个导览点</span>
        <span className="inline-flex items-center gap-1 font-medium text-moss">
          打开
          <ArrowRight size={15} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
