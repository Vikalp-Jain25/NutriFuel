import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CraftsmanshipSectionProps {
  onOpenVenturePlan: () => void;
}

export const CraftsmanshipSection: React.FC<CraftsmanshipSectionProps> = ({
  onOpenVenturePlan,
}) => {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#E2E8E0]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs font-mono text-[#15803D] mb-2">
              Why NutriFuel Exists
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#111814] [text-wrap:balance] mb-4">
              Built for 9-hour workdays when takeout feels like the only option.
            </h2>
            <p className="text-sm text-[#4B584E] leading-relaxed mb-6">
              In primary interviews with urban corporate employees and university postgraduates across Dehradun and NCR, 8 out of 10 reported ordering high-oil takeout due to weeknight fatigue—even though they wanted fresh home-cooked nutrition.
            </p>
            <button
              type="button"
              onClick={onOpenVenturePlan}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#14532D] hover:underline underline-offset-4 cursor-pointer"
            >
              <span>Inspect the DGU Venture Quest Business Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 bg-[#FAFBF9] border border-[#E2E8E0] rounded-xl space-y-2">
              <p className="font-mono text-xs text-[#15803D]">01. Farm-to-Bag</p>
              <h3 className="font-display text-base font-bold text-[#111814]">
                24-Hour Organic Sourcing
              </h3>
              <p className="text-xs text-[#4B584E] leading-relaxed">
                Harvested from regional organic farms within 30 km, triple-washed, and vacuum-portioned so spoilage stays under 3%.
              </p>
            </div>

            <div className="p-6 bg-[#FAFBF9] border border-[#E2E8E0] rounded-xl space-y-2">
              <p className="font-mono text-xs text-[#15803D]">02. Zero Prep Burden</p>
              <h3 className="font-display text-base font-bold text-[#111814]">
                No Chopping or Measuring
              </h3>
              <p className="text-xs text-[#4B584E] leading-relaxed">
                Save 45+ minutes of grocery runs and kitchen prep every evening—every spice glaze and protein cube arrives measured.
              </p>
            </div>

            <div className="p-6 bg-[#FAFBF9] border border-[#E2E8E0] rounded-xl space-y-2">
              <p className="font-mono text-xs text-[#15803D]">03. Total Macro Control</p>
              <h3 className="font-display text-base font-bold text-[#111814]">
                34–46g Complete Protein
              </h3>
              <p className="text-xs text-[#4B584E] leading-relaxed">
                Unlike opaque restaurant curries or repetitive tiffin boxes, every kit states exact calories, protein, carbs, and fiber.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
