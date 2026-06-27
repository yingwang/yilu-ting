import Link from "next/link";
import { Headphones, Map, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="px-5 pb-10 pt-8 sm:px-8">
      <section className="rounded-[0.5rem] border border-ink/10 bg-white/75 p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-moss">About</p>
        <h1 className="mt-3 text-3xl font-semibold text-ink">关于一路听</h1>
        <p className="mt-4 text-base leading-8 text-ink/70">
          一路听是一个面向欧洲旅行的中文语音导览 MVP。它是浏览器里的 PWA，不是原生 App；第一版使用本地景点数据，让你在手机 Safari 或桌面浏览器里浏览目的地、阅读自然导游词，并播放预先生成的音频。
        </p>
      </section>

      <section className="mt-5 space-y-4">
        <div className="rounded-[0.5rem] border border-ink/10 bg-white/65 p-5">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-moss/10 p-2 text-moss">
              <Headphones size={20} aria-hidden="true" />
            </span>
            <h2 className="font-semibold text-ink">音频来自编辑后的脚本</h2>
          </div>
          <p className="mt-3 text-sm leading-7 text-ink/65">
            这个 MVP 不做实时 AI 生成，也不在现场临时编内容。导览音频应该来自人工编辑过的中文脚本，再用 TTS 预先生成，避免旅行现场听到不稳定或乱说的内容。
          </p>
        </div>

        <div className="rounded-[0.5rem] border border-ink/10 bg-white/65 p-5">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-brass/15 p-2 text-brass">
              <Map size={20} aria-hidden="true" />
            </span>
            <h2 className="font-semibold text-ink">先不做复杂地图</h2>
          </div>
          <p className="mt-3 text-sm leading-7 text-ink/65">
            第一版只提供经纬度和 Google Maps 打开按钮。更完整的地图、离线包和音频合集都可以以后再加，先把内容、播放和进度体验做顺。
          </p>
        </div>

        <div className="rounded-[0.5rem] border border-ink/10 bg-white/65 p-5">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-wine/10 p-2 text-wine">
            <Sparkles size={20} aria-hidden="true" />
            </span>
            <h2 className="font-semibold text-ink">围绕欧洲城市与景点展开</h2>
          </div>
          <p className="mt-3 text-sm leading-7 text-ink/65">
            目前内置汉堡、阿尔萨斯、因特拉肯与伯尔尼高地、蒙特勒湖区和巴黎五个目的地，共 34 个导览点。内容重点是景点介绍、历史背景和现场观看感，不展示私人计划细节。
          </p>
        </div>
      </section>

      <Link
        href="/"
        className="mt-6 inline-flex w-full items-center justify-center rounded-[0.5rem] bg-ink px-4 py-3 text-sm font-semibold text-white"
      >
        回到首页
      </Link>
    </div>
  );
}
