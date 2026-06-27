import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, MapPin } from "lucide-react";
import { AudioGuidePlayer } from "@/components/AudioGuidePlayer";
import { MarkListenedButton } from "@/components/MarkListenedButton";
import { TagPill } from "@/components/TagPill";
import {
  getDestinationBySlug,
  getNextPoi,
  getPoiById,
  getPreviousPoi,
  pois
} from "@/data/pois";
import { getPoiGuideCopy } from "@/data/spotGuide";

export function generateStaticParams() {
  return pois.map((poi) => ({ id: poi.id }));
}

export default async function PoiDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const poi = getPoiById(id);
  if (!poi) {
    notFound();
  }

  const destination = getDestinationBySlug(poi.destinationSlug);
  const previousPoi = getPreviousPoi(poi.id);
  const nextPoi = getNextPoi(poi.id);
  const guideCopy = getPoiGuideCopy(poi.id);
  const guideParagraphs = guideCopy?.length ? guideCopy : [poi.script];
  // A real map view can replace this Google Maps deep link later without changing POI data.
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${poi.latitude},${poi.longitude}`;

  return (
    <div className="px-5 pb-10 pt-6 sm:px-8">
      <Link
        href={destination ? `/destinations/${destination.slug}` : "/"}
        className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-2 text-sm font-medium text-ink/65 ring-1 ring-ink/10"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        返回{destination?.name ?? "首页"}
      </Link>

      <article className="mt-5 space-y-5">
        <header className="rounded-[0.5rem] border border-ink/10 bg-white/75 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss">
            {poi.destination} · {poi.region}
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-ink">{poi.title}</h1>
          <p className="mt-3 text-base leading-7 text-ink/65">{poi.subtitle}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {poi.tags.map((tag) => (
              <TagPill key={tag} label={tag} />
            ))}
          </div>

          <div className="mt-5 grid gap-3 text-sm text-ink/60 sm:grid-cols-2">
            <div className="inline-flex items-center gap-2 rounded-[0.5rem] bg-paper px-3 py-2">
              <MapPin size={17} aria-hidden="true" />
              {poi.locationName}
            </div>
          </div>
        </header>

        <AudioGuidePlayer
          audioUrl={poi.audioUrl}
          title={poi.title}
        />

        <section className="rounded-[0.5rem] border border-ink/10 bg-white/75 p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-ink">现场导览</h2>
          <div className="mt-4 space-y-4">
            {guideParagraphs.map((paragraph) => (
              <p key={paragraph} className="whitespace-pre-line text-base leading-9 text-ink/75">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <div className="grid gap-3 sm:grid-cols-2">
          <MarkListenedButton poiId={poi.id} />
          {/* Future Stripe gating belongs around paid audio/offline packs; the MVP keeps every guide free. */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-[0.5rem] bg-white px-4 py-3 text-sm font-semibold text-ink ring-1 ring-ink/10 transition hover:bg-white/80"
          >
            在 Google Maps 中打开
            <ExternalLink size={17} aria-hidden="true" />
          </a>
        </div>

        <nav className="grid gap-3 sm:grid-cols-2">
          {previousPoi ? (
            <Link
              href={`/pois/${previousPoi.id}`}
              className="rounded-[0.5rem] border border-ink/10 bg-white/65 p-4"
            >
              <p className="inline-flex items-center gap-1 text-xs font-medium text-ink/45">
                <ArrowLeft size={14} aria-hidden="true" />
                上一个导览
              </p>
              <p className="mt-2 font-semibold text-ink">{previousPoi.title}</p>
            </Link>
          ) : (
            <div />
          )}
          {nextPoi ? (
            <Link
              href={`/pois/${nextPoi.id}`}
              className="rounded-[0.5rem] border border-ink/10 bg-white/65 p-4 text-right"
            >
              <p className="inline-flex items-center gap-1 text-xs font-medium text-ink/45">
                下一个导览
                <ArrowRight size={14} aria-hidden="true" />
              </p>
              <p className="mt-2 font-semibold text-ink">{nextPoi.title}</p>
            </Link>
          ) : null}
        </nav>
      </article>
    </div>
  );
}
