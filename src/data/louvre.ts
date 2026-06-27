export type LouvreWingId = "denon" | "sully" | "richelieu";

export type LouvrePriority = "must-see" | "important" | "deep-cut";

export type LouvreMapZone = {
  wing: LouvreWingId;
  level: string;
  roomRange: string;
  title: string;
  focus: string;
  highlights: string[];
};

export type LouvreCurationChapter = {
  id: string;
  title: string;
  subtitle: string;
  targetCount: number;
  seedWorks: string[];
  angle: string;
};

export type LouvreWorkSeed = {
  id: string;
  titleZh: string;
  titleOriginal: string;
  artistOrCulture?: string;
  dateLabel?: string;
  wing?: LouvreWingId;
  level?: string;
  roomHint?: string;
  priority: LouvrePriority;
  themes: string[];
};

export type LouvreMapPin = {
  id: string;
  itemId: string;
  label: string;
  shortLabel: string;
  wing: LouvreWingId;
  level: string;
  roomHint?: string;
  x: number;
  y: number;
};

export const louvreOfficialSources = [
  {
    label: "卢浮宫官方地图 PDF",
    href: "https://api-www.louvre.fr/sites/default/files/2026-05/2026-05_Plan_Louvre_EN.pdf"
  },
  {
    label: "卢浮宫互动地图",
    href: "https://collections.louvre.fr/en/plan"
  },
  {
    label: "卢浮宫馆藏数据库",
    href: "https://collections.louvre.fr/en/"
  },
  {
    label: "官方 Masterpieces 精选",
    href: "https://collections.louvre.fr/en/album/2"
  }
] as const;

export const louvreWings = [
  {
    id: "denon" as const,
    name: "Denon 翼",
    title: "明星作品与戏剧性空间",
    description:
      "Denon 是第一次进卢浮宫最容易被记住的一翼：胜利女神、蒙娜丽莎、意大利绘画、法国大画幅历史画和阿波罗长廊，都在这里形成强烈的观看高潮。"
  },
  {
    id: "sully" as const,
    name: "Sully 翼",
    title: "古代文明与卢浮宫的根",
    description:
      "Sully 更适合解释卢浮宫的底层结构：中世纪城堡遗址、古埃及、古希腊，以及维纳斯所在的古典雕塑空间，会把参观从巴黎带回更长的文明时间。"
  },
  {
    id: "richelieu" as const,
    name: "Richelieu 翼",
    title: "宫殿生活、雕塑和北方绘画",
    description:
      "Richelieu 的重点不是单一爆款，而是宫殿生活和收藏趣味：法国雕塑庭院、拿破仑三世套房、欧洲装饰艺术和北方绘画，让卢浮宫更像一座被打开的宫殿。"
  }
];

export const louvreMapZones: LouvreMapZone[] = [
  {
    wing: "denon",
    level: "Level 1",
    roomRange: "700–734",
    title: "意大利绘画、法国大画幅与阿波罗长廊",
    focus: "卢浮宫最密集的明星区，适合讲文艺复兴、政治绘画和博物馆现场感。",
    highlights: ["蒙娜丽莎", "迦拿的婚礼", "萨莫色雷斯胜利女神", "自由引导人民", "美杜莎之筏", "阿波罗长廊"]
  },
  {
    wing: "denon",
    level: "Level 0 / -1",
    roomRange: "400–433 / 160–187",
    title: "欧洲雕塑、早期希腊与伊斯兰艺术",
    focus: "从身体、材料和宗教装饰切入，解释石雕、古物和建筑碎片如何改变观看尺度。",
    highlights: ["米开朗基罗《垂死的奴隶》", "Gallery of Five Continents", "古希腊早期作品", "伊斯兰艺术空间"]
  },
  {
    wing: "sully",
    level: "Level 0 / 1",
    roomRange: "300–348 / 600–663",
    title: "古埃及、古希腊与维纳斯",
    focus: "适合讲文明时间、神像、身体理想，以及博物馆如何把古代世界放在一条轴线上。",
    highlights: ["米洛的维纳斯", "塔尼斯狮身人面像", "书记坐像", "埃及棺木", "古希腊陶器"]
  },
  {
    wing: "sully",
    level: "Level -1 / 2",
    roomRange: "900–952 / 130–137",
    title: "中世纪卢浮宫与法国绘画",
    focus: "从王宫地基进入博物馆历史，再到法国绘画传统，建立卢浮宫从堡垒到国家博物馆的线索。",
    highlights: ["中世纪卢浮宫", "法国绘画", "夏尔十世博物馆空间"]
  },
  {
    wing: "richelieu",
    level: "Level 0 / -1",
    roomRange: "100–106 / 200–236",
    title: "法国雕塑与近东文明",
    focus: "一边是法国雕塑庭院的光线和人体，一边是两河流域、波斯和黎凡特的文字、王权与宫殿。",
    highlights: ["马利骏马", "法国雕塑庭院", "汉谟拉比法典", "萨尔贡二世宫殿浮雕", "大流士宫殿"]
  },
  {
    wing: "richelieu",
    level: "Level 1 / 2",
    roomRange: "500–564 / 800–864",
    title: "装饰艺术、拿破仑三世套房与北方绘画",
    focus: "把卢浮宫从“看名画”的地方，转成“理解宫殿生活、工艺和收藏”的地方。",
    highlights: ["拿破仑三世套房", "欧洲装饰艺术", "维米尔《花边女工》", "北方绘画", "法国早期绘画"]
  }
];

export const louvreMapPins: LouvreMapPin[] = [
  {
    id: "pin-medieval-louvre",
    itemId: "louvre-medieval-louvre",
    label: "中世纪卢浮宫遗址",
    shortLabel: "遗址",
    wing: "sully",
    level: "Level -1",
    roomHint: "Sully 地下层",
    x: 218,
    y: 118
  },
  {
    id: "pin-winged-victory",
    itemId: "louvre-winged-victory",
    label: "萨莫色雷斯胜利女神",
    shortLabel: "胜利女神",
    wing: "denon",
    level: "Level 1",
    roomHint: "Daru 楼梯",
    x: 142,
    y: 164
  },
  {
    id: "pin-mona-lisa",
    itemId: "louvre-mona-lisa",
    label: "蒙娜丽莎",
    shortLabel: "蒙娜丽莎",
    wing: "denon",
    level: "Level 1",
    roomHint: "Salle des États",
    x: 180,
    y: 166
  },
  {
    id: "pin-wedding-at-cana",
    itemId: "louvre-wedding-at-cana",
    label: "迦拿的婚礼",
    shortLabel: "迦拿",
    wing: "denon",
    level: "Level 1",
    roomHint: "Salle des États",
    x: 200,
    y: 154
  },
  {
    id: "pin-liberty",
    itemId: "louvre-liberty-leading-the-people",
    label: "自由引导人民",
    shortLabel: "自由",
    wing: "denon",
    level: "Level 1",
    roomHint: "法国十九世纪绘画区",
    x: 104,
    y: 170
  },
  {
    id: "pin-raft",
    itemId: "louvre-raft-of-the-medusa",
    label: "美杜莎之筏",
    shortLabel: "美杜莎",
    wing: "denon",
    level: "Level 1",
    roomHint: "法国十九世纪绘画区",
    x: 78,
    y: 168
  },
  {
    id: "pin-apollon",
    itemId: "louvre-galerie-apollon",
    label: "阿波罗长廊",
    shortLabel: "阿波罗",
    wing: "denon",
    level: "Level 1",
    roomHint: "Denon / Sully 连接区域",
    x: 226,
    y: 140
  },
  {
    id: "pin-venus",
    itemId: "louvre-venus-de-milo",
    label: "米洛的维纳斯",
    shortLabel: "维纳斯",
    wing: "sully",
    level: "Level 0",
    roomHint: "古希腊雕塑区",
    x: 270,
    y: 144
  },
  {
    id: "pin-scribe",
    itemId: "louvre-seated-scribe",
    label: "书记坐像",
    shortLabel: "书记",
    wing: "sully",
    level: "Level 1",
    roomHint: "古埃及展区",
    x: 292,
    y: 112
  },
  {
    id: "pin-sphinx",
    itemId: "louvre-sphinx-of-tanis",
    label: "塔尼斯狮身人面像",
    shortLabel: "狮身",
    wing: "sully",
    level: "Level 0",
    roomHint: "古埃及展区",
    x: 292,
    y: 136
  },
  {
    id: "pin-hammurabi",
    itemId: "louvre-code-of-hammurabi",
    label: "汉谟拉比法典",
    shortLabel: "法典",
    wing: "richelieu",
    level: "Level 0",
    roomHint: "近东文明展区",
    x: 92,
    y: 98
  },
  {
    id: "pin-napoleon-iii",
    itemId: "louvre-napoleon-iii-apartments",
    label: "拿破仑三世套房",
    shortLabel: "套房",
    wing: "richelieu",
    level: "Level 1",
    roomHint: "Richelieu 宫殿空间",
    x: 218,
    y: 70
  },
  {
    id: "pin-lacemaker",
    itemId: "louvre-lacemaker",
    label: "花边女工",
    shortLabel: "花边",
    wing: "richelieu",
    level: "Level 2",
    roomHint: "北方绘画区",
    x: 154,
    y: 66
  }
];

export const louvreCurationChapters: LouvreCurationChapter[] = [
  {
    id: "palace",
    title: "卢浮宫本身",
    subtitle: "从城堡、王宫到现代博物馆",
    targetCount: 8,
    seedWorks: ["玻璃金字塔", "中世纪卢浮宫", "阿波罗长廊", "拿破仑庭院"],
    angle: "先讲空间。让用户明白自己不是走进普通美术馆，而是走进一座被改造成博物馆的权力建筑。"
  },
  {
    id: "three-icons",
    title: "三大明星",
    subtitle: "蒙娜丽莎、胜利女神、维纳斯",
    targetCount: 6,
    seedWorks: ["蒙娜丽莎", "萨莫色雷斯胜利女神", "米洛的维纳斯"],
    angle: "不只讲作品本身，也讲为什么它们变成现代游客共同追逐的图像。"
  },
  {
    id: "italian-renaissance",
    title: "意大利文艺复兴",
    subtitle: "透视、人体、宗教与肖像",
    targetCount: 12,
    seedWorks: ["蒙娜丽莎", "迦拿的婚礼", "圣母加冕", "提香《镜前女子》"],
    angle: "把达芬奇、拉斐尔、提香、委罗内塞放在一个视觉训练系统里讲。"
  },
  {
    id: "french-history-painting",
    title: "法国大画幅历史画",
    subtitle: "革命、帝国、灾难和政治想象",
    targetCount: 12,
    seedWorks: ["自由引导人民", "美杜莎之筏", "萨宾妇女", "大宫女"],
    angle: "重点不是画很大，而是这些画如何把国家、身体、新闻事件和政治激情变成图像。"
  },
  {
    id: "egypt",
    title: "古埃及",
    subtitle: "神像、墓葬、文字和日常器物",
    targetCount: 10,
    seedWorks: ["塔尼斯狮身人面像", "书记坐像", "奥索尔孔三神像", "埃及棺木"],
    angle: "避免只讲神秘感，要讲秩序、来世、书写和物件如何服务于永恒。"
  },
  {
    id: "greek-roman",
    title: "古希腊与罗马",
    subtitle: "身体理想、神话和公共雕塑",
    targetCount: 10,
    seedWorks: ["米洛的维纳斯", "萨莫色雷斯胜利女神", "夫妻石棺", "基克拉迪偶像"],
    angle: "把身体、姿态、残缺和复制传统讲清楚。"
  },
  {
    id: "near-east",
    title: "近东文明",
    subtitle: "法律、王权、宫殿和文字",
    targetCount: 10,
    seedWorks: ["汉谟拉比法典", "射手浮雕", "大流士宫殿", "埃比伊尔雕像"],
    angle: "这里最适合提高内容深度：不要把古物讲成摆件，要讲成国家机器和文字秩序。"
  },
  {
    id: "sculpture",
    title: "雕塑",
    subtitle: "石头、肌肉、姿态与光线",
    targetCount: 10,
    seedWorks: ["垂死的奴隶", "反叛的奴隶", "马利骏马", "玛德琳娜"],
    angle: "用现场观看语言讲雕塑：从哪个角度看、光怎样落、身体为什么有张力。"
  },
  {
    id: "royal-decorative",
    title: "王室与装饰艺术",
    subtitle: "珠宝、家具、套房和宫廷生活",
    targetCount: 10,
    seedWorks: ["拿破仑三世套房", "摄政王钻石", "路易十四珠宝箱", "圣母子圣物匣"],
    angle: "把工艺和权力联系起来：材料越珍贵，越是在组织身份和等级。"
  },
  {
    id: "quiet-masterpieces",
    title: "安静但高级的作品",
    subtitle: "小尺幅、北方绘画和细节观看",
    targetCount: 12,
    seedWorks: ["花边女工", "方块 A 作弊者", "丢勒自画像", "蓬帕杜夫人肖像"],
    angle: "给第二次看卢浮宫的人准备。不是每件作品都靠巨大尺度取胜，有些作品靠安静和细节。"
  }
];

export const louvreWorkSeeds: LouvreWorkSeed[] = [
  {
    id: "mona-lisa",
    titleZh: "蒙娜丽莎",
    titleOriginal: "Portrait de Lisa Gherardini, dite La Joconde ou Monna Lisa",
    artistOrCulture: "Leonardo da Vinci",
    dateLabel: "1503–1519",
    wing: "denon",
    level: "Level 1",
    roomHint: "Salle des États / room 711 on the official map",
    priority: "must-see",
    themes: ["肖像", "文艺复兴", "观看现场"]
  },
  {
    id: "winged-victory",
    titleZh: "萨莫色雷斯胜利女神",
    titleOriginal: "Victoire de Samothrace",
    dateLabel: "c. 200–175 BC",
    wing: "denon",
    level: "Level 1",
    roomHint: "Daru staircase / room 703 on the official map",
    priority: "must-see",
    themes: ["古希腊", "雕塑", "空间"]
  },
  {
    id: "venus-de-milo",
    titleZh: "米洛的维纳斯",
    titleOriginal: "Vénus de Milo",
    dateLabel: "c. 150–125 BC",
    wing: "sully",
    level: "Level 0",
    roomHint: "room 345 on the official map",
    priority: "must-see",
    themes: ["古希腊", "人体理想", "残缺"]
  },
  {
    id: "wedding-at-cana",
    titleZh: "迦拿的婚礼",
    titleOriginal: "Les Noces de Cana",
    artistOrCulture: "Paolo Veronese",
    dateLabel: "16th century",
    wing: "denon",
    level: "Level 1",
    priority: "must-see",
    themes: ["意大利绘画", "大尺幅", "宗教叙事"]
  },
  {
    id: "liberty-leading-the-people",
    titleZh: "自由引导人民",
    titleOriginal: "La Liberté guidant le peuple",
    artistOrCulture: "Eugène Delacroix",
    dateLabel: "1830",
    wing: "denon",
    level: "Level 1",
    roomHint: "room 700 on the official map",
    priority: "must-see",
    themes: ["法国绘画", "革命", "政治图像"]
  },
  {
    id: "raft-of-the-medusa",
    titleZh: "美杜莎之筏",
    titleOriginal: "Le radeau de la Méduse",
    artistOrCulture: "Théodore Géricault",
    dateLabel: "1818–1819",
    wing: "denon",
    level: "Level 1",
    priority: "must-see",
    themes: ["法国绘画", "灾难", "新闻事件"]
  },
  {
    id: "code-of-hammurabi",
    titleZh: "汉谟拉比法典",
    titleOriginal: "Code de Hammurabi",
    artistOrCulture: "Babylon",
    dateLabel: "c. 1792–1750 BC",
    wing: "richelieu",
    level: "Level 0 / -1",
    priority: "must-see",
    themes: ["近东文明", "法律", "文字"]
  },
  {
    id: "seated-scribe",
    titleZh: "书记坐像",
    titleOriginal: "Le scribe accroupi",
    artistOrCulture: "Ancient Egypt",
    dateLabel: "c. 2675–2545 BC",
    wing: "sully",
    level: "Level 1",
    priority: "must-see",
    themes: ["古埃及", "书写", "肖像感"]
  },
  {
    id: "sphinx-of-tanis",
    titleZh: "塔尼斯狮身人面像",
    titleOriginal: "Sphinx de Tanis",
    artistOrCulture: "Ancient Egypt",
    dateLabel: "c. 2675–1865 BC",
    wing: "sully",
    level: "Level 0",
    priority: "important",
    themes: ["古埃及", "王权", "入口空间"]
  },
  {
    id: "lacemaker",
    titleZh: "花边女工",
    titleOriginal: "La Dentellière",
    artistOrCulture: "Johannes Vermeer",
    dateLabel: "1669–1670",
    wing: "richelieu",
    level: "Level 2",
    roomHint: "room 837 on the official map",
    priority: "important",
    themes: ["北方绘画", "安静观看", "细节"]
  }
];
