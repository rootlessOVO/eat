import React, { useState } from 'react';
import { Utensils } from 'lucide-react';
import {
  Recipe,
  KitchenItem,
  MealSlot,
  StapleCategory,
  evaluateRecipeReadiness
} from '../data/kitchenPlanner';

interface ThreeMealsSystemSectionProps {
  recipes: Recipe[];
  kitchenItems: KitchenItem[];
  onLoadAsTodayBreakfast: (recipeId: string) => void;
  onAssignToDay: (dayIndex: number, slot: MealSlot, recipeId: string) => void;
}

export const ThreeMealsSystemSection: React.FC<ThreeMealsSystemSectionProps> = ({
  recipes,
  kitchenItems,
  onLoadAsTodayBreakfast,
  onAssignToDay
}) => {
  const [selectedSlot, setSelectedSlot] = useState<'all' | MealSlot>('all');
  const [selectedStaple, setSelectedStaple] = useState<'all' | StapleCategory>('all');
  const [onlyReadyNow, setOnlyReadyNow] = useState(false);
  const [expandedRecipeId, setExpandedRecipeId] = useState<string | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const visibleRecipes = recipes.filter((r) => {
    if (selectedSlot !== 'all' && r.slot !== selectedSlot) return false;
    if (selectedStaple !== 'all' && r.stapleType !== selectedStaple) return false;
    if (onlyReadyNow && !evaluateRecipeReadiness(r, kitchenItems).isReadyNow) {
      return false;
    }
    return true;
  });

  const slotLabel = (slot: MealSlot, staple?: StapleCategory) => {
    const stapleTag =
      staple === 'rice'
        ? '米饭盖饭'
        : staple === 'fried_rice'
        ? '猛火炒饭'
        : staple === 'noodles'
        ? '面条方案'
        : staple === 'congee'
        ? '小米粥+炒菜'
        : '快手吐司/蛋';
    if (slot === 'breakfast') return `早餐 · ${stapleTag}`;
    if (slot === 'lunch') return `午餐 · ${stapleTag}`;
    return `晚餐 · ${stapleTag}`;
  };

  return (
    <section
      id="three-meals-system"
      aria-labelledby="meals-heading"
      className="max-w-7xl mx-auto px-6 py-12 border-b border-stone-200"
    >
      <div className="max-w-3xl mb-8">
        <p className="text-xs font-medium text-amber-800 tracking-wide mb-2">
          02. 早·中·晚长期中式饮食法则（已定制：午间米饭/面条 · 晚间炒饭/小米粥+炒菜/汤面）
        </p>
        <h2
          id="meals-heading"
          className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight"
        >
          18套实战菜谱库：午餐6套（3盖饭+3面）· 晚餐9套（3炒饭+3小米粥配菜+3汤面）
        </h2>
        <p className="text-sm text-stone-600 mt-2 leading-relaxed">
          完全贴合你的口味升级：<strong>中午焖2份米饭</strong>（1份中午做浓汁盖浇饭，1份放冰箱冷藏收干水汽，<strong>晚上5分钟猛火做街头风味蛋炒饭/肉丁炒饭</strong>）；想喝粥时熬一碗<strong>纯粹金黄的小米粥/二米粥，配1盘2分钟快炒青菜或青椒炒蛋</strong>！
        </p>
      </div>

      {/* Three Meal Architecture Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white border border-stone-200 rounded-xl p-6">
          <div className="text-xs font-semibold text-amber-800 mb-1">
            早餐长期公式（3套方案 · 8分钟内）
          </div>
          <h3 className="text-lg font-bold text-stone-900 mb-2">
            龙须汤面 / 鲜奶吐司 + 富硒谷物蛋
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed mb-4">
            早上绝不切肉洗菜板。用<strong>空气炸锅</strong>定时6分钟烤盒马鲜奶吐司太阳蛋，或用<strong>炒锅</strong>煎焦边荷包蛋冲开水，下龙须挂面同烫3棵小白菜（90秒即熟）。
          </p>
          <div className="text-xs text-stone-500 pt-3 border-t border-stone-100">
            代表组合：焦边荷包蛋小白菜龙须面 · 太阳蛋鲜奶吐司 · 葱花滑蛋
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-6">
          <div className="text-xs font-semibold text-amber-800 mb-1">
            午餐长期公式（6套方案 · 3款米饭 + 3款面条）
          </div>
          <h3 className="text-lg font-bold text-stone-900 mb-2">
            浓汁盖浇米饭 / 现炒浇头干拌龙须面
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed mb-4">
            中午吃米饭时<strong>一次焖2人份</strong>（吃1份，另1份摊平冷藏留晚上做炒饭）！用<strong>玉米淀粉+薄盐蚝油+生抽</strong>将鸡腿肉/猪肉滑炒薄皮椒或老豆腐，浓汁拌饭或拌面。
          </p>
          <div className="text-xs text-stone-500 pt-3 border-t border-stone-100">
            米饭3款：薄皮椒滑鸡腿饭 · 老豆腐红烧滑肉饭 · 虎皮椒荷包蛋饭
            <br />
            面条3款：黄金脆哨豆腐拌面 · 青椒肉丝浇头面 · 老上海葱油双蛋面
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-6">
          <div className="text-xs font-semibold text-amber-800 mb-1">
            晚餐长期公式（9套方案 · 3炒饭 + 3小米粥配菜 + 3汤面）
          </div>
          <h3 className="text-lg font-bold text-stone-900 mb-2">
            猛火蛋炒饭 / 纯小米粥+快炒菜 / 暖胃汤面
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed mb-4">
            中午有剩饭就花5分钟做<strong>锅边酱油葱花蛋炒饭 / 薄皮椒鸡丁炒饭</strong>；想喝粥就煮<strong>纯香黄小米粥 + 1盘薄皮椒炒蛋或蒜蓉蚝油油麦菜</strong>；想吃面就煮10分钟清汤面。
          </p>
          <div className="text-xs text-stone-500 pt-3 border-t border-stone-100">
            炒饭3款：锅边酱油葱花蛋炒饭 · 薄皮椒鸡丁炒饭 · 黄金老豆腐碎炒饭
            <br />
            小米粥+菜3款：纯小米粥+薄皮椒炒蛋 / 蒜蓉油麦菜 / 葱烧老豆腐
          </div>
        </div>
      </div>

      {/* Special Guide: Wok Fried Rice & Golden Millet Porridge */}
      <div className="bg-amber-50/50 border border-amber-200/90 rounded-xl p-5 mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="text-xs font-bold text-amber-900 mb-1">
            实用技巧 A · 怎么用你的「燃气灶+炒锅」炒出粒粒分明、不粘锅的晚间炒饭？
          </div>
          <p className="text-xs text-stone-700 leading-relaxed">
            <strong>核心1（冷饭收水）：</strong>中午多焖出的1碗米饭千万别捂在锅里！趁热盛盘摊平，放冰箱冷藏4小时收干表面水分。<strong>核心2（锅边生抽）：</strong>大火把鸡蛋和米饭炒散后，<strong>生抽千万别直接浇在白饭上</strong>，一定要沿着滚烫的炒锅边缘淋一圈，瞬间激出焦香锅气！
          </p>
        </div>
        <div className="md:border-l md:border-amber-200/80 md:pl-6">
          <div className="text-xs font-bold text-amber-900 mb-1">
            实用技巧 B · 15分钟熬出浓稠金黄「小米粥」+ 2分钟快炒小菜流程
          </div>
          <p className="text-xs text-stone-700 leading-relaxed">
            <strong>先熬粥再炒菜（只用1口锅）：</strong>炒锅烧开600ml水，<strong>水沸后再下50g黄小米</strong>（防粘锅底），滴2滴橄榄油，中小火熬15分钟即出厚厚一层金黄米油（掺一小把大米同煮成“二米粥”更绵滑）。把小米粥盛进大碗保温，炒锅冲一下擦干，<strong>2分钟大火炒盘薄皮椒炒鸡蛋或蚝油油麦菜</strong>即可开饭！
          </p>
        </div>
      </div>

      {/* Interactive Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <div
            role="group"
            aria-label="三餐时段筛选"
            className="flex flex-wrap items-center gap-1 p-1 bg-stone-200/80 rounded-xl"
          >
            {[
              { id: 'all', label: `全部三餐 (${recipes.length})` },
              { id: 'breakfast', label: '早餐 (3)' },
              { id: 'lunch', label: '午餐 · 盖饭/面 (6)' },
              { id: 'dinner', label: '晚餐 · 炒饭/粥/面 (9)' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedSlot(tab.id as typeof selectedSlot)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selectedSlot === tab.id
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div
            role="group"
            aria-label="主食类型筛选"
            className="flex flex-wrap items-center gap-1 p-1 bg-stone-200/80 rounded-xl"
          >
            {[
              { id: 'all', label: '全部主食' },
              { id: 'rice', label: '米饭盖饭 (3)' },
              { id: 'fried_rice', label: '晚间炒饭 (3)' },
              { id: 'congee', label: '小米粥+炒菜 (3)' },
              { id: 'noodles', label: '面条 (7)' }
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setSelectedStaple(st.id as typeof selectedStaple)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selectedStaple === st.id
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2 text-xs font-medium text-stone-700 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={onlyReadyNow}
            onChange={(e) => setOnlyReadyNow(e.target.checked)}
            className="rounded border-stone-300 text-stone-900 focus:ring-stone-500"
          />
          <span>仅显示当前在库食材即可做的菜谱</span>
        </label>
      </div>

      {/* Recipes Grid */}
      {visibleRecipes.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-xl p-10 text-center">
          <p className="text-sm text-stone-600 mb-3">
            当前筛选条件下暂无菜谱（可在上方清单中勾选「鸡蛋+挂面」或「老豆腐+鸡腿肉」解锁全部正餐）。
          </p>
          <button
            type="button"
            onClick={() => setOnlyReadyNow(false)}
            className="px-4 py-2 text-xs font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
          >
            显示全部三餐方案
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleRecipes.map((recipe) => {
            const readiness = evaluateRecipeReadiness(recipe, kitchenItems);
            const isExpanded = expandedRecipeId === recipe.id;

            return (
              <article
                key={recipe.id}
                className="bg-white border border-stone-200 rounded-2xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 bg-stone-100 overflow-hidden">
                    {!imgErrors[recipe.id] ? (
                      <img
                        src={recipe.imageUrl}
                        alt={recipe.title}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setImgErrors((prev) => ({ ...prev, [recipe.id]: true }))
                        }
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-500">
                        <Utensils className="w-6 h-6 mr-2" />
                        <span className="text-sm">{recipe.title}</span>
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-4 text-white flex items-end justify-between">
                      <div>
                        <div className="text-xs text-amber-200">
                          {slotLabel(recipe.slot, recipe.stapleType)}
                        </div>
                        <h3 className="text-lg font-bold tracking-tight">
                          {recipe.title}
                        </h3>
                      </div>
                      <span className="text-xs tabular-nums text-stone-200 shrink-0">
                        {recipe.prepMinutes + recipe.cookMinutes} 分钟出餐
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    {/* Unboxed Metadata Row */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mb-3">
                      <span>
                        {readiness.isReadyNow ? (
                          <strong className="text-emerald-700">当前食材可做</strong>
                        ) : (
                          <span className="text-amber-800">
                            需补充：{readiness.missingItems.map((m) => m.name.split('+')[0]).join('、')}
                          </span>
                        )}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{recipe.calories} kcal</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">蛋白质 {recipe.proteinGrams}g</span>
                    </div>

                    <p className="text-xs font-medium text-stone-800 bg-stone-50 border border-stone-200/80 rounded-lg p-3 mb-3">
                      {recipe.flavorFormula}
                    </p>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {recipe.soloPortionNote}
                    </p>

                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-stone-100 space-y-2.5">
                        <div className="text-xs font-bold text-stone-900">
                          完整分步做法：
                        </div>
                        {recipe.steps.map((st, i) => (
                          <div key={st.id} className="text-xs text-stone-600">
                            <strong className="text-stone-900">
                              步骤 0{i + 1}（{st.deviceLabel}）：
                            </strong>
                            {st.detail}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-5 py-3.5 bg-stone-50/70 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedRecipeId(isExpanded ? null : recipe.id)
                    }
                    className="text-xs font-medium text-stone-700 hover:text-stone-900 underline whitespace-nowrap shrink-0"
                  >
                    {isExpanded ? '收起详细步骤' : '展开详细步骤'}
                  </button>

                  <div className="flex items-center gap-2">
                    {recipe.slot === 'breakfast' && (
                      <button
                        type="button"
                        onClick={() => {
                          onLoadAsTodayBreakfast(recipe.id);
                          document
                            .getElementById('today-breakfast')
                            ?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-3 py-1.5 text-xs font-medium text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
                      >
                        设为今日早餐实操
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onAssignToDay(1, recipe.slot, recipe.id)}
                      className="px-3 py-1.5 text-xs font-medium text-stone-800 bg-white border border-stone-200 hover:bg-stone-100 rounded-lg transition-colors whitespace-nowrap shrink-0"
                    >
                      排入今日三餐表
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
