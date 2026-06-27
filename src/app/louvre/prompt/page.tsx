import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const louvrePrompt = String.raw`你是一个中文旅行导游词作者。我要为一个中文语音导览网站生成内容。请参考下面这种风格：像真人导游在现场讲解。每个展区或展品要深入介绍，适合 3-4 分钟中文语音朗读。

输出必须是 JSON，不要 Markdown，不要代码块，不要解释。

JSON 格式如下：

{
  "destinations": {
    "louvre": ["段落1", "段落2", "段落3"]
  },
  "pois": {
    "louvre-denon-wing": ["段落1", "段落2", "段落3"],
    "louvre-mona-lisa": ["段落1", "段落2", "段落3"]
  }
}

内容要求：
1. 像真人导游在现场讲解，不要像百科词条。
2. 不要使用固定小标题，不要写“一、二、三”，不要写“以下是”。
3. 不要写天气、酒店、行程、路线安排、拍照打卡建议。
4. 不要写成短介绍。每个 key 至少 4 段，最好 5-7 段。
5. 每段 80-160 个中文字左右。
6. 语言自然，有现场感。可以说“大家现在看到的是……”“请先看……”“如果你站在这里……”，但不要每段都重复。
7. 内容要有深度：讲历史、空间、观看方式、艺术手法、收藏背景、文明意义。
8. 对热门作品，不只讲作品本身，也要讲它为什么变成现代游客共同观看的对象。
9. 对古代文物，不要只讲“神秘”，要讲王权、宗教、文字、墓葬、贸易、法律、身体观念等背景。
10. 对绘画，要讲构图、人物关系、光线、尺度、观看距离和历史语境。
11. 对雕塑，要讲姿态、材料、残缺、角度、光线和身体张力。
12. 位置和展出状态不要乱编。如果不确定房间号，不要写具体房间号，只说“以卢浮宫官方地图为准”。

参考资料请以卢浮宫官方资料为准：
- 官方地图 PDF：https://api-www.louvre.fr/sites/default/files/2026-05/2026-05_Plan_Louvre_EN.pdf
- 官方互动地图：https://collections.louvre.fr/en/plan
- 官方馆藏数据库：https://collections.louvre.fr/en/
- 官方 Masterpieces 精选：https://collections.louvre.fr/en/album/2

请先生成 Louvre 第一批内容。

目的地：
- louvre：卢浮宫整体介绍

展区：
- louvre-denon-wing：Denon 翼
- louvre-sully-wing：Sully 翼
- louvre-richelieu-wing：Richelieu 翼
- louvre-medieval-louvre：中世纪卢浮宫遗址
- louvre-galerie-apollon：阿波罗长廊
- louvre-napoleon-iii-apartments：拿破仑三世套房

展品：
- louvre-mona-lisa：蒙娜丽莎 / Mona Lisa
- louvre-winged-victory：萨莫色雷斯胜利女神 / Winged Victory of Samothrace
- louvre-venus-de-milo：米洛的维纳斯 / Venus de Milo
- louvre-wedding-at-cana：迦拿的婚礼 / The Wedding at Cana
- louvre-liberty-leading-the-people：自由引导人民 / Liberty Leading the People
- louvre-raft-of-the-medusa：美杜莎之筏 / The Raft of the Medusa
- louvre-code-of-hammurabi：汉谟拉比法典 / Code of Hammurabi
- louvre-seated-scribe：书记坐像 / The Seated Scribe
- louvre-sphinx-of-tanis：塔尼斯狮身人面像 / Great Sphinx of Tanis
- louvre-lacemaker：花边女工 / The Lacemaker

请只输出这一批 JSON。

如果一次太长，就只输出 destinations 和前 8 个 pois，下一次继续剩下的 pois。`;

export default function LouvrePromptPage() {
  return (
    <div className="px-5 pb-10 pt-6 sm:px-8">
      <Link
        href="/destinations/paris/louvre"
        className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-2 text-sm font-medium text-ink/65 ring-1 ring-ink/10"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        返回卢浮宫
      </Link>

      <section className="mt-5 rounded-[0.5rem] border border-ink/10 bg-white/75 p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-moss">Prompt</p>
        <h1 className="mt-3 text-3xl font-semibold text-ink">给 ChatGPT 的生成 Prompt</h1>
        <p className="mt-4 text-base leading-8 text-ink/70">
          这个版本使用和城市导游词相同的 destinations / pois JSON 格式。复制后让 ChatGPT 分批生成，再把 JSON 发回来导入。
        </p>
      </section>

      <pre className="mt-5 overflow-x-auto whitespace-pre-wrap rounded-[0.5rem] border border-ink/10 bg-ink p-5 text-sm leading-7 text-paper shadow-sm">
        {louvrePrompt}
      </pre>
    </div>
  );
}
