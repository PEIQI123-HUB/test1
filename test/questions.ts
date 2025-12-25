
import { Question, QuestionType, Category } from './types';

export const QUESTION_BANK: Question[] = [
  // --- PDF 真题提取：产品定位与基础 (权重 3) ---
  {
    id: 'pdf_v2_1',
    type: QuestionType.SINGLE,
    category: Category.PRODUCT,
    text: '关于好评展示，以下哪项为正确描述？',
    options: ['A. 筛选优质买家好评，且好评率大于 70%', 'B. 筛选优质买家好评，且好评率大于 80%', 'C. 筛选优质买家好评即可，好评率不重要', 'D. 好评率是商品质量真实反映，建议任何情况下均开启'],
    answer: 'B',
    explanation: '真题考点：好评展示建议筛选好评率大于 80% 的优质评价。',
    weight: 3
  },
  {
    id: 'pdf_v2_2',
    type: QuestionType.SINGLE,
    category: Category.OPTIMIZATION,
    text: '在以下选项中，人设安利类型的素材更具备什么优势？',
    options: ['A. 品质保障', 'B. 激发痛点', 'C. 增加信任', 'D. 价格优惠'],
    answer: 'C',
    explanation: '真题考点：人设类素材的核心优势在于通过达人背书增加用户信任感。',
    weight: 3
  },
  {
    id: 'pdf_v2_3',
    type: QuestionType.SINGLE,
    category: Category.OPTIMIZATION,
    text: '下列不属于 3S 完播率的影响因素是？',
    options: ['A. 第一句文案', 'B. 素材时长', 'C. 开头画面', 'D. 背景音乐'],
    answer: 'B',
    explanation: '真题考点：3S（3秒）完播率主要受开头吸引力（画面、文案、音乐）影响，素材总时长影响的是整体完播率。',
    weight: 3
  },
  {
    id: 'pdf_v2_5',
    type: QuestionType.SINGLE,
    category: Category.PRODUCT,
    text: '巨量千川的定位是？',
    options: [
      'A. 巨量千川抖音电商的广告投放平台',
      'B. 巨量千川是巨量鲁班的升级版本',
      'C. 巨量引擎旗下的电商一体化智能营销平台',
      'D. 巨量千川与 DOU+ 一样，是内容加热的平台'
    ],
    answer: 'C',
    explanation: '官方定义：巨量千川是电商一体化智能营销平台。',
    weight: 3
  },
  {
    id: 'pdf_v2_8',
    type: QuestionType.SINGLE,
    category: Category.OPTIMIZATION,
    text: 'FeedsLive 直播间下单的最短投放时长是？',
    options: ['A. 半小时', 'B. 两小时', 'C. 一小时', 'D. 四小时'],
    answer: 'C',
    explanation: '真题考点：FeedsLive 最短起投时间为 1 小时。',
    weight: 3
  },
  {
    id: 'pdf_v2_11',
    type: QuestionType.SINGLE,
    category: Category.OPTIMIZATION,
    text: '对于巨量千川广告出价调整，下列方式合理的是？',
    options: ['A. 逐步提升出价测试', 'B. 与客单价持平', 'C. 直接采用系统建议', 'D. 参考 SKU 最低价格'],
    answer: 'A',
    explanation: '操作规范：出价建议采用小步快跑、逐步提升的方式进行测试。',
    weight: 3
  },
  {
    id: 'pdf_v2_18',
    type: QuestionType.SINGLE,
    category: Category.PRODUCT,
    text: '以下选项中哪个属于 DMP 人群定向中的“基础人群标签”？',
    options: ['A. 行业', 'B. 身份', 'C. 职业', 'D. 手机品牌'],
    answer: 'C',
    explanation: '真题考点：职业、年龄、性别等属于基础人群标签。',
    weight: 3
  },
  {
    id: 'pdf_v2_19',
    type: QuestionType.SINGLE,
    category: Category.PRODUCT,
    text: '直播剪辑最多支持筛选多少天内的直播场次？',
    options: ['A. 最近 3 天', 'B. 最近 7 天', 'C. 最近 15 天', 'D. 最近 30 天'],
    answer: 'B',
    explanation: '真题考点：直播剪辑功能目前支持筛选最近 7 天的素材。',
    weight: 3
  },
  {
    id: 'pdf_v2_20',
    type: QuestionType.SINGLE,
    category: Category.PRODUCT,
    text: '以下哪种类型的抖音号不支持高光快投？',
    options: ['A. 官方号', 'B. 自运营品牌号', 'C. 自运营达人号', 'D. 合作达人号'],
    answer: 'D',
    explanation: '真题考点：合作达人号由于授权限制，目前不支持高光快投。',
    weight: 3
  },
  {
    id: 'pdf_v2_23',
    type: QuestionType.SINGLE,
    category: Category.DATA,
    text: '智选流量触发的搜索词数据可以在哪个报表查看？',
    options: ['A. 关键词报表', 'B. 搜索词报表', 'C. 综合报表', 'D. 智选流量专用报表'],
    answer: 'B',
    explanation: '真题考点：智选流量带来的搜索转化需在搜索词报表中通过筛选查看。',
    weight: 3
  },
  {
    id: 'pdf_v2_25_multi',
    type: QuestionType.MULTIPLE,
    category: Category.PRODUCT,
    text: '以下哪些人群属于“八大消费者人群”？',
    options: ['A. 都市白领', 'B. 资深中产', 'C. 精致妈妈', 'D. 都市蓝领', 'E. 小镇中年'],
    answer: ['B', 'C', 'D'],
    explanation: '真题考点：八大人群包含资深中产、精致妈妈、都市蓝领、新锐白领等（注意选项陷阱）。',
    weight: 3
  },
  {
    id: 'pdf_v2_36',
    type: QuestionType.SINGLE,
    category: Category.OPTIMIZATION,
    text: '关于 48h 发货率要求说明，说法错误的是？',
    options: ['A. 指标不低于 70%', 'B. 指标不低于 80%', 'C. 前一日数据不符合要求，当日广告权限会被关', 'D. 关闭 24 小时后如发货率符合指标要求，即可恢复'],
    answer: 'B',
    explanation: '真题考点：千川对商家的基础要求是发货率不低于 70%。',
    weight: 3
  },
  {
    id: 'pdf_v2_p1_1',
    type: QuestionType.BOOLEAN,
    category: Category.GENERAL,
    text: 'Excel 中 sum 系列函数的应用主要是计算数据求和。',
    answer: 'A',
    explanation: '真题考点：SUM 系列函数用于数学求和运算。',
    weight: 3
  },
  {
    id: 'pdf_v2_p1_5',
    type: QuestionType.BOOLEAN,
    category: Category.DATA,
    text: '在巨量千川投放过程中，实时监控直播间核心数据走向的功能，只有第三方软件才能实现。',
    answer: 'B',
    explanation: '真题纠错：千川后台自带实时直播诊断大屏，不需要强制依赖第三方。',
    weight: 3
  },
  {
    id: 'pdf_v2_p1_8',
    type: QuestionType.BOOLEAN,
    category: Category.PRODUCT,
    text: '保证金是指商家向平台缴存，用以保证平台规则履行的款项，所有商家只需缴纳基础保证金即可。',
    answer: 'B',
    explanation: '真题纠错：不同类目、不同销售额阶段可能需要补缴浮动保证金。',
    weight: 3
  },
  {
    id: 'pdf_v2_p1_10_30',
    type: QuestionType.SINGLE,
    category: Category.OPTIMIZATION,
    text: '新计划开启后，建议的学习期观察时间是几天？',
    options: ['A. T+3天', 'B. T+7天', 'C. T+5天', 'D. T+14天'],
    answer: 'A',
    explanation: '真题考点：广告模型学习期通常观察前 3 天数据（T+3）。',
    weight: 3
  },
  {
    id: 'pdf_v2_roi_stable',
    type: QuestionType.SINGLE,
    category: Category.OPTIMIZATION,
    text: '已经投放稳定的账户，不建议投放下列哪个转化目标？',
    options: ['A. 直播间观看', 'B. 直播间下单', 'C. 直播间成交', 'D. 支付 ROI'],
    answer: 'A',
    explanation: '真题考点：稳定期应主攻深层转化目标（成交/ROI），观看属于极浅层目标。',
    weight: 3
  },
  {
    id: 'pdf_v2_nobid',
    type: QuestionType.SINGLE,
    category: Category.PRODUCT,
    text: '以下哪个是 Nobid（放量投放）的产品逻辑？',
    options: [
      'A. 以获取成本最低的情况下尽量消耗预算',
      'B. 以同类型客户的均值成本为参考',
      'C. 尽可能在消耗完全部预算的前提下实现成本最低',
      'D. 只以消耗完预算为唯一目标'
    ],
    answer: 'C',
    explanation: '官方逻辑：放量投放是在预算范围内追求最大的转化量，并尽可能降低成本。',
    weight: 3
  },
  {
    id: 'pdf_v2_pay_rule',
    type: QuestionType.MULTIPLE,
    category: Category.OPTIMIZATION,
    text: '关于巨量千川计划赔付标准，以下哪些描述是正确的？',
    options: [
      'A. 转化成本超过目标成本的 20% 以上',
      'B. 每天修改出价或定向的次数不超过 2 次',
      'C. 累计转化数量要求 ≥ 6 个',
      'D. 学习期内不能暂停计划'
    ],
    answer: ['A', 'B', 'C'],
    explanation: '真题考点：赔付三要素——超成本20%、修改<2次、转化≥6个。',
    weight: 3
  },
  {
    id: 'pdf_v2_ctr_reason',
    type: QuestionType.MULTIPLE,
    category: Category.OPTIMIZATION,
    text: '直播间点击率差，我们可以优化的维度有哪些？',
    options: ['A. 账号主页精细化装修', 'B. 直播画面', 'C. 直播间标题与话题', 'D. 短视频引流素材质量'],
    answer: ['B', 'C', 'D'],
    explanation: '真题考点：主页装修对直播间瞬间点击率影响较小，核心在画面、标题和引流素材。',
    weight: 3
  },
  {
    id: 'pdf_v2_search_match',
    type: QuestionType.SINGLE,
    category: Category.PRODUCT,
    text: '千川搜索广告中，流量覆盖最少、精准度最高的匹配方式是？',
    options: ['A. 精确匹配', 'B. 短语匹配', 'C. 广泛匹配', 'D. 智选流量'],
    answer: 'A',
    explanation: '搜索常识：精确匹配流量最小但最精准。',
    weight: 3
  },
  {
    id: 'pdf_v2_uv_value',
    type: QuestionType.SINGLE,
    category: Category.DATA,
    text: '关于 UV 价值的计算公式，正确的是？',
    options: ['A. 销售额 / 访客数', 'B. 销售额 / 下单人数', 'C. 净利润 / 访客数', 'D. 净利润 / 下单人数'],
    answer: 'A',
    explanation: '计算公式：UV价值 = 总销售额 / 总访客人数。',
    weight: 3
  },
  {
    id: 'pdf_v2_gpm_formula',
    type: QuestionType.MULTIPLE,
    category: Category.DATA,
    text: '以下哪些是正确的 GPM 计算公式？',
    options: [
      'A. 成交金额 / 直播间展现量 * 1000',
      'B. 成交客单价 * 转化率 * 点击率 * 1000',
      'C. 成交金额 / 直播间观看量 * 1000',
      'D. 成交用户数 / 展现量 * 1000'
    ],
    answer: ['A', 'B'],
    explanation: '真题考点：GPM即千次展现成交额。A是原始定义，B是推导公式。',
    weight: 3
  },

  // --- 补充及原有真题 (权重 3) ---
  {
    id: 'pdf_15',
    type: QuestionType.SINGLE,
    category: Category.PRODUCT,
    text: '巨量千川竞价广告的计费方式是？',
    options: ['A. OCPM', 'B. CPM', 'C. CPA', 'D. CPC'],
    answer: 'A',
    explanation: '核心知识：千川竞价采用 OCPM。',
    weight: 3
  },
  {
    id: 'pdf_22',
    type: QuestionType.SINGLE,
    category: Category.PRODUCT,
    text: '下列账号中，与巨量千川账号打通的是？',
    options: ['A. 企业号账号', 'B. DOU+账号', 'C. 抖音小店与抖音账号', 'D. 巨量星图账号'],
    answer: 'C',
    explanation: '店号一体：打通小店和抖音号。',
    weight: 3
  },
  {
    id: 'pdf_30',
    type: QuestionType.MULTIPLE,
    category: Category.OPTIMIZATION,
    text: '关于千川搜索关键词设置，下列说法正确的有？',
    options: ['A. 关键词覆盖类型尽量全面', 'B. 不断提升素材与关键词相关性', 'C. 关键词需要定期优化更新', 'D. 量大是关键词的基础之一'],
    answer: ['A', 'B', 'C', 'D'],
    explanation: '真题考点：全方位管理关键词。',
    weight: 3
  }
];
