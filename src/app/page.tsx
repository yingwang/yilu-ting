import Link from "next/link";
import { ArrowRight, Map } from "lucide-react";
import { DestinationCard } from "@/components/DestinationCard";
import { HomeProgress } from "@/components/HomeProgress";
import { destinations, pois } from "@/data/pois";

export default function HomePage() {
  return (
    <div className="px-5 pb-10 pt-8 sm:px-8">
      <section className="rounded-[0.5rem] border border-ink/10 bg-white/70 p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-moss">Audio guide MVP</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-normal text-ink">一路听</h1>
        <p className="mt-3 text-lg leading-8 text-ink/65">你的中文旅行语音导览</p>
        <div className="mt-6 grid grid-cols-3 gap-3 rounded-[0.5rem] bg-paper p-3 text-center">
          <div>
            <p className="text-xl font-semibold text-ink">{destinations.length}</p>
            <p className="mt-1 text-xs text-ink/50">目的地</p>
          </div>
          <div>
            <p className="text-xl font-semibold text-ink">{pois.length}</p>
            <p className="mt-1 text-xs text-ink/50">导览点</p>
          </div>
          <div>
            <p className="text-xl font-semibold text-ink">PWA</p>
            <p className="mt-1 text-xs text-ink/50">浏览器使用</p>
          </div>
        </div>
      </section>

      <HomeProgress />

      <section className="mt-7 rounded-[0.5rem] border border-brass/25 bg-white/75 p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <span className="rounded-full bg-brass/15 p-2 text-brass">
            <Map size={20} aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brass">
              Museum guide lab
            </p>
            <h2 className="mt-2 text-xl font-semibold text-ink">卢浮宫导览地图</h2>
            <p className="mt-2 text-sm leading-7 text-ink/65">
              按 Denon、Sully、Richelieu 三翼组织地图、楼层、重点展品和 Top 100 内容结构。
            </p>
            <Link
              href="/louvre"
              className="mt-4 inline-flex items-center gap-2 rounded-[0.5rem] bg-ink px-4 py-2.5 text-sm font-semibold text-white"
            >
              打开卢浮宫模块
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-7">
        <div className="mb-4 flex items-end justify-between gap-4 px-1">
          <div>
            <h2 className="text-xl font-semibold text-ink">选择目的地</h2>
            <p className="mt-1 text-sm text-ink/55">先进入一个城市，再选择想听的景点导览。</p>
          </div>
        </div>
        <div className="space-y-4">
          {destinations.map((destination) => (
            <DestinationCard key={destination.slug} destination={destination} />
          ))}
        </div>
      </section>
    </div>
  );
}
