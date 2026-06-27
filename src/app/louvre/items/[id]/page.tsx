import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { AudioGuidePlayer } from "@/components/AudioGuidePlayer";
import { louvreOfficialSources } from "@/data/louvre";
import { getLouvreGuideCopy, getLouvreGuideItemById, louvreGuidePois } from "@/data/louvreGuide";

export function generateStaticParams() {
  return louvreGuidePois.map((item) => ({ id: item.id }));
}

export default async function LouvreGuideItemPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = getLouvreGuideItemById(id);
  if (!item) {
    notFound();
  }

  const guideParagraphs = getLouvreGuideCopy(item.id);
  if (!guideParagraphs?.length) {
    notFound();
  }

  return (
    <div className="px-5 pb-10 pt-6 sm:px-8">
      <Link
        href="/louvre"
        className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-2 text-sm font-medium text-ink/65 ring-1 ring-ink/10"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        返回卢浮宫
      </Link>

      <article className="mt-5 space-y-5">
        <header className="rounded-[0.5rem] border border-ink/10 bg-white/75 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss">
            {item.kind} · {item.group}
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-ink">{item.title}</h1>
          <p className="mt-3 text-base leading-7 text-ink/65">{item.subtitle}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-paper px-3 py-1 text-xs font-medium text-ink/55">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <AudioGuidePlayer audioUrl={`/audio/${item.id}.mp3`} title={item.title} />

        <section className="rounded-[0.5rem] border border-ink/10 bg-white/75 p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-ink">现场导览</h2>
          <div className="mt-4 space-y-4">
            {guideParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-9 text-ink/75">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section className="rounded-[0.5rem] border border-ink/10 bg-white/65 p-5">
          <h2 className="text-lg font-semibold text-ink">位置复核</h2>
          <p className="mt-2 text-sm leading-7 text-ink/60">
            卢浮宫展厅开放和展品位置会变化，现场以官方地图为准。
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {louvreOfficialSources.slice(0, 2).map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-between gap-3 rounded-[0.5rem] bg-white/75 px-3 py-2 text-sm font-medium text-ink/65 ring-1 ring-ink/10"
              >
                {source.label}
                <ExternalLink size={15} aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
