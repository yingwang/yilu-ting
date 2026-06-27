import Link from "next/link";
import { ArrowRight, ExternalLink, Map, PlayCircle, Sparkles } from "lucide-react";
import { AudioGuidePlayer } from "@/components/AudioGuidePlayer";
import {
  louvreCurationChapters,
  louvreMapZones,
  louvreOfficialSources,
  louvreWings,
  louvreWorkSeeds
} from "@/data/louvre";
import { louvreDestinationGuideCopy, louvreGuidePois } from "@/data/louvreGuide";

const wingStyle = {
  denon: "border-wine/20 bg-wine/8",
  sully: "border-moss/20 bg-moss/8",
  richelieu: "border-brass/30 bg-brass/10"
};

const wingLabel = {
  denon: "Denon",
  sully: "Sully",
  richelieu: "Richelieu"
};

export default function LouvrePage() {
  const introParagraphs = louvreDestinationGuideCopy.louvre ?? [];

  return (
    <div className="px-5 pb-10 pt-8 sm:px-8">
      <section className="rounded-[0.5rem] border border-ink/10 bg-white/75 p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-moss">Museum guide lab</p>
        <h1 className="mt-3 text-3xl font-semibold text-ink">卢浮宫导览</h1>
        <p className="mt-4 text-base leading-8 text-ink/70">
          卢浮宫不适合做成普通景点列表。这里先按三翼、楼层和重点展品建立地图，再把 Top 100
          拆成十个内容章节。等解说文字生成后，每件作品可以接入独立音频。
        </p>
        <p className="mt-4 text-sm text-ink/55">
          已导入第一批 {louvreGuidePois.length} 个展区 / 展品解说。
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Link
            href="/louvre/prompt"
            className="inline-flex items-center justify-center gap-2 rounded-[0.5rem] bg-ink px-4 py-3 text-sm font-semibold text-white"
          >
            复制 ChatGPT 生成 Prompt
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <a
            href={louvreOfficialSources[0].href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-[0.5rem] bg-white px-4 py-3 text-sm font-semibold text-ink ring-1 ring-ink/10"
          >
            打开官方地图 PDF
            <ExternalLink size={17} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="mt-5 rounded-[0.5rem] border border-ink/10 bg-white/70 p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <span className="rounded-full bg-moss/10 p-2 text-moss">
            <PlayCircle size={20} aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-lg font-semibold text-ink">先做手动点播</h2>
            <p className="mt-2 text-sm leading-7 text-ink/65">
              这一版不做自动播放。用户在地图里看三翼、楼层和重点作品，进入对应作品后手动点播放。
              这样更稳，也避免手机浏览器拦截自动音频、室内定位不准和误触发的问题。
            </p>
          </div>
        </div>
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

      <section className="mt-7">
        <h2 className="px-1 text-xl font-semibold text-ink">第一批解说</h2>
        <p className="mt-1 px-1 text-sm text-ink/55">
          当前先手动点播，不做自动播放。后续可以继续导入第二批、第三批展品。
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {louvreGuidePois.map((item) => (
            <Link
              key={item.id}
              href={`/louvre/items/${item.id}`}
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
                  <span key={tag} className="rounded-full bg-paper px-2.5 py-1 text-[0.7rem] text-ink/50">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-7">
        <div className="mb-4 flex items-center gap-2 px-1">
          <Map size={20} className="text-moss" aria-hidden="true" />
          <h2 className="text-xl font-semibold text-ink">简化导览地图</h2>
        </div>

        <div className="space-y-4">
          {louvreMapZones.map((zone) => (
            <article
              key={`${zone.wing}-${zone.level}-${zone.roomRange}`}
              className={`rounded-[0.5rem] border p-5 shadow-sm ${wingStyle[zone.wing]}`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/75 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink/55">
                  {wingLabel[zone.wing]} · {zone.level}
                </span>
                <span className="rounded-full bg-white/55 px-3 py-1 text-xs text-ink/50">
                  Rooms {zone.roomRange}
                </span>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-ink">{zone.title}</h3>
              <p className="mt-2 text-sm leading-7 text-ink/65">{zone.focus}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {zone.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-ink/60 ring-1 ring-ink/5"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-7">
        <h2 className="px-1 text-xl font-semibold text-ink">三翼怎么讲</h2>
        <div className="mt-4 grid gap-4">
          {louvreWings.map((wing) => (
            <article key={wing.id} className={`rounded-[0.5rem] border p-5 ${wingStyle[wing.id]}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">{wing.name}</p>
              <h3 className="mt-2 text-lg font-semibold text-ink">{wing.title}</h3>
              <p className="mt-2 text-sm leading-7 text-ink/65">{wing.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-7">
        <div className="mb-4 flex items-center gap-2 px-1">
          <Sparkles size={20} className="text-brass" aria-hidden="true" />
          <h2 className="text-xl font-semibold text-ink">Top 100 内容结构</h2>
        </div>
        <div className="grid gap-4">
          {louvreCurationChapters.map((chapter, index) => (
            <article key={chapter.id} className="rounded-[0.5rem] border border-ink/10 bg-white/70 p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-moss">
                    Chapter {String(index + 1).padStart(2, "0")} · {chapter.targetCount} 件
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-ink">{chapter.title}</h3>
                  <p className="mt-1 text-sm text-ink/55">{chapter.subtitle}</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-7 text-ink/65">{chapter.angle}</p>
              <p className="mt-3 text-xs leading-6 text-ink/45">
                种子作品：{chapter.seedWorks.join("、")}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-7 rounded-[0.5rem] border border-ink/10 bg-white/75 p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-ink">首批作品种子</h2>
        <p className="mt-2 text-sm leading-7 text-ink/60">
          这些不是最终 Top 100，只是用官方精选和地图先确定的核心样本。完整内容应由 prompt 生成 JSON 后再导入。
        </p>
        <div className="mt-4 space-y-3">
          {louvreWorkSeeds.map((work) => (
            <div key={work.id} className="rounded-[0.5rem] bg-paper/80 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-ink">{work.titleZh}</h3>
                <span className="text-xs text-ink/45">{work.titleOriginal}</span>
              </div>
              <p className="mt-2 text-xs leading-6 text-ink/55">
                {[work.artistOrCulture, work.dateLabel, work.wing ? wingLabel[work.wing] : undefined, work.level]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {work.themes.map((theme) => (
                  <span key={theme} className="rounded-full bg-white/70 px-2.5 py-1 text-[0.7rem] text-ink/55">
                    {theme}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-7 rounded-[0.5rem] border border-ink/10 bg-white/65 p-5">
        <h2 className="text-lg font-semibold text-ink">资料源</h2>
        <div className="mt-3 grid gap-2">
          {louvreOfficialSources.map((source) => (
            <a
              key={source.href}
              href={source.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-between gap-3 rounded-[0.5rem] bg-white/70 px-3 py-2 text-sm text-ink/65 ring-1 ring-ink/10"
            >
              {source.label}
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
