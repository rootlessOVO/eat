import React from 'react';
import { DayPlan, Recipe, MealSlot } from '../data/kitchenPlanner';

interface WeeklySoloPlannerProps {
  weeklyPlan: DayPlan[];
  recipes: Recipe[];
  onChangeDayMeal: (dayIndex: number, slot: MealSlot, recipeId: string) => void;
  onResetWeek: () => void;
}

export const WeeklySoloPlanner: React.FC<WeeklySoloPlannerProps> = ({
  weeklyPlan,
  recipes,
  onChangeDayMeal,
  onResetWeek
}) => {
  const breakfastOptions = recipes.filter((r) => r.slot === 'breakfast');
  const lunchOptions = recipes.filter((r) => r.slot === 'lunch');
  const dinnerOptions = recipes.filter((r) => r.slot === 'dinner');

  const findRecipe = (id: string) => recipes.find((r) => r.id === id);

  return (
    <section
      id="weekly-planner"
      aria-labelledby="planner-heading"
      className="max-w-7xl mx-auto px-6 py-12"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div className="max-w-3xl">
          <p className="text-xs font-medium text-amber-800 tracking-wide mb-2">
            03. 一人食周排餐与零剩菜流转表
          </p>
          <h2
            id="planner-heading"
            className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight"
          >
            工作日5天三餐排期 & 一材多用统筹
          </h2>
          <p className="text-sm text-stone-600 mt-2 leading-relaxed">
            买1盒老豆腐、1袋去骨鸡腿肉、10颗鸡蛋、1把挂面和3样青菜，按照下方节奏流转消耗，<strong>5天15顿饭不重样且冰箱零烂菜</strong>。你可随时下拉切换每日早中晚餐。
          </p>
        </div>

        <button
          type="button"
          onClick={onResetWeek}
          className="px-3.5 py-2 text-xs font-medium text-stone-700 bg-white border border-stone-200 hover:bg-stone-100 rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          恢复默认推荐排期
        </button>
      </div>

      {/* High-Density Schedule Table */}
      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50 text-xs font-semibold text-stone-600">
                <th className="py-3.5 px-4">日期与节奏</th>
                <th className="py-3.5 px-4">早餐（8分钟）</th>
                <th className="py-3.5 px-4">午餐（15分钟）</th>
                <th className="py-3.5 px-4">晚餐（12分钟）</th>
                <th className="py-3.5 px-4 text-right">全天热量 / 蛋白质</th>
                <th className="py-3.5 px-4">一人食备菜与消库存提示</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-sm">
              {weeklyPlan.map((day) => {
                const bf = findRecipe(day.breakfastId);
                const ln = findRecipe(day.lunchId);
                const dn = findRecipe(day.dinnerId);
                const totalCalories =
                  (bf?.calories || 0) + (ln?.calories || 0) + (dn?.calories || 0);
                const totalProtein =
                  (bf?.proteinGrams || 0) +
                  (ln?.proteinGrams || 0) +
                  (dn?.proteinGrams || 0);

                return (
                  <tr
                    key={day.dayIndex}
                    className="hover:bg-stone-50/80 transition-colors align-top"
                  >
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="font-bold text-stone-900">{day.dayName}</div>
                      <div className="text-xs text-amber-800 mt-0.5">
                        {day.focusLabel}
                      </div>
                    </td>

                    <td className="py-4 px-4 min-w-[200px]">
                      <select
                        aria-label={`${day.dayName}早餐选择`}
                        value={day.breakfastId}
                        onChange={(e) =>
                          onChangeDayMeal(day.dayIndex, 'breakfast', e.target.value)
                        }
                        className="w-full text-xs font-medium text-stone-800 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-2 focus:outline-none focus:border-stone-500"
                      >
                        {breakfastOptions.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.title}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="py-4 px-4 min-w-[200px]">
                      <select
                        aria-label={`${day.dayName}午餐选择`}
                        value={day.lunchId}
                        onChange={(e) =>
                          onChangeDayMeal(day.dayIndex, 'lunch', e.target.value)
                        }
                        className="w-full text-xs font-medium text-stone-800 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-2 focus:outline-none focus:border-stone-500"
                      >
                        {lunchOptions.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.title}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="py-4 px-4 min-w-[200px]">
                      <select
                        aria-label={`${day.dayName}晚餐选择`}
                        value={day.dinnerId}
                        onChange={(e) =>
                          onChangeDayMeal(day.dayIndex, 'dinner', e.target.value)
                        }
                        className="w-full text-xs font-medium text-stone-800 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-2 focus:outline-none focus:border-stone-500"
                      >
                        {dinnerOptions.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.title}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="py-4 px-4 text-right whitespace-nowrap tabular-nums">
                      <div className="text-sm font-bold text-stone-900">
                        {totalCalories} kcal
                      </div>
                      <div className="text-xs text-stone-500">
                        蛋白质 {totalProtein}g
                      </div>
                    </td>

                    <td className="py-4 px-4 text-xs text-stone-600 leading-relaxed min-w-[240px]">
                      {day.batchPrepNote}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Solo Kitchen Long-Term Survival Rules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-stone-200 rounded-xl p-5">
          <div className="text-xs font-semibold text-stone-500 mb-1">
            独居保鲜铁律 01
          </div>
          <h3 className="text-sm font-bold text-stone-900 mb-1.5">
            肉类买回当天必须“按顿平铺分装”
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            绝不要整块肉直接塞冷冻室！买回400g鸡腿肉或猪肉，立刻用你的菜刀切成3份（每份约130g，正好一顿盖饭量），加半勺生抽和几滴橄榄油抓匀装袋压扁冷冻，做饭前泡水5分钟即化。
          </p>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-5">
          <div className="text-xs font-semibold text-stone-500 mb-1">
            独居保鲜铁律 02
          </div>
          <h3 className="text-sm font-bold text-stone-900 mb-1.5">
            蔬菜按「3天绿叶 + 4天根茎」阶梯买
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            每次买菜只买1种绿叶菜（上海青/生菜，前2-3天吃完）+ 2种耐放菜（西葫芦/洋葱/圆包菜/胡萝卜/口蘑，后4天吃）。老豆腐半盒今天空气炸锅烤，剩半盒泡清水放冷藏明天煮汤。
          </p>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-5">
          <div className="text-xs font-semibold text-stone-500 mb-1">
            独居省力铁律 03
          </div>
          <h3 className="text-sm font-bold text-stone-900 mb-1.5">
            炒锅做“一锅出”，空气炸锅垫硅油纸
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            做饭幸福感取决于洗碗时间。先用炒锅烧水烫青菜/下面条，捞出后再用同一个热锅煎蛋炒肉；空气炸锅全程垫硅油纸盘，吃完只需洗1个碗和1双筷子。
          </p>
        </div>
      </div>
    </section>
  );
};
