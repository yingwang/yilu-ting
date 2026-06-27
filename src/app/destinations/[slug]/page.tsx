import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Map } from "lucide-react";
import { AudioGuidePlayer } from "@/components/AudioGuidePlayer";
import { PoiCard } from "@/components/PoiCard";
import { destinations, getDestinationBySlug, getPoisByDestination } from "@/data/pois";
import { getDestinationGuideCopy } from "@/data/spotGuide";

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
  const guideCopy = getDestinationGuideCopy(destination.slug);
  const guideParagraphs = guideCopy?.length ? guideCopy : [destination.guideScript];

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
          <h2 className="mt-2 text-xl font-semibold text-ink">导览讲解</h2>
          <p className="mt-2 text-sm leading-7 text-ink/60">
            像导游开场一样，先把这一站的气质和观看重点讲清楚。
          </p>
        </div>

        <AudioGuidePlayer
          audioUrl={destination.guideAudioUrl}
          title={`${destination.name}介绍`}
        />

        <div className="space-y-4">
          {guideParagraphs.map((paragraph) => (
            <p key={paragraph} className="whitespace-pre-line text-base leading-9 text-ink/75">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {destination.slug === "paris" ? (
        <section className="mt-6 rounded-[0.5rem] border border-brass/25 bg-white/75 p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="rounded-full bg-brass/15 p-2 text-brass">
              <Map size={20} aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brass">
                Paris museum guide
              </p>
              <h2 className="mt-2 text-xl font-semibold text-ink">卢浮宫专题导览</h2>
              <p className="mt-2 text-sm leading-7 text-ink/65">
                放在巴黎下面的馆内专题：包含三翼示意地图、重点展品圆点和已生成的中文语音解说。
              </p>
              <Link
                href="/destinations/paris/louvre"
                className="mt-4 inline-flex items-center gap-2 rounded-[0.5rem] bg-ink px-4 py-2.5 text-sm font-semibold text-white"
              >
                打开卢浮宫地图
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <div className="mt-7 px-1">
        <h2 className="text-xl font-semibold text-ink">继续听景点</h2>
        <p className="mt-1 text-sm text-ink/55">每一处都可以单独打开，当成一段现场导游词来读或听。</p>
      </div>

      <section className="mt-6 space-y-4">
        {destinationPois.map((poi) => (
          <PoiCard key={poi.id} poi={poi} />
        ))}
      </section>
    </div>
  );
}
