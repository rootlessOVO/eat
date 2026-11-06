import React, { useState } from 'react';
import { Check, Plus, ShoppingBag, Flame, Utensils } from 'lucide-react';
import {
  KitchenItem,
  ItemCategory,
  ShoppingBudgetSummary,
  ShoppingCycleDays,
  calculateFreshPortionsByDays
} from '../data/kitchenPlanner';

interface KitchenAuditSectionProps {
  items: KitchenItem[];
  summary: ShoppingBudgetSummary;
  onToggleItem: (id: string) => void;
  onAddCustomItem: (
    name: string,
    category: ItemCategory,
    price: number,
    spec: string
  ) => string | undefined;
}

export const KitchenAuditSection: React.FC<KitchenAuditSectionProps> = ({
  items,
  summary,
  onToggleItem,
  onAddCustomItem
}) => {
  const [filterMode, setFilterMode] = useState<
    'all' | 'owned' | 'tier1_must' | 'tier2_upgrade' | 'tier3_pantry'
  >('all');

  const [customName, setCustomName] = useState('');
  const [customCategory, setCustomCategory] = useState<ItemCategory>('fresh');
  const [customPrice, setCustomPrice] = useState('15');
  const [customSpec, setCustomSpec] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [cycleDays, setCycleDays] = useState<ShoppingCycleDays>(5);

  const portionSummary = calculateFreshPortionsByDays(cycleDays);

  const filteredItems = items.filter((item) => {
    if (filterMode === 'all') return true;
    if (filterMode === 'owned') return item.owned;
    return item.priority === filterMode;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedPrice = Number(customPrice);
    const err = onAddCustomItem(customName, customCategory, parsedPrice, customSpec);
    if (err) {
      setFormError(err);
    } else {
      setFormError(null);
      setCustomName('');
      setCustomSpec('');
      setCustomPrice('15');
    }
  };

  const priorityLabel = (item: KitchenItem) => {
    if (item.owned) return '已有在库';
    switch (item.priority) {
      case 'tier1_must':
        return '第一梯队 · 必买刚需';
      case 'tier2_upgrade':
        return '第二梯队 · 效率升级';
      case 'tier3_pantry':
        return '核心食材 · 常备周转';
      default:
        return '待添置';
    }
  };

  return (
    <section
      id="kitchen-audit"
      aria-labelledby="audit-heading"
      className="max-w-7xl mx-auto px-6 py-12 border-b border-stone-200"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div className="max-w-3xl">
          <p className="text-xs font-medium text-amber-800 tracking-wide mb-2">
            01. 综合盘点与添置策略
          </p>
          <h2
            id="audit-heading"
            className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight"
          >
            现有厨房诊断 & 阶梯式添置清单
          </h2>
          <p className="text-sm text-stone-600 mt-2 leading-relaxed">
            一人食切忌一次性买齐满汉全席装备。以下先帮你把<strong>现有的4件厨具与6种调料发挥到极致</strong>，再按投入产出比分为“必买刚需”、“效率升级”与“常备食材”三档。点击任意物品即可切换<strong>「已有 / 待购」</strong>，全站菜谱会自动计算可做状态。
          </p>
        </div>

        {/* Summary KPI Strip */}
        <div className="grid grid-cols-3 gap-6 bg-white border border-stone-200 rounded-xl px-5 py-3.5 shrink-0">
          <div>
            <div className="text-xs text-stone-500">当前在库装备/食材</div>
            <div
              data-testid="owned-items-count"
              className="text-xl font-bold text-stone-900 tabular-nums mt-0.5"
            >
              {summary.ownedCount} 项
            </div>
          </div>
          <div>
            <div className="text-xs text-stone-500">菜谱解锁率</div>
            <div
              data-testid="recipe-readiness-pct"
              className="text-xl font-bold text-emerald-700 tabular-nums mt-0.5"
            >
              {summary.readinessPercentage}%
            </div>
          </div>
          <div>
            <div className="text-xs text-stone-500">待购预估总计</div>
            <div
              data-testid="remaining-budget-cost"
              className="text-xl font-bold text-amber-800 tabular-nums mt-0.5"
            >
              ¥{summary.remainingTotalCost}
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core Synergy Formulas Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white border border-stone-200 rounded-xl p-5">
          <div className="text-xs font-semibold text-amber-800 mb-1">
            味型公式 01 · 锅边酱香法
          </div>
          <h3 className="text-base font-bold text-stone-900 mb-1.5">
            橄榄油 + 热炒锅 + 生抽 + 胡椒粉
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            没有葱姜蒜时，把鸡蛋或肉片煎出焦边，沿滚烫锅壁淋入1勺生抽，瞬间美拉德反应激出浓郁豉油焦香。
          </p>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-5">
          <div className="text-xs font-semibold text-amber-800 mb-1">
            味型公式 02 · 川味酸辣碗底
          </div>
          <h3 className="text-base font-bold text-stone-900 mb-1.5">
            油醋汁 + 生抽 + 辣椒酱 + 盐
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            油醋汁直接替代陈醋+白糖！按「生抽1.5 : 油醋汁1 : 辣椒酱0.5」调配，无论冲汤面、干拌面还是蘸水饺都绝妙。
          </p>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-5">
          <div className="text-xs font-semibold text-amber-800 mb-1">
            味型公式 03 · 炸锅脆皮烧烤味
          </div>
          <h3 className="text-base font-bold text-stone-900 mb-1.5">
            空气炸锅 + 几滴橄榄油 + 胡椒 + 辣酱
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            你的橄榄油所剩不多，用空气炸锅烤鸡腿、豆腐、土豆只需几滴油润表面，省油90%且免刷大锅。
          </p>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-5">
          <div className="text-xs font-semibold text-amber-800 mb-1">
            效率公式 04 · 10分钟双线做饭
          </div>
          <h3 className="text-base font-bold text-stone-900 mb-1.5">
            炸锅定时烤主菜 + 炒锅同步煮汤/炒青菜
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            切忌一个锅做完一菜再做下一菜。先把耐烤食材塞进空气炸锅定时10分钟，转身用炒锅3分钟炒青菜或煮面。
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div
          role="group"
          aria-label="清单分类筛选"
          className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/80 rounded-xl"
        >
          {[
            { id: 'all', label: '全部清单' },
            { id: 'owned', label: '现有厨具与调料' },
            { id: 'tier1_must', label: '第一梯队：必买刚需' },
            { id: 'tier2_upgrade', label: '第二梯队：省心升级' },
            { id: 'tier3_pantry', label: '第三梯队：常备食材' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterMode(tab.id as typeof filterMode)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                filterMode === tab.id
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="text-xs text-stone-500">
          提示：买齐「第一梯队必买刚需」仅需约{' '}
          <strong className="tabular-nums text-stone-900">
            ¥{summary.tier1TotalCost}
          </strong>
          ，即可补齐锅铲、电饭煲、中式炒菜油与免洗硅油纸。
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-xl border transition-colors flex flex-col justify-between ${
              item.owned
                ? 'bg-white border-stone-200'
                : 'bg-amber-50/35 border-amber-200/90'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="text-xs text-stone-500 flex items-center gap-1.5">
                  <span
                    className={
                      item.owned ? 'text-emerald-700 font-medium' : 'text-amber-800 font-medium'
                    }
                  >
                    {priorityLabel(item)}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{item.spec}</span>
                </div>
                {item.estimatedPrice > 0 && (
                  <span className="text-xs font-semibold tabular-nums text-stone-700 shrink-0">
                    约 ¥{item.estimatedPrice}
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-stone-900 mb-1.5">
                {item.name}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-3">
                {item.reason}
              </p>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
              <span className="text-xs text-stone-500 line-clamp-1">
                用法：{item.usageTip}
              </span>
              <button
                type="button"
                onClick={() => onToggleItem(item.id)}
                aria-label={`${item.owned ? '移出在库' : '标记已购入库'} ${item.name}`}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
                  item.owned
                    ? 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    : 'bg-stone-900 text-white hover:bg-stone-800'
                }`}
              >
                {item.owned ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>已有在库</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>标记已买</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Chicken Thigh & Vegetables Exact Grammage Calculator */}
      <div
        id="fresh-portion-guide"
        className="bg-white border border-stone-200 rounded-2xl p-6 mb-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 mb-6 border-b border-stone-200">
          <div>
            <p className="text-xs font-medium text-amber-800 mb-1">
              生鲜买菜精确克数指南 · 拒绝烂菜与剩肉
            </p>
            <h3 className="text-xl font-bold text-stone-900">
              鸡腿肉买多少g？青菜买什么、买多少？
            </h3>
            <p className="text-xs text-stone-600 mt-1">
              选择你的买菜周期，系统按<strong>「单顿肉150g + 绿叶菜前2天吃 + 耐放菜后4天吃」</strong>自动算出精确克数与分装方案：
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div
              role="group"
              aria-label="买菜周期天数选择"
              className="flex items-center gap-1.5 p-1 bg-stone-200/80 rounded-xl"
            >
              {([3, 5, 7] as ShoppingCycleDays[]).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setCycleDays(d)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    cycleDays === d
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'text-stone-700 hover:text-stone-900'
                  }`}
                >
                  {d === 3 ? '3天短周期' : d === 5 ? '5天工作日（推荐）' : '7天整周'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Top Summary Metrics for Selected Cycle */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/80">
            <div className="text-xs text-stone-600">
              去骨鸡腿肉采购总量（{cycleDays}天周期）
            </div>
            <div
              data-testid="chicken-total-grams"
              className="text-2xl font-bold text-stone-900 tabular-nums mt-1"
            >
              {portionSummary.chickenTotalGrams}g
            </div>
            <div className="text-xs text-amber-900 mt-1">
              相当于 {portionSummary.chickenPiecesCount} · 分 {portionSummary.chickenMealsCount} 顿吃（每顿 150g）
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
            <div className="text-xs text-stone-600">
              4类青菜阶梯总采购量（{cycleDays}天周期）
            </div>
            <div
              data-testid="veg-total-grams"
              className="text-2xl font-bold text-stone-900 tabular-nums mt-1"
            >
              {portionSummary.vegetablesTotalGrams}g
            </div>
            <div className="text-xs text-stone-500 mt-1">
              涵盖 2种绿叶菜 + 2种炸锅/快炒果菜 + 2种保底耐放菜
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
            <div className="text-xs text-stone-600">
              一人食买肉黄金换算公式
            </div>
            <div className="text-sm font-bold text-stone-900 mt-1">
              带骨琵琶腿 600g ≈ 去骨肉 450g
            </div>
            <div className="text-xs text-stone-500 mt-1">
              建议直接买冰鲜<strong>带皮去骨鸡腿排</strong>，省去自己剔骨，鸡皮还能煎油！
            </div>
          </div>
        </div>

        {/* Detailed Portion Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50 text-xs font-semibold text-stone-600">
                <th className="py-3 px-4">食材名称与梯队</th>
                <th className="py-3 px-4 text-right">建议买多少 (总克数)</th>
                <th className="py-3 px-4">直观数量 / 单顿用量</th>
                <th className="py-3 px-4">匹配你的现有厨具与调料</th>
                <th className="py-3 px-4">分装与保鲜防烂实操</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-xs">
              {portionSummary.recommendations.map((rec) => (
                <tr key={rec.id} className="hover:bg-stone-50/70 align-top">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-sm text-stone-900">
                      {rec.name}
                    </div>
                    <div className="text-amber-800 mt-0.5">{rec.groupLabel}</div>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap tabular-nums">
                    <span className="text-sm font-bold text-stone-900">
                      {rec.totalGrams}g
                    </span>
                    <div className="text-stone-500 mt-0.5">{rec.shelfLifeDays}</div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="font-medium text-stone-800">
                      {rec.unitDescription}
                    </div>
                    <div className="text-stone-500 tabular-nums mt-0.5">
                      每顿约 {rec.singleMealGrams}g · 吃 {rec.mealsCount} 顿
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-stone-700 min-w-[200px]">
                    {rec.matchedToolAndCondiment}
                  </td>
                  <td className="py-3.5 px-4 text-stone-600 leading-relaxed min-w-[240px]">
                    {rec.prepAndStorageTip}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Custom Item Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-stone-200 rounded-xl p-5"
      >
        <div className="text-sm font-bold text-stone-900 mb-3">
          添加自定义待购食材或厨具
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-start">
          <div className="sm:col-span-4">
            <label htmlFor="custom-item-name" className="block text-xs text-stone-600 mb-1">
              名称（必填）
            </label>
            <input
              id="custom-item-name"
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="例如：冷冻水饺 / 小米辣 / 削皮刀"
              className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="custom-item-cat" className="block text-xs text-stone-600 mb-1">
              分类
            </label>
            <select
              id="custom-item-cat"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value as ItemCategory)}
              className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-500"
            >
              <option value="fresh">生鲜肉菜</option>
              <option value="staple">主食干货</option>
              <option value="condiment">调料酱汁</option>
              <option value="tool">厨房器具</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="custom-item-price" className="block text-xs text-stone-600 mb-1">
              预估金额 (¥)
            </label>
            <input
              id="custom-item-price"
              type="number"
              value={customPrice}
              onChange={(e) => setCustomPrice(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg tabular-nums focus:outline-none focus:border-stone-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="custom-item-spec" className="block text-xs text-stone-600 mb-1">
              规格备注
            </label>
            <input
              id="custom-item-spec"
              type="text"
              value={customSpec}
              onChange={(e) => setCustomSpec(e.target.value)}
              placeholder="如：500g袋装"
              className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-500"
            />
          </div>

          <div className="sm:col-span-2 sm:pt-5">
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>加入采购单</span>
            </button>
          </div>
        </div>
        {formError && (
          <p role="alert" className="text-xs text-red-600 mt-2">
            {formError}
          </p>
        )}
      </form>
    </section>
  );
};
