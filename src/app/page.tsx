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
            <p className="mt-1 text-xs text-ink/50">可离线收听</p>
          </div>
        </div>
      </section>

      <HomeProgress />

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
