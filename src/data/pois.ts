import type { Destination, Poi } from "./types";

export const destinations: Destination[] = [
  {
    slug: "alsace",
    name: "阿尔萨斯",
    region: "Alsace",
    intro: "从斯特拉斯堡到科尔马，沿着河道、木筋屋和教堂钟声慢慢走。",
    accent: "border-wine/25 bg-wine/8"
  },
  {
    slug: "interlaken",
    name: "因特拉肯与伯尔尼高地",
    region: "Interlaken / Bernese Oberland",
    intro: "湖水、瀑布、山谷和雪峰串在一起，是瑞士最适合听着走的路。",
    accent: "border-moss/25 bg-moss/8"
  },
  {
    slug: "montreux",
    name: "蒙特勒湖区",
    region: "Montreux Riviera",
    intro: "莱芒湖边的城堡、葡萄园和湖岸步道，把风景放得很慢。",
    accent: "border-brass/30 bg-brass/10"
  },
  {
    slug: "paris",
    name: "巴黎",
    region: "Paris",
    intro: "从歌剧院到圣日耳曼，先看立面、广场、树影和街道气质。",
    accent: "border-ink/15 bg-white/55"
  }
];

export const pois: Poi[] = [
  {
    id: "alsace-petite-france",
    destinationSlug: "alsace",
    destination: "阿尔萨斯",
    region: "Alsace",
    title: "Petite France",
    subtitle: "木筋屋、河道和旧磨坊之间的斯特拉斯堡",
    locationName: "Petite France, Strasbourg",
    latitude: 48.5817,
    longitude: 7.7392,
    category: "old town",
    recommendedVisitDuration: "45-70 分钟",
    audioDuration: "3 分钟",
    script:
      "你现在走进小法兰西，可以先别急着拍最满的那张明信片。站到桥边，看水怎样从木筋屋下面慢慢流过去。这里从前是磨坊、制革和工匠聚集的地方，不是为了好看才长成这样。那些歪斜的屋梁、低矮的窗和贴着水面的墙，都在提醒你，老城的美常常来自日常生活留下来的痕迹。",
    summary: "从桥边看河道和木筋屋，理解这片老城原本的工匠气息。",
    audioUrl: "/audio/alsace-petite-france.mp3",
    tags: ["木筋屋", "老城", "河道"],
    nextPoiId: "alsace-strasbourg-cathedral"
  },
  {
    id: "alsace-strasbourg-cathedral",
    destinationSlug: "alsace",
    destination: "阿尔萨斯",
    region: "Alsace",
    title: "Strasbourg Cathedral",
    subtitle: "一座红砂岩教堂撑起的城市中心",
    locationName: "Cathédrale Notre-Dame de Strasbourg",
    latitude: 48.5819,
    longitude: 7.7508,
    category: "cathedral",
    recommendedVisitDuration: "40-60 分钟",
    audioDuration: "3 分钟",
    script:
      "如果你站在主立面前，先往后退几步，让整座教堂进到视线里。斯特拉斯堡大教堂的红砂岩会随着天气变色，阴天偏沉，夕阳里会发暖。它的尖塔曾经很长时间是欧洲最高的建筑之一，所以这里不只是宗教中心，也是城市把自己抬高给世界看的方式。看完整体，再靠近看门廊上的雕像，细节会密得像石头写成的书。",
    summary: "从广场后退看整体，再靠近看红砂岩和门廊雕刻。",
    audioUrl: "/audio/alsace-strasbourg-cathedral.mp3",
    tags: ["哥特式", "红砂岩", "城市中心"],
    nextPoiId: "alsace-ill-river-walk"
  },
  {
    id: "alsace-ill-river-walk",
    destinationSlug: "alsace",
    destination: "阿尔萨斯",
    region: "Alsace",
    title: "Ill River Walk",
    subtitle: "沿着伊尔河看老城的边界",
    locationName: "Ill River, Strasbourg",
    latitude: 48.583,
    longitude: 7.7445,
    category: "river",
    recommendedVisitDuration: "35-55 分钟",
    audioDuration: "2 分钟",
    script:
      "沿着伊尔河走的时候，可以把注意力从单栋房子移到整座城市的边缘。河水像一条软的线，把老城、桥、树和房子慢慢串起来。走到转弯处时停一下，看水面反光怎样把屋顶和天空混在一起。斯特拉斯堡好看的地方不只在教堂广场，也在这些沿河的间隙里，城市在这里没有那么用力，却更接近日常。",
    summary: "沿河慢走，看桥、房子和水面怎样把老城串起来。",
    audioUrl: "/audio/alsace-ill-river-walk.mp3",
    tags: ["散步", "河岸", "老城边界"],
    nextPoiId: "alsace-colmar-little-venice"
  },
  {
    id: "alsace-colmar-little-venice",
    destinationSlug: "alsace",
    destination: "阿尔萨斯",
    region: "Alsace",
    title: "Colmar Little Venice",
    subtitle: "科尔马最温柔的一段水边街景",
    locationName: "La Petite Venise, Colmar",
    latitude: 48.0743,
    longitude: 7.3585,
    category: "river",
    recommendedVisitDuration: "35-60 分钟",
    audioDuration: "3 分钟",
    script:
      "来到小威尼斯，可以先站在桥上，不急着找最出名的角度。水道很窄，彩色房子贴得很近，花箱、木梁和窗 shutters 会把画面塞得很满。真正好看的不是它像不像威尼斯，而是阿尔萨斯小城把生活推到水边的样子。早晨人少时，这里很安静；傍晚灯亮起来，水面会把颜色轻轻晃开。",
    summary: "在桥上看水道两侧的彩色房子和花箱。",
    audioUrl: "/audio/alsace-colmar-little-venice.mp3",
    tags: ["水道", "彩色房子", "桥"],
    nextPoiId: "alsace-colmar-old-town"
  },
  {
    id: "alsace-colmar-old-town",
    destinationSlug: "alsace",
    destination: "阿尔萨斯",
    region: "Alsace",
    title: "Colmar Old Town",
    subtitle: "不只看彩色外墙，也看小城的街道尺度",
    locationName: "Colmar Old Town",
    latitude: 48.0778,
    longitude: 7.3582,
    category: "old town",
    recommendedVisitDuration: "60-90 分钟",
    audioDuration: "3 分钟",
    script:
      "在科尔马老城走路时，可以留意街道有多窄，房子离你有多近。彩色外墙很容易先抓住眼睛，但更有意思的是这些房子之间的距离，刚好适合人慢慢走、停下来买面包、抬头看窗。不要只拍最亮的颜色，也看看墙面上的旧痕、招牌、屋檐和石板路。小城的美不在宏大，而在每一步都能遇到细节。",
    summary: "从街道尺度、招牌和石板路看科尔马的日常细节。",
    audioUrl: "/audio/alsace-colmar-old-town.mp3",
    tags: ["彩色外墙", "石板路", "小城"],
    nextPoiId: "interlaken-lake-brienz"
  },
  {
    id: "interlaken-lake-brienz",
    destinationSlug: "interlaken",
    destination: "因特拉肯与伯尔尼高地",
    region: "Interlaken / Bernese Oberland",
    title: "Lake Brienz",
    subtitle: "一片蓝绿色湖水把山推得很远",
    locationName: "Lake Brienz",
    latitude: 46.7277,
    longitude: 7.9863,
    category: "lake",
    recommendedVisitDuration: "45-90 分钟",
    audioDuration: "3 分钟",
    script:
      "站在布里恩茨湖边，先看水的颜色。这里的蓝绿色不是滤镜，是冰川带来的细小矿物让湖水有了这种清亮的光。不要只盯着远处的山，也看近处的岸线、码头和水面纹路。风小的时候，湖像一块很大的玻璃；风起来以后，颜色会碎开。伯尔尼高地的风景从这里开始变得开阔，山不再只是背景，而是把湖整个抱住。",
    summary: "看冰川湖的蓝绿色，以及山和湖岸之间的开阔关系。",
    audioUrl: "/audio/interlaken-lake-brienz.mp3",
    tags: ["冰川湖", "蓝绿色", "山景"],
    nextPoiId: "interlaken-brienz"
  },
  {
    id: "interlaken-brienz",
    destinationSlug: "interlaken",
    destination: "因特拉肯与伯尔尼高地",
    region: "Interlaken / Bernese Oberland",
    title: "Brienz",
    subtitle: "木雕小镇和湖边慢下来的时间",
    locationName: "Brienz",
    latitude: 46.7545,
    longitude: 8.0385,
    category: "old town",
    recommendedVisitDuration: "45-75 分钟",
    audioDuration: "2 分钟",
    script:
      "布里恩茨很适合慢慢走。这里不需要你赶着看完什么大景点，可以从湖边步道走到老街，看看木屋阳台、雕花和靠近水面的花园。这个小镇有木雕传统，很多细节都带着手工留下的痕迹。站在湖边回头看房子，会发现它们不是孤立的建筑，而是顺着山坡、铁路和湖岸一起长出来的。",
    summary: "沿湖边和老街看木屋、雕花和小镇尺度。",
    audioUrl: "/audio/interlaken-brienz.mp3",
    tags: ["木屋", "湖边小镇", "木雕"],
    nextPoiId: "interlaken-iseltwald"
  },
  {
    id: "interlaken-iseltwald",
    destinationSlug: "interlaken",
    destination: "因特拉肯与伯尔尼高地",
    region: "Interlaken / Bernese Oberland",
    title: "Iseltwald",
    subtitle: "伸进湖里的小村和安静半岛",
    locationName: "Iseltwald",
    latitude: 46.7092,
    longitude: 7.9658,
    category: "lake",
    recommendedVisitDuration: "45-80 分钟",
    audioDuration: "2 分钟",
    script:
      "伊瑟尔特瓦尔德最好的看法，是沿着湖边慢慢走到小半岛附近。这里的村子像是轻轻伸进湖里，房子、船屋和树都贴着水。你可以找一个离人群稍远的位置，看湖水怎样把远山压得很低。这里不需要太多解释，它的安静本身就是重点。停几分钟，让眼睛习惯这种慢，风景才会从漂亮变得有记忆。",
    summary: "离开人群一点，看村子、半岛和远山在湖边的关系。",
    audioUrl: "/audio/interlaken-iseltwald.mp3",
    tags: ["湖边村庄", "半岛", "安静"],
    nextPoiId: "interlaken-giessbach-falls"
  },
  {
    id: "interlaken-giessbach-falls",
    destinationSlug: "interlaken",
    destination: "因特拉肯与伯尔尼高地",
    region: "Interlaken / Bernese Oberland",
    title: "Giessbach Falls",
    subtitle: "瀑布从森林里一层层落向湖面",
    locationName: "Giessbach Falls",
    latitude: 46.7357,
    longitude: 8.0237,
    category: "mountain",
    recommendedVisitDuration: "60-90 分钟",
    audioDuration: "3 分钟",
    script:
      "到吉斯巴赫瀑布时，可以先听声音，再找水在哪里。瀑布不是一口气落下来，而是从森林里分成很多层，一段一段往湖的方向走。靠近时注意水雾，它会把树叶和石头都弄得发亮。这里好看的地方在于瀑布、老酒店和布里恩茨湖同时出现，像一幅十九世纪旅行海报，但你站在水声里，会觉得它比海报更湿、更冷，也更真实。",
    summary: "听水声，沿着层层瀑布看森林、老酒店和湖。",
    audioUrl: "/audio/interlaken-giessbach-falls.mp3",
    tags: ["瀑布", "森林", "湖景"],
    nextPoiId: "interlaken-brienzer-rothorn"
  },
  {
    id: "interlaken-brienzer-rothorn",
    destinationSlug: "interlaken",
    destination: "因特拉肯与伯尔尼高地",
    region: "Interlaken / Bernese Oberland",
    title: "Brienzer Rothorn",
    subtitle: "坐齿轨火车上山，看湖变成一条光带",
    locationName: "Brienzer Rothorn",
    latitude: 46.7878,
    longitude: 8.0465,
    category: "mountain",
    recommendedVisitDuration: "半日",
    audioDuration: "3 分钟",
    script:
      "如果你坐齿轨火车上布里恩茨洛特峰，路上不要一直低头看手机。窗外的湖会慢慢变小，从一大片水变成山脚下的蓝色光带。上到高处以后，先找一个能同时看见湖和山脊的位置。这里的重点不是某一座山峰，而是高度带来的关系变化：村子变小，湖变窄，远处的雪线和云层开始变成同一个画面。",
    summary: "从齿轨火车和山顶看湖、村庄与山脊的关系。",
    audioUrl: "/audio/interlaken-brienzer-rothorn.mp3",
    tags: ["山顶", "齿轨火车", "全景"],
    nextPoiId: "interlaken-lauterbrunnen"
  },
  {
    id: "interlaken-lauterbrunnen",
    destinationSlug: "interlaken",
    destination: "因特拉肯与伯尔尼高地",
    region: "Interlaken / Bernese Oberland",
    title: "Lauterbrunnen",
    subtitle: "瀑布、峭壁和草地围出的山谷",
    locationName: "Lauterbrunnen",
    latitude: 46.5935,
    longitude: 7.9079,
    category: "mountain",
    recommendedVisitDuration: "90-120 分钟",
    audioDuration: "3 分钟",
    script:
      "劳特布伦嫩最先抓住你的，通常是从峭壁上垂下来的瀑布。你可以站在村子中间，先看两侧岩壁有多高，再看草地、木屋和教堂怎样被放在谷底。这里的风景有一种很清楚的垂直感：水从高处落下，人住在低处，远山把出口遮住。不要只拍瀑布特写，退后一点，把谷地的尺度一起留下，才更能看出它为什么特别。",
    summary: "从村中看瀑布、峭壁、草地和教堂的垂直关系。",
    audioUrl: "/audio/interlaken-lauterbrunnen.mp3",
    tags: ["山谷", "瀑布", "木屋"],
    nextPoiId: "interlaken-oeschinensee"
  },
  {
    id: "interlaken-oeschinensee",
    destinationSlug: "interlaken",
    destination: "因特拉肯与伯尔尼高地",
    region: "Interlaken / Bernese Oberland",
    title: "Oeschinensee",
    subtitle: "雪山脚下的一片高山湖",
    locationName: "Oeschinensee",
    latitude: 46.4984,
    longitude: 7.7284,
    category: "lake",
    recommendedVisitDuration: "半日",
    audioDuration: "3 分钟",
    script:
      "厄希嫩湖最好先从湖边看，再慢慢往高一点的位置走。湖水贴在雪山下面，颜色会随着云影变化，有时很亮，有时一下沉下去。站在湖边时，注意水面和山壁之间几乎没有多余的过渡，这让风景显得很直接。这里不需要追着每一个角度拍，找一个能坐下来的地方，看十分钟，湖的颜色和山上的光就会自己变化。",
    summary: "从湖边和高处看高山湖水与雪山的关系。",
    audioUrl: "/audio/interlaken-oeschinensee.mp3",
    tags: ["高山湖", "雪山", "徒步"],
    nextPoiId: "montreux-lakeside-promenade"
  },
  {
    id: "montreux-lakeside-promenade",
    destinationSlug: "montreux",
    destination: "蒙特勒湖区",
    region: "Montreux Riviera",
    title: "Montreux Lakeside Promenade",
    subtitle: "湖岸步道、花和远处的山",
    locationName: "Montreux Lakeside Promenade",
    latitude: 46.4312,
    longitude: 6.9107,
    category: "city walk",
    recommendedVisitDuration: "45-75 分钟",
    audioDuration: "3 分钟",
    script:
      "在蒙特勒湖岸步道上，可以把脚步放慢一点。这里的风景不是突然出现的，而是一路铺开：湖水在一侧，花坛和棕榈在身边，远处山线压得很低。你可以找一张长椅坐下，看船经过时水面怎样改变。蒙特勒的气质和瑞士山里不一样，它更柔软，更像度假地，也更愿意把风景留给散步的人。",
    summary: "沿湖岸看花、长椅、船和远山形成的度假气质。",
    audioUrl: "/audio/montreux-lakeside-promenade.mp3",
    tags: ["湖岸", "散步", "莱芒湖"],
    nextPoiId: "montreux-chillon-castle"
  },
  {
    id: "montreux-chillon-castle",
    destinationSlug: "montreux",
    destination: "蒙特勒湖区",
    region: "Montreux Riviera",
    title: "Chillon Castle",
    subtitle: "一座像从湖里长出来的城堡",
    locationName: "Chillon Castle",
    latitude: 46.4142,
    longitude: 6.9275,
    category: "castle",
    recommendedVisitDuration: "60-90 分钟",
    audioDuration: "3 分钟",
    script:
      "看西庸城堡时，先不要急着进门。站到湖边，让城堡、湖水和背后的山同时出现在视线里。它最特别的地方，是像直接从湖里长出来，墙脚几乎贴着水。这里曾经控制着通往阿尔卑斯的重要道路，所以它不只是浪漫的古堡，也是交通和权力的节点。绕到侧面看，石墙会比正面更有重量。",
    summary: "从湖边看城堡、山和旧交通要道之间的关系。",
    audioUrl: "/audio/montreux-chillon-castle.mp3",
    tags: ["城堡", "湖边", "石墙"],
    nextPoiId: "montreux-vevey"
  },
  {
    id: "montreux-vevey",
    destinationSlug: "montreux",
    destination: "蒙特勒湖区",
    region: "Montreux Riviera",
    title: "Vevey",
    subtitle: "湖边小城和开阔广场",
    locationName: "Vevey",
    latitude: 46.4625,
    longitude: 6.8419,
    category: "city walk",
    recommendedVisitDuration: "45-75 分钟",
    audioDuration: "2 分钟",
    script:
      "沃韦比蒙特勒更像日常生活里的湖边城市。你可以从湖边广场开始，看人们怎样坐在岸边、遛狗、等船、买咖啡。远处的山很漂亮，但不要只看远方，注意脚下这个城市怎样把湖变成公共客厅。广场、市场、餐馆和湖岸连在一起，让这里的风景没有那么端着，而是可以坐进去、走进去。",
    summary: "从湖边广场看沃韦的日常、市场和公共空间。",
    audioUrl: "/audio/montreux-vevey.mp3",
    tags: ["湖边城市", "广场", "日常"],
    nextPoiId: "montreux-lavaux-vineyards"
  },
  {
    id: "montreux-lavaux-vineyards",
    destinationSlug: "montreux",
    destination: "蒙特勒湖区",
    region: "Montreux Riviera",
    title: "Lavaux Vineyards",
    subtitle: "沿着梯田葡萄园看莱芒湖",
    locationName: "Lavaux Vineyards",
    latitude: 46.4918,
    longitude: 6.7467,
    category: "vineyard",
    recommendedVisitDuration: "90-150 分钟",
    audioDuration: "3 分钟",
    script:
      "拉沃葡萄园最适合边走边看。葡萄藤一层层铺在坡上，石墙把土地分成很细的线，下面是莱芒湖，远处是法国一侧的山。这里的美不只是风景开阔，也来自人长期整理土地留下的秩序。走到高一点的位置时回头看，湖面会变成一大片光，葡萄园则像一页慢慢展开的纹理。",
    summary: "沿梯田小路看葡萄藤、石墙、湖水和远山。",
    audioUrl: "/audio/montreux-lavaux-vineyards.mp3",
    tags: ["葡萄园", "梯田", "湖景"],
    nextPoiId: "montreux-rochers-de-naye"
  },
  {
    id: "montreux-rochers-de-naye",
    destinationSlug: "montreux",
    destination: "蒙特勒湖区",
    region: "Montreux Riviera",
    title: "Rochers-de-Naye",
    subtitle: "从山上俯看湖区弧线",
    locationName: "Rochers-de-Naye",
    latitude: 46.4319,
    longitude: 6.9765,
    category: "mountain",
    recommendedVisitDuration: "半日",
    audioDuration: "3 分钟",
    script:
      "上到罗什德内以后，先找一处能俯看莱芒湖的地方。湖在这里不再只是水面，而是一条很大的弧线，蒙特勒、沃韦和葡萄园都被放到同一个尺度里。天气好的时候，远山会显得很近；有云的时候，湖面反而更有层次。这里适合把前面的湖岸经验重新看一遍，你会发现自己刚走过的地方都变小了。",
    summary: "从山顶回看蒙特勒湖岸、葡萄园和湖面弧线。",
    audioUrl: "/audio/montreux-rochers-de-naye.mp3",
    tags: ["山顶", "湖区全景", "远眺"],
    nextPoiId: "paris-palais-garnier"
  },
  {
    id: "paris-palais-garnier",
    destinationSlug: "paris",
    destination: "巴黎",
    region: "Paris",
    title: "Palais Garnier",
    subtitle: "十九世纪巴黎把华丽写在正面",
    locationName: "Palais Garnier",
    latitude: 48.8719,
    longitude: 2.3316,
    category: "museum/exterior",
    recommendedVisitDuration: "35-60 分钟",
    audioDuration: "3 分钟",
    script:
      "你现在如果站在歌剧院正面，先别急着进去，往上看。屋顶上那些金色雕像在阴天也会发亮，它们很符合十九世纪巴黎的气质：要华丽，要昂贵，也要让人一眼知道这里曾经是帝国的门面。再看立面上的柱子、拱门和雕刻，几乎没有哪里愿意空着。巴黎歌剧院不是低调的建筑，它就是要把城市的自信摆在街口。",
    summary: "先看金色屋顶和密集立面，理解巴黎歌剧院的城市姿态。",
    audioUrl: "/audio/paris-palais-garnier.mp3",
    tags: ["歌剧院", "金色雕像", "十九世纪"],
    nextPoiId: "paris-place-vendome"
  },
  {
    id: "paris-place-vendome",
    destinationSlug: "paris",
    destination: "巴黎",
    region: "Paris",
    title: "Place Vendôme",
    subtitle: "珠宝、酒店和权力感很强的广场",
    locationName: "Place Vendôme",
    latitude: 48.8675,
    longitude: 2.3294,
    category: "city walk",
    recommendedVisitDuration: "25-40 分钟",
    audioDuration: "2 分钟",
    script:
      "旺多姆广场看起来很整齐，也很冷静。你可以站在广场边缘，先看四周立面的统一：高度、窗、拱廊和屋顶都被控制得很严。中间的圆柱把视线拉起来，周围则是珠宝店、高级酒店和安静的门面。这里不是热闹的巴黎，而是权力、财富和秩序感很强的巴黎。走的时候留意脚步声，广场的空会让声音变得更清楚。",
    summary: "在统一立面和中央圆柱之间感受广场的秩序感。",
    audioUrl: "/audio/paris-place-vendome.mp3",
    tags: ["广场", "珠宝", "秩序"],
    nextPoiId: "paris-tuileries-louvre"
  },
  {
    id: "paris-tuileries-louvre",
    destinationSlug: "paris",
    destination: "巴黎",
    region: "Paris",
    title: "Tuileries / Louvre Exterior",
    subtitle: "从花园树影走向卢浮宫外墙",
    locationName: "Tuileries Garden and Louvre Exterior",
    latitude: 48.8611,
    longitude: 2.3358,
    category: "museum/exterior",
    recommendedVisitDuration: "60-90 分钟",
    audioDuration: "3 分钟",
    script:
      "从杜乐丽花园往卢浮宫方向走，可以先看树。巴黎很多大空间不是靠建筑本身撑住，而是靠树列、砂石路、雕像和视线轴慢慢组织起来。走到卢浮宫外面时，不必急着进玻璃金字塔，先沿着外墙看一段。这里曾经是宫殿，后来成为博物馆，建筑的尺度仍然带着王权留下来的气派。花园到宫殿之间这条路，正好把巴黎的公共生活和历史连在一起。",
    summary: "从树列、砂石路和卢浮宫外墙看巴黎的大空间。",
    audioUrl: "/audio/paris-tuileries-louvre.mp3",
    tags: ["花园", "卢浮宫", "城市轴线"],
    nextPoiId: "paris-saint-germain"
  },
  {
    id: "paris-saint-germain",
    destinationSlug: "paris",
    destination: "巴黎",
    region: "Paris",
    title: "Saint-Germain-des-Prés",
    subtitle: "咖啡馆、书店和左岸街道气质",
    locationName: "Saint-Germain-des-Prés",
    latitude: 48.8542,
    longitude: 2.3331,
    category: "old town",
    recommendedVisitDuration: "60-90 分钟",
    audioDuration: "3 分钟",
    script:
      "在圣日耳曼德佩，最好的方式是放慢脚步，不要只找某一家著名咖啡馆打卡。这里的气质藏在街角、书店橱窗、窄人行道和露天座位之间。你可以站在教堂附近，看人流怎样从咖啡馆门口经过。左岸的文学和思想名声很大，但今天走在这里，真正能感到的不是口号，而是一种把阅读、聊天、散步放进日常的城市习惯。",
    summary: "在教堂和咖啡馆之间看左岸街道的日常气质。",
    audioUrl: "/audio/paris-saint-germain.mp3",
    tags: ["左岸", "咖啡馆", "书店"]
  }
];

export function getDestinationBySlug(slug: string) {
  return destinations.find((destination) => destination.slug === slug);
}

export function getPoisByDestination(slug: string) {
  return pois.filter((poi) => poi.destinationSlug === slug);
}

export function getPoiById(id: string) {
  return pois.find((poi) => poi.id === id);
}

export function getNextPoi(id: string) {
  const poi = getPoiById(id);
  return poi?.nextPoiId ? getPoiById(poi.nextPoiId) : undefined;
}

export function getPreviousPoi(id: string) {
  const index = pois.findIndex((poi) => poi.id === id);
  return index > 0 ? pois[index - 1] : undefined;
}
