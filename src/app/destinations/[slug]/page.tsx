import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AudioGuidePlayer } from "@/components/AudioGuidePlayer";
import { PoiCard } from "@/components/PoiCard";
import { destinations, getDestinationBySlug, getPoisByDestination } from "@/data/pois";

export function generateStaticParams() {
  return destinations.map((destination) => ({ slug: destination.slug }));
}

export default async function DestinationPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) {
    notFound();
  }

  const destinationPois = getPoisByDestination(destination.slug);

  return (
    <div className="px-5 pb-10 pt-6 sm:px-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-2 text-sm font-medium text-ink/65 ring-1 ring-ink/10"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        返回首页
      </Link>

      <section className={`mt-5 rounded-[0.5rem] border p-6 shadow-sm ${destination.accent}`}>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/45">
          {destination.region}
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-ink">{destination.name}</h1>
        <p className="mt-4 text-base leading-8 text-ink/65">{destination.intro}</p>
        <p className="mt-5 text-sm text-ink/55">{destinationPois.length} 个导览点</p>
      </section>

      <section className="mt-6 space-y-4 rounded-[0.5rem] border border-ink/10 bg-white/75 p-5 shadow-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss">
            Destination intro
          </p>
          <h2 className="mt-2 text-xl font-semibold text-ink">城市介绍</h2>
          <p className="mt-2 text-sm leading-7 text-ink/60">
            先听这一站的整体气质，再进入下面的具体地点。
          </p>
        </div>

        <AudioGuidePlayer
          audioUrl={destination.guideAudioUrl}
          title={`${destination.name}介绍`}
          audioDuration={destination.guideAudioDuration}
        />

        <p className="whitespace-pre-line text-base leading-9 text-ink/75">
          {destination.guideScript}
        </p>
      </section>

      <div className="mt-7 px-1">
        <h2 className="text-xl font-semibold text-ink">导览点</h2>
        <p className="mt-1 text-sm text-ink/55">按旅程顺序听，每一站都可以单独打开。</p>
      </div>

      <section className="mt-6 space-y-4">
        {destinationPois.map((poi) => (
          <PoiCard key={poi.id} poi={poi} />
        ))}
      </section>
    </div>
  );
}
