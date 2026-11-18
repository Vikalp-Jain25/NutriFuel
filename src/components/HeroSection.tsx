import React from 'react';
import { ArrowRight } from 'lucide-react';
import { HeroMealKitComposition } from './MealArtwork';

interface HeroSectionProps {
  onClaimTrial: () => void;
  onExploreMenu: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onClaimTrial,
  onExploreMenu,
}) => {
  return (
    <section id="top" className="pt-10 pb-16 sm:pt-14 sm:pb-20 border-b border-[#E2E8E0]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-xs font-mono text-[#15803D] tracking-wide mb-4">
              Dehradun · Gurgaon · Noida · Bangalore
            </p>
            <h1 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-[1.08] tracking-tight text-[#111814] [text-wrap:balance] mb-5">
              Fresh, macro-balanced home meals in under 15 minutes.
            </h1>
            <p className="text-base sm:text-lg text-[#4B584E] leading-relaxed max-w-xl mb-8">
              NutriFuel delivers pre-washed, exact-measure organic vegetarian ingredients and step-by-step recipe cards to your doorstep. Skip grocery runs, chopping, and greasy takeout without losing control of your protein goals.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onClaimTrial}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold bg-[#14532D] text-white rounded-lg hover:bg-[#166534] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Claim 50% Off 3-Meal Trial Box (₹330)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onExploreMenu}
                className="px-5 py-3.5 text-sm font-medium text-[#111814] border border-[#CFDACA] bg-white rounded-lg hover:bg-[#F2F5F1] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Explore 15-Min Menu
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <HeroMealKitComposition />
          </div>
        </div>

        {/* Full-width 4-column quantitative proof strip */}
        <div className="mt-12 pt-8 border-t border-[#E2E8E0] grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="font-mono text-2xl font-semibold text-[#111814] tabular-nums">
              11–15 min
            </p>
            <p className="text-sm text-[#4B584E] mt-1">
              Verified pan-to-plate prep time with zero chopping
            </p>
          </div>
          <div>
            <p className="font-mono text-2xl font-semibold text-[#111814] tabular-nums">
              ₹220 / kit
            </p>
            <p className="text-sm text-[#4B584E] mt-1">
              34–46g complete vegetarian protein per macro-balanced serving
            </p>
          </div>
          <div>
            <p className="font-mono text-2xl font-semibold text-[#111814] tabular-nums">
              &lt; 24 hrs
            </p>
            <p className="text-sm text-[#4B584E] mt-1">
              Direct local organic farm harvest to doorstep cold-bag
            </p>
          </div>
          <div>
            <p className="font-mono text-2xl font-semibold text-[#111814] tabular-nums">
              Zero waste
            </p>
            <p className="text-sm text-[#4B584E] mt-1">
              Exact-measure pouches eliminate leftover spoiled produce
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
