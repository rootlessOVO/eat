import React, { useState, useEffect } from 'react';
import { Flame, Clock, CheckCircle2, Play, RotateCcw, Utensils, Sparkles } from 'lucide-react';
import { Recipe, KitchenItem, evaluateRecipeReadiness } from '../data/kitchenPlanner';

interface TodayBreakfastHeroProps {
  breakfastRecipes: Recipe[];
  selectedRecipeId: string;
  onSelectRecipe: (id: string) => void;
  kitchenItems: KitchenItem[];
  onQuickUnlockStaples: () => void;
}

export const TodayBreakfastHero: React.FC<TodayBreakfastHeroProps> = ({
  breakfastRecipes,
  selectedRecipeId,
  onSelectRecipe,
  kitchenItems,
  onQuickUnlockStaples
}) => {
  const activeRecipe =
    breakfastRecipes.find((r) => r.id === selectedRecipeId) || breakfastRecipes[0];

  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [activeTimerStepId, setActiveTimerStepId] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [imgError, setImgError] = useState<boolean>(false);

  useEffect(() => {
    if (!timerRunning) return;
    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          if (activeTimerStepId) {
            setCompletedSteps((old) => ({ ...old, [activeTimerStepId]: true }));
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [timerRunning, activeTimerStepId]);

  const toggleStep = (stepId: string) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const startStepTimer = (stepId: string, durationSeconds: number) => {
    setActiveTimerStepId(stepId);
    setSecondsLeft(durationSeconds);
    setTimerRunning(true);
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setActiveTimerStepId(null);
    setSecondsLeft(0);
  };

  const readiness = evaluateRecipeReadiness(activeRecipe, kitchenItems);
  const completedCount = activeRecipe.steps.filter((s) => completedSteps[s.id]).length;
  const progressPercent = Math.round((completedCount / activeRecipe.steps.length) * 100);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  return (
    <section
      id="today-breakfast"
      aria-labelledby="hero-heading"
      className="max-w-7xl mx-auto px-6 pt-8 pb-12 border-b border-stone-200"
    >
      {/* Editorial Kicker & Main Title */}
      <div className="max-w-4xl mb-8">
        <p className="text-xs font-medium text-amber-800 tracking-wide mb-2">
          独居一人食 · 现有4件厨具 + 6味调料即刻开火方案
        </p>
        <h1
          id="hero-heading"
          className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-stone-900 tracking-tight leading-tight mb-4"
        >
          一锅一炸锅，把一个人的三餐吃得热乎讲究
        </h1>
        <p className="text-base text-stone-600 leading-relaxed max-w-3xl">
          你现有的<strong>燃气灶 + 炒锅 + 空气炸锅 + 菜刀</strong>其实已经是黄金双线程配置：炒锅负责明火快炒与滚汤，空气炸锅充当“免看管第二灶眼”。而<strong>生抽 + 油醋汁 + 辣椒酱 + 胡椒粉 + 盐 + 橄榄油</strong>恰好能调出酱香、酸辣、黑椒三种地道中式味型。下面先以<strong>今天早餐</strong>为例带你10分钟开饭：
        </p>
      </div>

      {/* Interactive Breakfast Mode Selector Tabs */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div
          role="tablist"
          aria-label="今日早餐方案选择"
          className="flex flex-wrap items-center gap-1.5 p-1.5 bg-stone-200/80 rounded-xl"
        >
          {breakfastRecipes.map((recipe, idx) => {
            const isSelected = recipe.id === activeRecipe.id;
            const shortLabels = [
              '方案A · 焦边荷包蛋酸辣汤面',
              '方案B · 炸锅太阳蛋吐司+冲蛋汤',
              '方案C · 零添置豉油滑蛋+脆烤粗粮'
            ];
            return (
              <button
                key={recipe.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => {
                  onSelectRecipe(recipe.id);
                  resetTimer();
                }}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-stone-900 text-stone-50 shadow-xs'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {shortLabels[idx] || recipe.title}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 text-xs text-stone-600">
          <span>
            准备 <strong className="tabular-nums text-stone-900">{activeRecipe.prepMinutes}</strong> 分钟
          </span>
          <span aria-hidden="true">·</span>
          <span>
            烹饪 <strong className="tabular-nums text-stone-900">{activeRecipe.cookMinutes}</strong> 分钟
          </span>
          <span aria-hidden="true">·</span>
          <span>
            热量 <strong className="tabular-nums text-stone-900">{activeRecipe.calories}</strong> kcal
          </span>
          <span aria-hidden="true">·</span>
          <span>
            蛋白质 <strong className="tabular-nums text-stone-900">{activeRecipe.proteinGrams}</strong> g
          </span>
        </div>
      </div>

      {/* Main 2-Column Split Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left 5 Cols: Visual Dish Card & Existing Condiment Formula */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-stone-200 rounded-2xl overflow-hidden">
          <div className="relative h-64 sm:h-72 w-full bg-stone-100 overflow-hidden">
            {!imgError ? (
              <img
                src={activeRecipe.imageUrl}
                alt={activeRecipe.title}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-600 p-6 text-center">
                <Utensils className="w-8 h-8 mb-2 text-amber-700" />
                <span className="text-sm font-medium">{activeRecipe.title}</span>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-5 text-white">
              <p className="text-xs text-amber-200 mb-1">{activeRecipe.subtitle}</p>
              <h2 className="text-xl font-bold tracking-tight">{activeRecipe.title}</h2>
            </div>
          </div>

          <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
            <div>
              <div className="text-xs font-semibold text-stone-500 mb-2">
                今日早餐味型公式（完全使用你现有的6种调料）
              </div>
              <p className="text-sm text-stone-800 font-medium bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5 leading-relaxed">
                {activeRecipe.flavorFormula}
              </p>
            </div>

            <div>
              <div className="text-xs font-semibold text-stone-500 mb-2">
                为什么这顿最适合你今天早上做？
              </div>
              <p className="text-sm text-stone-600 leading-relaxed">
                {activeRecipe.soloPortionNote}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-4">
              <div className="text-xs text-stone-600">
                状态：
                {readiness.isReadyNow ? (
                  <strong className="text-emerald-700 ml-1">
                    现有厨具调料可直接开火
                  </strong>
                ) : (
                  <span className="text-amber-800 ml-1">
                    需基础食材：{readiness.missingItems.map((i) => i.name).join('、')}
                  </span>
                )}
              </div>
              {!readiness.isReadyNow && (
                <button
                  type="button"
                  onClick={onQuickUnlockStaples}
                  className="px-3 py-1.5 text-xs font-medium text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  标记已有鸡蛋/面条
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Step-by-Step Interactive Flow & Timer */}
        <div className="lg:col-span-7 bg-white border border-stone-200 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-5 border-b border-stone-200">
              <div>
                <h3 className="text-lg font-bold text-stone-900">
                  今日早餐实操流程（跟做打勾）
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  点击步骤右侧计时器即可倒计时，完成后勾选步骤
                </p>
              </div>

              {/* Progress + Optional Active Timer Display */}
              <div className="flex items-center gap-3">
                <div className="text-xs text-stone-600">
                  完成进度{' '}
                  <strong
                    data-testid="breakfast-progress-pct"
                    className="tabular-nums text-stone-900 font-semibold"
                  >
                    {progressPercent}%
                  </strong>{' '}
                  (<span className="tabular-nums">{completedCount}</span>/
                  <span className="tabular-nums">{activeRecipe.steps.length}</span>)
                </div>

                {activeTimerStepId !== null && (
                  <div
                    data-testid="active-cooking-timer"
                    className="flex items-center gap-2 bg-stone-900 text-white px-3 py-1.5 rounded-xl"
                  >
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-xs font-semibold tabular-nums">
                      {formatTime(secondsLeft)}
                    </span>
                    <button
                      type="button"
                      onClick={() => setTimerRunning((r) => !r)}
                      className="text-xs px-2 py-0.5 bg-stone-700 hover:bg-stone-600 rounded text-stone-100 whitespace-nowrap shrink-0"
                    >
                      {timerRunning ? '暂停' : '继续'}
                    </button>
                    <button
                      type="button"
                      aria-label="重置计时器"
                      onClick={resetTimer}
                      className="p-0.5 text-stone-300 hover:text-white"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Steps List */}
            <ol className="space-y-3.5">
              {activeRecipe.steps.map((step, index) => {
                const isDone = !!completedSteps[step.id];
                const isTimingThis = activeTimerStepId === step.id;
                return (
                  <li
                    key={step.id}
                    className={`p-4 rounded-xl border transition-colors ${
                      isDone
                        ? 'bg-stone-50 border-stone-200 text-stone-500'
                        : isTimingThis
                        ? 'bg-amber-50/40 border-amber-400'
                        : 'bg-white border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3.5">
                        <button
                          type="button"
                          onClick={() => toggleStep(step.id)}
                          aria-label={`标记步骤${index + 1}：${step.title}为${
                            isDone ? '未完成' : '已完成'
                          }`}
                          className={`mt-0.5 w-6 h-6 rounded-md flex items-center justify-center border transition-colors shrink-0 ${
                            isDone
                              ? 'bg-emerald-700 border-emerald-700 text-white'
                              : 'border-stone-300 hover:border-stone-500 bg-white text-transparent'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>

                        <div>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mb-1">
                            <span className="font-semibold text-stone-700">
                              0{index + 1}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="text-amber-800 font-medium">
                              {step.deviceLabel}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="tabular-nums">
                              约 {Math.ceil(step.durationSeconds / 60)} 分钟
                            </span>
                          </div>

                          <h4
                            className={`text-sm font-semibold ${
                              isDone ? 'line-through text-stone-400' : 'text-stone-900'
                            }`}
                          >
                            {step.title}
                          </h4>
                          <p className="text-sm text-stone-600 mt-1 leading-relaxed">
                            {step.detail}
                          </p>
                          {step.parallelTip && (
                            <p className="text-xs text-amber-800 mt-2">
                              省时窍门：{step.parallelTip}
                            </p>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => startStepTimer(step.id, step.durationSeconds)}
                        className="px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                      >
                        <Play className="w-3 h-3" />
                        <span className="tabular-nums">
                          {Math.floor(step.durationSeconds / 60)}m
                          {step.durationSeconds % 60 > 0
                            ? `${step.durationSeconds % 60}s`
                            : ''}
                        </span>
                      </button>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Bottom Callout for Olive Oil & Vinaigrette Trick */}
          <div className="mt-6 pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-600">
            <div>
              <strong className="text-stone-900">现有调料隐藏技巧：</strong>
              你的<strong>油醋汁</strong>含有果酸与香料，没有陈醋时放半勺进生抽汤底或拌面里，酸香复合度远超普通白醋！
            </div>
            {completedCount > 0 && (
              <button
                type="button"
                onClick={() => setCompletedSteps({})}
                className="text-stone-500 hover:text-stone-900 underline whitespace-nowrap shrink-0"
              >
                重置步骤勾选
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
