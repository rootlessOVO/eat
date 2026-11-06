export type ItemCategory = 'tool' | 'condiment' | 'staple' | 'fresh';
export type PriorityTier = 'owned' | 'tier1_must' | 'tier2_upgrade' | 'tier3_pantry';
export type MealSlot = 'breakfast' | 'lunch' | 'dinner';

export interface KitchenItem {
  id: string;
  name: string;
  category: ItemCategory;
  priority: PriorityTier;
  owned: boolean;
  estimatedPrice: number; // RMB
  spec: string;
  reason: string;
  usageTip: string;
}

export interface CookingStep {
  id: string;
  phase: 'prep' | 'air_fryer' | 'wok' | 'plate';
  deviceLabel: string;
  title: string;
  detail: string;
  durationSeconds: number;
  parallelTip?: string;
}

export type StapleCategory = 'rice' | 'noodles' | 'congee' | 'toast_other';

export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  slot: MealSlot;
  stapleType?: StapleCategory;
  isTodayBreakfastFeatured?: boolean;
  prepMinutes: number;
  cookMinutes: number;
  calories: number;
  proteinGrams: number;
  imageUrl: string;
  coreEquipmentIds: string[];
  existingCondimentIds: string[];
  requiredAdditionIds: string[];
  flavorFormula: string;
  soloPortionNote: string;
  steps: CookingStep[];
}

export interface DayPlan {
  dayIndex: number;
  dayName: string;
  focusLabel: string;
  breakfastId: string;
  lunchId: string;
  dinnerId: string;
  batchPrepNote: string;
}

export const INITIAL_KITCHEN_ITEMS: KitchenItem[] = [
  // Existing 4 Tools
  {
    id: 'gas_stove',
    name: '燃气灶',
    category: 'tool',
    priority: 'owned',
    owned: true,
    estimatedPrice: 0,
    spec: '现有主力明火热源',
    reason: '明火升温极快，是中式快炒、爆香、煮汤面与生滚粥的核心优势。',
    usageTip: '配合炒锅可实现3分钟快手汤底、5分钟猛火小炒与12分钟生滚咸粥。'
  },
  {
    id: 'wok',
    name: '炒锅',
    category: 'tool',
    priority: 'owned',
    owned: true,
    estimatedPrice: 0,
    spec: '现有主力锅具',
    reason: '煎、炒、烹、炸、煮汤、下面条、熬粥甚至焖米饭，一锅全能。',
    usageTip: '没买电饭煲前，炒锅加盖中小火15分钟即可焖一人份米饭，或用剩米饭8分钟煮出绵密咸粥。'
  },
  {
    id: 'air_fryer',
    name: '空气炸锅',
    category: 'tool',
    priority: 'owned',
    owned: true,
    estimatedPrice: 0,
    spec: '现有免看管第二灶眼',
    reason: '一人食神器！负责烤肉、烤脆豆腐、烤虎皮青椒、脆皮吐司，与炒锅并行省时一半。',
    usageTip: '炒锅煮面/熬粥的同时，空气炸锅定时烤蛋白质配菜，10分钟双线出餐。'
  },
  {
    id: 'knife',
    name: '菜刀',
    category: 'tool',
    priority: 'owned',
    owned: true,
    estimatedPrice: 0,
    spec: '现有切配工具',
    reason: '处理肉片、拍蒜、切菜段，一人食无需复杂刀工。',
    usageTip: '建议优先切葱姜蒜与蔬菜，最后切生肉，少洗一次菜板。'
  },

  // Existing 6 Condiments
  {
    id: 'olive_oil',
    name: '橄榄油（现有少量）',
    category: 'condiment',
    priority: 'owned',
    owned: true,
    estimatedPrice: 0,
    spec: '余量较少 · 适合煎烤与煮粥滴香',
    reason: '适合煎荷包蛋、空气炸锅喷淋表面、出锅前滴入咸粥增香防溢锅。',
    usageTip: '中午买回菜籽油/花生油用于猛火爆炒，剩下的橄榄油专供空气炸锅和煮粥。'
  },
  {
    id: 'vinaigrette',
    name: '油醋汁',
    category: 'condiment',
    priority: 'owned',
    owned: true,
    estimatedPrice: 0,
    spec: '现有复合酸香调味',
    reason: '没有陈醋/香醋时的隐藏王牌！既能调酸辣拌面汁，又能做糖醋虎皮青椒和酸辣汤面底。',
    usageTip: '油醋汁 + 生抽 + 薄盐蚝油 + 辣椒酱 = 绝妙中式酸辣拌面/盖饭汁。'
  },
  {
    id: 'salt',
    name: '食盐',
    category: 'condiment',
    priority: 'owned',
    owned: true,
    estimatedPrice: 0,
    spec: '现有基础底味',
    reason: '掌控咸鲜底味、煮面防粘、咸粥定味。',
    usageTip: '已有生抽、薄盐蚝油和辣椒酱含盐，炒菜放盐需减半。'
  },
  {
    id: 'chili_sauce',
    name: '辣椒酱',
    category: 'condiment',
    priority: 'owned',
    owned: true,
    estimatedPrice: 0,
    spec: '现有灵魂提味酱',
    reason: '中式一人食的下饭拌面核心，搭配白粥或荷包蛋也极度开胃。',
    usageTip: '出锅前拌入盖浇饭或作为喝粥佐餐小菜。'
  },
  {
    id: 'pepper',
    name: '胡椒粉',
    category: 'condiment',
    priority: 'owned',
    owned: true,
    estimatedPrice: 0,
    spec: '现有去腥暖胃香料',
    reason: '晚间吃清汤面和生滚咸粥的灵魂！去腥、提鲜、驱寒暖胃。',
    usageTip: '晚间肉片粥或豆腐汤面出锅前撒两抖胡椒粉，香气翻倍。'
  },
  {
    id: 'light_soy',
    name: '生抽',
    category: 'condiment',
    priority: 'owned',
    owned: true,
    estimatedPrice: 0,
    spec: '现有中式提鲜核心',
    reason: '中餐之魂！炝锅激发出酱香（锅边酱油），直接提供氨基酸鲜味。',
    usageTip: '煎蛋或炒菜出锅前沿热锅边淋半勺生抽，瞬间产生餐厅级锅气。'
  },

  // Tier 1 Must-Buy Tools & Condiments (High ROI, Immediate Upgrade)
  {
    id: 'spatula_chopsticks',
    name: '锅铲 + 长竹筷 + 砧板',
    category: 'tool',
    priority: 'tier1_must',
    owned: false,
    estimatedPrice: 35,
    spec: '硅胶/木铲1把 + 35cm长筷 + 抗菌小菜板',
    reason: '目前有刀和炒锅，必须配齐趁手锅铲与防烫长筷（下面条、搅粥、滑散炒蛋通用）。',
    usageTip: '长竹筷在炒锅里滑散炒蛋、捞龙须面比铲子更灵活。'
  },
  {
    id: 'mini_rice_cooker',
    name: '迷你电饭煲 (1.5L–2L) + 小袋大米',
    category: 'tool',
    priority: 'tier1_must',
    owned: false,
    estimatedPrice: 119,
    spec: '带煮粥/预约功能 · 1-2人容量 + 1kg–2.5kg大米',
    reason: '完美匹配你「中午吃米饭、晚上喝粥」的习惯！中午焖2份饭（1份中午盖饭，1份晚上10分钟改造成生滚咸粥）。',
    usageTip: '没买电饭煲前，今天中午买袋大米，先用炒锅加盖焖饭/煮粥，同样软糯香甜。'
  },
  {
    id: 'air_fryer_paper',
    name: '空气炸锅硅油纸盘 (50片) + 喷油壶',
    category: 'tool',
    priority: 'tier1_must',
    owned: false,
    estimatedPrice: 19,
    spec: '免洗纸盘 + 雾化控油壶',
    reason: '一人做饭最怕洗锅！用纸盘烤脆豆腐、烤薄皮椒配白粥不用刷炸篮。',
    usageTip: '注意先放食材压住硅油纸再开机，避免空转卷入加热管。'
  },
  {
    id: 'stir_fry_oil_starch',
    name: '中式耐高温炒菜油 + 玉米淀粉 + 蚝油',
    category: 'condiment',
    priority: 'tier1_must',
    owned: false,
    estimatedPrice: 38,
    spec: '小瓶菜籽油/花生油(900ml) + 淀粉(已买) + 薄盐蚝油(已买)',
    reason: '盒马已买齐玉米淀粉和薄盐蚝油！中午只需再补一瓶小包装菜籽油或花生油即可。',
    usageTip: '肉片加生抽+蚝油+淀粉抓匀，无论炒盖饭浇头还是下滚粥都滑嫩不柴。'
  },

  // Tier 2 Upgrade Tools (Storage & Efficiency)
  {
    id: 'steamer_rack_containers',
    name: '不锈钢折叠蒸架 + 4个分装保鲜盒',
    category: 'tool',
    priority: 'tier2_upgrade',
    owned: false,
    estimatedPrice: 32,
    spec: '放入炒锅秒变蒸锅 + 冷冻米饭/备菜盒',
    reason: '多焖出来的米饭装保鲜盒冷冻/冷藏，晚上倒进炒锅加开水5分钟就能熬成浓稠生滚粥！',
    usageTip: '中午买回的肉切好按130g–150g一盒平铺冷冻，做饭时随取随炒。'
  },
  {
    id: 'aromatics_vinegar_sesame',
    name: '葱姜蒜常备组 + 香油 + 陈醋',
    category: 'condiment',
    priority: 'tier2_upgrade',
    owned: false,
    estimatedPrice: 25,
    spec: '盒马葱姜蒜组合(已买300g) + 纯芝麻香油',
    reason: '葱姜蒜已就位！姜丝是晚上煮肉片粥去腥暖胃的灵魂，蒜末是中午蚝油油麦菜的核心。',
    usageTip: '大葱切段、生姜切丝分装冷冻，煮面熬粥随手抓一把直接下锅。'
  },

  // Tier 3 Core Solo Ingredients (Must-Stock Fridge & Dry Goods)
  {
    id: 'eggs_bread_noodles',
    name: '鸡蛋(20枚) + 龙须挂面(2袋) + 鲜奶吐司 + 大米',
    category: 'staple',
    priority: 'tier3_pantry',
    owned: false,
    estimatedPrice: 36,
    spec: '盒马已买齐蛋/面/吐司 · 中午顺手补1小袋大米',
    reason: '支撑你「早饭蛋面/吐司、午饭米饭/拌面、晚饭汤面/咸粥」的碳水与基础蛋白矩阵。',
    usageTip: '龙须挂面极细，水沸下锅90秒即熟，千万别煮久！'
  },
  {
    id: 'tofu_chicken_greens',
    name: '老豆腐(380g) + 油麦菜(500g) + 小白菜(300g) + 薄皮椒(300g) + 肉',
    category: 'fresh',
    priority: 'tier3_pantry',
    owned: false,
    estimatedPrice: 42,
    spec: '盒马4大生鲜已就位 + 中午补450g鸡腿肉或猪肉',
    reason: '小白菜和老豆腐适合晚间煮汤面/咸粥；薄皮椒和油麦菜适合午间猛火快炒配米饭或拌面。',
    usageTip: '先吃小白菜和老豆腐（第1-2天），再吃油麦菜（第2-3天），最后吃薄皮椒（第3-5天）。'
  }
];

export const SOLO_RECIPES: Recipe[] = [
  // === TODAY'S BREAKFAST EXAMPLES (3 Detailed Modes) ===
  {
    id: 'bf_today_1',
    title: '方案A · 焦边酱香荷包蛋龙须面 + 小白菜酸辣汤底',
    subtitle: '今日早餐首选 · 燃气灶+炒锅一锅到底 · 龙须面90秒即熟',
    slot: 'breakfast',
    stapleType: 'noodles',
    isTodayBreakfastFeatured: true,
    prepMinutes: 2,
    cookMinutes: 6,
    calories: 430,
    proteinGrams: 18,
    imageUrl: '/src/assets/images/breakfast_today_combo_1793918767558.jpg',
    coreEquipmentIds: ['gas_stove', 'wok'],
    existingCondimentIds: ['olive_oil', 'light_soy', 'chili_sauce', 'pepper', 'vinaigrette', 'salt'],
    requiredAdditionIds: ['eggs_bread_noodles'],
    flavorFormula: '碗底公式：1勺生抽 + 半勺薄盐蚝油 + 半勺油醋汁 + 半勺辣椒酱 + 胡椒粉 + 葱花',
    soloPortionNote: '盒马鸡蛋龙须面极细，水开下锅同烫1小把小白菜，90秒即熟出锅，只洗1只碗！',
    steps: [
      {
        id: 'bf1_s1',
        phase: 'prep',
        deviceLabel: '面碗调底',
        title: '调配“生抽蚝油油醋酸辣汤底”',
        detail: '在大碗中放入：生抽1勺、刚买的薄盐蚝油半勺、油醋汁0.5勺（提酸香）、辣椒酱0.5勺、胡椒粉两抖、小葱花少许。',
        durationSeconds: 60,
        parallelTip: '调碗底前先给炒锅开小火预热。'
      },
      {
        id: 'bf1_s2',
        phase: 'wok',
        deviceLabel: '燃气灶+炒锅',
        title: '煎焦边溏心荷包蛋 & 锅边生抽冲开水',
        detail: '炒锅倒入1小勺油，中火打入1-2颗富硒谷物蛋，煎至蛋白边缘金黄起焦泡；沿锅边淋半勺生抽激香，直接冲入450ml开水。',
        durationSeconds: 180,
        parallelTip: '用热油煎蛋再直接冲水，汤色瞬间浓郁奶白！'
      },
      {
        id: 'bf1_s3',
        phase: 'wok',
        deviceLabel: '燃气灶+炒锅',
        title: '下入龙须挂面与100g小白菜同煮90秒',
        detail: '水大沸后下入1小把龙须挂面（约80g）和洗净的3棵小白菜，保持中大火煮90秒–120秒即可关火。',
        durationSeconds: 110
      },
      {
        id: 'bf1_s4',
        phase: 'plate',
        deviceLabel: '冲汤出锅',
        title: '滚烫原汤冲开碗底，捞面盖蛋开吃',
        detail: '先舀2勺滚烫面汤冲入调料碗化开蚝油与胡椒粉，再捞入龙须面、小白菜和焦边荷包蛋。',
        durationSeconds: 45
      }
    ]
  },
  {
    id: 'bf_today_2',
    title: '方案B · 空气炸锅脆边太阳蛋鲜奶吐司 + 胡椒生抽冲蛋汤',
    subtitle: '盒马鲜奶吐司专属 · 空气炸锅+炒锅双线并行 · 8分钟无油烟',
    slot: 'breakfast',
    stapleType: 'toast_other',
    isTodayBreakfastFeatured: true,
    prepMinutes: 2,
    cookMinutes: 6,
    calories: 395,
    proteinGrams: 19,
    imageUrl: '/src/assets/images/breakfast_today_combo_1793918767558.jpg',
    coreEquipmentIds: ['air_fryer', 'gas_stove', 'wok'],
    existingCondimentIds: ['olive_oil', 'light_soy', 'pepper', 'chili_sauce', 'salt'],
    requiredAdditionIds: ['eggs_bread_noodles'],
    flavorFormula: '干湿搭配：空气炸锅烤盒马鲜奶吐司太阳蛋 + 炒锅2分钟滚水冲胡椒葱花蛋汤',
    soloPortionNote: '发挥你有“空气炸锅+燃气炒锅”的双线程优势，鲜奶吐司外酥里软，零油烟！',
    steps: [
      {
        id: 'bf2_s1',
        phase: 'air_fryer',
        deviceLabel: '空气炸锅',
        title: '鲜奶吐司压窝打蛋，180°C烤6分钟',
        detail: '取1片盒马鲜奶吐司，用勺背在中央压出一个小坑，打入1颗鸡蛋，撒一点点盐和胡椒粉，推入空气炸锅180°C定时6分钟。',
        durationSeconds: 360,
        parallelTip: '炸锅工作期间完全不用看管，立刻转身去洗漱或烧水。'
      },
      {
        id: 'bf2_s2',
        phase: 'wok',
        deviceLabel: '燃气灶+炒锅',
        title: '炒锅烧水30秒冲出“胡椒生抽暖胃蛋花汤”',
        detail: '最后2分钟：碗里打散1颗蛋，炒锅烧开一小碗水（约250ml），关火转圈淋入蛋液成漂亮蛋花，碗底放1勺生抽、葱花、胡椒粉、2滴橄榄油，冲入即成。',
        durationSeconds: 120
      },
      {
        id: 'bf2_s3',
        phase: 'plate',
        deviceLabel: '装盘点睛',
        title: '取出脆吐司太阳蛋，抹少许辣椒酱开动',
        detail: '空气炸锅取出外脆里嫩的太阳蛋吐司，表面点缀1小撮辣椒酱提味，配热乎蛋花汤。',
        durationSeconds: 30
      }
    ]
  },
  {
    id: 'bf_today_3',
    title: '方案C · 零采购极简版：锅边酱油葱花滑嫩蛋 + 烤吐司条',
    subtitle: '5分钟闪电早餐 · 玉米淀粉水让炒蛋如云朵般滑嫩',
    slot: 'breakfast',
    stapleType: 'toast_other',
    isTodayBreakfastFeatured: true,
    prepMinutes: 2,
    cookMinutes: 5,
    calories: 350,
    proteinGrams: 16,
    imageUrl: '/src/assets/images/kitchen_essentials_flatlay_1793918770150.jpg',
    coreEquipmentIds: ['gas_stove', 'wok', 'air_fryer', 'knife'],
    existingCondimentIds: ['olive_oil', 'light_soy', 'pepper', 'chili_sauce', 'vinaigrette'],
    requiredAdditionIds: [],
    flavorFormula: '生抽+薄盐蚝油+油醋汁混合淋在葱花滑蛋上，鲜甜滑嫩',
    soloPortionNote: '蛋液里加半小勺刚买的玉米淀粉水，炒出来的鸡蛋嫩如布丁！',
    steps: [
      {
        id: 'bf3_s1',
        phase: 'prep',
        deviceLabel: '切配与调汁',
        title: '双蛋加半勺水淀粉打散，切少许葱花',
        detail: '2颗谷物蛋加1小勺清水+半小勺玉米淀粉+少许盐和胡椒粉打散；小碟混合1勺生抽 + 半勺油醋汁。',
        durationSeconds: 90
      },
      {
        id: 'bf3_s2',
        phase: 'air_fryer',
        deviceLabel: '空气炸锅',
        title: '鲜奶吐司切条180°C脆烤4分钟（同步进行）',
        detail: '1片吐司切3条放进空气炸锅180°C烘烤4分钟至金黄酥脆。',
        durationSeconds: 240
      },
      {
        id: 'bf3_s3',
        phase: 'wok',
        deviceLabel: '燃气灶+炒锅',
        title: '低温滑炒云朵嫩蛋，淋汁出锅',
        detail: '炒锅中小火润油，倒入葱花蛋液，用筷子从四周向中心推褶皱，8分熟立刻关火余温熟成，淋上豉油汁配脆吐司条。',
        durationSeconds: 90
      }
    ]
  },

  // ============================================================================
  // === LUNCH RECIPES (中午：3款米饭盖饭 + 3款劲道面条) ===
  // ============================================================================
  {
    id: 'lunch_wok_chicken',
    title: '【米饭】葱爆薄皮椒蚝油滑鸡腿盖饭',
    subtitle: '午间米饭头牌 · 玉米淀粉锁水滑嫩 · 薄皮椒焦香裹满浓汁拌饭',
    slot: 'lunch',
    stapleType: 'rice',
    prepMinutes: 5,
    cookMinutes: 10,
    calories: 610,
    proteinGrams: 38,
    imageUrl: '/src/assets/images/wok_stir_fry_lunch_1793918768775.jpg',
    coreEquipmentIds: ['gas_stove', 'wok', 'knife'],
    existingCondimentIds: ['olive_oil', 'light_soy', 'chili_sauce', 'pepper', 'vinaigrette'],
    requiredAdditionIds: ['tofu_chicken_greens'],
    flavorFormula: '浓香盖饭汁：生抽1.5勺 + 薄盐蚝油1勺 + 辣椒酱半勺 + 玉米淀粉半勺 + 清水3勺',
    soloPortionNote: '中午焖一锅米饭（吃一半留一半晚上煮粥），鸡腿肉用刚买的玉米淀粉抓浆，大火爆炒薄皮椒，汤汁拌饭一绝！',
    steps: [
      {
        id: 'l1_s1',
        phase: 'prep',
        deviceLabel: '菜刀切配',
        title: '鸡腿肉切块加淀粉蚝油抓浆，薄皮椒与大葱切块',
        detail: '去骨鸡腿肉150g切块，加半勺生抽、半勺薄盐蚝油、胡椒粉、1小勺玉米淀粉抓匀锁水；薄皮椒3根滚刀切块，大葱切段，拍2瓣蒜。',
        durationSeconds: 180
      },
      {
        id: 'l1_s2',
        phase: 'wok',
        deviceLabel: '燃气灶+炒锅',
        title: '热锅滑炒鸡腿肉至金黄，下葱蒜薄皮椒猛火爆香',
        detail: '炒锅下1勺新买的炒菜油，先下鸡腿块中大火煎炒3分钟至表皮焦黄；倒入葱段、蒜片和薄皮椒块大火翻炒90秒出虎皮香。',
        durationSeconds: 240
      },
      {
        id: 'l1_s3',
        phase: 'wok',
        deviceLabel: '燃气灶+炒锅',
        title: '淋入蚝油生抽水淀粉，大火收浓汁盖在热米饭上',
        detail: '倒入调好的碗汁（生抽1勺+蚝油1勺+辣椒酱半勺+半勺淀粉+3勺水），大火翻炒20秒至浓亮挂汁，直接浇在热腾腾的米饭上！',
        durationSeconds: 90
      }
    ]
  },
  {
    id: 'lunch_rice_pork_tofu',
    title: '【米饭】农家薄皮椒老豆腐红烧滑肉盖饭',
    subtitle: '一次消耗半盒老豆腐+2根薄皮椒 · 咸香浓稠超级下饭',
    slot: 'lunch',
    stapleType: 'rice',
    prepMinutes: 5,
    cookMinutes: 9,
    calories: 590,
    proteinGrams: 34,
    imageUrl: '/src/assets/images/wok_stir_fry_lunch_1793918768775.jpg',
    coreEquipmentIds: ['gas_stove', 'wok', 'knife'],
    existingCondimentIds: ['olive_oil', 'light_soy', 'chili_sauce', 'pepper', 'salt'],
    requiredAdditionIds: ['tofu_chicken_greens'],
    flavorFormula: '家常红烧芡汁：生抽1.5勺 + 薄盐蚝油1.5勺 + 辣椒酱半勺 + 胡椒粉 + 玉米淀粉水半碗',
    soloPortionNote: '盒马老豆腐豆香浓郁，先煎至两面金黄吸饱肉汁，配米饭连吃两碗！',
    steps: [
      {
        id: 'l_rt_1',
        phase: 'prep',
        deviceLabel: '菜刀切配',
        title: '老豆腐切厚片，肉片加玉米淀粉上浆，薄皮椒切斜片',
        detail: '取半盒老豆腐（190g）切厚片；猪肉或鸡腿肉120g切片，加半勺生抽、1小勺玉米淀粉抓匀；薄皮椒2根切片，葱蒜切末。',
        durationSeconds: 180
      },
      {
        id: 'l_rt_2',
        phase: 'wok',
        deviceLabel: '燃气灶+炒锅',
        title: '先煎老豆腐至两面金黄，推到锅边下肉片葱蒜爆香',
        detail: '炒锅下1勺炒菜油，放入老豆腐片中小火煎3分钟至表面金黄起壳；将豆腐推到锅边，下葱蒜末和肉片滑炒变色。',
        durationSeconds: 210
      },
      {
        id: 'l_rt_3',
        phase: 'wok',
        deviceLabel: '燃气灶+炒锅',
        title: '加入薄皮椒与蚝油淀粉汁，咕嘟2分钟盖浇米饭',
        detail: '放入薄皮椒片，倒入半碗清水、1勺生抽、1.5勺薄盐蚝油、半勺辣椒酱，焖煮2分钟后淋入少许水淀粉收浓，连汁带菜盖在米饭上。',
        durationSeconds: 150
      }
    ]
  },
  {
    id: 'lunch_rice_tiger_pepper_egg',
    title: '【米饭】虎皮薄皮椒焦边荷包蛋 + 蒜蓉蚝油油麦菜饭',
    subtitle: '还没买肉时的神仙素荤下饭王 · 2颗谷物蛋+3根薄皮椒+250g油麦菜',
    slot: 'lunch',
    stapleType: 'rice',
    prepMinutes: 4,
    cookMinutes: 8,
    calories: 540,
    proteinGrams: 22,
    imageUrl: '/src/assets/images/wok_stir_fry_lunch_1793918768775.jpg',
    coreEquipmentIds: ['gas_stove', 'wok', 'knife'],
    existingCondimentIds: ['olive_oil', 'light_soy', 'vinaigrette', 'chili_sauce', 'salt'],
    requiredAdditionIds: ['eggs_bread_noodles', 'tofu_chicken_greens'],
    flavorFormula: '灵魂糖醋虎皮汁：生抽1.5勺 + 薄盐蚝油1勺 + 油醋汁1勺(自带微甜果酸) + 淀粉半勺 + 水3勺',
    soloPortionNote: '你的油醋汁含微甜酸味，拿来调“虎皮青椒荷包蛋”的酱汁简直是作弊级美味，顺便消灭半袋油麦菜！',
    steps: [
      {
        id: 'l_tp_1',
        phase: 'wok',
        deviceLabel: '燃气灶+炒锅',
        title: '先用蒜末蚝油大火40秒快炒250g油麦菜铺在饭旁',
        detail: '油麦菜洗净切段（250g），炒锅热油爆香3瓣蒜末，下油麦菜大火翻炒30秒，挤入1勺薄盐蚝油拌匀，盛在米饭盘的一侧。',
        durationSeconds: 120
      },
      {
        id: 'l_tp_2',
        phase: 'wok',
        deviceLabel: '燃气灶+炒锅',
        title: '免洗锅直接煎2颗焦边荷包蛋，干煸薄皮椒出虎皮',
        detail: '同一个炒锅煎2颗荷包蛋盛出；锅底留余油，放入拍扁切段的3根薄皮椒，用铲子按压干煸90秒至表皮起焦斑虎皮。',
        durationSeconds: 180
      },
      {
        id: 'l_tp_3',
        phase: 'wok',
        deviceLabel: '燃气灶+炒锅',
        title: '倒回荷包蛋，淋入生抽蚝油油醋芡汁大火收汁',
        detail: '把荷包蛋倒回锅中用铲子切大块，淋入调好的酱汁（生抽+蚝油+油醋汁+水淀粉），大火咕嘟30秒让蛋白吸饱汤汁，盖在米饭另一侧！',
        durationSeconds: 90
      }
    ]
  },
  {
    id: 'lunch_biang_noodles',
    title: '【面条】空气炸锅黄金脆哨豆腐 + 油醋辣酱干拌龙须面',
    subtitle: '午间双锅王牌拌面 · 炸锅烤脆豆腐浇头 + 炒锅煮龙须面烫青菜',
    slot: 'lunch',
    stapleType: 'noodles',
    prepMinutes: 4,
    cookMinutes: 10,
    calories: 530,
    proteinGrams: 25,
    imageUrl: '/src/assets/images/wok_stir_fry_lunch_1793918768775.jpg',
    coreEquipmentIds: ['air_fryer', 'gas_stove', 'wok', 'knife'],
    existingCondimentIds: ['olive_oil', 'vinaigrette', 'light_soy', 'chili_sauce', 'pepper', 'salt'],
    requiredAdditionIds: ['eggs_bread_noodles', 'tofu_chicken_greens'],
    flavorFormula: '黄金酸辣拌面汁：蒜末2瓣 + 油醋汁1.5勺 + 生抽1勺 + 薄盐蚝油1勺 + 辣椒酱1勺',
    soloPortionNote: '盒马老豆腐切小丁进空气炸锅烤到外酥里嫩像肉哨子一样香，配酸辣干拌面绝配！',
    steps: [
      {
        id: 'l2_s1',
        phase: 'air_fryer',
        deviceLabel: '空气炸锅',
        title: '半盒老豆腐(190g)切小丁刷油，200°C烤10分钟成黄金脆哨',
        detail: '半盒老豆腐切1.5cm小方丁，表面淋几滴油和少许盐、胡椒粉，空气炸锅200°C烤10分钟至外皮金黄酥脆。',
        durationSeconds: 600
      },
      {
        id: 'l2_s2',
        phase: 'wok',
        deviceLabel: '燃气灶+炒锅',
        title: '炒锅水沸下龙须挂面与小白菜/油麦菜同煮90秒',
        detail: '在空气炸锅剩3分钟时，炒锅水开下入100g龙须挂面和一把小白菜，煮90秒捞出沥干放入大碗。',
        durationSeconds: 150
      },
      {
        id: 'l2_s3',
        phase: 'plate',
        deviceLabel: '混合拌匀',
        title: '趁热拌入蒜末油醋蚝油辣汁，铺满黄金脆豆腐',
        detail: '面条趁热加入蒜末、油醋汁、生抽、薄盐蚝油、辣椒酱拌匀，顶部铺上刚出炉的咔滋脆豆腐丁。',
        durationSeconds: 60
      }
    ]
  },
  {
    id: 'lunch_noodle_pepper_meat',
    title: '【面条】薄皮椒蚝油滑肉丝现炒浇头拌面（或浓汤面）',
    subtitle: '面馆级现炒码子面 · 玉米淀粉滑肉丝+薄皮椒丝裹满每根龙须面',
    slot: 'lunch',
    stapleType: 'noodles',
    prepMinutes: 5,
    cookMinutes: 8,
    calories: 575,
    proteinGrams: 35,
    imageUrl: '/src/assets/images/wok_stir_fry_lunch_1793918768775.jpg',
    coreEquipmentIds: ['gas_stove', 'wok', 'knife'],
    existingCondimentIds: ['olive_oil', 'light_soy', 'chili_sauce', 'pepper', 'salt'],
    requiredAdditionIds: ['eggs_bread_noodles', 'tofu_chicken_greens'],
    flavorFormula: '面馆浓香浇头：生抽1.5勺 + 薄盐蚝油1.5勺 + 辣椒酱半勺 + 淀粉锁水 + 原面汤3勺',
    soloPortionNote: '先用炒锅烧水煮面捞出（不用洗锅！），擦干直接下油炒青椒肉丝浇头，一锅到底！',
    steps: [
      {
        id: 'l_pm_1',
        phase: 'prep',
        deviceLabel: '菜刀切配',
        title: '鸡腿肉/猪肉切丝加淀粉抓匀，薄皮椒2根切丝',
        detail: '肉130g切粗丝，加半勺生抽、半勺蚝油、胡椒粉、1小勺玉米淀粉抓匀；薄皮椒2根切丝，葱姜蒜切末。',
        durationSeconds: 180
      },
      {
        id: 'l_pm_2',
        phase: 'wok',
        deviceLabel: '燃气灶+炒锅',
        title: '炒锅先煮90秒龙须面垫底，原锅擦干直接炒肉丝浇头',
        detail: '炒锅水沸下龙须挂面和几片小白菜煮90秒捞入碗中（留小半碗面汤备用）；原锅开火滑炒肉丝至变色。',
        durationSeconds: 180
      },
      {
        id: 'l_pm_3',
        phase: 'wok',
        deviceLabel: '燃气灶+炒锅',
        title: '下葱蒜薄皮椒丝大火翻炒，加面汤蚝油收浓浇在面上',
        detail: '下葱姜蒜和薄皮椒丝大火翻炒1分钟，加1勺生抽、1勺薄盐蚝油、半勺辣椒酱和3勺煮面水，收成浓稠卤汁直接浇在龙须面上拌开！',
        durationSeconds: 120
      }
    ]
  },
  {
    id: 'lunch_noodle_scallion_egg',
    title: '【面条】老上海葱油焦香双蛋蚝油拌面 + 烫油麦菜',
    subtitle: '盒马大葱+谷物蛋+龙须面黄金组合 · 10分钟香气扑鼻',
    slot: 'lunch',
    stapleType: 'noodles',
    prepMinutes: 3,
    cookMinutes: 8,
    calories: 510,
    proteinGrams: 22,
    imageUrl: '/src/assets/images/breakfast_today_combo_1793918767558.jpg',
    coreEquipmentIds: ['gas_stove', 'wok', 'knife'],
    existingCondimentIds: ['olive_oil', 'light_soy', 'chili_sauce', 'pepper'],
    requiredAdditionIds: ['eggs_bread_noodles', 'tofu_chicken_greens'],
    flavorFormula: '快手葱油豉油汁：大葱丝煸油 + 生抽2勺 + 薄盐蚝油1勺 + 辣椒酱半勺',
    soloPortionNote: '盒马葱姜蒜组合里的大葱切细丝，用新买的炒菜油煸出焦香葱油，拌龙须面香迷糊了！',
    steps: [
      {
        id: 'l_se_1',
        phase: 'wok',
        deviceLabel: '燃气灶+炒锅',
        title: '先烧水煮熟龙须面与150g油麦菜捞出装碗',
        detail: '炒锅水开下入100g龙须挂面与洗净的油麦菜段，煮90秒捞出沥干放入大面碗中。',
        durationSeconds: 150
      },
      {
        id: 'l_se_2',
        phase: 'wok',
        deviceLabel: '燃气灶+炒锅',
        title: '原锅煎2颗焦边荷包蛋，下大葱丝中小火煸出金黄葱油',
        detail: '锅中倒1.5勺油，煎2颗焦边荷包蛋盖在面上；锅底余油放入1大把大葱丝，中小火慢煸2分钟至葱丝微焦、葱香四溢。',
        durationSeconds: 180
      },
      {
        id: 'l_se_3',
        phase: 'plate',
        deviceLabel: '激香拌面',
        title: '关火倒入生抽与薄盐蚝油冒泡，趁热淋在面上拌匀',
        detail: '关火利用余温倒入2勺生抽、1勺薄盐蚝油激出浓郁酱香，连葱带油浇在龙须面和荷包蛋上，喜辣加半勺辣椒酱！',
        durationSeconds: 60
      }
    ]
  },

  // ============================================================================
  // === DINNER RECIPES (晚上：3款暖胃清汤面 + 3款生滚咸粥/配菜) ===
  // ============================================================================
  {
    id: 'dinner_noodle_tofu_greens',
    title: '【晚间汤面】奶白煎蛋老豆腐小白菜热汤龙须面',
    subtitle: '今日晚餐极力推荐 · 1次消耗半盒老豆腐+150g小白菜 · 暖胃易消化',
    slot: 'dinner',
    stapleType: 'noodles',
    prepMinutes: 3,
    cookMinutes: 8,
    calories: 440,
    proteinGrams: 26,
    imageUrl: '/src/assets/images/air_fryer_dinner_1793918770202.jpg',
    coreEquipmentIds: ['gas_stove', 'wok', 'knife'],
    existingCondimentIds: ['olive_oil', 'light_soy', 'pepper', 'salt'],
    requiredAdditionIds: ['eggs_bread_noodles', 'tofu_chicken_greens'],
    flavorFormula: '晚间清甜奶白汤：煎蛋冲开水 + 姜丝去腥 + 生抽1勺 + 薄盐蚝油半勺 + 白胡椒粉',
    soloPortionNote: '晚上想吃热乎汤面又怕油腻？煎蛋冲开水煮老豆腐，汤头自带天然奶香，小白菜清甜解腻！',
    steps: [
      {
        id: 'd_nt_1',
        phase: 'wok',
        deviceLabel: '燃气灶+炒锅',
        title: '炒锅少油煎1颗荷包蛋，下姜丝冲入500ml滚水成奶白汤',
        detail: '炒锅倒半勺油，煎熟1颗谷物蛋，放入几根姜丝爆香，直接冲入500ml开水，大火烧沸20秒汤色立刻变奶白。',
        durationSeconds: 150
      },
      {
        id: 'd_nt_2',
        phase: 'wok',
        deviceLabel: '燃气灶+炒锅',
        title: '下入半盒老豆腐块(190g)慢煮3分钟出豆香',
        detail: '将老豆腐切小块下锅，加1勺生抽、半勺薄盐蚝油、少许盐，中火煮3分钟让豆腐吸饱奶白蛋汤。',
        durationSeconds: 180
      },
      {
        id: 'd_nt_3',
        phase: 'wok',
        deviceLabel: '燃气灶+炒锅',
        title: '下入1小把龙须面与150g小白菜煮90秒，撒胡椒粉出锅',
        detail: '最后下入70g龙须挂面和洗净的小白菜，煮90秒即熟，出锅前撒入葱花和足量胡椒粉，连汤带面暖透全身！',
        durationSeconds: 110
      }
    ]
  },
  {
    id: 'dinner_noodle_velvet_meat',
    title: '【晚间汤面】生姜胡椒滑肉片油麦菜清汤面',
    subtitle: '生滚滑肉片汤面 · 玉米淀粉锁住肉汁 · 清爽高蛋白不长胖',
    slot: 'dinner',
    stapleType: 'noodles',
    prepMinutes: 4,
    cookMinutes: 7,
    calories: 430,
    proteinGrams: 30,
    imageUrl: '/src/assets/images/air_fryer_dinner_1793918770202.jpg',
    coreEquipmentIds: ['gas_stove', 'wok', 'knife'],
    existingCondimentIds: ['olive_oil', 'light_soy', 'pepper', 'salt'],
    requiredAdditionIds: ['eggs_bread_noodles', 'tofu_chicken_greens'],
    flavorFormula: '广式生滚清汤底：姜片爆香 + 生抽1勺 + 薄盐蚝油半勺 + 足量胡椒粉 + 葱花',
    soloPortionNote: '肉片裹一层薄薄的玉米淀粉水下入微沸汤中，滑嫩得像豆腐脑一样，配脆嫩油麦菜极度舒适。',
    steps: [
      {
        id: 'd_nm_1',
        phase: 'prep',
        deviceLabel: '菜刀切配',
        title: '瘦肉/去皮鸡腿肉切薄片加玉米淀粉抓匀，油麦菜切段',
        detail: '肉100g切薄片，加半勺生抽、少许胡椒粉、1小勺玉米淀粉抓匀；油麦菜取200g洗净切段，切3片生姜。',
        durationSeconds: 150
      },
      {
        id: 'd_nm_2',
        phase: 'wok',
        deviceLabel: '燃气灶+炒锅',
        title: '炒锅爆香姜片葱白，冲水烧沸后转小火逐片下肉片',
        detail: '锅底滴几滴油爆香姜片葱白，倒入500ml清水烧开，加1勺生抽和半勺蚝油；转小火将肉片一片片滑入水中定型。',
        durationSeconds: 150
      },
      {
        id: 'd_nm_3',
        phase: 'wok',
        deviceLabel: '燃气灶+炒锅',
        title: '转大火下龙须面与油麦菜煮90秒，撒胡椒粉起锅',
        detail: '汤再次沸腾后下入70g龙须挂面，最后30秒丢入油麦菜段，撒胡椒粉出锅。',
        durationSeconds: 100
      }
    ]
  },
  {
    id: 'dinner_airfryer_combo',
    title: '【晚间汤面】酸辣油醋云朵蛋花汤面 + 空气炸锅酱烤脆豆腐',
    subtitle: '加班疲惫夜救星 · 炸锅无油烟烤豆腐配菜 + 炒锅3分钟酸辣蛋花面',
    slot: 'dinner',
    stapleType: 'noodles',
    prepMinutes: 3,
    cookMinutes: 9,
    calories: 420,
    proteinGrams: 24,
    imageUrl: '/src/assets/images/air_fryer_dinner_1793918770202.jpg',
    coreEquipmentIds: ['air_fryer', 'gas_stove', 'wok', 'knife'],
    existingCondimentIds: ['olive_oil', 'light_soy', 'pepper', 'chili_sauce', 'vinaigrette', 'salt'],
    requiredAdditionIds: ['eggs_bread_noodles', 'tofu_chicken_greens'],
    flavorFormula: '酸辣开胃汤底：油醋汁1.5勺 + 生抽1.5勺 + 辣椒酱半勺 + 胡椒粉 + 葱花',
    soloPortionNote: '晚上不想切肉洗油锅？炒锅只烧水煮个酸辣蛋花面，空气炸锅顺手烤半盒豆腐，清爽又满足。',
    steps: [
      {
        id: 'd1_s1',
        phase: 'air_fryer',
        deviceLabel: '空气炸锅',
        title: '半盒老豆腐切块刷生抽辣椒酱，190°C烤9分钟',
        detail: '老豆腐150g切块，拌半勺生抽、半勺辣椒酱、几滴橄榄油，进空气炸锅190°C烤9分钟做外焦里嫩的配面小菜。',
        durationSeconds: 540
      },
      {
        id: 'd1_s2',
        phase: 'wok',
        deviceLabel: '燃气灶+炒锅',
        title: '炒锅烧水下龙须面与小白菜，关火淋入鸡蛋液成云朵蛋花',
        detail: '炒锅烧开450ml水，下入龙须面和小白菜煮90秒，关火转圈淋入1颗打散的鸡蛋液。',
        durationSeconds: 150
      },
      {
        id: 'd1_s3',
        phase: 'plate',
        deviceLabel: '冲汤装盘',
        title: '冲入油醋生抽胡椒碗底，配烤豆腐开吃',
        detail: '将蛋花面连汤冲入调好油醋汁、生抽、胡椒粉、葱花的大碗中，夹入刚出炉的酱烤豆腐块。',
        durationSeconds: 60
      }
    ]
  },
  {
    id: 'dinner_congee_meat_greens',
    title: '【晚间喝粥】广式生滚姜丝滑肉片小白菜咸香粥（炒锅10分钟速成）',
    subtitle: '用中午多焖的半碗米饭(或冷冻米) · 炒锅10分钟熬出绵密酒楼级生滚粥',
    slot: 'dinner',
    stapleType: 'congee',
    prepMinutes: 3,
    cookMinutes: 10,
    calories: 380,
    proteinGrams: 27,
    imageUrl: '/src/assets/images/air_fryer_dinner_1793918770202.jpg',
    coreEquipmentIds: ['gas_stove', 'wok', 'knife'],
    existingCondimentIds: ['olive_oil', 'light_soy', 'pepper', 'salt'],
    requiredAdditionIds: ['tofu_chicken_greens'],
    flavorFormula: '生滚咸粥定味：姜丝去腥 + 玉米淀粉滑肉片 + 薄盐蚝油半勺 + 盐半小勺 + 胡椒粉 + 橄榄油3滴',
    soloPortionNote: '独居喝粥秘诀：中午焖米饭时多焖半碗！晚上把熟米饭倒进炒锅加4倍开水，8分钟就能熬出米油浓稠的广式生滚粥！',
    steps: [
      {
        id: 'd_cg_1',
        phase: 'prep',
        deviceLabel: '菜刀切配',
        title: '肉片加姜丝淀粉抓匀，小白菜切细丝',
        detail: '瘦肉或去皮鸡腿肉100g切薄片，加姜丝、半勺生抽、半勺薄盐蚝油、1小勺玉米淀粉和几滴油抓匀；小白菜150g切细丝。',
        durationSeconds: 150
      },
      {
        id: 'd_cg_2',
        phase: 'wok',
        deviceLabel: '燃气灶+炒锅',
        title: '炒锅倒入半碗熟米饭(或泡软生米)+600ml开水，大火煮开花',
        detail: '炒锅倒入中午预留的半碗熟米饭（若是生米需提前加几滴油拌匀冷冻1小时），冲入600ml开水，中大火煮6–8分钟并用勺背轻轻按压，瞬间浓稠出米油！',
        durationSeconds: 420,
        parallelTip: '煮粥时滴3滴橄榄油，不仅米香浓郁，而且绝不溢锅！'
      },
      {
        id: 'd_cg_3',
        phase: 'wok',
        deviceLabel: '燃气灶+炒锅',
        title: '下入滑肉片与小白菜丝滚煮90秒，撒胡椒粉出锅',
        detail: '保持粥底滚沸，分散下入淀粉肉片，用筷子拨散煮60秒至变色，再撒入小白菜丝、少许盐和足量白胡椒粉，滚30秒即成暖胃生滚粥！',
        durationSeconds: 90
      }
    ]
  },
  {
    id: 'dinner_congee_egg_tofu',
    title: '【晚间喝粥】黄金蛋花老豆腐丁暖胃咸粥 + 空气炸锅虎皮青椒',
    subtitle: '双锅神仙晚粥 · 炒锅熬滑嫩豆腐蛋花粥 + 空气炸锅无油烟烤薄皮椒小菜',
    slot: 'dinner',
    stapleType: 'congee',
    prepMinutes: 3,
    cookMinutes: 10,
    calories: 390,
    proteinGrams: 23,
    imageUrl: '/src/assets/images/air_fryer_dinner_1793918770202.jpg',
    coreEquipmentIds: ['gas_stove', 'wok', 'air_fryer', 'knife'],
    existingCondimentIds: ['olive_oil', 'light_soy', 'vinaigrette', 'chili_sauce', 'pepper', 'salt'],
    requiredAdditionIds: ['eggs_bread_noodles', 'tofu_chicken_greens'],
    flavorFormula: '咸粥提鲜（薄盐蚝油半勺+胡椒粉+葱花） + 佐粥小菜（烤薄皮椒淋生抽+油醋汁+蒜末）',
    soloPortionNote: '喝粥最怕没味道！空气炸锅8分钟烤2根薄皮椒，撕成条拌蒜末生抽油醋汁，配热腾腾的豆腐蛋花粥绝了！',
    steps: [
      {
        id: 'd_ce_1',
        phase: 'air_fryer',
        deviceLabel: '空气炸锅',
        title: '薄皮椒3根刷3滴油，空气炸锅200°C烤8分钟做佐粥虎皮椒',
        detail: '薄皮椒3根洗净擦干表面刷几滴油，推入空气炸锅200°C烤8分钟至表皮起虎皮焦斑，取出撕成条，淋半勺生抽、半勺油醋汁和蒜末拌匀。',
        durationSeconds: 480
      },
      {
        id: 'd_ce_2',
        phase: 'wok',
        deviceLabel: '燃气灶+炒锅',
        title: '炒锅煮滚米粥底，下入老豆腐小丁(150g)同煮5分钟',
        detail: '炒锅用半碗剩米饭（或生米）加开水煮至软烂浓稠，放入切成1cm小丁的老豆腐和少许姜末同煮5分钟。',
        durationSeconds: 300
      },
      {
        id: 'd_ce_3',
        phase: 'wok',
        deviceLabel: '燃气灶+炒锅',
        title: '淋入谷物蛋液推成金丝蛋花，加蚝油葱花胡椒出锅',
        detail: '转小火淋入1–2颗打散的鸡蛋液，用筷子轻轻推成云朵蛋花，加半勺薄盐蚝油、少许盐、葱花和胡椒粉，配虎皮青椒开喝！',
        durationSeconds: 60
      }
    ]
  },
  {
    id: 'dinner_wok_soup',
    title: '【晚间喝粥】快手浓稠白粥 + 蒜蓉蚝油油麦菜 & 辣酱荷包蛋',
    subtitle: '最治愈的潮汕式“白粥配杂咸” · 10分钟清爽刮油、洗碗只需1分钟',
    slot: 'dinner',
    stapleType: 'congee',
    prepMinutes: 3,
    cookMinutes: 9,
    calories: 370,
    proteinGrams: 17,
    imageUrl: '/src/assets/images/air_fryer_dinner_1793918770202.jpg',
    coreEquipmentIds: ['gas_stove', 'wok', 'knife'],
    existingCondimentIds: ['olive_oil', 'light_soy', 'chili_sauce', 'salt'],
    requiredAdditionIds: ['eggs_bread_noodles', 'tofu_chicken_greens'],
    flavorFormula: '清甜白粥底 + 猛火蒜蓉薄盐蚝油油麦菜(250g) + 生抽辣椒酱煎荷包蛋',
    soloPortionNote: '这顿晚饭一次性帮你消灭半袋盒马油麦菜（250g）！热白粥配脆嫩蚝油青菜和流心辣酱煎蛋，肠胃零负担。',
    steps: [
      {
        id: 'd2_s1',
        phase: 'wok',
        deviceLabel: '燃气灶+炒锅',
        title: '先用炒锅把半碗米饭+开水熬成8分钟稠白粥盛出',
        detail: '炒锅放入半碗米饭与500ml开水，中火熬煮7–8分钟至米粒开花、汤汁浓白，盛入大粥碗保温。',
        durationSeconds: 450
      },
      {
        id: 'd2_s2',
        phase: 'wok',
        deviceLabel: '燃气灶+炒锅',
        title: '原锅冲净擦干，煎1颗焦边荷包蛋淋半勺生抽与辣椒酱',
        detail: '炒锅倒少许油，煎1颗外焦里嫩的荷包蛋，淋半勺生抽和半勺辣椒酱盛出做佐粥硬菜。',
        durationSeconds: 120
      },
      {
        id: 'd2_s3',
        phase: 'wok',
        deviceLabel: '燃气灶+炒锅',
        title: '下蒜末爆香，大火40秒快炒250g蚝油油麦菜',
        detail: '锅底下3瓣蒜末爆香，倒入半袋油麦菜（250g）大火翻炒30秒至断生翠绿，挤入1勺薄盐蚝油翻匀出锅，一粥两菜齐活！',
        durationSeconds: 60
      }
    ]
  }
];

export const INITIAL_WEEKLY_PLAN: DayPlan[] = [
  {
    dayIndex: 1,
    dayName: '周一（今天）',
    focusLabel: '午饭盖浇 · 晚间汤面',
    breakfastId: 'bf_today_1',
    lunchId: 'lunch_wok_chicken',
    dinnerId: 'dinner_noodle_tofu_greens',
    batchPrepNote: '早饭煮龙须面烫100g小白菜；中午买肉和油回来焖2份米饭（1份中午做薄皮椒滑鸡腿盖饭，1份留明天煮粥）；晚上用半盒老豆腐+剩余200g小白菜煮奶白煎蛋汤面（小白菜清零！）。'
  },
  {
    dayIndex: 2,
    dayName: '周二',
    focusLabel: '午间拌面 · 晚间生滚粥',
    breakfastId: 'bf_today_2',
    lunchId: 'lunch_biang_noodles',
    dinnerId: 'dinner_congee_meat_greens',
    batchPrepNote: '早饭空气炸锅烤鲜奶吐司太阳蛋；中午用剩下半盒老豆腐烤脆哨配油醋辣拌面（老豆腐清零！）；晚上用昨天预留的半碗米饭10分钟煮《姜丝滑肉片青菜咸粥》。'
  },
  {
    dayIndex: 3,
    dayName: '周三',
    focusLabel: '午间双拼饭 · 晚间白粥青菜',
    breakfastId: 'bf_today_3',
    lunchId: 'lunch_rice_tiger_pepper_egg',
    dinnerId: 'dinner_wok_soup',
    batchPrepNote: '今天集中消灭500g油麦菜！中午做《虎皮薄皮椒荷包蛋+250g蒜蓉蚝油油麦菜盖饭》；晚上煮一碗热白粥配剩下250g蚝油油麦菜（油麦菜清零！）。'
  },
  {
    dayIndex: 4,
    dayName: '周四',
    focusLabel: '午间肉丝面 · 晚间蛋花粥',
    breakfastId: 'bf_today_1',
    lunchId: 'lunch_noodle_pepper_meat',
    dinnerId: 'dinner_congee_egg_tofu',
    batchPrepNote: '中午用解冻的第二份肉丝+薄皮椒现炒浇头拌龙须面；晚上熬金丝蛋花粥，配空气炸锅无油烟烤虎皮青椒。'
  },
  {
    dayIndex: 5,
    dayName: '周五',
    focusLabel: '午间红烧饭 · 晚间清汤面',
    breakfastId: 'bf_today_2',
    lunchId: 'lunch_rice_pork_tofu',
    dinnerId: 'dinner_noodle_velvet_meat',
    batchPrepNote: '中午用最后一份肉做浓汁滑肉盖饭；周五晚间煮一碗清爽的生姜胡椒滑肉片清汤龙须面，舒舒服服迎接周末。'
  }
];

export interface RecipeReadiness {
  recipeId: string;
  isReadyNow: boolean;
  missingItems: KitchenItem[];
  ownedCoreToolsCount: number;
  ownedCondimentsCount: number;
}

export function evaluateRecipeReadiness(
  recipe: Recipe,
  items: KitchenItem[]
): RecipeReadiness {
  const itemMap = new Map(items.map((item) => [item.id, item]));

  const missingItems: KitchenItem[] = [];
  for (const reqId of recipe.requiredAdditionIds) {
    const item = itemMap.get(reqId);
    if (item && !item.owned) {
      missingItems.push(item);
    }
  }

  for (const eqId of recipe.coreEquipmentIds) {
    const item = itemMap.get(eqId);
    if (item && !item.owned) {
      missingItems.push(item);
    }
  }

  const ownedCoreToolsCount = recipe.coreEquipmentIds.filter(
    (id) => itemMap.get(id)?.owned
  ).length;
  const ownedCondimentsCount = recipe.existingCondimentIds.filter(
    (id) => itemMap.get(id)?.owned
  ).length;

  return {
    recipeId: recipe.id,
    isReadyNow: missingItems.length === 0,
    missingItems,
    ownedCoreToolsCount,
    ownedCondimentsCount
  };
}

export interface ShoppingBudgetSummary {
  ownedCount: number;
  toBuyCount: number;
  tier1TotalCost: number;
  remainingTotalCost: number;
  readinessPercentage: number;
}

export function calculateKitchenSummary(
  items: KitchenItem[],
  recipes: Recipe[]
): ShoppingBudgetSummary {
  const ownedCount = items.filter((i) => i.owned).length;
  const toBuyItems = items.filter((i) => !i.owned);
  const toBuyCount = toBuyItems.length;

  const tier1TotalCost = toBuyItems
    .filter((i) => i.priority === 'tier1_must')
    .reduce((sum, item) => sum + item.estimatedPrice, 0);

  const remainingTotalCost = toBuyItems.reduce(
    (sum, item) => sum + item.estimatedPrice,
    0
  );

  const readyRecipesCount = recipes.filter(
    (r) => evaluateRecipeReadiness(r, items).isReadyNow
  ).length;

  const readinessPercentage =
    recipes.length === 0
      ? 100
      : Math.round((readyRecipesCount / recipes.length) * 100);

  return {
    ownedCount,
    toBuyCount,
    tier1TotalCost,
    remainingTotalCost,
    readinessPercentage
  };
}

export function toggleItemOwnership(
  items: KitchenItem[],
  itemId: string
): KitchenItem[] {
  return items.map((item) =>
    item.id === itemId ? { ...item, owned: !item.owned } : item
  );
}

export function addCustomShoppingItem(
  items: KitchenItem[],
  name: string,
  category: ItemCategory,
  estimatedPrice: number,
  spec: string
): { items: KitchenItem[]; error?: string } {
  const trimmedName = name.trim();
  if (!trimmedName) {
    return { items, error: '请输入需要添置的食材或器具名称' };
  }
  if (Number.isNaN(estimatedPrice) || estimatedPrice < 0) {
    return { items, error: '预估金额不能为负数' };
  }

  const newItem: KitchenItem = {
    id: `custom_${Date.now()}`,
    name: trimmedName,
    category,
    priority: 'tier3_pantry',
    owned: false,
    estimatedPrice: Math.round(estimatedPrice),
    spec: spec.trim() || '自定义一人食添置项',
    reason: '根据个人口味补充的定制采购项。',
    usageTip: '建议按1周内能消耗完的小份量购买。'
  };

  return { items: [...items, newItem] };
}

export type ShoppingCycleDays = 3 | 5 | 7;

export interface FreshPortionRecommendation {
  id: string;
  name: string;
  group: 'protein' | 'leafy_1_3_days' | 'dual_use_3_5_days' | 'hardy_5_7_days';
  groupLabel: string;
  totalGrams: number;
  unitDescription: string;
  singleMealGrams: number;
  mealsCount: number;
  shelfLifeDays: string;
  matchedToolAndCondiment: string;
  prepAndStorageTip: string;
}

export interface CyclePortionSummary {
  cycleDays: ShoppingCycleDays;
  chickenTotalGrams: number;
  chickenPiecesCount: string;
  chickenMealsCount: number;
  vegetablesTotalGrams: number;
  recommendations: FreshPortionRecommendation[];
}

export function calculateFreshPortionsByDays(
  cycleDays: ShoppingCycleDays
): CyclePortionSummary {
  const multiplier = cycleDays === 3 ? 0.65 : cycleDays === 5 ? 1 : 1.4;

  const chickenMealsCount = cycleDays === 3 ? 2 : cycleDays === 5 ? 3 : 4;
  const singleChickenGrams = 150;
  const chickenTotalGrams = chickenMealsCount * singleChickenGrams;
  const chickenPiecesCount =
    cycleDays === 3
      ? '2整块去骨鸡腿排（或琵琶腿3根）'
      : cycleDays === 5
      ? '3整块去骨鸡腿排（超市标准1盒/1袋装）'
      : '4–5块去骨鸡腿排';

  const recommendations: FreshPortionRecommendation[] = [
    {
      id: 'fp_chicken_thigh',
      name: '去骨鸡腿肉（带皮最佳）',
      group: 'protein',
      groupLabel: '核心肉类蛋白 · 按顿分装冷冻',
      totalGrams: chickenTotalGrams,
      unitDescription: chickenPiecesCount,
      singleMealGrams: singleChickenGrams,
      mealsCount: chickenMealsCount,
      shelfLifeDays: '冷藏1天 / 分装冷冻30天',
      matchedToolAndCondiment: '炒锅干煎逼油 + 生抽 + 辣椒酱 + 胡椒粉 / 空气炸锅190°C脆烤',
      prepAndStorageTip: `买回当天切3cm块（每份${singleChickenGrams}g），加半勺生抽、胡椒粉、几滴橄榄油抓匀，分${chickenMealsCount}小袋压扁平铺冷冻，做饭前连袋泡水5分钟即化。`
    },
    {
      id: 'fp_bok_choy',
      name: '上海青（小油菜）',
      group: 'leafy_1_3_days',
      groupLabel: '第1–2天优先吃 · 绿叶快手菜',
      totalGrams: Math.round(300 * multiplier / 50) * 50,
      unitDescription: cycleDays === 3 ? '约3–4小棵' : cycleDays === 5 ? '约5–6小棵（1小把）' : '约7–8小棵',
      singleMealGrams: 150,
      mealsCount: cycleDays === 3 ? 1 : cycleDays === 5 ? 2 : 3,
      shelfLifeDays: '冷藏2–3天',
      matchedToolAndCondiment: '炒锅煮面最后30秒同烫 / 橄榄油+盐+生抽大火快炒',
      prepAndStorageTip: '根部朝下套保鲜袋立放冷藏；煮汤面或拌面时直接掰3棵丢进锅里，免洗炒锅。'
    },
    {
      id: 'fp_lettuce',
      name: '球生菜（结球生菜）',
      group: 'leafy_1_3_days',
      groupLabel: '第1–4天随手吃 · 免开火冷拌/热汤',
      totalGrams: Math.round(250 * multiplier / 50) * 50,
      unitDescription: '1小颗（重约250g–300g）',
      singleMealGrams: 125,
      mealsCount: 2,
      shelfLifeDays: '冷藏4–5天（不碰刀更耐放）',
      matchedToolAndCondiment: '手撕直接淋现成「油醋汁」 / 炒锅生抽热汤起锅前烫5秒',
      prepAndStorageTip: '千万不要用菜刀切！从外层一瓣瓣手撕洗净甩干水，配你现有的油醋汁就是0油烟晚餐沙拉。'
    },
    {
      id: 'fp_zucchini_pepper',
      name: '西葫芦 1根 + 青椒（螺丝椒/二荆条）3根',
      group: 'dual_use_3_5_days',
      groupLabel: '第3–5天吃 · 炸锅/炒锅双栖配菜',
      totalGrams: Math.round(400 * multiplier / 50) * 50,
      unitDescription: '西葫芦约250g + 青椒约150g',
      singleMealGrams: 130,
      mealsCount: 3,
      shelfLifeDays: '冷藏5–7天',
      matchedToolAndCondiment: '青椒配鸡腿肉猛火生抽收汁 / 西葫芦刷几滴橄榄油+胡椒进空气炸锅',
      prepAndStorageTip: '青椒是生抽辣子鸡腿盖饭的绝配；西葫芦切厚片刷生抽黑椒进空气炸锅190°C烤10分钟清甜多汁。'
    },
    {
      id: 'fp_onion_cabbage',
      name: '紫洋葱 1颗 + 小圆包菜（半颗）',
      group: 'hardy_5_7_days',
      groupLabel: '第4–7天保底菜 · 替代葱姜爆香 & 极耐放',
      totalGrams: Math.round(450 * multiplier / 50) * 50,
      unitDescription: '紫洋葱1颗(200g) + 圆包菜半颗(250g)',
      singleMealGrams: 150,
      mealsCount: 3,
      shelfLifeDays: '阴凉处/冷藏7–14天不坏',
      matchedToolAndCondiment: '洋葱替代大葱炝锅提甜香 / 手撕包菜配生抽+辣椒酱+油醋汁爆炒',
      prepAndStorageTip: '你目前没有葱姜蒜，每次切1/3颗洋葱下锅煸炒就是天然葱香底味；手撕包菜淋半勺生抽半勺油醋汁就是干锅包菜！'
    }
  ];

  const vegetablesTotalGrams = recommendations
    .filter((r) => r.group !== 'protein')
    .reduce((sum, r) => sum + r.totalGrams, 0);

  return {
    cycleDays,
    chickenTotalGrams,
    chickenPiecesCount,
    chickenMealsCount,
    vegetablesTotalGrams,
    recommendations
  };
}

export interface HemaPurchasedItem {
  id: string;
  name: string;
  spec: string;
  pricePaid: number;
  urgencyLevel: 'high_2days' | 'medium_4days' | 'pantry_long';
  urgencyText: string;
  storageAction: string;
  bestDishMatch: string;
}

export const HEMA_PURCHASED_ITEMS: HemaPurchasedItem[] = [
  {
    id: 'hema_xiaobaicai',
    name: '盒马日日鲜 小白菜',
    spec: '约300g/份（免费领菜）',
    pricePaid: 0,
    urgencyLevel: 'high_2days',
    urgencyText: '第1优先级 · 今明2天吃完',
    storageAction: '不洗直接套保鲜袋放冷藏蔬果格；最娇嫩，优先下汤面和煮豆腐汤。',
    bestDishMatch: '今早：龙须挂面最后30秒烫100g；今晚：小白菜老豆腐滑肉汤消耗200g（1天清零！）'
  },
  {
    id: 'hema_youmaicai',
    name: '盒马日日鲜 油麦菜',
    spec: '约500g/份（整整1斤）',
    pricePaid: 2.7,
    urgencyLevel: 'high_2days',
    urgencyText: '第1优先级 · 分2–3顿在3天内吃完',
    storageAction: '厨房纸包裹根部吸潮套袋冷藏；500g分量很大，每顿炒一半（250g）。',
    bestDishMatch: '拍4瓣蒜末 + 1勺刚买的薄盐蚝油 + 半勺生抽，大火40秒快炒《蒜蓉蚝油油麦菜》'
  },
  {
    id: 'hema_tofu',
    name: '盒马日日鲜 老豆腐',
    spec: '380g/盒',
    pricePaid: 2.7,
    urgencyLevel: 'high_2days',
    urgencyText: '第1优先级 · 分2顿（今明两天吃完）',
    storageAction: '打开包装切一半（190g）今天用；剩下一半放入碗中加凉白开没过豆腐冷藏，防酸败。',
    bestDishMatch: '今天中午/晚上：190g切丁进空气炸锅200°C烤10分钟做脆哨豆腐；明天：190g煮汤或蚝油葱烧豆腐'
  },
  {
    id: 'hema_toast',
    name: '盒马烘焙 鲜奶吐司',
    spec: '240g/袋（约4–6厚片）',
    pricePaid: 6.23,
    urgencyLevel: 'medium_4days',
    urgencyText: '第2优先级 · 常温3天 / 冷冻2周',
    storageAction: '留2片今明早饭吃，其余直接密封放冷冻室！烤前无需解冻，直接进空气炸锅。',
    bestDishMatch: '空气炸锅180°C烤6分钟《脆边太阳蛋鲜奶吐司》'
  },
  {
    id: 'hema_peppers',
    name: '薄皮椒',
    spec: '约300g/份（约6–8根）',
    pricePaid: 2.7,
    urgencyLevel: 'medium_4days',
    urgencyText: '第2优先级 · 冷藏可放5–7天',
    storageAction: '擦干表面水汽套袋冷藏；皮薄肉嫩微辣，极易出虎皮焦香。',
    bestDishMatch: '配中午买的肉做《薄皮椒生抽蚝油炒鸡腿/小炒肉》或《虎皮青椒荷包蛋盖饭》'
  },
  {
    id: 'hema_aromatics',
    name: '盒马日日鲜 葱姜蒜组合',
    spec: '约300g/份（大葱段+老姜+大蒜2头）',
    pricePaid: 8.11,
    urgencyLevel: 'medium_4days',
    urgencyText: '炝锅灵魂已就位 · 葱可切段冷冻',
    storageAction: '大蒜放阴凉通风处；大葱用2根，剩下的切斜段装盒冷冻；生姜切片冷冻随取随用。',
    bestDishMatch: '彻底解锁中式爆香！蒜末炒油麦菜、葱段爆炒鸡腿肉、姜片煮肉片豆腐汤去腥'
  },
  {
    id: 'hema_eggs',
    name: '盒马 大码富硒谷物蛋',
    spec: '20枚 · 1.2kg（平均60g/枚大蛋）',
    pricePaid: 14.8,
    urgencyLevel: 'pantry_long',
    urgencyText: '主力蛋白 · 冷藏可放30天',
    storageAction: '大头朝上放冰箱冷藏室（不要放冰箱门架，防震动散黄）。',
    bestDishMatch: '每天早晚消耗2枚（焦边荷包蛋、太阳蛋吐司、葱花滑蛋、薄皮椒炒鸡蛋），约10天吃完'
  },
  {
    id: 'hema_noodles',
    name: '盒马 龙须挂面(鸡蛋风味)',
    spec: '800g × 2袋（共1600g）',
    pricePaid: 8.85,
    urgencyLevel: 'pantry_long',
    urgencyText: '约够吃18–20顿 · 极细快熟',
    storageAction: '开封后用夹子夹紧防潮；龙须面极细，水开下锅仅需90秒–2分钟即熟！',
    bestDishMatch: '注意！龙须面千万别煮久，水沸下锅90秒连小白菜一起捞出，冲入生抽蚝油油醋辣汤底'
  },
  {
    id: 'hema_oyster_sauce',
    name: '盒马 薄盐蚝油（挤挤装）',
    spec: '500g/瓶（控量神仙包装）',
    pricePaid: 7.13,
    urgencyLevel: 'pantry_long',
    urgencyText: '开封后务必放冰箱冷藏',
    storageAction: '挤挤瓶设计非常适合一人食（挤1秒约等于半勺），注意开封后必须放冰箱冷藏防变质！',
    bestDishMatch: '蒜蓉蚝油油麦菜、蚝油葱烧老豆腐、薄皮椒蚝油滑肉片'
  },
  {
    id: 'hema_starch',
    name: '盒马 玉米淀粉',
    spec: '200g/袋',
    pricePaid: 2.62,
    urgencyLevel: 'pantry_long',
    urgencyText: '嫩肉与勾芡神器 · 常温密封',
    storageAction: '夹紧袋口防潮；切好的肉片加半勺生抽+半勺油+1小勺淀粉抓匀，怎么炒都滑嫩不柴！',
    bestDishMatch: '中午买回的肉用淀粉上浆，做滑肉片汤或爆炒鸡腿丁，汤汁还能勾薄芡挂在面和饭上'
  }
];

export function applyHemaPurchaseToInventory(items: KitchenItem[]): KitchenItem[] {
  const unlockedIds = new Set([
    'eggs_bread_noodles',
    'tofu_chicken_greens',
    'aromatics_vinegar_sesame',
    'stir_fry_oil_starch'
  ]);
  return items.map((item) =>
    unlockedIds.has(item.id) ? { ...item, owned: true } : item
  );
}


