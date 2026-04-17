const AXES = ["spark", "warmth", "freedom", "directness", "rhythm"];
const AXIS_META = {
  spark: { left: "稳定", right: "刺激" },
  warmth: { left: "理性", right: "黏糊" },
  freedom: { left: "陪伴", right: "空间" },
  directness: { left: "委婉", right: "直球" },
  rhythm: { left: "随缘", right: "推进" }
};

const TYPES = [
  { code: "MONK", name: "僧人", tag: "没有那种世俗的欲望", blurb: "边界感很强，看起来平静，其实不是谁都进得去。" },
  { code: "IMSB", name: "自我攻击者", tag: "是不是我又演砸了", blurb: "一边心动一边自我拉扯，内耗能力惊人。" },
  { code: "IMFW", name: "废物", tag: "我不会又搞砸吧", blurb: "敏感，真诚，也很容易因为一点反馈就怀疑自己。" },
  { code: "GOGO", name: "行者", tag: "先冲再说", blurb: "推进欲很强，机会摆在眼前不会装瞎。" },
  { code: "HHHH", name: "傻乐者", tag: "哈哈哈先笑了", blurb: "擅长把尴尬和崩坏现场都处理成段子素材。" },
  { code: "SOLO", name: "孤儿", tag: "一个人也能过", blurb: "独立惯了，越在乎越不愿意显得依赖。" },
  { code: "LOVE-R", name: "恋爱脑", tag: "爱上头比上班快", blurb: "情绪一旦启动，速度能甩理智三条街。" },
  { code: "MUM", name: "妈", tag: "你吃了吗", blurb: "天然带照顾欲，谈着谈着就想兜底。" },
  { code: "FAKE", name: "伪人", tag: "我很自然啊", blurb: "社交面具切换熟练，真实情绪藏得比较深。" },
  { code: "OJBK", name: "都行者", tag: "都行都可以", blurb: "弹性大，不爱控制人，也不喜欢被安排太满。" },
  { code: "Dior-s", name: "屌丝", tag: "等我逆袭", blurb: "嘴上看破红尘，心里还是很想赢回来。" },
  { code: "BOSS", name: "老板", tag: "给我一个方向盘", blurb: "讨厌失控，喜欢把关系拉回可执行状态。" },
  { code: "THIN-K", name: "思想家", tag: "我再想想", blurb: "脑内会开很多会，行动通常排在分析之后。" },
  { code: "JOKE-R", name: "小丑", tag: "我先把自己讲成笑话", blurb: "会用幽默藏情绪，也会用玩笑挡真心。" },
  { code: "POOR", name: "穷鬼", tag: "但我很专一", blurb: "精力珍贵，所以只想投给值得的人。" },
  { code: "FUCK", name: "草人", tag: "先爆再说", blurb: "脾气来得快，热情也来得快，能量感很强。" }
];

const TYPE_VECTORS = {
  MONK: { spark: 32, warmth: 36, freedom: 78, directness: 40, rhythm: 42 },
  IMSB: { spark: 45, warmth: 70, freedom: 44, directness: 24, rhythm: 38 },
  IMFW: { spark: 42, warmth: 74, freedom: 40, directness: 28, rhythm: 40 },
  GOGO: { spark: 78, warmth: 48, freedom: 54, directness: 78, rhythm: 82 },
  HHHH: { spark: 84, warmth: 58, freedom: 60, directness: 62, rhythm: 56 },
  SOLO: { spark: 38, warmth: 42, freedom: 82, directness: 44, rhythm: 36 },
  "LOVE-R": { spark: 72, warmth: 86, freedom: 26, directness: 58, rhythm: 74 },
  MUM: { spark: 44, warmth: 88, freedom: 24, directness: 52, rhythm: 66 },
  FAKE: { spark: 50, warmth: 34, freedom: 62, directness: 30, rhythm: 44 },
  OJBK: { spark: 48, warmth: 52, freedom: 76, directness: 46, rhythm: 30 },
  "Dior-s": { spark: 46, warmth: 48, freedom: 56, directness: 34, rhythm: 42 },
  BOSS: { spark: 54, warmth: 36, freedom: 34, directness: 82, rhythm: 86 },
  "THIN-K": { spark: 34, warmth: 40, freedom: 58, directness: 42, rhythm: 34 },
  "JOKE-R": { spark: 72, warmth: 50, freedom: 58, directness: 52, rhythm: 46 },
  POOR: { spark: 40, warmth: 56, freedom: 46, directness: 48, rhythm: 58 },
  FUCK: { spark: 86, warmth: 42, freedom: 52, directness: 88, rhythm: 72 }
};

const TYPE_VERDICTS = {
  MONK: {
    line: "你不是没人追，你是筛选器开得像寺庙山门。",
    detail: "你谈恋爱最强的不是热情，是边界。能让你动心的人，必须先通过你那套很安静但很严格的内部审核。"
  },
  IMSB: {
    line: "你不是恋爱脑，你是恋爱里的自我审判长。",
    detail: "你最大的戏不一定发生在关系里，很多时候发生在你自己的脑内法庭。你会爱，也会在爱里反复质问自己够不够好。"
  },
  IMFW: {
    line: "你表面想要稳稳被爱，实际很怕自己先搞砸。",
    detail: "你很真，也很软，所以特别容易把对方的细小反应放大成对自己的评价。你需要的不是大道理，是稳定反馈。"
  },
  GOGO: {
    line: "你不适合拉扯，你适合有风就起飞。",
    detail: "你是那种只要觉得对，就会想把关系往前推的人。你不是没耐心，你只是觉得很多暧昧消耗根本没必要。"
  },
  HHHH: {
    line: "你拿喜剧感谈恋爱，但不代表你只想玩玩。",
    detail: "你擅长把尴尬化解成笑点，把沉重打散成空气感。别人觉得你轻松，其实你只是比很多人更会处理场面。"
  },
  SOLO: {
    line: "你不是冷，你只是早就习惯了一个人扛。",
    detail: "你对依赖这件事会天然谨慎，所以越在乎越容易装得没事。你需要的对象，不是催你打开心门，而是让你觉得可以不必硬撑。"
  },
  "LOVE-R": {
    line: "你谈恋爱像通电，亮得快，也热得快。",
    detail: "你不是不懂风险，你只是很容易在感觉成立时迅速投入。真正适合你的人，要接得住你的浓度，而不是只会享受你的热。"
  },
  MUM: {
    line: "你一认真，就容易把恋爱谈成半个育儿项目。",
    detail: "你很会照顾人，也很容易在关系里自动补位、自动兜底。你要小心的是别把自己谈成对方的售后。"
  },
  FAKE: {
    line: "你最难的不是开始关系，是让别人看见真的你。",
    detail: "你很懂社交表层怎么运转，但真情绪不会轻易交出去。真正能走近你的人，往往不是最会热闹的人，而是最能让你放松的人。"
  },
  OJBK: {
    line: "你看起来都行，其实你对舒服这件事非常挑。",
    detail: "你不是没要求，你只是讨厌把要求说得很硬。你真正喜欢的关系，是轻盈、不别扭、彼此都不用太费劲。"
  },
  "Dior-s": {
    line: "你嘴上佛，心里其实很想赢一次漂亮的。",
    detail: "你会装无所谓，也会拿玩笑给自己找台阶。但真碰到让你上心的人，你还是希望这次别再输得灰头土脸。"
  },
  BOSS: {
    line: "你谈恋爱不是随缘，是默认自己得控盘。",
    detail: "你对推进、节奏、确定性都很敏感。你不一定霸道，但很讨厌失控，所以容易在关系里自动进入项目管理模式。"
  },
  "THIN-K": {
    line: "你的恋爱启动慢，不是因为不想，是因为脑子先开会。",
    detail: "你会想很多，也会把每个细节都放进评估系统里。你需要的对象不是催你快点，而是让你越想越安心。"
  },
  "JOKE-R": {
    line: "你最会拿幽默救场，也最会拿幽默藏心。",
    detail: "你能让关系变轻松，但也容易把真正重要的话包进玩笑里。别人觉得你好相处，未必知道你认真起来有多深。"
  },
  POOR: {
    line: "你不是抠门，你是只想把真心花在值的地方。",
    detail: "你的精力分配很现实，所以你不会轻易乱投。你要的是那种值得你持续投入、而不是反复消耗的关系。"
  },
  FUCK: {
    line: "你的问题从来不是没火花，是火花有时候太大了。",
    detail: "你反应快、表达猛、情绪也来得真。吸引力很强，但也容易把场面推到过热，所以你需要的是能接住你而不是跟你互炸的人。"
  }
};

const MATCH_NOTES = {
  MONK: "这类人不是热闹挂的，但胜在边界清楚、情绪不乱，适合把关系谈得安静又耐久。",
  IMSB: "这类人敏感度高，会认真接情绪，但也需要足够的安全感，不然容易一起内耗。",
  IMFW: "这类人真诚软糯，能给关系温度，但需要稳定反馈，不能靠忽冷忽热养着。",
  GOGO: "这类人推进很快，跟他们在一起不容易卡在暧昧期，节奏感很强。",
  HHHH: "这类人会把关系里的尴尬和沉重消化成轻松气氛，恋爱体验感通常不差。",
  SOLO: "这类人很尊重边界，不会瞎粘人，适合需要空间感和松弛感的关系。",
  'LOVE-R': "这类人浓度高、反馈快，能迅速把关系加热，但也更吃对方的回应质量。",
  MUM: "这类人很会照顾人，陪伴感和兜底感很足，容易让人产生被稳稳接住的感觉。",
  FAKE: "这类人社交上很稳，但真正的真心不会随便给，适合慢慢建立信任。",
  OJBK: "这类人不爱控制也不爱折腾，和他们相处通常轻松，没那么容易窒息。",
  'Dior-s': "这类人表面嘴硬，内里其实很在意输赢和投入，熟了之后反而很有后劲。",
  BOSS: "这类人擅长控场和推进，适合想要确定性的人，但不适合极度讨厌被带节奏的人。",
  'THIN-K': "这类人行动前会想很多，优点是谨慎稳定，缺点是热起来比较慢。",
  'JOKE-R': "这类人很会制造轻松感，和他们在一起不容易闷，但也要小心他们拿玩笑挡真心。",
  POOR: "这类人不乱投精力，一旦决定认真，通常比表面更专一、更能长期投入。",
  FUCK: "这类人反应快、火花足、存在感强，适合吃强互动的人，不适合只想岁月静好的人。"
};

const SCENES = [
  {
    title: "关卡一：夜市量子纠缠",
    setting: "你和暧昧对象走进夜市，前方同时出现烤肠、算命摊、荧光蘑菇发卡和一只会唱苦情歌的玩具鸭。",
    questions: [
      {
        text: "对方把今晚的命运交到你手里，你准备怎么带他疯？",
        options: [
          makeOption("立刻切导演模式，路线、情绪、收尾全部排好，今晚不允许散装浪漫。", { spark: -1, rhythm: 2, directness: 1 }, { warmth: 1, rhythm: 2 }),
          makeOption("哪边最离谱就往哪边冲，约会不够疯和在楼下遛弯有什么区别。", { spark: 2, freedom: 1 }, { spark: 2, freedom: 1 }),
          makeOption("把选择权温柔塞回去，再把他的决定吹成宇宙专门写给你俩的脚本。", { warmth: 2, directness: -1 }, { warmth: 2, directness: 1 })
        ]
      },
      {
        text: "对方嘴角沾了一圈辣椒面，你第一反应更像哪种人？",
        options: [
          makeOption("递纸、指出洗手台、顺便把体面一起扶正，像恋爱里的人工客服。", { warmth: 1, rhythm: 1 }, { warmth: 1, directness: 1 }),
          makeOption("先笑，再帮他收拾现场，最后再赐一个夜市限定战损称号。", { spark: 2, warmth: 1 }, { spark: 2, warmth: 1 }),
          makeOption("表面岁月静好，内心已经把提醒方案排练到第三稿。", { directness: -2, warmth: 1 }, { directness: 2, warmth: 1 })
        ]
      },
      {
        text: "老板嗷一嗓子“情侣飞镖不玩会后悔三年”，你准备怎么接这口锅？",
        options: [
          makeOption("上，输了就嘴硬说这是先锋派恋爱行为艺术，不算翻车。", { spark: 2, directness: 1 }, { spark: 2, freedom: 1 }),
          makeOption("先看值不值，不让今晚的浪漫预算死得像个冤种。", { spark: -1, rhythm: 1, directness: 1 }, { rhythm: 2, warmth: 1 }),
          makeOption("让对方上场，你在旁边负责造神、鼓掌、无脑吹。", { warmth: 2, freedom: -1 }, { warmth: 1, spark: 1 })
        ]
      }
    ]
  },
  {
    title: "关卡二：暴雨咖啡馆失眠局",
    setting: "窗外暴雨像老天在泼洗脚水，店里循环苦情歌，桌上那块提拉米苏看起来很像分手纪念品。",
    questions: [
      {
        text: "对方盯着窗外那场破雨，忽然来一句“我想到以前了”，你会？",
        options: [
          makeOption("先问清楚：你现在是想倾诉、想发呆，还是单纯想让我接住你。", { directness: 2, warmth: 1 }, { directness: 1, warmth: 1 }),
          makeOption("直接把话接住，陪他一路聊到雨停、歌停、情绪也别再演。", { warmth: 2, freedom: -1 }, { warmth: 2, directness: 1 }),
          makeOption("先把甜点推过去，人生创伤等会儿聊，别让血糖先跳楼。", { warmth: 1, spark: 1 }, { warmth: 2, rhythm: 1 })
        ]
      },
      {
        text: "雨越下越像老天在发疯，对方说今晚可能回不去，你第一反应是？",
        options: [
          makeOption("立刻查路线、备选、撤退方案，先把烂局面拽回人类控制范围。", { rhythm: 2, directness: 1 }, { rhythm: 2, warmth: 1 }),
          makeOption("这不就是宇宙塞给你俩的加时赛？先别急着散，氛围先续上。", { spark: 2, warmth: 1, rhythm: 1 }, { spark: 2, warmth: 1 }),
          makeOption("先看他想不想继续待着，不把一点暧昧硬熬成高压锅。", { freedom: 2, directness: 1 }, { freedom: 2, warmth: 1 })
        ]
      },
      {
        text: "苦情歌已经播到第三遍，再放下去你俩都快像要官宣分手了，你怎么处理？",
        options: [
          makeOption("直接提议换歌，再听下去这桌迟早拍成情伤番外。", { directness: 2, spark: 1 }, { directness: 1, spark: 1 }),
          makeOption("跟着乱唱两句，把即将苦情的现场硬掰回喜剧专区。", { spark: 2, warmth: 1 }, { spark: 2, warmth: 1 }),
          makeOption("心里弹幕刷得飞起，脸上还是一副“这都小场面”的优雅样。", { directness: -2, freedom: 1 }, { directness: 2, warmth: 1 })
        ]
      }
    ]
  },
  {
    title: "关卡三：朋友局人类观察实验",
    setting: "你带对方去朋友聚会，现场有社牛、嘴替、玄学家，还有个端着瓜子准备看你们翻车的人。",
    questions: [
      {
        text: "场上突然有人起哄：“来，说说你们第一次心动是什么时候。”你会？",
        options: [
          makeOption("讲，但必须讲成脱口秀版本，糖可以发，脸不能丢到地上。", { spark: 2, directness: 1, warmth: 1 }, { spark: 1, warmth: 1 }),
          makeOption("浅浅发一点糖就立刻收口，绝不给这群人批发八卦素材。", { freedom: 1, directness: 1, warmth: 1 }, { freedom: 1, warmth: 1 }),
          makeOption("迅速拐弯，把雷精准甩给全场最会接梗的那个倒霉蛋。", { spark: 1, directness: 1, warmth: -1 }, { spark: 2, freedom: 1 })
        ]
      },
      {
        text: "如果对方明显有点拘谨，已经快从“社交”滑向“社死”，你更像？",
        options: [
          makeOption("悄悄把话题往他擅长的方向拐，做那种不抢戏的隐形外挂。", { warmth: 2, rhythm: 1 }, { warmth: 2, directness: 1 }),
          makeOption("直接把人拎出去透口气，社交暂停，先把灵魂捡回来。", { directness: 2, warmth: 1, freedom: 1 }, { freedom: 1, warmth: 1 }),
          makeOption("先相信他能顶住，除非他给我发出非常明确的求救信号。", { freedom: 2, warmth: -1 }, { freedom: 2, directness: 1 })
        ]
      },
      {
        text: "散场回家路上，你最想听见对方哪种评价？",
        options: [
          makeOption("和你在一起很有安全感。", { warmth: 2, spark: -1 }, { warmth: 2, rhythm: 1 }),
          makeOption("跟你在一起真的不会无聊。", { spark: 2, directness: 1 }, { spark: 2, warmth: 1 }),
          makeOption("你很懂什么时候靠近，什么时候给空间。", { freedom: 2, warmth: 1 }, { freedom: 2, directness: 1 })
        ]
      }
    ]
  },
  {
    title: "关卡四：旅行事故求生综艺",
    setting: "你们订错酒店、导航漂移、行李失踪，民宿老板还发来一张看不懂是不是你们房门的门牌照。",
    questions: [
      {
        text: "发现酒店日期订错的那一秒，你脑子里第一个跳出来的模式是？",
        options: [
          makeOption("现场分工、立刻控场，坚决不让这个破事长成连续剧。", { rhythm: 2, directness: 2 }, { rhythm: 2, directness: 1 }),
          makeOption("先笑一秒，毕竟事情已经足够荒谬，表情不能再跟着塌。", { spark: 1, warmth: 1, rhythm: -1 }, { warmth: 2, spark: 1 }),
          makeOption("先看对方脸色，别让旅行事故顺手把暧昧气氛一起埋了。", { warmth: 2, freedom: -1 }, { warmth: 2, directness: 1 })
        ]
      },
      {
        text: "找不到行李箱时，对方已经肉眼可见开始急，你更像？",
        options: [
          makeOption("立刻开始下指令：回忆路线、电话排查、服务台推进，一个都别漏。", { rhythm: 2, directness: 1 }, { rhythm: 2, warmth: 1 }),
          makeOption("先稳住人，箱子可以晚点找到，但人别先碎成二维码。", { warmth: 2, directness: 1 }, { warmth: 2 }),
          makeOption("你原地待命，我去前线冲锋，今天不能再多丢一个活人。", { directness: 2, freedom: 1, rhythm: 1 }, { freedom: 1, warmth: 1 })
        ]
      },
      {
        text: "如果这趟旅行最后还是一锅乱炖，你最想让这段关系被怎么定义？",
        options: [
          makeOption("虽然乱，但我们始终是同一边的人，不是互甩锅的冤种。", { warmth: 2, freedom: -1, rhythm: 1 }, { warmth: 2, rhythm: 1 }),
          makeOption("虽然乱，但我能把这坨烂事讲成未来三年都能笑的素材。", { spark: 2, directness: 1 }, { spark: 2, warmth: 1 }),
          makeOption("虽然乱，但至少谁也没把谁逼成高压锅。", { freedom: 2, directness: 1 }, { freedom: 2, warmth: 1 })
        ]
      }
    ]
  },
  {
    title: "关卡五：凌晨两点宇宙来电",
    setting: "对方突然来电，说想你，声音里混着一点委屈、一点鼻音，和一点熬夜后的人类脆弱。",
    questions: [
      {
        text: "凌晨两点接起这通电话，你第一句更像哪种人会说的话？",
        options: [
          makeOption("怎么了，出什么事了，先跟我说。", { directness: 2, warmth: 1, rhythm: 1 }, { directness: 1, warmth: 1 }),
          makeOption("我就知道，你迟早还是会想我想到失眠，装也装不了多久。", { spark: 2, warmth: 1 }, { spark: 2, directness: 1 }),
          makeOption("我在，你慢慢说，不想说也没关系。", { warmth: 2, freedom: 1, directness: -1 }, { warmth: 2, freedom: 1 })
        ]
      },
      {
        text: "如果对方说“没事，就是想确认你在不在”，你会怎么回？",
        options: [
          makeOption("明确告诉他：在，而且以后也可以直接来找我。", { warmth: 2, directness: 2, rhythm: 1 }, { warmth: 1, directness: 1 }),
          makeOption("先嘴硬两句，但心里已经把这通电话列进年度心软现场。", { warmth: 1, directness: -1, spark: 1 }, { warmth: 2, directness: 2 }),
          makeOption("回应他，同时顺手立个规矩：下次别一个人憋到半夜才来。", { directness: 2, freedom: 1, rhythm: 2 }, { directness: 1, rhythm: 2 })
        ]
      },
      {
        text: "挂电话之前，你最想把这段关系往哪边推一步？",
        options: [
          makeOption("直接约下一次见面，把今晚的上头落实成现实安排。", { rhythm: 2, directness: 1 }, { rhythm: 2, warmth: 1 }),
          makeOption("再聊十分钟，今晚先把他的情绪抱稳，别让人带着委屈下线。", { warmth: 2, freedom: -1 }, { warmth: 2 }),
          makeOption("先留一点余味，等明天脑子回魂了再继续把火烧下去。", { freedom: 2, spark: 1, rhythm: -1 }, { freedom: 2, spark: 1 })
        ]
      }
    ]
  }
];

const QUIZ_SCENES = [
  {
    title: "关卡一：夜市恋爱邪典试炼",
    setting: "你和暧昧对象钻进夜市，左边是烤肠，右边是算命摊，前面还有一只会唱《体面》的发光玩具鸭。今夜空气里写满了四个字：很容易栽。",
    questions: [
      {
        text: "对方把今晚安排权递给你。面对这份突如其来的恋爱行政权，你最像会怎么整？",
        options: [
          makeOption("直接接管，路线、节奏、情绪起伏全归我管。既然要暧昧，就别给我暧昧得像散装团建。", { spark: -1, rhythm: 2, directness: 1 }, { warmth: 1, rhythm: 2 }),
          makeOption("哪边最离谱就往哪边冲。约会要是还没楼下遛弯刺激，那还不如各回各家刷短视频。", { spark: 2, freedom: 1 }, { spark: 2, freedom: 1 }),
          makeOption("把选择权轻轻还回去，再把他的决定夸成命运钦点。人可以不控场，但氛围必须喂饱。", { warmth: 2, directness: -1 }, { warmth: 2, directness: 1 })
        ]
      },
      {
        text: "对方吃完烤肠，嘴角沾了一圈辣椒面。你第一反应更像哪种恋爱德性？",
        options: [
          makeOption("递纸、指洗手台、顺便把他的体面也扶起来。爱归爱，别让人像刚从厨房工伤现场逃出来。", { warmth: 1, rhythm: 1 }, { warmth: 1, directness: 1 }),
          makeOption("先笑，再帮他收拾，再赐封号。今晚他可以狼狈，但必须狼狈得有纪念意义。", { spark: 2, warmth: 1 }, { spark: 2, warmth: 1 }),
          makeOption("表面云淡风轻，内心已经把提醒措辞修到第八稿。不是不说，是想选个不那么像审判书的版本。", { directness: -2, warmth: 1 }, { directness: 2, warmth: 1 })
        ]
      },
      {
        text: "摊主突然大喊：'情侣飞镖不玩后悔三年！' 你打算怎么接住这口恋爱野锅？",
        options: [
          makeOption("上。输了也没事，嘴硬说这是先锋派约会行为艺术。翻车不是问题，不会编才是。", { spark: 2, directness: 1 }, { spark: 2, freedom: 1 }),
          makeOption("先判断值不值。浪漫可以有，但不能让预算死得像个无名冤种。", { spark: -1, rhythm: 1, directness: 1 }, { rhythm: 2, warmth: 1 }),
          makeOption("让对方上场，你在旁边负责造神、鼓掌、无脑捧。爱有时候就是当场把他夸成今晚 MVP。", { warmth: 2, freedom: -1 }, { warmth: 1, spark: 1 })
        ]
      }
    ]
  },
  {
    title: "关卡二：暴雨咖啡馆情绪返潮",
    setting: "窗外暴雨像天在发疯，店里循环苦情歌，桌上的提拉米苏看着像失恋纪念碑。氛围已经不是暧昧，是快要开始演文艺片。",
    questions: [
      {
        text: "对方盯着雨突然来一句：'我想到以前了。' 面对这句高危台词，你会怎么接？",
        options: [
          makeOption("先问清楚：你现在是想说、想被听，还是单纯想让我在这儿接住你。别把安慰做成盲盒。", { directness: 2, warmth: 1 }, { directness: 1, warmth: 1 }),
          makeOption("直接接住，陪他把这阵情绪聊到底。既然都开口了，就别让委屈卡在半空继续阴魂不散。", { warmth: 2, freedom: -1 }, { warmth: 2, directness: 1 }),
          makeOption("先把甜点推过去。创伤可以慢慢说，血糖先塌了的话，你俩待会儿谁都不像好人。", { warmth: 1, spark: 1 }, { warmth: 2, rhythm: 1 })
        ]
      },
      {
        text: "雨越下越离谱，对方说今晚可能回不去了。你脑子里第一个弹出的按钮是？",
        options: [
          makeOption("立刻查路线、备选、兜底方案。烂局面已经够烂了，至少流程得像个人。", { rhythm: 2, directness: 1 }, { rhythm: 2, warmth: 1 }),
          makeOption("这不就是宇宙硬塞的加时赛？先别急着散，今晚这氛围还能再续命一会儿。", { spark: 2, warmth: 1, rhythm: 1 }, { spark: 2, warmth: 1 }),
          makeOption("先看他自己想不想继续待着。暧昧这玩意儿很脆，别一激动就把人熬成高压锅。", { freedom: 2, directness: 1 }, { freedom: 2, warmth: 1 })
        ]
      },
      {
        text: "店里苦情歌已经播到第三遍，再听下去你俩都快像分手复合八百次的旧人了。你怎么救场？",
        options: [
          makeOption("直接提议换歌。再放下去这桌不是约会，是情伤售后处理中心。", { directness: 2, spark: 1 }, { directness: 1, spark: 1 }),
          makeOption("顺着乱唱两句，硬把现场从文艺塌房片场掰回喜剧专区。", { spark: 2, warmth: 1 }, { spark: 2, warmth: 1 }),
          makeOption("心里弹幕已经刷到崩，表面还是一副'这点阵仗算什么'的体面样。", { directness: -2, freedom: 1 }, { directness: 2, warmth: 1 })
        ]
      }
    ]
  },
  {
    title: "关卡三：朋友局大型照妖镜",
    setting: "你带对方去朋友局。现场有社牛、嘴替、气氛组、玄学家，还有个端着瓜子等你们出洋相的天选坏东西。",
    questions: [
      {
        text: "朋友突然起哄：'来，说说你们第一次心动是什么时候。' 这时候你会怎么保住脸和糖分？",
        options: [
          makeOption("讲，但必须讲成段子。糖可以发，脸不能丢。甜归甜，不能甜得像我在现场投降。", { spark: 2, directness: 1, warmth: 1 }, { spark: 1, warmth: 1 }),
          makeOption("浅发一点就收口。恋爱是恋爱，没必要给整桌人批发你俩的独家素材。", { freedom: 1, directness: 1, warmth: 1 }, { freedom: 1, warmth: 1 }),
          makeOption("迅速甩锅，把火力精准导流给全场最会接梗的倒霉蛋。今天谁都别想白看戏。", { spark: 1, directness: 1, warmth: -1 }, { spark: 2, freedom: 1 })
        ]
      },
      {
        text: "如果对方明显开始拘谨，整个人正从'社交中'滑向'灵魂离线'，你更像会怎么做？",
        options: [
          makeOption("悄悄把话题拐到他擅长的方向。救场不一定要高调，有时候外挂就该静音运行。", { warmth: 2, rhythm: 1 }, { warmth: 2, directness: 1 }),
          makeOption("直接把人拎出去透气。社交可以暂停，灵魂不能继续在场内被活体消耗。", { directness: 2, warmth: 1, freedom: 1 }, { freedom: 1, warmth: 1 }),
          makeOption("先相信他能扛住，除非他明确发出求救信号。我不想把照顾做成越界巡逻。", { freedom: 2, warmth: -1 }, { freedom: 2, directness: 1 })
        ]
      },
      {
        text: "散场回家路上，你最想从对方嘴里听到哪种评价？",
        options: [
          makeOption("和你在一起很安心。不是无聊的稳，是那种人不用时刻提着一口气的稳。", { warmth: 2, spark: -1 }, { warmth: 2, rhythm: 1 }),
          makeOption("跟你待着真的不会闷。你最好是能让我心动，不是让我像在参加礼仪培训。", { spark: 2, directness: 1 }, { spark: 2, warmth: 1 }),
          makeOption("你很懂什么时候靠近，什么时候留白。该出现的时候不装死，该退开的时候不窒息。", { freedom: 2, warmth: 1 }, { freedom: 2, directness: 1 })
        ]
      }
    ]
  },
  {
    title: "关卡四：旅行翻车真人秀",
    setting: "你们订错酒店、导航抽风、行李失踪，民宿老板还发来一张像灵异照片的门牌图。宇宙今晚的态度很明确：谈恋爱就别想太顺。",
    questions: [
      {
        text: "发现酒店日期订错的那一秒，你的脑子最先切到哪种模式？",
        options: [
          makeOption("现场分工，立刻控场。破事可以发生，但不能在我眼前长成八集连续剧。", { rhythm: 2, directness: 2 }, { rhythm: 2, directness: 1 }),
          makeOption("先笑一下。事情都已经够荒谬了，总不能让我表情再跟着一起塌方。", { spark: 1, warmth: 1, rhythm: -1 }, { warmth: 2, spark: 1 }),
          makeOption("先看对方状态。酒店没了还能找，气氛死了今晚才是真的白搭。", { warmth: 2, freedom: -1 }, { warmth: 2, directness: 1 })
        ]
      },
      {
        text: "行李箱找不到，对方肉眼可见开始急了。你更像哪种恋爱应急预案？",
        options: [
          makeOption("立刻开任务面板：回忆路线、电话排查、服务台推进。先把局救起来，别让人跟着一起报废。", { rhythm: 2, directness: 1 }, { rhythm: 2, warmth: 1 }),
          makeOption("先稳住他。箱子晚点找到也行，但人别先碎成二维码，不然今晚谁都不好收场。", { warmth: 2, directness: 1 }, { warmth: 2 }),
          makeOption("你原地待命，我去前线冲锋。今天可以丢行李，不能再多丢一个活人。", { directness: 2, freedom: 1, rhythm: 1 }, { freedom: 1, warmth: 1 })
        ]
      },
      {
        text: "如果这趟旅行最后还是烂成一锅，你最希望这段关系被总结成什么样？",
        options: [
          makeOption("虽然乱，但我们始终站一边。遇事先并肩，不先互甩锅，这就已经赢过很多情侣了。", { warmth: 2, freedom: -1, rhythm: 1 }, { warmth: 2, rhythm: 1 }),
          makeOption("虽然乱，但这摊破事我能讲成未来三年还会笑的经典素材。痛苦可以有，白痛不行。", { spark: 2, directness: 1 }, { spark: 2, warmth: 1 }),
          makeOption("虽然乱，但至少谁都没把谁逼疯。能不互耗，就已经是成年人恋爱的高级操作。", { freedom: 2, directness: 1 }, { freedom: 2, warmth: 1 })
        ]
      }
    ]
  },
  {
    title: "关卡五：凌晨两点夺命来电",
    setting: "对方突然来电，说想你。声音里混着鼻音、委屈、熬夜后的脆弱，还有一点'我知道现在打来很犯规但我就是打了'的不要命。",
    questions: [
      {
        text: "凌晨两点接起这通电话，你第一句最像哪种人会说出来的话？",
        options: [
          makeOption("怎么了，出什么事了，先告诉我。想人归想人，别一上来就把我吓到直接清醒。", { directness: 2, warmth: 1, rhythm: 1 }, { directness: 1, warmth: 1 }),
          makeOption("我就知道，你迟早会想我想到睡不着。嘴再硬，凌晨这通电话也已经把你卖得很彻底。", { spark: 2, warmth: 1 }, { spark: 2, directness: 1 }),
          makeOption("我在，你慢慢说。不想说也没关系，先让我知道你不是一个人硬扛。", { warmth: 2, freedom: 1, directness: -1 }, { warmth: 2, freedom: 1 })
        ]
      },
      {
        text: "如果对方说：'没事，就是想确认你在不在。' 你会怎么回这句半夜犯规球？",
        options: [
          makeOption("那你记住，我在。而且以后想找我，可以直接来，不用把自己憋到凌晨两点。", { warmth: 2, directness: 2, rhythm: 1 }, { warmth: 1, directness: 1 }),
          makeOption("嘴上先怼两句，心里已经软得像刚出锅糯米团。该说不说，这种犯规我是真吃。", { warmth: 1, directness: -1, spark: 1 }, { warmth: 2, directness: 2 }),
          makeOption("先回应，再立规矩。你可以想我，但下次别一个人憋到快内耗升天才来。", { directness: 2, freedom: 1, rhythm: 2 }, { directness: 1, rhythm: 2 })
        ]
      },
      {
        text: "挂电话之前，你最想把这段关系往哪边再推半步？",
        options: [
          makeOption("直接约下次见面。都凌晨两点打来了，再装淡定就有点对不起这通电话。", { rhythm: 2, directness: 1 }, { rhythm: 2, warmth: 1 }),
          makeOption("再聊十分钟，先把他的情绪抱稳。今晚可以不推进，但不能让人带着委屈掉线。", { warmth: 2, freedom: -1 }, { warmth: 2 }),
          makeOption("先留点余味，等明天脑子回魂再继续。上头归上头，别把今晚烧成明天的社死素材。", { freedom: 2, spark: 1, rhythm: -1 }, { freedom: 2, spark: 1 })
        ]
      }
    ]
  }
];

const QUESTIONS = QUIZ_SCENES.flatMap((scene, sceneIndex) =>
  scene.questions.map((question, questionIndex) => ({
    ...question,
    id: `q-${sceneIndex + 1}-${questionIndex + 1}`,
    sceneTitle: scene.title,
    sceneSetting: scene.setting,
    sceneIndex
  }))
);

const state = {
  selectedType: "",
  pendingType: "",
  questionIndex: 0,
  answers: [],
  styleScores: emptyScores(),
  partnerScores: emptyScores(),
  result: null,
  justPicked: false
};

function makeOption(text, effect, partner) {
  return { text, effect, partner };
}

function emptyScores() {
  return { spark: 50, warmth: 50, freedom: 50, directness: 50, rhythm: 50 };
}

function clamp(num) {
  return Math.max(0, Math.min(100, num));
}

function mergeScores(base, delta, weight = 8) {
  const next = { ...base };
  Object.keys(delta).forEach((key) => {
    next[key] = clamp(next[key] + delta[key] * weight);
  });
  return next;
}

function getType(code) {
  const meta = TYPES.find((item) => item.code === code);
  return meta ? { ...meta, vector: TYPE_VECTORS[code] } : null;
}

function targetPartner(style, pref) {
  return {
    spark: clamp(Math.round(pref.spark * 0.72 + (100 - style.spark) * 0.28)),
    warmth: clamp(Math.round(pref.warmth * 0.78 + style.warmth * 0.22)),
    freedom: clamp(Math.round(pref.freedom * 0.7 + (100 - style.freedom) * 0.3)),
    directness: clamp(Math.round(pref.directness * 0.76 + (100 - style.directness) * 0.24)),
    rhythm: clamp(Math.round(pref.rhythm * 0.74 + (100 - style.rhythm) * 0.26))
  };
}

function fit(style, pref, code) {
  const candidate = getType(code);
  const target = targetPartner(style, pref);
  const details = AXES.map((key) => {
    const gap = Math.abs(target[key] - candidate.vector[key]);
    return { key, score: Math.max(0, 100 - gap * 2), gap };
  });
  const fitScore = Math.round(details.reduce((sum, item) => sum + item.score, 0) / details.length);
  const complementBonus = Math.round(
    (Math.abs(style.spark - candidate.vector.spark) * 0.12 +
      Math.abs(style.directness - candidate.vector.directness) * 0.1 +
      Math.abs(style.freedom - candidate.vector.freedom) * 0.08) / 3
  );
  const stabilityBonus = Math.round(
    ((100 - Math.abs(style.warmth - candidate.vector.warmth)) * 0.1 +
      (100 - Math.abs(style.rhythm - candidate.vector.rhythm)) * 0.12) / 2
  );
  const finalScore = clamp(Math.round(fitScore * 0.72 + complementBonus * 0.12 + stabilityBonus * 0.16));
  const topKeys = details.sort((a, b) => a.gap - b.gap).slice(0, 2).map((item) => AXIS_META[item.key].right);
  return {
    code: candidate.code,
    title: candidate.name,
    tag: candidate.tag,
    finalScore,
    fitScore,
    complementBonus,
    stabilityBonus,
    reason: `它在 ${topKeys.join(" 和 ")} 这两个维度上更贴近你需要的对象画像。`,
    note: MATCH_NOTES[candidate.code]
  };
}

function vulnerableMatch(style, pref, code) {
  const candidate = getType(code);
  const target = targetPartner(style, pref);
  const hookScore = Math.round(
    (
      (100 - Math.abs(target.warmth - candidate.vector.warmth)) * 0.32 +
      (100 - Math.abs(target.spark - candidate.vector.spark)) * 0.24 +
      (100 - Math.abs(target.directness - candidate.vector.directness)) * 0.22 +
      (100 - Math.abs(target.freedom - candidate.vector.freedom)) * 0.22
    ) / 4
  );
  const exploitScore = Math.round(
    (
      Math.abs(style.directness - candidate.vector.directness) * 0.24 +
      Math.abs(style.freedom - candidate.vector.freedom) * 0.22 +
      Math.abs(style.spark - candidate.vector.spark) * 0.18 +
      Math.abs(style.warmth - candidate.vector.warmth) * 0.16
    ) / 4
  );
  const finalScore = clamp(Math.round(hookScore * 0.72 + exploitScore * 0.28));
  return {
    code: candidate.code,
    title: candidate.name,
    tag: candidate.tag,
    note: MATCH_NOTES[candidate.code],
    hookScore,
    exploitScore,
    finalScore
  };
}

function hottestMatch(style, pref, code) {
  const candidate = getType(code);
  const score = Math.round(
    (
      (100 - Math.abs(pref.spark - candidate.vector.spark)) * 0.42 +
      (100 - Math.abs(pref.warmth - candidate.vector.warmth)) * 0.28 +
      (100 - Math.abs(style.spark - candidate.vector.spark)) * 0.18 +
      (100 - Math.abs(style.directness - candidate.vector.directness)) * 0.12
    ) / 4
  );
  return { code: candidate.code, title: candidate.name, tag: candidate.tag, note: MATCH_NOTES[candidate.code], finalScore: clamp(score) };
}

function heartbreakMatch(style, pref, code) {
  const candidate = getType(code);
  const score = Math.round(
    (
      Math.abs(style.warmth - candidate.vector.warmth) * 0.28 +
      Math.abs(style.freedom - candidate.vector.freedom) * 0.26 +
      Math.abs(style.directness - candidate.vector.directness) * 0.24 +
      (100 - Math.abs(pref.spark - candidate.vector.spark)) * 0.22
    ) / 4
  );
  return { code: candidate.code, title: candidate.name, tag: candidate.tag, note: MATCH_NOTES[candidate.code], finalScore: clamp(score) };
}

function dramaMatch(style, pref, code) {
  const candidate = getType(code);
  const score = Math.round(
    (
      Math.abs(style.rhythm - candidate.vector.rhythm) * 0.3 +
      Math.abs(style.directness - candidate.vector.directness) * 0.24 +
      Math.abs(style.spark - candidate.vector.spark) * 0.22 +
      Math.abs(style.freedom - candidate.vector.freedom) * 0.24
    ) / 4
  );
  return { code: candidate.code, title: candidate.name, tag: candidate.tag, note: MATCH_NOTES[candidate.code], finalScore: clamp(score) };
}

function explainScore(item) {
  const fitText =
    item.fitScore >= 75 ? "它和你这次测出来的理想对象画像非常贴。" :
    item.fitScore >= 60 ? "它和你要的对象画像基本对路。" :
    "它不是最像你预设理想型的那种，但别的项在加分。";
  const complementText =
    item.complementBonus >= 8 ? "同时它对你有明显互补，能补到你关系里的短板。" :
    item.complementBonus >= 4 ? "同时它有一定互补效果，不只是单纯像你喜欢的类型。" :
    "它不是靠强互补赢的，更多还是整体适配。";
  const stabilityText =
    item.stabilityBonus >= 8 ? "更重要的是，长期相处时这类组合通常不容易互相折磨。" :
    item.stabilityBonus >= 4 ? "长期稳定性也不错，不太容易谈成消耗战。" :
    "不过它的强项不在长期稳定，更多是当下有感觉。";
  return `${fitText}注意，贴合度是主分，互补度和稳定度是 bonus 加分，量级本来就更小，不和贴合度按同一把尺子比较。${complementText}${stabilityText}`;
}

function vulnerableSummary(item) {
  const hookText =
    item.hookScore >= 72 ? "这类人几乎就是照着你的偏好长的，出场就容易让你心里先响警报又先动心。" :
    item.hookScore >= 60 ? "这类人很容易戳中你吃的那一口，不一定最稳，但很容易先有感觉。" :
    "这类人不是你标准理想型，但偏偏有些点会让你忍不住多看两眼。";
  const exploitText =
    item.exploitScore >= 8 ? "更要命的是，他们踩你软肋的能力很强，容易让你一边觉得不妙，一边还是往前走。" :
    item.exploitScore >= 5 ? "他们不一定会正面碾压你，但很会在你最松的时候把你拿住。" :
    "他们未必能把你治得服服帖帖，但足够让你短暂失去一点清醒。";
  return `${hookText}${exploitText}`;
}

function hottestSummary(item) {
  return item.finalScore >= 72
    ? "这类人不是最稳的，但非常容易让你在短时间内迅速上头，脑子还没反应过来，心已经先冲出去了。"
    : "这类人对你有种不太讲道理的吸引力，未必最适合，但就是容易让你多看两眼、多想一点。";
}

function heartbreakSummary(item) {
  return item.finalScore >= 20
    ? "这类人最容易把你谈得心态起伏，喜欢的时候很上头，翻车的时候也会让你怀疑自己是不是又眼瞎了。"
    : "这类人不一定最致命，但很容易在你最在意的地方给你来一下，让你后知后觉地难受。";
}

function dramaSummary(item) {
  return item.finalScore >= 18
    ? "你和这类人放在一起，特别容易一个想冲、一个想躲，或者一个太快、一个太慢，最后把关系谈成连续剧。"
    : "这类人不一定是烂桃花，但和你放一起时，鸡飞狗跳的概率会明显上升。";
}

function makeResult() {
  const selected = getType(state.selectedType);
  const verdict = TYPE_VERDICTS[state.selectedType];
  const style = AXES.reduce((acc, key) => {
    acc[key] = clamp(Math.round(selected.vector[key] * 0.45 + state.styleScores[key] * 0.55));
    return acc;
  }, {});
  const pref = AXES.reduce((acc, key) => {
    acc[key] = clamp(Math.round(selected.vector[key] * 0.2 + state.partnerScores[key] * 0.8));
    return acc;
  }, {});
  const ranked = TYPES
    .filter((item) => item.code !== state.selectedType)
    .map((item) => fit(style, pref, item.code))
    .sort((a, b) => b.finalScore - a.finalScore)
    .slice(0, 3);
  const vulnerable = TYPES
    .filter((item) => item.code !== state.selectedType)
    .map((item) => vulnerableMatch(style, pref, item.code))
    .sort((a, b) => b.finalScore - a.finalScore)[0];
  const hottest = TYPES
    .filter((item) => item.code !== state.selectedType)
    .map((item) => hottestMatch(style, pref, item.code))
    .sort((a, b) => b.finalScore - a.finalScore)[0];
  const heartbreak = TYPES
    .filter((item) => item.code !== state.selectedType)
    .map((item) => heartbreakMatch(style, pref, item.code))
    .sort((a, b) => b.finalScore - a.finalScore)[0];
  const drama = TYPES
    .filter((item) => item.code !== state.selectedType)
    .map((item) => dramaMatch(style, pref, item.code))
    .sort((a, b) => b.finalScore - a.finalScore)[0];
  const archetype =
    style.spark >= 58 && style.directness >= 58 ? "高能直球型" :
    style.warmth >= 58 && style.freedom <= 48 ? "深情抱团型" :
    style.freedom >= 58 ? "松弛观察型" :
    style.rhythm >= 58 ? "推进掌控型" :
    "慢热判断型";
  return {
    selectedType: state.selectedType,
    selectedTypeMeta: selected,
    verdictLine: verdict.line,
    verdictDetail: verdict.detail,
    archetype,
    styleScores: style,
    targetPartnerVector: targetPartner(style, pref),
    vulnerableMatch: vulnerable,
    hottestMatch: hottest,
    heartbreakMatch: heartbreak,
    dramaMatch: drama,
    ranked,
    summary: `${selected.code} · ${selected.name} 的底色，会让你在恋爱里天然带一点 ${archetype} 的味道。`
  };
}

function spicyLines(result) {
  const s = result.styleScores;
  const t = result.targetPartnerVector;
  const highNeed = Object.entries(t).sort((a, b) => b[1] - a[1]).slice(0, 2).map(([key]) => AXIS_META[key].right).join(" + ");
  return [
    { head: "刺激轴", text: s.spark >= 65 ? "你谈恋爱需要一点戏剧张力。太平，你会嫌像白开水；太淡，你会怀疑是不是根本没开始。" : s.spark <= 40 ? "你不是不要心动，你只是更讨厌低质量折腾。对你来说，稳定不是无聊，是高级筛选。" : "你是中间派：要有火花，但不要炸厨房。你喜欢有感觉，不喜欢纯失控。" },
    { head: "黏糊轴", text: s.warmth >= 65 ? "你一旦认真，照顾欲和投入度都会飙升。优点是很有温度，缺点是容易不知不觉接手太多。" : s.warmth <= 40 ? "你不是不深情，你只是讨厌廉价煽情。太甜太满的表达，会让你先起防御，不会先感动。" : "你有温度，但不爱把温度挂在脸上。于是经常出现心里已经靠近，嘴上还在装没事的场面。" },
    { head: "空间轴", text: s.freedom >= 65 ? "你想谈的是有边界的亲密，不是绑定套餐。谁把爱聊成占有，你会跑得非常快。" : s.freedom <= 40 ? "你对陪伴的需求其实比嘴上承认的更高。忽冷忽热和已读不回，对你杀伤力很大。" : "你对距离感很看人。遇到对的人会往前靠，遇到不对的人边界直接通电。" },
    { head: "理想对象", text: `你最容易被 ${highNeed} 这类特质精准拿捏。你要的不是模板化好人，而是能在关键点上接住你的人。` }
  ];
}

function holisticSummary(result) {
  const s = result.styleScores;
  const t = result.targetPartnerVector;
  const need = Object.entries(t).sort((a, b) => b[1] - a[1]).slice(0, 2).map(([key]) => AXIS_META[key].right);
  const open =
    s.spark >= 60 && s.directness >= 58 ? "你在关系里属于先点火、再收场的人。心动一旦成立，你不会愿意慢慢磨，所以常常既是气氛制造者，也是推进按钮本身。" :
    s.warmth >= 60 && s.freedom <= 48 ? "你不是路过型恋爱选手，你是投入型。你一旦认定一个人，会自动把对方往自己的生活系统里收编，陪伴感和兜底感都很强。" :
    s.freedom >= 60 ? "你不是不想亲密，你是不想失去自己。你会对边界、密度和控制感非常敏感，关系越重要，你越在乎自己能不能自由呼吸。" :
    "你整体是慢热判断型。表面看着平静，内心其实一直在收集信息、评估风险、确认值不值得认真。";
  const weakness =
    s.directness <= 40 ? "你的隐患在表达。你明明不是没感觉，但容易把一句话在心里来回加工，最后把能解决的问题拖成误会。" :
    s.rhythm <= 40 ? "你的隐患在节奏。你很讨厌被催，可有时候也会把原本有机会的关系拖进一种彼此都不敢确认的僵局。" :
    s.warmth <= 40 ? "你的隐患在外显温度。你不是没感情，你只是太怕廉价和油腻，所以经常已经在乎了，表面还像在走流程。" :
    "你的隐患在容错率。对方一旦太乱、太黏、太反复横跳，你的耐心会掉得很快，甚至快过好感。";
  const desire = `你更适合的对象，要在 ${need.join(" 和 ")} 这两个维度上接得住你。不是“人不错”就行，而是要真的懂你的恋爱运行逻辑。`;
  const fatal = need.includes("黏糊") ? "你最容易栽在会给情绪价值、又很会靠近的人手里，因为他们能精准撬开你的防线。" : "你最容易栽在精准踩中你偏好的人手里，因为那会让你的理智系统瞬间掉线。";
  return `${open}\n\n${weakness}\n\n${desire}${fatal}`;
}

function radarSvg(primary, secondary) {
  const size = 340;
  const cx = 170;
  const cy = 170;
  const r = 120;
  const angles = AXES.map((_, i) => -Math.PI / 2 + i * Math.PI * 2 / AXES.length);
  const point = (val, i) => `${(cx + Math.cos(angles[i]) * r * val / 100).toFixed(1)},${(cy + Math.sin(angles[i]) * r * val / 100).toFixed(1)}`;
  const polygon = (vector) => AXES.map((key, i) => point(vector[key], i)).join(" ");
  let grids = "";
  let axes = "";
  [20, 40, 60, 80, 100].forEach((level) => {
    grids += `<polygon points="${AXES.map((_, i) => point(level, i)).join(" ")}" fill="none" stroke="rgba(123,82,72,.14)" stroke-width="1"/>`;
  });
  AXES.forEach((key, i) => {
    const x = cx + Math.cos(angles[i]) * r;
    const y = cy + Math.sin(angles[i]) * r;
    const lx = cx + Math.cos(angles[i]) * (r + 24);
    const ly = cy + Math.sin(angles[i]) * (r + 24);
    axes += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="rgba(123,82,72,.18)" stroke-width="1"/>`;
    axes += `<text x="${lx}" y="${ly}" font-size="12" text-anchor="middle" fill="#8a685e">${AXIS_META[key].right}</text>`;
  });
  return `<svg viewBox="0 0 ${size} ${size}" width="100%" height="100%">${grids}${axes}<polygon points="${polygon(secondary)}" fill="rgba(239,170,99,.18)" stroke="#efaa63" stroke-width="2"/><polygon points="${polygon(primary)}" fill="rgba(200,82,76,.22)" stroke="#c8524c" stroke-width="3"/><circle cx="${cx}" cy="${cy}" r="4" fill="#7b5248"/></svg>`;
}

function reset(keepType = false) {
  const selectedType = keepType ? state.selectedType : "";
  state.selectedType = selectedType;
  state.pendingType = "";
  state.questionIndex = 0;
  state.answers = [];
  state.styleScores = emptyScores();
  state.partnerScores = emptyScores();
  state.result = null;
  state.justPicked = false;
}

function showScreen(id) {
  ["welcome", "quiz", "result", "review"].forEach((screenId) => {
    document.getElementById(screenId).classList.toggle("active", screenId === id);
  });
}

function renderAvatar(type) {
  return `<div class="avatar">${String(type.code).slice(0, 4)}</div>`;
}

function renderFloatingHearts() {
  return `<div class="floating-hearts"><span class="heart heart-1">❤</span><span class="heart heart-2">♡</span><span class="heart heart-3">❤</span><span class="heart heart-4">✦</span><span class="heart heart-5">♡</span></div>`;
}

function renderWelcome() {
  const el = document.getElementById("welcome");
  const pending = state.pendingType ? getType(state.pendingType) : null;
  el.innerHTML = `<div class="card hero-card">${renderFloatingHearts()}<div class="hero-layout"><div><div class="row"><span class="pill">SBTI LOVE LAB</span><span class="pill">16 型恋爱对象测试</span></div><h1 class="title">你的 SBTI，最适合谈哪一种疯感恋爱？</h1><p class="sub">选完人格，直接测出谁最适合你，谁最容易把你拿捏住。</p><div class="row" style="margin-top:18px;"><span class="pill">SBTI 命名</span><span class="pill">五边形图</span><span class="pill">辛辣解读</span></div></div><div class="hero-side"><div class="info-panel"><div class="info-label">还没测 SBTI？</div><div class="info-copy">什么，如果你还没测 SBTI，丢给你个网址去测！<a href="https://www.bilibili.com/blackboard/era/WijKT2bWuCJWPg8B.html" target="_blank" rel="noreferrer">Sbti官网</a></div></div><div class="info-panel"><div class="info-label">现在就选</div><div class="info-title">先挑你的人格卡，再开始做题。</div><div class="info-copy">找到最像你的那张，再往下测恋爱对象会更准。</div></div></div></div></div><div class="card picker-card"><div class="picker-head"><div><div class="picker-title">先选你的 SBTI</div><div class="picker-sub">先看气质标签，找到最像你的那张：</div></div><span class="pill">${state.selectedType ? `已选中 ${state.selectedType}` : "未选择人格"}</span></div><div class="type-grid">${TYPES.map((item, index) => `<div class="type-card ${state.selectedType === item.code ? "active" : ""}" data-type="${item.code}"><div class="type-topline"><div class="type-index">Type ${String(index + 1).padStart(2, "0")}</div>${state.selectedType === item.code ? '<div class="type-badge">已选中</div>' : '<div class="type-badge">点击选择</div>'}</div><div class="type-head">${renderAvatar(item)}<div><div class="type-code">${item.code}</div><div class="type-name">${item.name}</div><div class="type-tag">${item.tag}</div></div></div><div class="type-copy">${item.blurb}</div></div>`).join("")}</div></div><div class="card"><h2 style="font-size:26px;margin:0 0 16px;">结果怎么排</h2><div class="sub" style="margin-top:0;">题目会同时测你自己的恋爱表现，以及你更需要什么样的对象。</div><div class="sub">最终按贴合度、互补度、稳定度综合排序，给你 Top 3 匹配人格。</div></div><div class="actions"><button id="startBtn" class="btn">${state.selectedType ? `以 ${state.selectedType} 开始测试` : "开始测试"}</button></div>${pending ? `<div class="modal-mask"><div class="modal-card"><div class="modal-kicker">已选中</div><div class="modal-title">${pending.code} · ${pending.name}</div><div class="modal-copy">你选中了 ${pending.code}，开始测试？</div><div class="modal-actions"><button id="confirmNo" class="btn-secondary">否</button><button id="confirmYes" class="btn">是</button></div></div></div>` : ""}`;
  el.querySelectorAll("[data-type]").forEach((node) => {
    node.onclick = () => {
      state.pendingType = node.dataset.type;
      renderWelcome();
    };
  });
  el.querySelector("#startBtn").onclick = () => {
    if (!state.selectedType) {
      alert("先选你的人格。");
      return;
    }
    reset(true);
    renderQuiz();
    showScreen("quiz");
  };
  if (pending) {
    el.querySelector("#confirmNo").onclick = () => {
      state.pendingType = "";
      renderWelcome();
    };
    el.querySelector("#confirmYes").onclick = () => {
      state.selectedType = state.pendingType;
      state.pendingType = "";
      reset(true);
      renderQuiz();
      showScreen("quiz");
    };
  }
}

function chooseAndGo(optionIndex) {
  const q = QUESTIONS[state.questionIndex];
  const picked = q.options[Number(optionIndex)];
  state.answers.push({ sceneTitle: q.sceneTitle, questionText: q.text, optionText: picked.text });
  state.styleScores = mergeScores(state.styleScores, picked.effect);
  state.partnerScores = mergeScores(state.partnerScores, picked.partner);
  state.justPicked = true;
  renderQuiz();
  setTimeout(() => {
    state.questionIndex += 1;
    state.justPicked = false;
    if (state.questionIndex >= QUESTIONS.length) {
      state.result = makeResult();
      renderResult();
      showScreen("result");
      return;
    }
    renderQuiz();
  }, 220);
}

function renderQuiz() {
  const q = QUESTIONS[state.questionIndex];
  const scene = QUIZ_SCENES[q.sceneIndex];
  const done = scene.questions.filter((_, idx) => idx < (state.questionIndex - q.sceneIndex * 3)).length;
  const progress = ((state.questionIndex + 1) / QUESTIONS.length) * 100;
  const type = getType(state.selectedType);
  const el = document.getElementById("quiz");
  el.innerHTML = `<div class="card floating-wrap">${renderFloatingHearts()}<div class="top"><div class="row"><span class="pill">你的底色：${type.code} · ${type.name}</span><span class="pill">第 ${state.questionIndex + 1} / ${QUESTIONS.length} 题</span></div><div class="status">${state.justPicked ? "已选择" : q.sceneTitle}</div></div><h1 class="title" style="font-size:32px;">${q.sceneTitle}</h1><p class="sub">${q.sceneSetting}</p><div style="margin-top:18px;"><div class="track"><div class="fill" style="width:${progress}%;"></div></div><div class="prog">当前关卡进度 ${done + 1} / ${scene.questions.length}</div></div></div><div class="card question-shell"><div class="question-kicker">如果这事真发生，你八成会：</div><h2 class="question-title">${q.text}</h2><div class="list">${q.options.map((item, index) => `<div class="option-card" data-option="${index}"><div class="mark">${String.fromCharCode(65 + index)}</div><div class="option-text">${item.text}</div></div>`).join("")}</div></div><div class="actions"><button id="backBtn" class="btn-secondary">返回首页</button></div>`;
  el.querySelectorAll("[data-option]").forEach((node) => {
    node.onclick = () => {
      if (state.justPicked) return;
      chooseAndGo(node.dataset.option);
    };
  });
  el.querySelector("#backBtn").onclick = () => showScreen("welcome");
}

function renderResult() {
  const r = state.result;
  const spicy = spicyLines(r);
  const summary = holisticSummary(r);
  const el = document.getElementById("result");
  el.innerHTML = `<div class="card floating-wrap">${renderFloatingHearts()}<div class="row"><span class="pill">你的恋爱风格：${r.archetype}</span></div><h2 class="title" style="font-size:36px;">${r.selectedType} · ${r.selectedTypeMeta.name}</h2><p class="sub">${r.summary}</p><div class="verdict-hero"><div class="verdict-line">${r.verdictLine}</div><div class="verdict-detail">${r.verdictDetail}</div></div></div><div class="card"><h3 style="font-size:26px;margin:0 0 16px;">五边形风格图</h3><div class="radar-wrap"><div class="radar-box">${radarSvg(r.styleScores, r.targetPartnerVector)}</div><div><div class="legend"><div class="legend-item"><span class="dot" style="background:#c8524c"></span>你的恋爱风格</div><div class="legend-item"><span class="dot" style="background:#efaa63"></span>理想对象画像</div></div><p class="sub" style="margin-top:14px;">红色是你在关系里的真实风格，橙色是系统推出来的“你更适合什么样的人”。这张图是用来解释下面为什么是这 3 个结果。</p><div class="summary-box"><div class="summary-title">综合分析</div><div class="summary-copy">${summary.replace(/\n\n/g, "<br><br>")}</div></div></div></div></div><div class="spicy-card"><div class="spicy-title">辛辣解读</div><div class="spicy-copy">别装了，我来告诉你你在恋爱里到底什么死样：</div><div class="spicy-grid">${spicy.map((item) => `<div class="spicy-item"><div class="spicy-head">${item.head}</div><div class="spicy-text">${item.text}</div></div>`).join("")}</div></div><div class="card"><h3 style="font-size:26px;margin:0 0 10px;">最适合你的 3 种对象人格</h3><p class="sub" style="margin-top:0;">总分是最终排序分。贴合度是主分；互补度和稳定度是 bonus 加分，量级本来更小，不和贴合度按同一把尺子比。</p><div class="list">${r.ranked.map((item, index) => `<div class="match-card"><div class="match-head"><div><div class="match-rank">No.${index + 1} · ${item.code}</div><div class="match-name">${item.title}</div></div><div class="match-score">总分 ${item.finalScore}</div></div><div class="match-copy">${item.tag}</div><div class="match-reason">${item.reason}</div><div class="row" style="margin-top:12px;"><span class="pill">贴合度 ${item.fitScore}</span><span class="pill">互补加分 ${item.complementBonus}</span><span class="pill">稳定加分 ${item.stabilityBonus}</span></div><div class="match-copy">${explainScore(item)}</div><div class="match-copy">${item.note}</div></div>`).join("")}</div></div><div class="card"><h3 style="font-size:26px;margin:0 0 10px;">谁最容易把你拿捏住</h3><p class="sub" style="margin-top:0;">这不是最适合你的那类人，这是最容易把你脑子和防线一起掰弯的那类人。</p><div class="match-card"><div class="match-head"><div><div class="match-rank">危险对象 · ${r.vulnerableMatch.code}</div><div class="match-name">${r.vulnerableMatch.title}</div></div><div class="match-score">拿捏指数 ${r.vulnerableMatch.finalScore}</div></div><div class="match-copy">${r.vulnerableMatch.tag}</div><div class="row" style="margin-top:12px;"><span class="pill">上头指数 ${r.vulnerableMatch.hookScore}</span><span class="pill">破防指数 ${r.vulnerableMatch.exploitScore}</span></div><div class="match-copy">${vulnerableSummary(r.vulnerableMatch)}</div><div class="match-copy">这类人会先让你觉得“完了我好像很吃这套”，然后你就开始一边嘴硬一边往前送。</div><div class="match-copy">${r.vulnerableMatch.note}</div></div></div><div class="card"><h3 style="font-size:26px;margin:0 0 10px;">谁最容易让你上头</h3><p class="sub" style="margin-top:0;">这种不是一定适合你，但就是容易让你清醒值掉线，心比脑子先冲出去。</p><div class="match-card"><div class="match-head"><div><div class="match-rank">上头对象 · ${r.hottestMatch.code}</div><div class="match-name">${r.hottestMatch.title}</div></div><div class="match-score">上头指数 ${r.hottestMatch.finalScore}</div></div><div class="match-copy">${r.hottestMatch.tag}</div><div class="row" style="margin-top:12px;"><span class="pill">心动指数 ${r.hottestMatch.finalScore}</span><span class="pill">失智指数 ${Math.max(0, r.hottestMatch.finalScore - 8)}</span></div><div class="match-copy">${hottestSummary(r.hottestMatch)}</div><div class="match-copy">${r.hottestMatch.note}</div></div></div><div class="card"><h3 style="font-size:26px;margin:0 0 10px;">谁最容易把你谈破防</h3><p class="sub" style="margin-top:0;">这种人最会在你嘴硬的时候把你心态打穿，谈着谈着你就开始怀疑自己。</p><div class="match-card"><div class="match-head"><div><div class="match-rank">破防对象 · ${r.heartbreakMatch.code}</div><div class="match-name">${r.heartbreakMatch.title}</div></div><div class="match-score">破防指数 ${r.heartbreakMatch.finalScore}</div></div><div class="match-copy">${r.heartbreakMatch.tag}</div><div class="row" style="margin-top:12px;"><span class="pill">内耗指数 ${r.heartbreakMatch.finalScore}</span><span class="pill">扎心指数 ${Math.max(0, r.heartbreakMatch.finalScore - 6)}</span></div><div class="match-copy">${heartbreakSummary(r.heartbreakMatch)}</div><div class="match-copy">${r.heartbreakMatch.note}</div></div></div><div class="card"><h3 style="font-size:26px;margin:0 0 10px;">谁最容易和你互相折磨</h3><p class="sub" style="margin-top:0;">这种组合不一定不爱，但很容易一个不服一个，最后把关系谈得狗血又上头。</p><div class="match-card"><div class="match-head"><div><div class="match-rank">互磨对象 · ${r.dramaMatch.code}</div><div class="match-name">${r.dramaMatch.title}</div></div><div class="match-score">狗血指数 ${r.dramaMatch.finalScore}</div></div><div class="match-copy">${r.dramaMatch.tag}</div><div class="row" style="margin-top:12px;"><span class="pill">互呛指数 ${r.dramaMatch.finalScore}</span><span class="pill">发疯指数 ${Math.max(0, r.dramaMatch.finalScore - 5)}</span></div><div class="match-copy">${dramaSummary(r.dramaMatch)}</div><div class="match-copy">${r.dramaMatch.note}</div></div></div><div class="actions"><button id="reviewBtn" class="btn">查看详细复盘</button><button id="restartBtn" class="btn-secondary">重新测一次</button></div>`;
  el.querySelector("#reviewBtn").onclick = () => {
    renderReview();
    showScreen("review");
  };
  el.querySelector("#restartBtn").onclick = () => {
    reset(true);
    renderQuiz();
    showScreen("quiz");
  };
}

function renderReview() {
  const r = state.result;
  const el = document.getElementById("review");
  el.innerHTML = `<div class="card floating-wrap">${renderFloatingHearts()}<div class="row"><span class="pill">详细复盘</span></div><h2 class="title" style="font-size:30px;">${r.selectedType} 的理想对象画像</h2><p class="sub">下面这组分数不是你本人，而是这次测试推导出的你更适合什么样的人。</p><div class="grid" style="margin-top:18px;">${Object.entries(r.targetPartnerVector).map(([key, value]) => `<div class="metric-card"><div class="metric-label">${AXIS_META[key].left} / ${AXIS_META[key].right}</div><div class="metric-value">${value}</div></div>`).join("")}</div></div><div class="card"><h3 style="font-size:26px;margin:0 0 16px;">你的全部选择</h3><div class="list">${state.answers.map((item) => `<div class="answer-card"><div class="answer-scene">${item.sceneTitle}</div><div class="answer-question">${item.questionText}</div><div class="answer-choice">${item.optionText}</div></div>`).join("")}</div></div><div class="actions"><button id="backResultBtn" class="btn">返回结果页</button><button id="restartAgainBtn" class="btn-secondary">重新测一次</button></div>`;
  el.querySelector("#backResultBtn").onclick = () => showScreen("result");
  el.querySelector("#restartAgainBtn").onclick = () => {
    reset(true);
    renderQuiz();
    showScreen("quiz");
  };
}

renderWelcome();
