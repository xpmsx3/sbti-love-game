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

const SBTI_TYPES = [
  { code: "CTRL", name: "拿捏者", tag: "被我拿住了吧", blurb: "很会把握节奏和心理距离，爱里也天然带一点控场欲。" },
  { code: "ATM-er", name: "送钱者", tag: "你以为我很有钱吗", blurb: "付出型人格偏重，容易在关系里多给、多管、多兜底。" },
  { code: "Dior-s", name: "屌丝", tag: "等我逆袭", blurb: "嘴上看破红尘，心里还是很想赢回来。" },
  { code: "BOSS", name: "领导者", tag: "方向盘给我", blurb: "讨厌失控，喜欢把关系拉回可执行状态。" },
  { code: "THAN-K", name: "感恩者", tag: "我感谢苍天大地", blurb: "很能感受到善意，也会把情感回馈做得很满。" },
  { code: "OH-NO!", name: "哦不人", tag: "怎么又是我", blurb: "容易先慌一下，但慌里带真诚，情绪反应很鲜活。" },
  { code: "GOGO", name: "行者", tag: "先冲再说", blurb: "推进欲很强，机会摆在眼前不会装瞎。" },
  { code: "SEXY", name: "尤物", tag: "天生就很会", blurb: "存在感和吸引力都偏强，走到哪都容易被注意到。" },
  { code: "LOVE-R", name: "多情者", tag: "爱意太满了", blurb: "情绪一旦启动，速度能甩理智三条街。" },
  { code: "MUM", name: "妈妈", tag: "你吃了吗", blurb: "天然带照顾属性，谈着谈着就想兜底。" },
  { code: "FAKE", name: "伪人", tag: "已经没人类了", blurb: "社交面具切换熟练，真实情绪藏得比较深。" },
  { code: "OJBK", name: "无所谓人", tag: "都行都可以", blurb: "弹性大，不爱控制人，也不喜欢被安排太满。" },
  { code: "MALO", name: "吗喽", tag: "人生是个副本", blurb: "动起来很快，停下来很难，容易把生活过成闯关游戏。" },
  { code: "JOKE-R", name: "小丑", tag: "先拿自己开刀", blurb: "会用幽默藏情绪，也会用玩笑挡真心。" },
  { code: "WOC!", name: "握草人", tag: "这也太离谱了", blurb: "反应猛、吐槽快、情绪外放，存在感不是一般地强。" },
  { code: "THIN-K", name: "思考者", tag: "我再想想", blurb: "脑内会开很多会，行动通常排在分析之后。" },
  { code: "SHIT", name: "愤世者", tag: "世界烂透了", blurb: "防御性强，对人对事都容易先挑问题，再决定信不信。" },
  { code: "ZZZZ", name: "装死者", tag: "我没死只是睡了", blurb: "遇到压力会先掉线，能拖就拖，能躲就躲。" },
  { code: "POOR", name: "贫困者", tag: "我穷但我专", blurb: "精力珍贵，所以只想投给值得的人。" },
  { code: "MONK", name: "僧人", tag: "没有那种世俗的欲望", blurb: "边界感很强，看起来平静，其实不是谁都进得去。" },
  { code: "IMSB", name: "傻者", tag: "我真是傻吗", blurb: "一边心动一边自我拉扯，内耗能力惊人。" },
  { code: "SOLO", name: "孤儿", tag: "一个人也能过", blurb: "独立惯了，越在乎越不愿意显得依赖。" },
  { code: "FUCK", name: "草者", tag: "先爆再说", blurb: "脾气来得快，热情也来得快，能量感很强。" },
  { code: "DEAD", name: "死者", tag: "我还活着吗", blurb: "情绪低电量的时候像灵魂下线，反应慢、表达更慢。" },
  { code: "IMFW", name: "废物", tag: "我不会又搞砸吧", blurb: "敏感，真诚，也很容易因为一点反馈就怀疑自己。" },
  { code: "HHHH", name: "傻乐者", tag: "哈哈哈哈先笑了", blurb: "擅长把尴尬和崩坏现场都处理成段子素材。" },
  { code: "DRUNK", name: "酒鬼", tag: "烈酒烧喉", blurb: "情绪上来以后很容易放大氛围，越夜越容易真情外泄。" }
];

const SBTI_TYPE_VECTORS = {
  CTRL: { spark: 55, warmth: 42, freedom: 30, directness: 84, rhythm: 76 },
  "ATM-er": { spark: 46, warmth: 68, freedom: 28, directness: 44, rhythm: 60 },
  "Dior-s": { spark: 52, warmth: 44, freedom: 56, directness: 34, rhythm: 48 },
  BOSS: { spark: 54, warmth: 36, freedom: 34, directness: 82, rhythm: 86 },
  "THAN-K": { spark: 36, warmth: 78, freedom: 34, directness: 52, rhythm: 58 },
  "OH-NO!": { spark: 58, warmth: 66, freedom: 40, directness: 36, rhythm: 46 },
  GOGO: { spark: 78, warmth: 48, freedom: 54, directness: 78, rhythm: 82 },
  SEXY: { spark: 80, warmth: 62, freedom: 48, directness: 66, rhythm: 70 },
  "LOVE-R": { spark: 72, warmth: 86, freedom: 26, directness: 58, rhythm: 74 },
  MUM: { spark: 44, warmth: 88, freedom: 24, directness: 52, rhythm: 66 },
  FAKE: { spark: 50, warmth: 34, freedom: 62, directness: 30, rhythm: 44 },
  OJBK: { spark: 48, warmth: 52, freedom: 76, directness: 46, rhythm: 30 },
  MALO: { spark: 74, warmth: 40, freedom: 64, directness: 54, rhythm: 68 },
  "JOKE-R": { spark: 72, warmth: 50, freedom: 58, directness: 52, rhythm: 46 },
  "WOC!": { spark: 84, warmth: 46, freedom: 50, directness: 86, rhythm: 72 },
  "THIN-K": { spark: 34, warmth: 40, freedom: 58, directness: 42, rhythm: 34 },
  SHIT: { spark: 42, warmth: 28, freedom: 68, directness: 76, rhythm: 40 },
  ZZZZ: { spark: 24, warmth: 34, freedom: 88, directness: 22, rhythm: 18 },
  POOR: { spark: 40, warmth: 56, freedom: 46, directness: 48, rhythm: 58 },
  MONK: { spark: 32, warmth: 36, freedom: 78, directness: 40, rhythm: 42 },
  IMSB: { spark: 45, warmth: 70, freedom: 44, directness: 24, rhythm: 38 },
  SOLO: { spark: 38, warmth: 42, freedom: 82, directness: 44, rhythm: 36 },
  FUCK: { spark: 86, warmth: 42, freedom: 52, directness: 88, rhythm: 72 },
  DEAD: { spark: 18, warmth: 26, freedom: 90, directness: 16, rhythm: 12 },
  IMFW: { spark: 42, warmth: 74, freedom: 40, directness: 28, rhythm: 40 },
  HHHH: { spark: 84, warmth: 58, freedom: 60, directness: 62, rhythm: 56 },
  DRUNK: { spark: 76, warmth: 54, freedom: 42, directness: 74, rhythm: 66 }
};

const SBTI_TYPE_VERDICTS = {
  CTRL: { line: "你谈恋爱不是随缘，你谈恋爱像在拿遥控器。", detail: "你很会看局、拿节奏、留悬念，天生就有一点把别人情绪握在手里的本事。你要学的不是更会拿捏，是别把亲密关系谈成操盘局。" },
  "ATM-er": { line: "你不是在谈恋爱，你有时候像在做慈善。", detail: "你对喜欢的人容易多给一点、再多给一点，给到最后自己都想问一句：我到底是在被爱，还是在贴补项目亏损？" },
  "Dior-s": { line: "你嘴上认命，心里还在等逆袭剧本。", detail: "你不是不想爱，你是不想再输得太难看。所以你会先嘴硬、先装佛、先给自己留台阶，但真上头的时候还是会狠狠认真。" },
  BOSS: { line: "你谈恋爱默认自己得控盘。", detail: "你对推进、节奏、确定性都特别敏感，不爱拖、不爱耗、不爱不清不楚。问题是你有时太像在带项目，容易忘了爱不是 KPI。" },
  "THAN-K": { line: "你在恋爱里最擅长的，是把一点点好记得像救命之恩。", detail: "你吃温柔，也会回温柔，所以很适合稳定关系。但你也容易因为太会感恩，给了别人本不该有的加分。" },
  "OH-NO!": { line: "你不是脆弱，你是反应系统永远比别人先一步爆灯。", detail: "你很真实，真实到情绪一上来根本藏不住。可爱是真可爱，慌也是真会慌，所以更需要能让你稳下来的关系。" },
  GOGO: { line: "你不适合拉扯，你适合有风就起飞。", detail: "你是那种只要觉得对，就会把关系往前推的人。你不是没耐心，你只是知道很多暧昧消耗根本不值那个价。" },
  SEXY: { line: "你不是故意钓，你是天然就会让人多看两眼。", detail: "你有存在感，也懂魅力这回事，所以很容易吸来人。但真正难的不是吸引，是筛掉只想被你迷一下的人。" },
  "LOVE-R": { line: "你谈恋爱像通电，亮得快，热得也快。", detail: "你不是不懂风险，你只是很容易在感觉成立时迅速投入。真正适合你的人，要接得住你的浓度，而不是只会享受你的热。" },
  MUM: { line: "你一认真，就容易把恋爱谈成半个育儿项目。", detail: "你很会照顾人，也很容易在关系里自动补位、自动兜底。你要小心的是别把自己谈成对方的售后。" },
  FAKE: { line: "你最难的不是开始关系，是让别人看见真的你。", detail: "你很懂社交表层怎么运转，但真情绪不会轻易交出去。真正能走近你的人，往往不是最热闹的，而是最让你放松的。" },
  OJBK: { line: "你看起来都行，其实你对舒服这件事非常挑。", detail: "你不是没要求，你只是讨厌把要求说得很硬。你真正喜欢的关系，是轻盈、不别扭、彼此都不用太费力。" },
  MALO: { line: "你的人生像副本，恋爱也经常被你玩成闯关模式。", detail: "你动得快，试得快，脑子也转得快，所以关系里总有一股'先冲了再说'的生猛劲儿。刺激感很够，稳定性就未必。" },
  "JOKE-R": { line: "你最会拿幽默救场，也最会拿幽默藏心。", detail: "你能让关系变轻松，但也容易把真正重要的话包进玩笑里。别人觉得你好相处，未必知道你认真起来有多深。" },
  "WOC!": { line: "你不是情绪多，你是动静都特别大。", detail: "你表达猛、反应快、火力足，开心和崩溃都不会太小声。跟你谈恋爱很难无聊，但也很难完全风平浪静。" },
  "THIN-K": { line: "你的恋爱启动慢，不是因为不想，是因为脑子先开会。", detail: "你会想很多，也会把每一个细节都放进评估系统里。你需要的对象不是催你快点，而是让你越想越安心。" },
  SHIT: { line: "你不是难搞，你只是对世界先天带点不信任。", detail: "你容易先看到漏洞、先看到问题、先看到人会不会让你失望。所以你嘴可能很硬，但真被接住以后反而挺深情。" },
  ZZZZ: { line: "你不是佛，你很多时候只是先装死。", detail: "遇到压力你容易掉线，遇到冲突你容易缩回去，像先把自己关成省电模式。你适合的不是追着你跑的人，而是能稳稳把你叫回来的。" },
  POOR: { line: "你不是抠门，你是只想把真心花在值的地方。", detail: "你的精力分配很现实，所以你不会轻易乱投。你要的是那种值得你持续投入、而不是反复消耗的关系。" },
  MONK: { line: "你不是没人追，你是筛选器开得像寺庙山门。", detail: "你谈恋爱最强的不是热情，是边界。能让你动心的人，必须先通过你那套很安静但很严格的内部审核。" },
  IMSB: { line: "你不是恋爱脑，你是恋爱里的自我审判长。", detail: "你最大的戏不一定发生在关系里，很多时候发生在你自己的脑内法庭。你会爱，也会在爱里反复质问自己够不够好。" },
  SOLO: { line: "你不是冷，你只是早就习惯了一个人扛。", detail: "你对依赖这件事会天然谨慎，所以越在乎越容易装得没事。你需要的对象，不是催你打开阀门，而是让你觉得可以不用硬撑。" },
  FUCK: { line: "你的问题从来不是没火花，是火花有时候太大了。", detail: "你反应快、表达猛、情绪也来得真。吸引力很强，但也容易把场面推到过热，所以你需要的是能接住你而不是跟你互炸的人。" },
  DEAD: { line: "你不是高冷，你是灵魂经常低电量。", detail: "你会累、会空、会突然像情绪退出登录。你不是不需要爱，你只是需要更安静、更不折腾、更不会过度消耗你的关系。" },
  IMFW: { line: "你表面想要稳稳被爱，实际很怕自己先搞砸。", detail: "你很软，也很真，所以特别容易把对方的细小反应放大成对自己的评价。你需要的不是大道理，是稳定反馈。" },
  HHHH: { line: "你拿喜剧感谈恋爱，但不代表你只想玩玩。", detail: "你擅长把尴尬化解成笑点，把沉重打散成空气感。别人觉得你轻松，其实你只是比很多人更会处理场面。" },
  DRUNK: { line: "你不是一定爱喝，你是很容易在气氛里上头。", detail: "你吃感觉、吃氛围、吃夜晚、吃暧昧，一旦场子热起来，你的真心和冲动都比白天更容易泄洪。" }
};

const SBTI_MATCH_NOTES = {
  CTRL: "这类人很会拿节奏、控距离，适合喜欢明确推进感的人，但不太适合极度抗拒被带节奏的人。",
  "ATM-er": "这类人付出欲强，能把陪伴感拉满，但也容易在关系里给太多，需要会回馈的人。",
  "Dior-s": "这类人表面嘴硬，内里其实很在意输赢和投入，熟了之后反而很有后劲。",
  BOSS: "这类人擅长控场和推进，适合想要确定性的人，但不适合极度讨厌被带节奏的人。",
  "THAN-K": "这类人很吃善意也很会回馈善意，关系里温度高，适合想要被珍惜感的人。",
  "OH-NO!": "这类人反应快、情绪鲜，跟他们在一起很有活人感，但也需要能稳住情绪波动。",
  GOGO: "这类人推进很快，跟他们在一起不容易卡在暧昧期，节奏感很强。",
  SEXY: "这类人吸引力很强，互动张力足，适合吃化学反应的人，但也容易招来不够稳定的注意力。",
  "LOVE-R": "这类人浓度高、反馈快，能迅速把关系加热，但也更吃对方的回应质量。",
  MUM: "这类人很会照顾人，陪伴感和兜底感很足，容易让人产生被稳稳接住的感觉。",
  FAKE: "这类人社交上很稳，但真正的真心不会随便给，适合慢慢建立信任。",
  OJBK: "这类人不爱控制也不爱折腾，和他们相处通常轻松，没那么容易窒息。",
  MALO: "这类人行动欲强、场子也热，跟他们在一起很难无聊，但稳定性更看双方节奏是否合拍。",
  "JOKE-R": "这类人很会制造轻松感，和他们在一起不容易闷，但也要小心他们拿玩笑挡真心。",
  "WOC!": "这类人火力猛、反馈快、上头感强，适合重口味互动，不适合只想风平浪静的人。",
  "THIN-K": "这类人行动前会想很多，优点是谨慎稳定，缺点是热起来比较慢。",
  SHIT: "这类人判断力强，不容易盲信人，适合想要清醒关系的人，但前期会显得不太好接近。",
  ZZZZ: "这类人不爱折腾，边界感强，适合低消耗关系，但不适合需要高频反馈的人。",
  POOR: "这类人不乱投精力，一旦决定认真，通常比表面更专一、更能长期投入。",
  MONK: "这类人不是热闹挂的，但胜在边界清楚、情绪不乱，适合把关系谈得安静又耐久。",
  IMSB: "这类人敏感度高，会认真接情绪，但也需要足够的安全感，不然容易一起内耗。",
  SOLO: "这类人很尊重边界，不会瞎粘人，适合需要空间感和松弛感的关系。",
  FUCK: "这类人反应快、火花足、存在感强，适合吃强互动的人，不适合只想岁月静好的人。",
  DEAD: "这类人低能耗、低存在波动，适合想要平静感的人，但不适合高刺激高反馈型关系。",
  IMFW: "这类人真诚软糯，能给关系温度，但需要稳定反馈，不能靠忽冷忽热养着。",
  HHHH: "这类人会把关系里的尴尬和沉重消化成轻松气氛，恋爱体验感通常不差。",
  DRUNK: "这类人很吃氛围，夜晚和情绪都会放大他们的投入，适合有浪漫感但也要防上头过快。"
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
    title: "关卡一：原始部落篝火夜",
    setting: "你穿回原始时代，部落今晚围着篝火分烤肉、跳战舞、传骨哨。一个顺眼的人把兽皮往你这边挪了半寸，整个部落都在偷看你们会不会搞出点原始暧昧。",
    questions: [
      {
        text: "对方把最大块烤肉递给你，自己只留了一截骨头。你第一反应会是什么？",
        options: [
          makeOption("先接住，再顺手把火候最好的那块撕给他。会照顾人，不代表我要演得像神明下凡。", { warmth: 2, rhythm: 1 }, { warmth: 2, directness: 1 }),
          makeOption("先逗他一句：你这是求偶，还是想把我喂胖后方便冬天储备？", { spark: 2, directness: 1 }, { spark: 2, warmth: 1 }),
          makeOption("先观察他的表情和动机，肉可以吃，信号不能乱判，不然很容易把客气脑补成天命。", { freedom: 1, directness: -1, rhythm: 1 }, { directness: 2, freedom: 1 })
        ]
      },
      {
        text: "祭司突然宣布：要选一对人一起守夜。对方看了你一眼，你会怎么接这球？",
        options: [
          makeOption("直接说一起吧，反正夜都要熬，不如把局面推进到能聊点真的。", { rhythm: 2, directness: 2 }, { rhythm: 2, directness: 1 }),
          makeOption("笑着说看他敢不敢，暧昧可以有，但我得先确认这人是不是经得起逗。", { spark: 2, freedom: 1 }, { spark: 2, freedom: 1 }),
          makeOption("让他先表态，我可以接近人，但不爱替别人把心思说完。", { freedom: 2, directness: -1 }, { directness: 2, freedom: 1 })
        ]
      },
      {
        text: "跳战舞时，对方节拍乱了，还差点踩到你。你更像怎么处理？",
        options: [
          makeOption("直接扶一下节奏，顺便把他拉回拍点。喜欢的人可以笨，但现场不能散。", { rhythm: 2, directness: 1 }, { rhythm: 2, warmth: 1 }),
          makeOption("先笑疯，再跟着一起乱跳。爱是气氛，不是精准到每一步都像军事演习。", { spark: 2, warmth: 1 }, { spark: 2, warmth: 1 }),
          makeOption("假装没事，但心里已经默默记下：这人紧张的时候容易手忙脚乱。", { freedom: 1, directness: -1, warmth: 1 }, { freedom: 2, warmth: 1 })
        ]
      },
      {
        text: "守夜时对方突然问：如果明天狩猎回来的人只有一个，你希望是谁？",
        options: [
          makeOption("直接回：当然是你，别逼我在这种时候装高冷。", { warmth: 2, directness: 2 }, { warmth: 2, directness: 1 }),
          makeOption("回他一句：活着回来再说，先别拿生死局搞我心跳。", { spark: 1, directness: 1, freedom: 1 }, { spark: 1, freedom: 1 }),
          makeOption("先把问题绕回去，想听他为什么突然这么问。比答案更重要的是他的来路。", { directness: 1, freedom: 1, rhythm: 1 }, { directness: 2, rhythm: 1 })
        ]
      },
      {
        text: "天快亮时，他把骨哨塞你手里，说‘下次你想见我就吹’。你会怎么收尾？",
        options: [
          makeOption("收下，并且当场约定下次一起干嘛。暧昧留白可以，但别留成考古项目。", { rhythm: 2, directness: 1 }, { rhythm: 2, warmth: 1 }),
          makeOption("收下后先嘴硬一句‘你最好别后悔’，转头已经在想今晚挺好玩。", { spark: 2, directness: -1 }, { spark: 2, warmth: 1 }),
          makeOption("收下，但不急着用。好东西值得慢一点，不必每次心动都立刻点火。", { freedom: 2, spark: -1 }, { freedom: 2, rhythm: 1 })
        ]
      }
    ]
  },
  {
    title: "关卡二：古代城邦上元夜",
    setting: "时间跳到古代城邦，上元灯会、人潮、诗谜、游船全都挤在一条河上。你和对方被人群冲散又碰头，命运看起来比摊贩还会做生意。",
    questions: [
      {
        text: "你们在桥头猜灯谜，对方明显不会，还硬撑。你更像怎么帮？",
        options: [
          makeOption("悄悄给提示，让他自己答出来。帮人可以，没必要把人救成社死。", { warmth: 2, directness: 1 }, { warmth: 2, directness: 1 }),
          makeOption("直接接过来秒答，再顺手替他把场子撑住。该出手时我不看黄历。", { directness: 2, rhythm: 1 }, { directness: 2, rhythm: 1 }),
          makeOption("先看他能撑到什么程度，我不爱过早插手别人的高光或翻车。", { freedom: 2, warmth: -1 }, { freedom: 2, directness: 1 })
        ]
      },
      {
        text: "对方买了盏丑得离谱的兔子灯，坚持说像你。你会？",
        options: [
          makeOption("先嫌弃，再抱着不撒手。嘴上可以不饶人，心里已经偷偷认了。", { spark: 2, directness: -1 }, { spark: 2, warmth: 1 }),
          makeOption("认真问他到底像在哪，既然要乱夸，至少论证过程给我完整。", { directness: 2, rhythm: 1 }, { directness: 1, rhythm: 1 }),
          makeOption("笑一下收下，留点悬念。很多好感不必当场结案。", { freedom: 2, warmth: 1 }, { freedom: 2, warmth: 1 })
        ]
      },
      {
        text: "游船只剩最后两个位置，船夫催着快上。你在这种时刻通常？",
        options: [
          makeOption("先把人拽上去再说，机会都到眼前了，错过就像白给月亮做背景板。", { rhythm: 2, directness: 2 }, { rhythm: 2, spark: 1 }),
          makeOption("问他想不想坐，别把浪漫硬塞成任务。", { freedom: 2, directness: 1 }, { freedom: 2, warmth: 1 }),
          makeOption("边上船边逗他：今天这局要是再不心动，连船夫都要替你急。", { spark: 2, warmth: 1 }, { spark: 2, directness: 1 })
        ]
      },
      {
        text: "船行到河中央，对方突然念了句写你的诗，但明显是临时编的。你会怎么接？",
        options: [
          makeOption("认真听完，哪怕他押韵押得像工伤，我也会记得这份心。", { warmth: 2, freedom: -1 }, { warmth: 2, rhythm: 1 }),
          makeOption("当场点评两句，再夸一句‘胆子倒是挺大’。我会接糖，但也会加点辣。", { directness: 2, spark: 1 }, { directness: 1, spark: 1 }),
          makeOption("表面平静，心里已经把这首破诗反复回味十遍，但嘴上暂时不交卷。", { warmth: 1, directness: -2 }, { warmth: 2, directness: 1 })
        ]
      },
      {
        text: "灯会散场，对方说‘如果以后每年都一起看灯呢？’ 你更像哪种回答？",
        options: [
          makeOption("可以，但别只会说大话，先把下一次约出来。", { rhythm: 2, directness: 2 }, { rhythm: 2, directness: 1 }),
          makeOption("回他一句‘那你得活久一点’，把心动包在玩笑里递回去。", { spark: 2, directness: -1 }, { spark: 2, warmth: 1 }),
          makeOption("不立刻答应，也不否认。真正想久一点的人，通常不用靠大词压场。", { freedom: 2, rhythm: -1 }, { freedom: 2, directness: 1 })
        ]
      }
    ]
  },
  {
    title: "关卡三：蒸汽时代列车事故",
    setting: "你们换到蒸汽时代，搭上一列去往雾都的夜车。结果半路锅炉闹脾气、广播失真、车厢晃得像命运在试探你们会不会抱团。",
    questions: [
      {
        text: "列车突然急停，灯闪了两下。你第一反应更像？",
        options: [
          makeOption("先确认对方有没有事，再问周围情况。感情可以 later，安全先过审。", { warmth: 2, rhythm: 1 }, { warmth: 2, directness: 1 }),
          makeOption("立刻找乘务员和出口，把失控场面拽回流程里。", { rhythm: 2, directness: 2 }, { rhythm: 2, directness: 1 }),
          makeOption("先用玩笑稳住气氛：很好，我们的约会终于升级成生死之交了。", { spark: 2, warmth: 1 }, { spark: 2, warmth: 1 })
        ]
      },
      {
        text: "车厢只剩一条旧毛毯，对方冻得发抖。你会？",
        options: [
          makeOption("先给他，再想别的办法。我的体温和嘴硬都还能扛一会儿。", { warmth: 2, freedom: -1 }, { warmth: 2, spark: 1 }),
          makeOption("一起裹，不演伟人。都这时候了，还装不在意就太蠢。", { warmth: 2, directness: 1 }, { warmth: 2, directness: 1 }),
          makeOption("递过去但保持点距离。照顾归照顾，亲密不必借事故强行推进。", { freedom: 2, warmth: 1 }, { freedom: 2, warmth: 1 })
        ]
      },
      {
        text: "对方忽然开始讲自己以前最狼狈的一段经历。你更可能？",
        options: [
          makeOption("认真听，不急着下结论。别人肯把伤口翻给我看，我不会只当成故事素材。", { warmth: 2, directness: -1 }, { warmth: 2, freedom: 1 }),
          makeOption("边听边追问关键处。我不是八卦，我是想知道你这个人到底怎么长成现在的。", { directness: 2, rhythm: 1 }, { directness: 2, warmth: 1 }),
          makeOption("先接一句轻松的，给他留个缓冲区。真心可以深，但不必一次扎到底。", { spark: 1, freedom: 1, warmth: 1 }, { spark: 1, warmth: 2 })
        ]
      },
      {
        text: "列车员说要分散乘客去不同车厢休息，你们可能被拆开。你会怎么争取？",
        options: [
          makeOption("直接去协调，能不分开就不分开。都培养到这了，我不想让运气插队。", { directness: 2, rhythm: 2 }, { directness: 2, rhythm: 1 }),
          makeOption("嘴上说随便，其实会确认好彼此位置和后续会合方式。", { rhythm: 1, warmth: 1 }, { rhythm: 2, warmth: 1 }),
          makeOption("接受安排。分开一会儿不是世界末日，硬黏反而像把关系谈成惊悚片。", { freedom: 2, spark: -1 }, { freedom: 2, directness: 1 })
        ]
      },
      {
        text: "天亮时列车终于恢复，对方困得靠在你肩上睡着了。你更像会怎么想？",
        options: [
          makeOption("先让他睡，肩麻就麻。被信任地靠一下，比很多情话都值钱。", { warmth: 2, freedom: -1 }, { warmth: 2, rhythm: 1 }),
          makeOption("先稳住姿势，再记住这个瞬间。以后吵架了也得提醒自己，他曾这么放心过。", { rhythm: 2, warmth: 1 }, { rhythm: 2, warmth: 1 }),
          makeOption("心里有点软，但也会轻轻挪出舒服角度。亲密可以有，自己也不能废。", { freedom: 2, warmth: 1 }, { freedom: 2, warmth: 1 })
        ]
      }
    ]
  },
  {
    title: "关卡四：现代都市失控一日",
    setting: "时间跳回现代都市。你们同一天遭遇堵车、会议崩盘、手机没电、外卖翻车、朋友临时放鸽子。成年人的浪漫没有花，全是临时状况。",
    questions: [
      {
        text: "原定晚餐店突然停业，对方看起来已经快烦了。你更像哪种处理方式？",
        options: [
          makeOption("立刻开 Plan B，餐厅、路线、时间一起换。约会可以改，气氛不能死。", { rhythm: 2, directness: 2 }, { rhythm: 2, directness: 1 }),
          makeOption("先把人情绪哄住，再说去哪。今晚先救活人，再救安排。", { warmth: 2, directness: 1 }, { warmth: 2, rhythm: 1 }),
          makeOption("提议随便吃点甚至散步。约会不一定靠仪式撑住，有时松一点反而更好。", { freedom: 2, spark: -1 }, { freedom: 2, warmth: 1 })
        ]
      },
      {
        text: "等红灯时，对方突然说了一句很像埋怨你的话。你通常？",
        options: [
          makeOption("当场问清楚，到底是情绪话还是认真意见。模糊攻击我不爱收。", { directness: 2, rhythm: 1 }, { directness: 2, rhythm: 1 }),
          makeOption("先接住他的情绪，再看是不是我真的有问题。吵架也分先后手。", { warmth: 2, directness: -1 }, { warmth: 2, directness: 1 }),
          makeOption("先沉默一会儿，给彼此一点冷却空间。不想把一句话吵成整部连续剧。", { freedom: 2, spark: -1 }, { freedom: 2, rhythm: 1 })
        ]
      },
      {
        text: "手机只剩 3% 电，你们还没决定接下来去哪。你更可能？",
        options: [
          makeOption("立刻拍板，最烦临门一脚还在问东问西。", { rhythm: 2, directness: 2 }, { rhythm: 2, directness: 1 }),
          makeOption("问他现在最想要什么，再决定。今天不是考试，没必要全按最优解来。", { freedom: 1, warmth: 2 }, { freedom: 1, warmth: 2 }),
          makeOption("随机选个最近的地方，反正电快没了，不如把随缘玩得像风格。", { spark: 2, freedom: 1 }, { spark: 2, freedom: 1 })
        ]
      },
      {
        text: "朋友临时加入你们局，还特别会抢话。你更像会？",
        options: [
          makeOption("主动把话题引回你们俩，谁都别想把我的局白嫖成开放麦。", { directness: 2, spark: 1 }, { directness: 1, spark: 1 }),
          makeOption("顺势一起玩，但会悄悄照顾对方别被晾着。", { warmth: 2, freedom: 1 }, { warmth: 2, freedom: 1 }),
          makeOption("观察一下对方玩不玩得进去，如果他烦，我就找理由带人撤。", { rhythm: 1, freedom: 1, warmth: 1 }, { freedom: 2, warmth: 1 })
        ]
      },
      {
        text: "夜里回家后，对方发来一句：‘今天虽然乱，但我挺开心。’ 你最可能怎么回？",
        options: [
          makeOption("那就把下次也定了。开心不是纪念品，是下一次的门票。", { rhythm: 2, directness: 2 }, { rhythm: 2, warmth: 1 }),
          makeOption("回一句更软的，把今天那些小瞬间顺手点亮。", { warmth: 2, directness: 1 }, { warmth: 2, directness: 1 }),
          makeOption("点到为止，不把夜聊续成通宵马拉松。好感要养，不是当晚清仓。", { freedom: 2, rhythm: -1 }, { freedom: 2, rhythm: 1 })
        ]
      }
    ]
  },
  {
    title: "关卡五：赛博神经链接夜",
    setting: "最后你们抵达赛博未来。城市由霓虹、义体、全息广告和情绪芯片组成。你和对方接上神经链接，一不小心就可能把真心、创伤和上头值一起公开处刑。",
    questions: [
      {
        text: "系统提示：你们可以共享 10 秒情绪数据。你第一反应是什么？",
        options: [
          makeOption("共享。都到赛博社会了，还只会嘴上暧昧，多少有点浪费科技。", { directness: 2, spark: 1 }, { directness: 2, warmth: 1 }),
          makeOption("先问清权限和边界，再决定开到哪一级。再心动也不能裸奔。", { freedom: 2, rhythm: 1 }, { freedom: 2, directness: 1 }),
          makeOption("先开低档试试看。真心可以给，但不必一上来把灵魂全量上传。", { warmth: 1, freedom: 1, rhythm: 1 }, { warmth: 2, freedom: 1 })
        ]
      },
      {
        text: "共享开始后，你突然感受到对方其实比表面更在乎你。你通常会？",
        options: [
          makeOption("直接点破。都被系统看穿了，再演矜持就显得我像延迟高。", { directness: 2, warmth: 2 }, { directness: 2, warmth: 1 }),
          makeOption("先享受一下这个发现，不急着立刻把气氛做成签约仪式。", { spark: 2, freedom: 1 }, { spark: 2, warmth: 1 }),
          makeOption("默默记下，再结合现实观察。数据会骗人，人也会装，双重验证最安全。", { rhythm: 1, freedom: 2 }, { rhythm: 2, directness: 1 })
        ]
      },
      {
        text: "系统同时暴露出他有一段没处理完的旧情绪残影。你会怎么面对？",
        options: [
          makeOption("先问他愿不愿意说。我能接住创伤，但不喜欢强拆别人保险柜。", { warmth: 2, freedom: 1 }, { warmth: 2, freedom: 1 }),
          makeOption("直接讨论。既然已经看见，就别假装没发生，模糊地带最耗人。", { directness: 2, rhythm: 1 }, { directness: 2, rhythm: 1 }),
          makeOption("暂时按下不表。不是每个秘密都适合在高浓度场合里一次性开箱。", { freedom: 2, directness: -1 }, { freedom: 2, rhythm: 1 })
        ]
      },
      {
        text: "赛博城开始宵禁，只剩一次传送权限。你们只能选：立刻分别，或共用一次传送去同一处。你怎么选？",
        options: [
          makeOption("共用，去同一处。机会和人都在眼前，我不爱把心动浪费在流程洁癖上。", { rhythm: 2, spark: 1 }, { rhythm: 2, spark: 1 }),
          makeOption("先问他真正想怎样。再浪漫的选择，也不能替别人做主。", { freedom: 2, warmth: 1 }, { freedom: 2, warmth: 1 }),
          makeOption("分别，但把后续安排讲清楚。距离不是问题，失联才是。", { directness: 2, freedom: 1, rhythm: 1 }, { directness: 2, rhythm: 1 })
        ]
      },
      {
        text: "传送门关闭前，对方问你：‘如果以后我想长期接入你的生活系统，你会给吗？’ 你最后会怎么答？",
        options: [
          makeOption("会，但你得拿稳定和诚意来换权限。我的心门不是公共 Wi-Fi。", { warmth: 2, directness: 2, rhythm: 1 }, { warmth: 2, rhythm: 1 }),
          makeOption("先说一句很损的话，再把愿意藏在后半句。我的柔软通常要套层壳。", { spark: 2, directness: -1, warmth: 1 }, { spark: 2, warmth: 1 }),
          makeOption("我会给，但得慢慢开权限。真正想久一点的人，不会怕节奏慢。", { freedom: 2, rhythm: -1, warmth: 1 }, { freedom: 2, rhythm: 1 })
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
  const meta = SBTI_TYPES.find((item) => item.code === code);
  return meta ? { ...meta, vector: SBTI_TYPE_VECTORS[code] } : null;
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
    note: SBTI_MATCH_NOTES[candidate.code]
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
    note: SBTI_MATCH_NOTES[candidate.code],
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
  return { code: candidate.code, title: candidate.name, tag: candidate.tag, note: SBTI_MATCH_NOTES[candidate.code], finalScore: clamp(score) };
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
  return { code: candidate.code, title: candidate.name, tag: candidate.tag, note: SBTI_MATCH_NOTES[candidate.code], finalScore: clamp(score) };
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
  return { code: candidate.code, title: candidate.name, tag: candidate.tag, note: SBTI_MATCH_NOTES[candidate.code], finalScore: clamp(score) };
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
  const verdict = SBTI_TYPE_VERDICTS[state.selectedType];
  const style = AXES.reduce((acc, key) => {
    acc[key] = clamp(Math.round(selected.vector[key] * 0.45 + state.styleScores[key] * 0.55));
    return acc;
  }, {});
  const pref = AXES.reduce((acc, key) => {
    acc[key] = clamp(Math.round(selected.vector[key] * 0.2 + state.partnerScores[key] * 0.8));
    return acc;
  }, {});
  const ranked = SBTI_TYPES
    .filter((item) => item.code !== state.selectedType)
    .map((item) => fit(style, pref, item.code))
    .sort((a, b) => b.finalScore - a.finalScore)
    .slice(0, 3);
  const vulnerable = SBTI_TYPES
    .filter((item) => item.code !== state.selectedType)
    .map((item) => vulnerableMatch(style, pref, item.code))
    .sort((a, b) => b.finalScore - a.finalScore)[0];
  const hottest = SBTI_TYPES
    .filter((item) => item.code !== state.selectedType)
    .map((item) => hottestMatch(style, pref, item.code))
    .sort((a, b) => b.finalScore - a.finalScore)[0];
  const heartbreak = SBTI_TYPES
    .filter((item) => item.code !== state.selectedType)
    .map((item) => heartbreakMatch(style, pref, item.code))
    .sort((a, b) => b.finalScore - a.finalScore)[0];
  const drama = SBTI_TYPES
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

function getAvatarSources(code) {
  const original = String(code);
  const normalized = original.replace(/!/g, "");
  const unique = Array.from(new Set([
    `https://www.sbti.ai/images/types/${normalized}.png`,
    `https://www.sbti.ai/images/types/${normalized}.jpg`,
    `https://www.sbti.ai/images/types/${normalized}.webp`,
    `https://www.sbti.ai/images/types/${original}.png`,
    `https://www.sbti.ai/images/types/${original}.jpg`,
    `https://www.sbti.ai/images/types/${original}.webp`
  ]));
  return unique;
}

function renderAvatar(type, className = "") {
  const sources = getAvatarSources(type.code);
  const extra = className ? ` ${className}` : "";
  return `<div class="avatar${extra}"><img src="${sources[0]}" data-sources="${sources.join("|")}" data-index="0" alt="${type.code} ${type.name}" loading="lazy" onerror="(function(img){const list=img.dataset.sources.split('|');const next=Number(img.dataset.index)+1;if(next<list.length){img.dataset.index=String(next);img.src=list[next];}else{img.style.display='none';img.nextElementSibling.style.display='flex';}})(this)"><span class="avatar-fallback">${String(type.code).slice(0, 4)}</span></div>`;
}

function renderFloatingHearts() {
  return `<div class="floating-hearts"><span class="heart heart-1">❤</span><span class="heart heart-2">♡</span><span class="heart heart-3">❤</span><span class="heart heart-4">✦</span><span class="heart heart-5">♡</span></div>`;
}

function renderWelcome() {
  const el = document.getElementById("welcome");
  const pending = state.pendingType ? getType(state.pendingType) : null;
  el.innerHTML = `<div class="card hero-card">${renderFloatingHearts()}<div class="hero-layout"><div><div class="row"><span class="pill">SBTI LOVE LAB</span><span class="pill">27 型恋爱对象测试</span></div><h1 class="title">你的 SBTI，最适合谈哪一种疯感恋爱？</h1><p class="sub">选完人格，直接测出谁最适合你，谁最容易把你拿捏住。</p><div class="row" style="margin-top:18px;"><span class="pill">SBTI 命名</span><span class="pill">五边形图</span><span class="pill">辛辣解读</span></div></div><div class="hero-side"><div class="info-panel"><div class="info-label">还没测 SBTI？</div><div class="info-copy">什么，如果你还没测 SBTI，丢给你个网址去测！<a href="https://www.bilibili.com/blackboard/era/WijKT2bWuCJWPg8B.html" target="_blank" rel="noreferrer">Sbti官网</a></div></div><div class="info-panel"><div class="info-label">现在就选</div><div class="info-title">先挑你的人格卡，再开始做题。</div><div class="info-copy">找到最像你的那张，再往下测恋爱对象会更准。</div></div></div></div></div><div class="card picker-card"><div class="picker-head"><div><div class="picker-title">先选你的 SBTI</div><div class="picker-sub">先看气质标签，找到最像你的那张：</div></div><span class="pill">${state.selectedType ? `已选中 ${state.selectedType}` : "未选择人格"}</span></div><div class="type-grid">${SBTI_TYPES.map((item, index) => `<div class="type-card ${state.selectedType === item.code ? "active" : ""}" data-type="${item.code}"><div class="type-topline"><div class="type-index">Type ${String(index + 1).padStart(2, "0")}</div>${state.selectedType === item.code ? '<div class="type-badge">已选中</div>' : '<div class="type-badge">点击选择</div>'}</div><div class="type-head">${renderAvatar(item)}<div><div class="type-code">${item.code}</div><div class="type-name">${item.name}</div><div class="type-tag">${item.tag}</div></div></div><div class="type-copy">${item.blurb}</div></div>`).join("")}</div></div><div class="card"><h2 style="font-size:26px;margin:0 0 16px;">结果怎么排</h2><div class="sub" style="margin-top:0;">题目会同时测你自己的恋爱表现，以及你更需要什么样的对象。</div><div class="sub">最终按贴合度、互补度、稳定度综合排序，给你 Top 3 匹配人格。</div></div><div class="actions"><button id="startBtn" class="btn">${state.selectedType ? `以 ${state.selectedType} 开始测试` : "开始测试"}</button></div>${pending ? `<div class="modal-mask"><div class="modal-card"><div class="modal-kicker">已选中</div><div class="modal-title">${pending.code} · ${pending.name}</div><div class="modal-copy">你选中了 ${pending.code}，开始测试？</div><div class="modal-actions"><button id="confirmNo" class="btn-secondary">否</button><button id="confirmYes" class="btn">是</button></div></div></div>` : ""}`;
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
  el.innerHTML = `<div class="card floating-wrap">${renderFloatingHearts()}<div class="row"><span class="pill">你的恋爱风格：${r.archetype}</span></div><div class="result-head"><div class="result-avatar">${renderAvatar(r.selectedTypeMeta, "avatar-lg")}</div><div><h2 class="title" style="font-size:36px;">${r.selectedType} · ${r.selectedTypeMeta.name}</h2><p class="sub">${r.summary}</p></div></div><div class="verdict-hero"><div class="verdict-line">${r.verdictLine}</div><div class="verdict-detail">${r.verdictDetail}</div></div></div><div class="card"><h3 style="font-size:26px;margin:0 0 16px;">五边形风格图</h3><div class="radar-wrap"><div class="radar-box">${radarSvg(r.styleScores, r.targetPartnerVector)}</div><div><div class="legend"><div class="legend-item"><span class="dot" style="background:#c8524c"></span>你的恋爱风格</div><div class="legend-item"><span class="dot" style="background:#efaa63"></span>理想对象画像</div></div><p class="sub" style="margin-top:14px;">红色是你在关系里的真实风格，橙色是系统推出来的“你更适合什么样的人”。这张图是用来解释下面为什么是这 3 个结果。</p><div class="summary-box"><div class="summary-title">综合分析</div><div class="summary-copy">${summary.replace(/\n\n/g, "<br><br>")}</div></div></div></div></div><div class="spicy-card"><div class="spicy-title">辛辣解读</div><div class="spicy-copy">别装了，我来告诉你你在恋爱里到底什么死样：</div><div class="spicy-grid">${spicy.map((item) => `<div class="spicy-item"><div class="spicy-head">${item.head}</div><div class="spicy-text">${item.text}</div></div>`).join("")}</div></div><div class="card"><h3 style="font-size:26px;margin:0 0 10px;">最适合你的 3 种对象人格</h3><p class="sub" style="margin-top:0;">总分是最终排序分。贴合度是主分；互补度和稳定度是 bonus 加分，量级本来更小，不和贴合度按同一把尺子比。</p><div class="list">${r.ranked.map((item, index) => `<div class="match-card"><div class="match-head"><div class="match-main">${renderAvatar({ code: item.code, name: item.title }, "avatar-sm")}<div><div class="match-rank">No.${index + 1} · ${item.code}</div><div class="match-name">${item.title}</div></div></div><div class="match-score">总分 ${item.finalScore}</div></div><div class="match-copy">${item.tag}</div><div class="match-reason">${item.reason}</div><div class="row" style="margin-top:12px;"><span class="pill">贴合度 ${item.fitScore}</span><span class="pill">互补加分 ${item.complementBonus}</span><span class="pill">稳定加分 ${item.stabilityBonus}</span></div><div class="match-copy">${explainScore(item)}</div><div class="match-copy">${item.note}</div></div>`).join("")}</div></div><div class="card"><h3 style="font-size:26px;margin:0 0 10px;">谁最容易把你拿捏住</h3><p class="sub" style="margin-top:0;">这不是最适合你的那类人，这是最容易把你脑子和防线一起掰弯的那类人。</p><div class="match-card"><div class="match-head"><div class="match-main">${renderAvatar({ code: r.vulnerableMatch.code, name: r.vulnerableMatch.title }, "avatar-sm")}<div><div class="match-rank">危险对象 · ${r.vulnerableMatch.code}</div><div class="match-name">${r.vulnerableMatch.title}</div></div></div><div class="match-score">拿捏指数 ${r.vulnerableMatch.finalScore}</div></div><div class="match-copy">${r.vulnerableMatch.tag}</div><div class="row" style="margin-top:12px;"><span class="pill">上头指数 ${r.vulnerableMatch.hookScore}</span><span class="pill">破防指数 ${r.vulnerableMatch.exploitScore}</span></div><div class="match-copy">${vulnerableSummary(r.vulnerableMatch)}</div><div class="match-copy">这类人会先让你觉得“完了我好像很吃这套”，然后你就开始一边嘴硬一边往前送。</div><div class="match-copy">${r.vulnerableMatch.note}</div></div></div><div class="card"><h3 style="font-size:26px;margin:0 0 10px;">谁最容易让你上头</h3><p class="sub" style="margin-top:0;">这种不是一定适合你，但就是容易让你清醒值掉线，心比脑子先冲出去。</p><div class="match-card"><div class="match-head"><div class="match-main">${renderAvatar({ code: r.hottestMatch.code, name: r.hottestMatch.title }, "avatar-sm")}<div><div class="match-rank">上头对象 · ${r.hottestMatch.code}</div><div class="match-name">${r.hottestMatch.title}</div></div></div><div class="match-score">上头指数 ${r.hottestMatch.finalScore}</div></div><div class="match-copy">${r.hottestMatch.tag}</div><div class="row" style="margin-top:12px;"><span class="pill">心动指数 ${r.hottestMatch.finalScore}</span><span class="pill">失智指数 ${Math.max(0, r.hottestMatch.finalScore - 8)}</span></div><div class="match-copy">${hottestSummary(r.hottestMatch)}</div><div class="match-copy">${r.hottestMatch.note}</div></div></div><div class="card"><h3 style="font-size:26px;margin:0 0 10px;">谁最容易把你谈破防</h3><p class="sub" style="margin-top:0;">这种人最会在你嘴硬的时候把你心态打穿，谈着谈着你就开始怀疑自己。</p><div class="match-card"><div class="match-head"><div class="match-main">${renderAvatar({ code: r.heartbreakMatch.code, name: r.heartbreakMatch.title }, "avatar-sm")}<div><div class="match-rank">破防对象 · ${r.heartbreakMatch.code}</div><div class="match-name">${r.heartbreakMatch.title}</div></div></div><div class="match-score">破防指数 ${r.heartbreakMatch.finalScore}</div></div><div class="match-copy">${r.heartbreakMatch.tag}</div><div class="row" style="margin-top:12px;"><span class="pill">内耗指数 ${r.heartbreakMatch.finalScore}</span><span class="pill">扎心指数 ${Math.max(0, r.heartbreakMatch.finalScore - 6)}</span></div><div class="match-copy">${heartbreakSummary(r.heartbreakMatch)}</div><div class="match-copy">${r.heartbreakMatch.note}</div></div></div><div class="card"><h3 style="font-size:26px;margin:0 0 10px;">谁最容易和你互相折磨</h3><p class="sub" style="margin-top:0;">这种组合不一定不爱，但很容易一个不服一个，最后把关系谈得狗血又上头。</p><div class="match-card"><div class="match-head"><div class="match-main">${renderAvatar({ code: r.dramaMatch.code, name: r.dramaMatch.title }, "avatar-sm")}<div><div class="match-rank">互磨对象 · ${r.dramaMatch.code}</div><div class="match-name">${r.dramaMatch.title}</div></div></div><div class="match-score">狗血指数 ${r.dramaMatch.finalScore}</div></div><div class="match-copy">${r.dramaMatch.tag}</div><div class="row" style="margin-top:12px;"><span class="pill">互呛指数 ${r.dramaMatch.finalScore}</span><span class="pill">发疯指数 ${Math.max(0, r.dramaMatch.finalScore - 5)}</span></div><div class="match-copy">${dramaSummary(r.dramaMatch)}</div><div class="match-copy">${r.dramaMatch.note}</div></div></div><div class="actions"><button id="reviewBtn" class="btn">查看详细复盘</button><button id="restartBtn" class="btn-secondary">重新测一次</button></div>`;
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
