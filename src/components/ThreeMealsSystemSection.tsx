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
        : staple === 'noodles'
        ? '面条方案'
        : staple === 'congee'
        ? '暖胃咸粥'
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
          02. 早·中·晚长期中式饮食法则（已定制：午间米饭/面条 · 晚间汤面/喝粥）
        </p>
        <h2
          id="meals-heading"
          className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight"
        >
          15套实战菜谱库：午餐6套（3米饭+3面条）· 晚餐6套（3汤面+3咸粥）
        </h2>
        <p className="text-sm text-stone-600 mt-2 leading-relaxed">
          完全按照你的主食习惯与刚买的盒马10件食材定制：<strong>中午吃得扎实解馋</strong>（浓汁盖浇饭或干拌/现炒码子面），<strong>晚上吃得温润暖胃</strong>（10分钟清甜汤面或广式生滚咸粥），实现“一米两吃、一锅到底、零剩菜”。
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
            中午吃米饭时<strong>一次焖2人份</strong>（吃1份留半碗晚上煮粥）！用<strong>玉米淀粉+薄盐蚝油+生抽</strong>将鸡腿肉/猪肉滑炒薄皮椒或老豆腐，浓汁拌饭或拌面，只洗一只碗。
          </p>
          <div className="text-xs text-stone-500 pt-3 border-t border-stone-100">
            米饭3款：薄皮椒滑鸡腿饭 · 老豆腐红烧滑肉饭 · 虎皮椒荷包蛋饭
            <br />
            面条3款：黄金脆哨豆腐拌面 · 青椒肉丝浇头面 · 老上海葱油双蛋面
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-6">
          <div className="text-xs font-semibold text-amber-800 mb-1">
            晚餐长期公式（6套方案 · 3款汤面 + 3款咸粥）
          </div>
          <h3 className="text-lg font-bold text-stone-900 mb-2">
            清甜暖胃汤面 / 炒锅10分钟生滚咸粥
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed mb-4">
            晚上肠胃宜温热好消化。想吃面就煮<strong>奶白煎蛋豆腐小白菜汤面</strong>或<strong>姜丝胡椒滑肉片汤面</strong>；想喝粥就把中午留的半碗熟米饭倒进炒锅加开水，10分钟熬出<strong>生滚肉片/蛋花咸粥</strong>！
          </p>
          <div className="text-xs text-stone-500 pt-3 border-t border-stone-100">
            汤面3款：奶白煎蛋老豆腐汤面 · 姜丝胡椒滑肉片面 · 酸辣云朵蛋花面
            <br />
            喝粥3款：生滚姜丝滑肉片青菜粥 · 黄金蛋花豆腐粥 · 白粥配蚝油油麦菜
          </div>
        </div>
      </div>

      {/* Special Guide: How to Cook Rice & 10-Min Congee with Existing Wok */}
      <div className="bg-amber-50/50 border border-amber-200/90 rounded-xl p-5 mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="text-xs font-bold text-amber-900 mb-1">
            实用技巧 A · 还没买电饭煲，今天中午怎么用「炒锅」焖米饭？
          </div>
          <p className="text-xs text-stone-700 leading-relaxed">
            大米淘洗后按<strong>「1碗米 : 1.3碗水」</strong>放入炒锅（或放进大瓷碗摆在炒锅加水上蒸20分钟）。若直接锅焖：滴3滴油防粘，大火烧开转<strong>最小火（中心火苗）加锅盖焖12分钟</strong>，关火再虚焖5分钟，粒粒分明还有锅巴香！
          </p>
        </div>
        <div className="md:border-l md:border-amber-200/80 md:pl-6">
          <div className="text-xs font-bold text-amber-900 mb-1">
            实用技巧 B · 晚上不想等40分钟，怎么用「炒锅」10分钟煮出浓稠好粥？
          </div>
          <p className="text-xs text-stone-700 leading-relaxed">
            <strong>秘诀1（熟饭生滚法）：</strong>中午焖饭多焖半碗，晚上倒进炒锅加4碗开水大火煮6分钟，用勺背按压几下立刻出米油！<strong>秘诀2（冷冻破壁法）：</strong>生米洗净拌3滴油放冷冻室冻1小时以上，晚上直接下开水锅煮10分钟即开花绵密！
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
              { id: 'lunch', label: '午餐 · 饭/面 (6)' },
              { id: 'dinner', label: '晚餐 · 面/粥 (6)' }
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
              { id: 'rice', label: '只看米饭盖饭 (3)' },
              { id: 'noodles', label: '只看面条 (7)' },
              { id: 'congee', label: '只看晚间喝粥 (3)' }
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
