import React, { useState, useEffect } from 'react';
import { X, Copy, Check } from 'lucide-react';
import {
  INITIAL_KITCHEN_ITEMS,
  SOLO_RECIPES,
  INITIAL_WEEKLY_PLAN,
  KitchenItem,
  DayPlan,
  ItemCategory,
  MealSlot,
  calculateKitchenSummary,
  toggleItemOwnership,
  addCustomShoppingItem,
  applyHemaPurchaseToInventory
} from './data/kitchenPlanner';
import { TodayBreakfastHero } from './components/TodayBreakfastHero';
import { HemaOrderActionSection } from './components/HemaOrderActionSection';
import { KitchenAuditSection } from './components/KitchenAuditSection';
import { ThreeMealsSystemSection } from './components/ThreeMealsSystemSection';
import { WeeklySoloPlanner } from './components/WeeklySoloPlanner';

const STORAGE_KEY_ITEMS = 'solo_kitchen_items_v2_hema';
const STORAGE_KEY_WEEK = 'solo_kitchen_week_v1';

export default function App() {
  const [kitchenItems, setKitchenItems] = useState<KitchenItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ITEMS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore storage errors
    }
    return applyHemaPurchaseToInventory(INITIAL_KITCHEN_ITEMS);
  });

  const [weeklyPlan, setWeeklyPlan] = useState<DayPlan[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WEEK);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore storage errors
    }
    return INITIAL_WEEKLY_PLAN;
  });

  const [selectedBreakfastId, setSelectedBreakfastId] = useState<string>('bf_today_1');
  const [isShoppingModalOpen, setIsShoppingModalOpen] = useState<boolean>(false);
  const [copiedList, setCopiedList] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(kitchenItems));
    } catch {
      // ignore
    }
  }, [kitchenItems]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_WEEK, JSON.stringify(weeklyPlan));
    } catch {
      // ignore
    }
  }, [weeklyPlan]);

  const summary = calculateKitchenSummary(kitchenItems, SOLO_RECIPES);
  const breakfastRecipes = SOLO_RECIPES.filter((r) => r.slot === 'breakfast');

  const handleToggleItem = (id: string) => {
    setKitchenItems((prev) => toggleItemOwnership(prev, id));
  };

  const handleQuickUnlockStaples = () => {
    setKitchenItems((prev) =>
      prev.map((item) =>
        item.id === 'eggs_bread_noodles' ? { ...item, owned: true } : item
      )
    );
  };

  const handleAddCustomItem = (
    name: string,
    category: ItemCategory,
    price: number,
    spec: string
  ): string | undefined => {
    const res = addCustomShoppingItem(kitchenItems, name, category, price, spec);
    if (res.error) return res.error;
    setKitchenItems(res.items);
    return undefined;
  };

  const handleChangeDayMeal = (
    dayIndex: number,
    slot: MealSlot,
    recipeId: string
  ) => {
    setWeeklyPlan((prev) =>
      prev.map((day) => {
        if (day.dayIndex !== dayIndex) return day;
        if (slot === 'breakfast') return { ...day, breakfastId: recipeId };
        if (slot === 'lunch') return { ...day, lunchId: recipeId };
        return { ...day, dinnerId: recipeId };
      })
    );
  };

  const toBuyItems = kitchenItems.filter((i) => !i.owned);

  const handleCopyShoppingList = () => {
    const text = toBuyItems
      .map((i, idx) => `${idx + 1}. ${i.name}（${i.spec}）- 约¥${i.estimatedPrice}`)
      .join('\n');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedList(true);
    setTimeout(() => setCopiedList(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900">
      {/* Top Bar Contract: 3 Zones separated by gap-8 */}
      <header className="sticky top-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-xs border-b border-stone-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#today-breakfast"
            className="text-lg font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 font-serif-display"
          >
            一味独食
          </a>

          {/* Zone 2: 4 concise single-line text navigation links */}
          <nav
            aria-label="主导航"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600"
          >
            <a
              href="#today-breakfast"
              className="hover:text-stone-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              今日早餐
            </a>
            <a
              href="#kitchen-audit"
              className="hover:text-stone-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              厨具与添置
            </a>
            <a
              href="#three-meals-system"
              className="hover:text-stone-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              三餐长期方案
            </a>
            <a
              href="#weekly-planner"
              className="hover:text-stone-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              周排餐表
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setIsShoppingModalOpen(true)}
              className="px-4 py-2 text-xs font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0"
            >
              查看采购清单 ({toBuyItems.length})
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <TodayBreakfastHero
          breakfastRecipes={breakfastRecipes}
          selectedRecipeId={selectedBreakfastId}
          onSelectRecipe={setSelectedBreakfastId}
          kitchenItems={kitchenItems}
          onQuickUnlockStaples={handleQuickUnlockStaples}
        />

        <HemaOrderActionSection
          isHemaSynced={summary.readinessPercentage === 100}
          onSyncHemaOrder={() =>
            setKitchenItems((prev) => applyHemaPurchaseToInventory(prev))
          }
        />

        <KitchenAuditSection
          items={kitchenItems}
          summary={summary}
          onToggleItem={handleToggleItem}
          onAddCustomItem={handleAddCustomItem}
        />

        <ThreeMealsSystemSection
          recipes={SOLO_RECIPES}
          kitchenItems={kitchenItems}
          onLoadAsTodayBreakfast={setSelectedBreakfastId}
          onAssignToDay={handleChangeDayMeal}
        />

        <WeeklySoloPlanner
          weeklyPlan={weeklyPlan}
          recipes={SOLO_RECIPES}
          onChangeDayMeal={handleChangeDayMeal}
          onResetWeek={() => setWeeklyPlan(INITIAL_WEEKLY_PLAN)}
        />
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-stone-200 py-8 px-6 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            一味独食 · 专为独居一人食定制的中式厨房规划（基于燃气灶、炒锅、空气炸锅与现有6味调料）
          </p>
          <div className="flex items-center gap-4">
            <a href="#today-breakfast" className="hover:text-stone-900">
              回到顶部
            </a>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => {
                setKitchenItems(INITIAL_KITCHEN_ITEMS);
                setWeeklyPlan(INITIAL_WEEKLY_PLAN);
              }}
              className="hover:text-stone-900 underline"
            >
              重置全部厨房数据
            </button>
          </div>
        </div>
      </footer>

      {/* Shopping List Modal */}
      {isShoppingModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="shopping-modal-title"
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
        >
          <div className="bg-white border border-stone-200 rounded-2xl max-w-xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-xl">
            <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
              <div>
                <h2
                  id="shopping-modal-title"
                  className="text-lg font-bold text-stone-900"
                >
                  一人食待购清单汇总
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  共 <span className="tabular-nums">{toBuyItems.length}</span> 项待购 · 预估总预算{' '}
                  <strong className="tabular-nums text-stone-900">
                    ¥{summary.remainingTotalCost}
                  </strong>
                </p>
              </div>
              <button
                type="button"
                aria-label="关闭采购清单弹窗"
                onClick={() => setIsShoppingModalOpen(false)}
                className="p-2 text-stone-500 hover:text-stone-900 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-3">
              {toBuyItems.length === 0 ? (
                <p className="text-sm text-stone-600 text-center py-8">
                  所有推荐厨具与常备食材均已在库！
                </p>
              ) : (
                toBuyItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 p-3.5 rounded-xl border border-stone-200 bg-stone-50/60"
                  >
                    <div>
                      <div className="text-sm font-bold text-stone-900">
                        {item.name}
                      </div>
                      <div className="text-xs text-stone-500 mt-0.5">
                        {item.spec} · 预估 <span className="tabular-nums">¥{item.estimatedPrice}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggleItem(item.id)}
                      className="px-3 py-1.5 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg whitespace-nowrap shrink-0"
                    >
                      标记已买
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="px-6 py-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleCopyShoppingList}
                className="px-4 py-2 text-xs font-medium text-stone-800 bg-white border border-stone-300 hover:bg-stone-100 rounded-lg flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                {copiedList ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>已复制到剪贴板</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>一键复制买菜备忘录</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setIsShoppingModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg whitespace-nowrap shrink-0"
              >
                完成
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
