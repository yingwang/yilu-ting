// 单件作品讲解。挂在某个 POI 下面，在 POI 详情页里以「作品讲解」卡片形式内联展示，
// 每件作品配一段独立脚本和一段独立音频（/audio/${id}.mp3）。
// 音频由 scripts/generate-audio.mjs 读取本文件的 id 与 script 字段生成。
// 卢浮宫用的是独立子页 + 互动地图那一套（louvreGuide.ts），适合几十件展品；
// 这里针对单馆少量核心作品，内联在 POI 页里更适合站在画前逐幅播放。

export type PoiWork = {
  poiId: string;
  id: string;
  title: string;
  titleOriginal?: string;
  artist: string;
  dateLabel: string;
  subtitle: string;
  script: string;
  tags: string[];
};

export const poiWorks: PoiWork[] = [
  {
    poiId: "paris-marmottan-monet",
    id: "paris-marmottan-impression-sunrise",
    title: "《日出·印象》",
    titleOriginal: "Impression, soleil levant",
    artist: "克劳德·莫奈",
    dateLabel: "1872 年",
    subtitle: "印象派得名的那一幅画",
    script:
      "这幅画尺幅并不大，画的是莫奈家乡勒阿弗尔港口的清晨。天色还没有完全亮开，一轮橙红色的太阳低悬在水汽里，海面上是几道松散的橙色反光，远处的吊车、桅杆和烟囱只用淡淡的灰影带过。一八七四年，一群被官方沙龙拒之门外的画家，在摄影师纳达尔从前的工作室里办了第一次独立展览，莫奈给这幅画起的名字就叫日出印象。批评家路易·勒鲁瓦借着这个题目写了一篇讥讽的评论，顺口把他们称作印象派，谁也没想到这个原本带着嘲弄的词，后来成了整场运动的正式名称。所以你此刻看到的，不只是一片港口的晨光，而是一个画派得名的那一刻。不妨走近一点看，那团太阳的亮度其实和周围的灰蓝相差无几，正是这种处理，才让它在雾气里显得微微跳动。",
    tags: ["莫奈", "印象派", "镇馆之作"]
  },
  {
    poiId: "paris-marmottan-monet",
    id: "paris-marmottan-water-lilies",
    title: "睡莲（晚期吉维尼系列）",
    titleOriginal: "Nymphéas",
    artist: "克劳德·莫奈",
    dateLabel: "约 1897–1920 年代",
    subtitle: "没有地平线的一整片水面",
    script:
      "莫奈晚年在吉维尼为自己挖了一座水园，种上睡莲，架起日本式的小桥，此后二十多年，他画得最多的就是这一池水面。你会发现这些画里往往没有地平线，也没有单独的天空，天光和云影只作为倒影落在水上，画面于是变成一整片漂浮的色块。花、水、倒影之间的界线被他有意抹去，越到后期越是如此。马摩丹这里集中收藏了大量这样的晚期作品，有的尺幅很大。看的时候不要急着去找具体的花，先让眼睛跟着颜色在水面上走一圈，你会慢慢明白，他画的其实不是睡莲这种植物，而是光在水面上不断变化的那个过程。",
    tags: ["莫奈", "睡莲", "吉维尼"]
  },
  {
    poiId: "paris-marmottan-monet",
    id: "paris-marmottan-japanese-bridge",
    title: "《日本桥》",
    titleOriginal: "Le Pont japonais",
    artist: "克劳德·莫奈",
    dateLabel: "约 1918–1924 年",
    subtitle: "白内障岁月里几乎烧起来的一座桥",
    script:
      "这座横跨睡莲池的日本式拱桥，莫奈前后画了许多遍。早年的版本是清透的绿色，桥的弧线和垂下的柳枝都还看得很清楚，安静而工整。可是到了晚年，也就是他白内障最严重的那几年，同一座桥被画成了完全不同的样子：颜料厚厚地堆在画布上，红色和橙色几乎要烧起来，桥的形状快要溶进一片纠缠的笔触里，你要盯上一会儿才认得出它。白内障改变了他看到的颜色，让他眼中的世界偏向暖调，这一批近乎抽象的日本桥，正是那段视力衰退岁月的直接记录。站近一点看，你能清楚看到颜料被一层层压上去的痕迹。",
    tags: ["莫奈", "晚期", "近抽象"]
  },
  {
    poiId: "paris-marmottan-monet",
    id: "paris-marmottan-weeping-willow",
    title: "《垂柳》",
    titleOriginal: "Saule pleureur",
    artist: "克劳德·莫奈",
    dateLabel: "1918–1919 年",
    subtitle: "画在一战末尾的哀悼",
    script:
      "这几幅垂柳画在第一次世界大战即将结束的一九一八到一九一九年间。垂柳在很多文化里都是哀悼的形象，莫奈选它并非偶然：那几年法国在战争里失去了整整一代年轻人，他自己也在承受着丧亲与衰老。和睡莲那种平静舒展不同，这些柳树的笔触急促、纠结，颜色压得很暗，垂下的枝条像被风搅动，透着一股说不出的悲怆。值得一提的是，就在画这些垂柳的同时，他正在构思后来捐给国家、陈列在橘园美术馆的那组巨幅睡莲，把它当作献给和平的纪念。同一双手，一边画哀伤，一边画抚慰，这批垂柳因此显得格外沉。",
    tags: ["莫奈", "一战", "垂柳"]
  },
  {
    poiId: "paris-marmottan-monet",
    id: "paris-marmottan-wisteria",
    title: "《紫藤》",
    titleOriginal: "Les Glycines",
    artist: "克劳德·莫奈",
    dateLabel: "约 1919–1920 年",
    subtitle: "离抽象只差一步的装饰长卷",
    script:
      "这一组紫藤是横向展开的长条形画面，莫奈原本设想把它们当作装饰性的饰带，挂在巨幅睡莲壁画的上方，像一道垂落的花檐。画面里几乎不再有具体的枝干和叶片，只剩一串串下垂的花，在浅色的底子上化成一道道摆动的色带，离抽象只有一步之遥。看这几幅，可以体会晚年的莫奈正朝着两个方向同时走：一是把绘画推向纯粹的装饰与色彩，二是让形状不断松开、溶解。它们不像早期作品那样去描摹一个具体的场景，而更像是把一种颜色的节奏铺满整面墙。",
    tags: ["莫奈", "紫藤", "装饰"]
  },
  {
    poiId: "paris-marmottan-monet",
    id: "paris-marmottan-morisot",
    title: "贝尔特·莫里索",
    titleOriginal: "Berthe Morisot",
    artist: "贝尔特·莫里索",
    dateLabel: "1841–1895",
    subtitle: "全世界最大的莫里索收藏",
    script:
      "很多人不知道，马摩丹还藏有全世界最多的贝尔特·莫里索作品。莫里索是印象派最核心的成员之一，从一八七四年第一次展览起就在其中，而且是当时极少数的女性画家。她嫁给了爱德华·马奈的弟弟欧仁·马奈，一生画的多是室内、女性、孩子和花园这些看似寻常的日常场景，笔触轻快、松动，常常带着一种没有画完的鲜活感。站在她的画前，你会意识到印象派从来不是一个只属于男人的运动。看的时候可以特别留意她处理衣裙和背景的手法，那些看起来随意、未完成的笔触，其实是很难拿捏的分寸。",
    tags: ["莫里索", "印象派", "女性画家"]
  }
];

export function getPoiWorks(poiId: string) {
  return poiWorks.filter((work) => work.poiId === poiId);
}
