import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AudioGuidePlayer } from "@/components/AudioGuidePlayer";
import { LouvreInteractiveMap } from "@/components/LouvreInteractiveMap";
import { allLouvreGuidePois, louvreDestinationGuideCopy } from "@/data/louvreGuide";

export default function LouvrePage() {
  const introParagraphs = louvreDestinationGuideCopy.louvre ?? [];

  return (
    <div className="px-5 pb-10 pt-8 sm:px-8">
      <section className="rounded-[0.5rem] border border-ink/10 bg-white/75 p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-moss">Paris museum guide</p>
        <h1 className="mt-3 text-3xl font-semibold text-ink">卢浮宫导览</h1>
        <p className="mt-4 text-base leading-8 text-ink/70">
          从三翼、楼层和重点展品进入这座宫殿博物馆。可以先听整体介绍，再点地图上的展区或作品。
        </p>
      </section>

      {introParagraphs.length ? (
        <section className="mt-7 rounded-[0.5rem] border border-ink/10 bg-white/75 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss">
            Louvre intro
          </p>
          <h2 className="mt-2 text-xl font-semibold text-ink">卢浮宫整体介绍</h2>
          <div className="mt-4">
            <AudioGuidePlayer audioUrl="/audio/intro-louvre.mp3" title="卢浮宫整体介绍" />
          </div>
          <div className="mt-4 space-y-4">
            {introParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-9 text-ink/75">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ) : null}

      <div className="mt-7">
        <LouvreInteractiveMap basePath="/destinations/paris/louvre" />
      </div>

      <section className="mt-7">
        <h2 className="px-1 text-xl font-semibold text-ink">展区与展品解说</h2>
        <p className="mt-1 px-1 text-sm text-ink/55">
          选择一个展区或作品，打开文字和语音导览。
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {allLouvreGuidePois.map((item) => (
            <Link
              key={item.id}
              href={`/destinations/paris/louvre/items/${item.id}`}
              className="rounded-[0.5rem] border border-ink/10 bg-white/70 p-4 shadow-sm transition hover:bg-white"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-moss">
                    {item.kind} · {item.group}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-ink">{item.title}</h3>
                </div>
                <ArrowRight size={17} className="mt-1 text-ink/35" aria-hidden="true" />
              </div>
              <p className="mt-2 text-sm leading-6 text-ink/60">{item.subtitle}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-paper px-2.5 py-1 text-[0.7rem] text-ink/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
