import React, { useState } from 'react';
import { Clock, Plus, BookOpen } from 'lucide-react';
import {
  CityHub,
  HUB_DETAILS,
  MEAL_KITS,
  MealKit,
} from '../data/nutrifuelData';
import { MealIllustration } from './MealArtwork';

interface MenuCatalogSectionProps {
  selectedHub: CityHub;
  onSelectHub: (hub: CityHub) => void;
  onAddToBag: (meal: MealKit) => void;
  onInspectRecipe: (meal: MealKit) => void;
}

type CategoryFilter =
  | 'All Kits'
  | 'High Protein Bowl'
  | 'Skillet & Stir-Fry'
  | 'Wrap & Chilla'
  | 'Millet & Pasta';

const CATEGORIES: CategoryFilter[] = [
  'All Kits',
  'High Protein Bowl',
  'Skillet & Stir-Fry',
  'Wrap & Chilla',
  'Millet & Pasta',
];

export const MenuCatalogSection: React.FC<MenuCatalogSectionProps> = ({
  selectedHub,
  onSelectHub,
  onAddToBag,
  onInspectRecipe,
}) => {
  const [category, setCategory] = useState<CategoryFilter>('All Kits');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const visibleMeals =
    category === 'All Kits'
      ? MEAL_KITS
      : MEAL_KITS.filter((m) => m.category === category);

  const activeHubInfo =
    HUB_DETAILS.find((h) => h.city === selectedHub) || HUB_DETAILS[0];

  const handleQuickAdd = (meal: MealKit) => {
    onAddToBag(meal);
    setRecentlyAddedId(meal.id);
    window.setTimeout(() => {
      setRecentlyAddedId((curr) => (curr === meal.id ? null : curr));
    }, 1200);
  };

  return (
    <section id="menu" className="py-16 sm:py-20 border-b border-[#E2E8E0]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-mono text-[#15803D] mb-2">
              MVP Menu · Vegetarian &amp; High-Protein Fresh Kits
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#111814] [text-wrap:balance]">
              This week&apos;s 15-minute meal kits
            </h2>
          </div>

          {/* Hub selector */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-xs font-medium text-[#4B584E] whitespace-nowrap">
              Delivery Hub:
            </span>
            <div className="flex items-center gap-1 p-1 bg-[#F2F5F1] border border-[#E2E8E0] rounded-lg overflow-x-auto">
              {HUB_DETAILS.map((hub) => (
                <button
                  key={hub.city}
                  type="button"
                  onClick={() => onSelectHub(hub.city)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedHub === hub.city
                      ? 'bg-white text-[#111814] shadow-sm'
                      : 'text-[#4B584E] hover:text-[#111814]'
                  }`}
                >
                  {hub.city}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active hub delivery strip */}
        <div className="mb-8 px-4 py-3 bg-[#F2F5F1] border border-[#E2E8E0] rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#4B584E]">
          <span>
            <strong className="text-[#111814] font-semibold">
              {activeHubInfo.city} Corridors:
            </strong>{' '}
            {activeHubInfo.corridors}
          </span>
          <span className="font-mono text-[#14532D] shrink-0">
            {activeHubInfo.cutoffTime}
          </span>
        </div>

        {/* Interactive Category Filter */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F2F5F1] border border-[#E2E8E0] rounded-lg w-fit max-w-full overflow-x-auto mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                category === cat
                  ? 'bg-white text-[#111814] shadow-sm'
                  : 'text-[#4B584E] hover:text-[#111814]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3-Column Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleMeals.map((meal) => {
            const justAdded = recentlyAddedId === meal.id;
            return (
              <article
                key={meal.id}
                className="bg-white border border-[#E2E8E0] rounded-xl overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-0.5"
              >
                <MealIllustration meal={meal} />

                <div className="p-6 flex flex-col flex-1">
                  {/* Quiet unboxed metadata line */}
                  <div className="flex items-center gap-2 text-xs text-[#4B584E] mb-2">
                    <span>{meal.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{meal.calories} kcal</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{meal.fiberGrams}g fiber</span>
                  </div>

                  <h3 className="font-display text-lg font-semibold text-[#111814] leading-snug mb-2">
                    {meal.title}
                  </h3>
                  <p className="text-sm text-[#4B584E] leading-relaxed mb-5 flex-1">
                    {meal.subtitle}
                  </p>

                  {/* Macro line */}
                  <div className="py-3 border-y border-[#E2E8E0] grid grid-cols-4 gap-2 text-center mb-5">
                    <div>
                      <p className="font-mono text-sm font-semibold text-[#14532D] tabular-nums">
                        {meal.proteinGrams}g
                      </p>
                      <p className="text-[11px] text-[#4B584E]">Protein</p>
                    </div>
                    <div>
                      <p className="font-mono text-sm font-semibold text-[#111814] tabular-nums">
                        {meal.carbsGrams}g
                      </p>
                      <p className="text-[11px] text-[#4B584E]">Carbs</p>
                    </div>
                    <div>
                      <p className="font-mono text-sm font-semibold text-[#111814] tabular-nums">
                        {meal.fatsGrams}g
                      </p>
                      <p className="text-[11px] text-[#4B584E]">Fats</p>
                    </div>
                    <div>
                      <p className="font-mono text-sm font-semibold text-[#111814] tabular-nums inline-flex items-center justify-center gap-1">
                        <Clock className="w-3 h-3 text-[#15803D]" />
                        {meal.prepMinutes}m
                      </p>
                      <p className="text-[11px] text-[#4B584E]">Prep</p>
                    </div>
                  </div>

                  {/* Price & Actions */}
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-mono text-lg font-semibold text-[#111814] tabular-nums">
                        ₹{meal.priceInr}
                      </p>
                      <p className="text-[11px] text-[#4B584E]">Single fresh kit</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onInspectRecipe(meal)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#111814] bg-[#F2F5F1] border border-[#DCE5DA] rounded-lg hover:bg-[#E6ECE4] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-[#14532D]" />
                        <span>15-Min Card</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickAdd(meal)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          justAdded
                            ? 'bg-[#15803D] text-white'
                            : 'bg-[#14532D] text-white hover:bg-[#166534]'
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{justAdded ? 'Added' : 'Add'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
