import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
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

      <section className="mt-6 space-y-4">
        {destinationPois.map((poi) => (
          <PoiCard key={poi.id} poi={poi} />
        ))}
      </section>
    </div>
  );
}
