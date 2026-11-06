import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INITIAL_KITCHEN_ITEMS,
  SOLO_RECIPES,
  evaluateRecipeReadiness,
  calculateKitchenSummary,
  toggleItemOwnership,
  addCustomShoppingItem
} from './kitchenPlanner';

test('initial inventory contains exact 10 owned items (4 tools + 6 condiments)', () => {
  const owned = INITIAL_KITCHEN_ITEMS.filter((item) => item.owned);
  assert.equal(owned.length, 10);
  const ownedTools = owned.filter((item) => item.category === 'tool');
  const ownedCondiments = owned.filter((item) => item.category === 'condiment');
  assert.equal(ownedTools.length, 4);
  assert.equal(ownedCondiments.length, 6);
});

test('zero-procurement breakfast bf_today_3 is immediately ready with current 10 items', () => {
  const bf3 = SOLO_RECIPES.find((r) => r.id === 'bf_today_3');
  assert.ok(bf3);
  const readiness = evaluateRecipeReadiness(bf3, INITIAL_KITCHEN_ITEMS);
  assert.equal(readiness.isReadyNow, true);
  assert.equal(readiness.missingItems.length, 0);
});

test('toggling staple and fresh items to owned unlocks all breakfast, lunch, and dinner recipes', () => {
  let items = INITIAL_KITCHEN_ITEMS;
  items = toggleItemOwnership(items, 'eggs_bread_noodles');
  items = toggleItemOwnership(items, 'tofu_chicken_greens');

  const summary = calculateKitchenSummary(items, SOLO_RECIPES);
  assert.equal(summary.ownedCount, 12);
  assert.equal(summary.readinessPercentage, 100);
});

test('addCustomShoppingItem validates empty names and negative prices', () => {
  const emptyRes = addCustomShoppingItem(INITIAL_KITCHEN_ITEMS, '   ', 'fresh', 15, '');
  assert.ok(emptyRes.error);
  assert.equal(emptyRes.items.length, INITIAL_KITCHEN_ITEMS.length);

  const negRes = addCustomShoppingItem(INITIAL_KITCHEN_ITEMS, '小葱', 'fresh', -5, '');
  assert.ok(negRes.error);

  const validRes = addCustomShoppingItem(INITIAL_KITCHEN_ITEMS, '冷冻水饺', 'staple', 22, '500g袋装');
  assert.equal(validRes.error, undefined);
  assert.equal(validRes.items.length, INITIAL_KITCHEN_ITEMS.length + 1);
  assert.equal(validRes.items[validRes.items.length - 1].name, '冷冻水饺');
});

import { calculateFreshPortionsByDays } from './kitchenPlanner';

test('calculateFreshPortionsByDays computes exact chicken thigh and vegetable grams for 3, 5, and 7 days', () => {
  const plan5 = calculateFreshPortionsByDays(5);
  assert.equal(plan5.chickenTotalGrams, 450);
  assert.equal(plan5.chickenMealsCount, 3);
  assert.equal(plan5.vegetablesTotalGrams, 1400);
  assert.equal(plan5.recommendations.length, 5);

  const plan3 = calculateFreshPortionsByDays(3);
  assert.equal(plan3.chickenTotalGrams, 300);
  assert.equal(plan3.chickenMealsCount, 2);

  const plan7 = calculateFreshPortionsByDays(7);
  assert.equal(plan7.chickenTotalGrams, 600);
  assert.equal(plan7.chickenMealsCount, 4);
});

import {
  HEMA_PURCHASED_ITEMS,
  applyHemaPurchaseToInventory
} from './kitchenPlanner';

test('HEMA_PURCHASED_ITEMS has exact 10 items from order and applyHemaPurchaseToInventory unlocks 100% recipes', () => {
  assert.equal(HEMA_PURCHASED_ITEMS.length, 10);
  const synced = applyHemaPurchaseToInventory(INITIAL_KITCHEN_ITEMS);
  const summary = calculateKitchenSummary(synced, SOLO_RECIPES);
  assert.equal(summary.readinessPercentage, 100);
});

test('SOLO_RECIPES includes 6 lunch schemes (3 rice + 3 noodles) and 9 dinner schemes (3 fried_rice + 3 congee + 3 noodles)', () => {
  const lunchRecipes = SOLO_RECIPES.filter((r) => r.slot === 'lunch');
  const dinnerRecipes = SOLO_RECIPES.filter((r) => r.slot === 'dinner');
  assert.equal(lunchRecipes.length, 6);
  assert.equal(dinnerRecipes.length, 9);

  const lunchRice = lunchRecipes.filter((r) => r.stapleType === 'rice');
  const lunchNoodles = lunchRecipes.filter((r) => r.stapleType === 'noodles');
  assert.equal(lunchRice.length, 3);
  assert.equal(lunchNoodles.length, 3);

  const dinnerFriedRice = dinnerRecipes.filter((r) => r.stapleType === 'fried_rice');
  const dinnerNoodles = dinnerRecipes.filter((r) => r.stapleType === 'noodles');
  const dinnerCongee = dinnerRecipes.filter((r) => r.stapleType === 'congee');
  assert.equal(dinnerFriedRice.length, 3);
  assert.equal(dinnerNoodles.length, 3);
  assert.equal(dinnerCongee.length, 3);
});


