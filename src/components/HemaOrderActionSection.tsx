import React, { useState } from 'react';
import { CheckCircle2, ShoppingBag, Flame, AlertTriangle } from 'lucide-react';
import { HEMA_PURCHASED_ITEMS } from '../data/kitchenPlanner';

interface HemaOrderActionSectionProps {
  isHemaSynced: boolean;
  onSyncHemaOrder: () => void;
}

export const HemaOrderActionSection: React.FC<HemaOrderActionSectionProps> = ({
  isHemaSynced,
  onSyncHemaOrder
}) => {
  const [selectedNoonMeat, setSelectedNoonMeat] = useState<'chicken' | 'pork'>('chicken');
  const [checkedPrepTasks, setCheckedPrepTasks] = useState<Record<string, boolean>>({});
  const [urgencyFilter, setUrgencyFilter] = useState<
    'all' | 'high_2days' | 'medium_4days' | 'pantry_long'
  >('all');

  const togglePrepTask = (id: string) => {
    setCheckedPrepTasks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredHemaItems = HEMA_PURCHASED_ITEMS.filter((item) =>
    urgencyFilter === 'all' ? true : item.urgencyLevel === urgencyFilter
  );

  const immediateTasks = [
    {
      id: 'task_tofu',
      title: '老豆腐 (380g) 对半切开泡水',
      detail: '盒马一盒380g够吃2顿。今天用掉一半(190g)；剩下一半放进深碗，倒凉白开/纯净水没过豆腐放冷藏，明晚煮小白菜汤绝不发酸。'
    },
    {
      id: 'task_greens',
      title: '小白菜(300g) + 油麦菜(500g) 共800g绿叶菜定下2天清零计划',
      detail: '这两样加起来足有1斤6两，极易蔫黄！中午出门买肉时千万别再买任何蔬菜。今早下面条烫100g小白菜，今晚煮豆腐汤用完剩下200g小白菜；今明两天中午用蒜末+薄盐蚝油每次炒250g油麦菜。'
    },
    {
      id: 'task_toast_oyster',
      title: '鲜奶吐司分装冷冻 & 薄盐蚝油开封进冷藏',
      detail: '鲜奶吐司留2片明早吃，其余直接密封放冷冻室（空气炸锅无需解冻直接烤）；挤挤装薄盐蚝油开封后务必放冰箱冷藏门架。'
    },
    {
      id: 'task_scallion',
      title: '大葱段与生姜切好一半冷冻',
      detail: '300g葱姜蒜分量很足！留1根大葱、半块姜、1头蒜这几天用；其余大葱切斜段、老姜切片装保鲜袋直接塞冷冻，随取随用不干瘪。'
    }
  ];

  return (
    <section
      id="hema-order-plan"
      aria-labelledby="hema-heading"
      className="max-w-7xl mx-auto px-6 py-10 border-b border-stone-200"
    >
      {/* Top Banner: Order Synced & Total Analysis */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 mb-6 border-b border-stone-200">
          <div className="max-w-3xl">
            <p className="text-xs font-medium text-emerald-800 tracking-wide mb-1.5">
              盒马10件实单已识别 · 总计 ¥55.84 · 阵容极度合理
            </p>
            <h2
              id="hema-heading"
              className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight"
            >
              刚买的10样食材消库作战图 & 中午买肉买油指南
            </h2>
            <p className="text-sm text-stone-600 mt-2 leading-relaxed">
              你这一单买得非常内行：<strong>薄盐蚝油(挤挤装) + 玉米淀粉 + 葱姜蒜组合</strong>直接补齐了中式爆炒与滑肉的全部灵魂；<strong>20枚谷物蛋 + 鲜奶吐司 + 2袋龙须挂面</strong>稳住了未来两周早餐。唯一需要重点盯防的是<strong>「油麦菜500g + 小白菜300g = 800g绿叶菜」</strong>，必须今明后3天集中消灭！
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onSyncHemaOrder}
              disabled={isHemaSynced}
              className={`px-4 py-2.5 text-xs font-medium rounded-xl flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 ${
                isHemaSynced
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-stone-900 text-white hover:bg-stone-800'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {isHemaSynced
                  ? '已同步盒马10件食材至在库（菜谱100%解锁）'
                  : '一键同步盒马10件食材入库'}
              </span>
            </button>
          </div>
        </div>

        {/* 2-Column Split: Left = Noon Meat & Oil Buying Guide, Right = Arrival 4 Immediate Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left 6 Cols: Noon Shopping Guide (Meat + Cooking Oil) */}
          <div className="lg:col-span-6 bg-amber-50/45 border border-amber-200/90 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-amber-900">
                  中午出门采购清单（仅买这2样，千万别再买蔬菜！）
                </span>
                <span className="text-xs text-amber-800 tabular-nums font-semibold">
                  预计花费 ¥35–¥50
                </span>
              </div>

              {/* Meat Selector Tabs */}
              <div className="mb-4">
                <div className="text-xs text-stone-600 mb-2">
                  <strong>1. 买肉建议（二选一或各买一份分装冷冻）</strong>：你刚买了<strong>玉米淀粉200g + 薄皮椒300g + 葱姜蒜 + 蚝油</strong>，下面两种肉都能立刻做出招牌下饭菜：
                </div>
                <div
                  role="group"
                  aria-label="中午买肉方案切换"
                  className="flex items-center gap-1.5 p-1 bg-amber-100/80 rounded-lg mb-3"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedNoonMeat('chicken')}
                    className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                      selectedNoonMeat === 'chicken'
                        ? 'bg-stone-900 text-white'
                        : 'text-stone-700 hover:text-stone-900'
                    }`}
                  >
                    首选A：带皮去骨鸡腿肉 (450g)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedNoonMeat('pork')}
                    className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                      selectedNoonMeat === 'pork'
                        ? 'bg-stone-900 text-white'
                        : 'text-stone-700 hover:text-stone-900'
                    }`}
                  >
                    首选B：猪里脊 / 梅花肉 (350g)
                  </button>
                </div>

                {selectedNoonMeat === 'chicken' ? (
                  <div className="bg-white border border-amber-200/80 rounded-lg p-3.5 text-xs space-y-1.5">
                    <div className="font-bold text-stone-900">
                      去骨鸡腿排 450g（约3整块 · 150g/顿 · 吃3顿）
                    </div>
                    <p className="text-stone-600 leading-relaxed">
                      <strong>今天中午立刻做《葱爆薄皮椒蚝油滑鸡腿》</strong>：取1块鸡腿肉切块，加半勺生抽、半勺蚝油、1小勺你刚买的<strong>玉米淀粉</strong>抓匀；炒锅下葱姜蒜和2根切块的<strong>薄皮椒</strong>，大火爆炒出锅！其余2块按150g/袋压扁冷冻。
                    </p>
                  </div>
                ) : (
                  <div className="bg-white border border-amber-200/80 rounded-lg p-3.5 text-xs space-y-1.5">
                    <div className="font-bold text-stone-900">
                      猪里脊或猪梅花肉 350g–400g（分3份 · 约120g/顿）
                    </div>
                    <p className="text-stone-600 leading-relaxed">
                      <strong>把玉米淀粉优势拉满</strong>：1份今天中午配<strong>薄皮椒+大蒜+生抽+蚝油</strong>做《农家青椒滑肉片》；1份今晚用淀粉抓浆下入<strong>小白菜老豆腐汤</strong>做《胡椒滑肉片豆腐煲》；剩1份冷冻。
                    </p>
                  </div>
                )}
              </div>

              {/* Cooking Oil & Rice Advice */}
              <div className="bg-white border border-amber-200/80 rounded-lg p-3.5 text-xs space-y-2">
                <div>
                  <div className="font-bold text-stone-900">
                    2. 炒菜油怎么选：买 900ml–1.8L 小瓶装「一级菜籽油」或「花生油」
                  </div>
                  <p className="text-stone-600 leading-relaxed mt-0.5">
                    <strong>切忌买 5L 大桶油</strong>（一个人用半年易氧化）。菜籽油或花生油烟点高，爆香你刚买的<strong>葱姜蒜和薄皮椒</strong>最出锅气；现有的<strong>一点橄榄油</strong>留给空气炸锅或煮粥滴香。
                  </p>
                </div>
                <div className="pt-2 border-t border-amber-100">
                  <div className="font-bold text-stone-900">
                    3. 主食补齐（针对中午米饭、晚上炒饭/小米粥）：顺手买小袋「大米 + 黄小米」
                  </div>
                  <p className="text-stone-600 leading-relaxed mt-0.5">
                    顺手提一袋<strong>1kg–2.5kg大米</strong> + 一小袋<strong>400g–1kg黄小米（约¥6–¥12）</strong>。<strong>一米两吃秘诀：</strong>中午焖2人份米饭，1份中午吃盖浇饭，另1份摊平放冰箱冷藏收干水汽，晚上拿出来<strong>5分钟就能炒出粒粒分明的黄金蛋炒饭</strong>；想喝粥时水开下黄小米15分钟熬出金黄米油，原锅再花2分钟炒盘青椒鸡蛋或蚝油油麦菜！
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-amber-200/60 text-xs text-amber-900">
              <strong>省钱提醒：</strong>你已经有 500g油麦菜 + 300g小白菜 + 300g薄皮椒 + 380g老豆腐 = <strong>近3斤生鲜菜品</strong>，中午在超市看到打折青菜也忍住别买，吃完这批再补！
            </div>
          </div>

          {/* Right 6 Cols: 4 Arrival Storage & Today's 3-Meal Schedule */}
          <div className="lg:col-span-6 bg-stone-50 border border-stone-200 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-stone-900">
                  盒马送到后 · 5分钟保鲜分装打勾清单
                </h3>
                <span className="text-xs text-stone-500">
                  做完这4步，800g绿叶菜和老豆腐绝不坏
                </span>
              </div>

              <div className="space-y-2.5">
                {immediateTasks.map((task) => {
                  const done = !!checkedPrepTasks[task.id];
                  return (
                    <div
                      key={task.id}
                      className={`p-3 rounded-lg border transition-colors ${
                        done
                          ? 'bg-stone-100 border-stone-200 text-stone-400'
                          : 'bg-white border-stone-200'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <button
                          type="button"
                          onClick={() => togglePrepTask(task.id)}
                          aria-label={`标记保鲜动作：${task.title}`}
                          className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border shrink-0 ${
                            done
                              ? 'bg-emerald-700 border-emerald-700 text-white'
                              : 'border-stone-300 bg-white text-transparent'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </button>
                        <div>
                          <div
                            className={`text-xs font-bold ${
                              done ? 'line-through text-stone-400' : 'text-stone-900'
                            }`}
                          >
                            {task.title}
                          </div>
                          <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                            {task.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-200 text-xs text-stone-600">
              <strong className="text-stone-900">龙须挂面特别叮嘱：</strong>
              盒马这款鸡蛋龙须面非常细，<strong>水沸下锅只需煮 90秒–2分钟</strong>（下锅同时丢入一把小白菜同烫），千万别煮 4 分钟以免糊汤！
            </div>
          </div>
        </div>
      </div>

      {/* Detailed 10-Item Hema Order Breakdown Table */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <div>
            <h3 className="text-lg font-bold text-stone-900">
              你的盒马 10 件食材逐一吃法与消耗排期
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              按保鲜紧急度排序：先消灭「小白菜300g → 老豆腐380g → 油麦菜500g → 薄皮椒300g」
            </p>
          </div>

          <div
            role="group"
            aria-label="盒马食材紧急度筛选"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/80 rounded-xl"
          >
            {[
              { id: 'all', label: '全部10件实单' },
              { id: 'high_2days', label: '第1优先：今明必吃 (3件)' },
              { id: 'medium_4days', label: '第2优先：3–5天吃完 (3件)' },
              { id: 'pantry_long', label: '长效常备：蛋/面/蚝油/淀粉 (4件)' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setUrgencyFilter(tab.id as typeof urgencyFilter)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  urgencyFilter === tab.id
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50 text-xs font-semibold text-stone-600">
                <th className="py-3 px-4">刚买的食材</th>
                <th className="py-3 px-4">规格 / 实付</th>
                <th className="py-3 px-4">消耗优先级</th>
                <th className="py-3 px-4">到货保鲜处理</th>
                <th className="py-3 px-4">最佳组合菜式（配合现有厨具调料）</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-xs">
              {filteredHemaItems.map((item) => (
                <tr key={item.id} className="hover:bg-stone-50/70 align-top">
                  <td className="py-3.5 px-4 font-bold text-sm text-stone-900 whitespace-nowrap">
                    {item.name}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap tabular-nums text-stone-600">
                    <div>{item.spec}</div>
                    <div className="text-stone-400">¥{item.pricePaid.toFixed(2)}</div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`font-semibold ${
                        item.urgencyLevel === 'high_2days'
                          ? 'text-amber-800'
                          : item.urgencyLevel === 'medium_4days'
                          ? 'text-stone-800'
                          : 'text-emerald-700'
                      }`}
                    >
                      {item.urgencyText}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-stone-600 leading-relaxed min-w-[220px]">
                    {item.storageAction}
                  </td>
                  <td className="py-3.5 px-4 text-stone-800 font-medium leading-relaxed min-w-[240px]">
                    {item.bestDishMatch}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
