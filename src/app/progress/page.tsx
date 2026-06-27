import { ProgressLists } from "@/components/ProgressLists";
import { pois } from "@/data/pois";

export default function ProgressPage() {
  return (
    <div className="px-5 pb-10 pt-8 sm:px-8">
      <section className="rounded-[0.5rem] border border-ink/10 bg-white/75 p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-moss">Progress</p>
        <h1 className="mt-3 text-3xl font-semibold text-ink">听过的地方</h1>
        <p className="mt-3 text-base leading-8 text-ink/65">
          进度只保存在当前浏览器的 localStorage 里，不需要登录，也不会上传到服务器。当前站点一共有 {pois.length} 个导览点。
        </p>
      </section>

      <div className="mt-6">
        <ProgressLists />
      </div>
    </div>
  );
}
