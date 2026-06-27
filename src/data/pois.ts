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
    audioDuration: "1-2 分钟",
    script:
      "你现在走进小法兰西，可以先别急着拍最满的那张明信片。找一座靠水的小桥站一会儿，看河道怎样从木筋屋下面慢慢流过去，也看那些房子为什么会贴得这么近。这里从前并不是为游客准备的漂亮街区，而是磨坊、制革、渔民和工匠工作的地方，水是运输和做工的一部分，所以房子才会这样挤在河边。你可以抬头看木梁，有些线条并不完全笔直，窗也不是很整齐，这种不规整反而让人觉得它还活着。再把视线放低，看贴着水面的墙、桥边的石头和水里晃开的倒影。小法兰西最迷人的地方，不是它像童话，而是它把日常生活留下来的痕迹保存得很好。你慢慢走过去，会发现每一个转角都有一点旧，但旧得很亲切。",
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
    audioDuration: "1-2 分钟",
    script:
      "如果你站在斯特拉斯堡大教堂的主立面前，先往后退几步，让整座建筑完整地进入视线。不要一开始就看细节，先感受它在广场上的高度和重量。红砂岩在不同天气里会变颜色，阴天时偏沉，像带着一点铁锈的红；夕阳照过来时，又会慢慢发暖。它的尖塔曾经很长时间是欧洲最高的建筑之一，所以这座教堂不只是一个祈祷的地方，也是城市把自己抬高给世界看的方式。看完整体以后，你再靠近门廊，留意那些雕像和层层叠叠的线条。中世纪的人很多并不识字，教堂正面就像一本用石头写出来的书，把故事、秩序和敬畏都放在入口。最后再抬头看尖塔，它不是简单往上冲，而是一层一层变轻，像石头慢慢离开地面。",
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
    audioDuration: "1-2 分钟",
    script:
      "沿着伊尔河走的时候，可以先把注意力从单栋房子移到整座城市的边缘。河水像一条很软的线，把老城、桥、树和房子慢慢串在一起。你走到转弯处时可以停一下，不要马上继续往前，看看水面反光怎样把屋顶、天空和树影混在一起。斯特拉斯堡的好看不只在大教堂广场，也在这些沿河的间隙里。这里没有那么用力，没有非要让你惊叹的立面，却更接近日常生活。桥上有人经过，窗边有人开灯，船从水面轻轻划过去，城市就变得没有那么像景点。你可以留意两岸房子的背面，很多城市最真实的部分都在背面，那里没有正门那么庄重，却能看见阳台、墙面、旧窗和生活的痕迹。沿河慢慢走一段，你会更明白老城为什么需要水，也为什么水会让一座城市显得温柔。",
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
    audioDuration: "1-2 分钟",
    script:
      "来到科尔马小威尼斯，可以先站在桥上，不急着找网上最出名的角度。水道其实很窄，彩色房子贴得很近，花箱、木梁、窗板和小船会把画面塞得很满。你可以先看颜色，再看这些颜色之间的距离。这里真正好看的地方，不是它像不像威尼斯，而是阿尔萨斯小城把生活轻轻推到水边的样子。过去水道和市场、运输、手工行业都有关系，今天留下来的，是一种靠水生活的尺度。早晨人少时，这里很安静，水面几乎不动，倒影会比较完整；傍晚灯亮起来以后，颜色会在水里轻轻晃开，房子像是多了一层柔光。你可以沿着水边走几分钟，不必每一步都拍照，偶尔停下来看看窗台、花、桥栏杆和小船的绳子。小威尼斯的美不是宏大的，它靠近人，靠近一顿饭、一扇窗和一段慢慢流过去的水。",
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
    audioDuration: "1-2 分钟",
    script:
      "在科尔马老城走路时，可以先留意街道有多窄，房子离你有多近。彩色外墙很容易先抓住眼睛，但更有意思的是这些房子之间的距离，刚好适合人慢慢走，停下来买一块面包，或者抬头看一扇窗。这里不需要用很快的速度逛完，最好给自己一点空白时间，随便进一条小街，再从另一条巷子出来。你会看到木梁的颜色、墙面上的旧痕、铁艺招牌、屋檐下面的阴影，还有石板路被人走久以后留下的光。不要只拍最鲜艳的一面，也看看那些没有那么整齐的地方，那里往往更有生活气。科尔马的美不在宏大，它不是靠一座巨大的纪念碑压住你，而是让每一步都能遇到一点细节。走到广场时，你可以回头看看刚才来的街道，会发现这些房子像是慢慢围出来的，不是设计成一张照片，而是长成了一个可以住人的小城。",
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
    audioDuration: "1-2 分钟",
    script:
      "站在布里恩茨湖边，先看水的颜色。这里的蓝绿色不是滤镜，也不是天气特别好才有，而是冰川带来的细小矿物让湖水有了这种清亮的光。你不要只盯着远处的山，也看近处的岸线、码头、船桩和水面细小的纹路。风很小的时候，湖像一块很大的玻璃，把天空和山影都收进去；风起来以后，颜色会碎开，水面会变得更亮，也更有声音。伯尔尼高地的风景从这里开始变得开阔，山不再只是远处的背景，而像是把整片湖抱在中间。你可以沿着湖边慢慢走一小段，找一个没有太多人经过的位置停下来。看同一片水三分钟，你会发现它一直在变，近处是透明的，远处是蓝绿的，再远一点就和山影混在一起。布里恩茨湖让人舒服的地方，就在这种清澈和安静之间。",
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
    audioDuration: "1-2 分钟",
    script:
      "布里恩茨很适合慢慢走。这里不需要你赶着看完什么大景点，可以从湖边步道走到老街，看看木屋阳台、雕花、窗台和靠近水面的花园。这个小镇有木雕传统，所以你会在一些看起来很日常的地方发现手工留下的痕迹：栏杆的线条、屋檐下的装饰、门牌旁边的小细节，都不是冷冰冰的标准件。走在这里时，可以把脚步放轻一点，因为小镇本身的声音也很好听，湖水、车站、远处的船和偶尔经过的人声，会让它显得很真实。你站在湖边回头看房子，会发现它们不是孤立的建筑，而是顺着山坡、铁路和湖岸一起长出来的。山在后面，湖在前面，中间是人生活的窄窄一条地方。布里恩茨的好，不是让你惊讶，而是让你觉得生活如果慢一点，也可以很完整。",
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
    audioDuration: "1-2 分钟",
    script:
      "伊瑟尔特瓦尔德最好的看法，是沿着湖边慢慢走到小半岛附近。这里的村子像是轻轻伸进湖里，房子、船屋、树和小路都贴着水。你可以找一个离人群稍远的位置，不要只站在最热闹的拍照点，看湖水怎样把远山压得很低，也看岸边的小船怎样让这个地方从风景变成村庄。这里不需要太多解释，安静本身就是重点。你可以停几分钟，让眼睛习惯这种慢，先看近处的木栏杆和水草，再看远处的山影和云。很多人来这里，是因为它在照片里很像一个被精心安排好的画面，但真正到了现场，你会发现它更动人的地方是声音很少，颜色很干净，人只要稍微安静一点，就会被湖面带慢。不要急着走，给它一点时间，风景才会从漂亮变得有记忆。",
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
    audioDuration: "1-2 分钟",
    script:
      "到吉斯巴赫瀑布时，可以先听声音，再找水在哪里。这里的瀑布不是一口气从高处砸下来，而是从森林里分成很多层，一段一段往布里恩茨湖的方向走。你靠近的时候，先看树叶和石头，它们常常被水雾弄得发亮，空气也会比湖边更凉。沿着步道慢慢上去，水声会不断变化，有时在前面，有时像从身后传来，这种声音会让人很自然地放慢脚步。这里好看的地方在于瀑布、森林、老酒店和湖面同时出现，像一幅十九世纪旅行海报，但你站在水声里，会觉得它比海报更湿、更冷，也更真实。不要只拍瀑布最完整的一层，也可以回头看湖，远处安静的蓝绿色和眼前不断落下来的水放在一起，才是吉斯巴赫最特别的地方。",
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
    audioDuration: "1-2 分钟",
    script:
      "如果你坐齿轨火车上布里恩茨洛特峰，路上不要一直低头看手机。刚离开湖边时，你还能清楚看见房子、码头和小镇的轮廓，越往上走，布里恩茨湖会慢慢变小，从一大片水变成山脚下的蓝色光带。齿轨火车爬坡的速度不快，正好给你时间看风景的比例怎么改变。上到高处以后，先找一个能同时看见湖和山脊的位置，不要急着判断哪一边最好看。这里的重点不是某一座山峰，而是高度带来的关系变化：村子变小，湖变窄，山脊变得更清楚，远处的雪线和云层开始出现在同一个画面里。你可以想一下，刚才那些站在湖边时看起来很高的山，现在变成了你脚下风景的一部分。瑞士的山景有时会让人觉得太漂亮，像不真实，但这种从低处到高处的过程，会让你重新知道自己在什么地方。",
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
    audioDuration: "1-2 分钟",
    script:
      "劳特布伦嫩最先抓住你的，通常是从峭壁上垂下来的瀑布。你可以站在村子中间，先不要急着走到瀑布脚下，而是看两侧岩壁有多高，再看草地、木屋、教堂和小路怎样被放在谷底。这里的风景有一种很清楚的垂直感：水从高处落下，人住在低处，远山把出口轻轻遮住，整个山谷像被两面巨大的墙托起来。你可以往后退一点，把瀑布、村庄和草地一起放进视线里，这样才更能看出它为什么特别。只拍瀑布特写会少掉很多东西，因为劳特布伦嫩真正动人的地方，是人在这么高的自然尺度下面，仍然把日子过得很安稳。听一听水声，再看草地上的小屋，强烈和温柔会同时出现。这里不需要讲太多形容词，你站在谷底抬头看，就会明白为什么很多人会把它记很久。",
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
    audioDuration: "1-2 分钟",
    script:
      "厄希嫩湖最好先从湖边看，再慢慢往高一点的位置走。刚到湖边时，你会觉得水几乎是贴在雪山下面的，山壁很近，湖面很安静，风景没有太多过渡，就直接放在眼前。湖水的颜色会随着云影变化，有时很亮，像被光照透了；有时一下沉下去，变得更深，也更冷。站在湖边时，可以先看水和山之间的边界，那里几乎没有多余的缓冲，这让厄希嫩湖显得很直接。然后你再慢慢走到稍微高一点的位置，回头看整片湖，会发现它的形状和周围山势的关系更清楚。这里不需要追着每一个角度拍，找一个能坐下来的地方，看十分钟，湖的颜色和山上的光就会自己变化。很多高山湖的美，不是第一眼就结束的，而是你安静一会儿以后，它才慢慢把层次给你看。",
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
    audioDuration: "1-2 分钟",
    script:
      "在蒙特勒湖岸步道上，可以把脚步放慢一点。这里的风景不是突然出现的，而是一路铺开：湖水在一侧，花坛、树影和棕榈在身边，远处的山线压得很低，像是把整个湖面轻轻托住。你可以找一张长椅坐下，不急着往前走，看船经过时水面怎样改变，也看岸边的人怎样把这里当成日常散步的地方。蒙特勒的气质和瑞士山里不一样，它更柔软，更像度假地，也更愿意把风景留给走路的人。湖岸步道最好的部分，不是某一个固定景点，而是你一路走过去，花、船、雕像、酒店外立面和远山不断换位置。天气好的时候，湖面会很亮；阴天时，山和水反而会更安静。你可以边走边回头看，蒙特勒的美常常在回头的一瞬间出现，因为你刚走过的湖岸会变成一条很长、很温柔的线。",
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
    audioDuration: "1-2 分钟",
    script:
      "看西庸城堡时，先不要急着进门。你可以站到湖边，让城堡、湖水和背后的山同时出现在视线里。它最特别的地方，是像直接从湖里长出来，墙脚几乎贴着水，石头和湖面之间没有太多距离。很多城堡建在高处，靠高度让人敬畏；西庸城堡不一样，它靠位置。这里曾经控制着通往阿尔卑斯的重要道路，所以它不只是浪漫的古堡，也是交通和权力的节点。你绕到侧面看，石墙会比正面更有重量，窗也会显得更小，防御的意思就出来了。可是一回头，湖水又很开阔，远处山线很柔和，于是它同时有坚硬和漂亮两面。你可以在外面多待几分钟，看湖水拍到石墙边，再想象过去的人从这里经过，城堡不是风景里的摆设，而是实实在在卡在道路和湖之间的一道门。",
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
    audioDuration: "1-2 分钟",
    script:
      "沃韦比蒙特勒更像日常生活里的湖边城市。你可以从湖边广场开始，不要急着找某个标志物，先看人们怎样坐在岸边、遛狗、等船、买咖啡，或者只是站着聊天。远处的山当然很漂亮，但不要只看远方，也注意脚下这个城市怎样把湖变成公共客厅。广场、市场、餐馆和湖岸连在一起，让这里的风景没有那么端着，而是可以坐进去、走进去。你可以找一个能看见湖面和城市边缘的位置，留意人流怎样自然地从街道走到水边。沃韦的好处，是它不把风景和生活分开。你会看到游客，也会看到本地人做很普通的事，而这些普通的事正好让湖边变得亲近。走到湖边时可以回头看看城里的街道，建筑并不抢戏，却给这个开阔的湖面一个可以停靠的地方。",
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
    audioDuration: "1-2 分钟",
    script:
      "拉沃葡萄园最适合边走边看。葡萄藤一层层铺在坡上，石墙把土地分成很细的线，下面是莱芒湖，远处是法国一侧的山。你可以先沿着小路慢慢走，不用急着找最高点，因为这里的美不是突然打开的，而是随着脚步一点一点展开。近处的葡萄藤会让你看到土地被人长期整理过的痕迹，石墙、台阶、小屋和转弯处都很有秩序；再往远处看，湖面又非常开阔，把这些细密的线条一下放大。拉沃动人的地方，就在这种人工和自然之间。它不是荒野，也不是单纯的田园，而是很多代人把坡地一点点照顾出来的风景。走到高一点的位置时可以回头看，湖面会变成一大片光，葡萄园则像一页慢慢展开的纹理。你站在这里，会很容易明白为什么这片地方不只是好看，也值得被认真保存。",
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
    audioDuration: "1-2 分钟",
    script:
      "上到罗什德内以后，先找一处能俯看莱芒湖的地方。湖在这里不再只是你刚才沿着走的水面，而是一条很大的弧线，蒙特勒、沃韦、葡萄园和山坡都被放到同一个尺度里。天气好的时候，远山会显得很近，湖面也会亮得很干净；有云的时候，层次反而更多，云影落在水上，颜色会一块一块变深。这里适合把前面的湖岸经验重新看一遍。你会发现自己刚走过的地方都变小了，长椅、码头、城堡、葡萄园，全都成为湖边很细的一部分。山顶的风景有一种整理作用，它让你明白蒙特勒湖区不是几个分散的景点，而是一整条围着湖展开的生活和风景。你可以在这里多停一会儿，先看远处，再慢慢把视线收回来，看脚下的草地和山路。高处不是为了让人离开风景，而是让人重新看懂它。",
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
    audioDuration: "1-2 分钟",
    script:
      "你现在如果站在歌剧院正面，先别急着进去，往上看。屋顶上那些金色雕像在阴天也会发亮，它们很符合十九世纪巴黎的气质：要华丽，要昂贵，也要让人一眼知道这里曾经是帝国的门面。然后把视线慢慢放下来，看立面上的柱子、拱门、雕刻和人物，几乎没有哪里愿意空着。巴黎歌剧院不是低调的建筑，它就是要把城市的自信摆在街口。你可以稍微往后退，感受它和周围街道的关系，它不是孤零零放在这里的纪念碑，而是几条大道汇到一起之后突然出现的舞台。站在这里，行人、车流、商店橱窗和歌剧院立面会混在一起，这种混合很巴黎：日常生活旁边就是极度华丽的建筑。你再看那些金色和石雕，会发现它们并不只是装饰，而是在告诉路过的人，这座城市曾经多么相信排场、艺术和公共场面的力量。",
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
    audioDuration: "1-2 分钟",
    script:
      "旺多姆广场看起来很整齐，也很冷静。你可以站在广场边缘，先不要急着走到中间，先看四周立面的统一：高度、窗、拱廊和屋顶都被控制得很严，像是有人把整座广场的表情整理过。中间的圆柱把视线往上拉，周围则是珠宝店、高级酒店和安静的门面。这里不是热闹的巴黎，不是咖啡馆桌子挤到街边的巴黎，而是权力、财富和秩序感很强的巴黎。你可以慢慢走一圈，看每一家店如何把招牌做得很克制，也看广场为什么留出这么多空。空在这里不是浪费，它让建筑显得更稳，也让中央圆柱更像一个轴心。走的时候留意脚步声，广场的开阔会让声音变得更清楚。旺多姆广场不一定让人觉得亲近，但它很能说明巴黎的另一面：漂亮、昂贵、讲究比例，也很知道自己想给人什么印象。",
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
    audioDuration: "1-2 分钟",
    script:
      "从杜乐丽花园往卢浮宫方向走，可以先看树。巴黎很多大空间不是靠单栋建筑撑住的，而是靠树列、砂石路、雕像、喷泉和视线轴慢慢组织起来。你走在花园里时，会感觉路很直，空间很开，但又不空，因为树和雕像一直在帮你分段。可以找一把绿色椅子坐一会儿，看人们怎样晒太阳、聊天、推婴儿车，巴黎的宏大空间并不只是给国王和纪念碑的，今天也给普通人用。走到卢浮宫外面时，不必急着进玻璃金字塔，先沿着外墙看一段。这里曾经是宫殿，后来成为博物馆，建筑的尺度仍然带着王权留下来的气派。你站在外面会发现，卢浮宫不是一栋容易一眼看完的建筑，它更像一大片历史铺在城市中心。花园到宫殿之间这条路，正好把巴黎的公共生活和历史连在一起，一边是散步的人，一边是长得几乎没有尽头的石头外墙。",
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
    audioDuration: "1-2 分钟",
    script:
      "在圣日耳曼德佩，最好的方式是放慢脚步，不要只找某一家著名咖啡馆打卡。这里的气质藏在街角、书店橱窗、窄窄的人行道、露天座位和教堂附近的人流之间。你可以先站在教堂外面，看街道怎样从这里分出去，再看咖啡馆的桌子怎样几乎贴到路边。左岸的文学和思想名声很大，可是今天走在这里，真正能感到的不是口号，而是一种把阅读、聊天、散步放进日常的城市习惯。你可以随便挑一条街走进去，看看书店橱窗里的封面，看看路人手里的纸袋和咖啡杯。这里的建筑不一定每一栋都惊人，但街道的密度很舒服，人和店、窗和座位、旧墙和新招牌都靠得很近。圣日耳曼德佩的好，不是让你一次看完，而是让你愿意多绕一点路。等你走累了，坐下来喝点东西，再看人从你面前经过，你会觉得这片街区最有意思的部分，就是它从来不把生活和文化分得很开。",
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
