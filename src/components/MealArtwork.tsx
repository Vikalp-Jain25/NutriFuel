import React from 'react';
import { MealKit } from '../data/nutrifuelData';

export const HeroMealKitComposition: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[380px] lg:min-h-[460px] bg-[#EEF3EC] border border-[#DCE5DA] rounded-xl overflow-hidden flex items-center justify-center p-6 sm:p-8">
      <svg
        viewBox="0 0 640 480"
        className="w-full h-full max-w-[560px]"
        role="img"
        aria-label="NutriFuel pre-portioned organic meal kit with four vacuum-sealed pouches and 15-minute recipe card"
      >
        <defs>
          <pattern id="gridDots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#C9D6C6" />
          </pattern>
        </defs>

        <rect width="640" height="480" rx="16" fill="#F6F9F5" />
        <rect width="640" height="480" rx="16" fill="url(#gridDots)" opacity="0.55" />

        {/* Kraft Meal Kit Delivery Tray */}
        <rect x="38" y="42" width="376" height="396" rx="16" fill="#FFFFFF" stroke="#CFDACA" strokeWidth="2" />
        <rect x="54" y="58" width="344" height="52" rx="8" fill="#14532D" />
        <text x="74" y="82" fill="#FFFFFF" fontSize="15" fontWeight="700" fontFamily="DM Sans, sans-serif">
          NutriFuel Cold-Bag Kit
        </text>
        <text x="74" y="100" fill="#BBF7D0" fontSize="11" fontFamily="JetBrains Mono, monospace">
          PRE-WASHED · EXACT MEASURE · ZERO WASTE
        </text>

        {/* Pouch 1: Organic Paneer */}
        <rect x="54" y="126" width="164" height="140" rx="10" fill="#F2F6F0" stroke="#D5E0D1" strokeWidth="1.5" />
        <text x="68" y="150" fill="#14532D" fontSize="11" fontWeight="600" fontFamily="JetBrains Mono, monospace">
          POUCH 01 · 160g
        </text>
        <text x="68" y="168" fill="#111814" fontSize="13" fontWeight="600" fontFamily="DM Sans, sans-serif">
          Spiced Paneer
        </text>
        <g transform="translate(86, 186)">
          <rect x="0" y="6" width="32" height="28" rx="5" fill="#FCE7B2" stroke="#D97706" strokeWidth="1.5" />
          <rect x="38" y="0" width="32" height="28" rx="5" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
          <rect x="18" y="34" width="34" height="26" rx="5" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
          <circle cx="14" cy="18" r="2.2" fill="#B45309" />
          <circle cx="54" cy="14" r="2.2" fill="#B45309" />
          <circle cx="34" cy="46" r="2.2" fill="#B45309" />
        </g>

        {/* Pouch 2: Tri-Color Quinoa */}
        <rect x="234" y="126" width="164" height="140" rx="10" fill="#F2F6F0" stroke="#D5E0D1" strokeWidth="1.5" />
        <text x="248" y="150" fill="#14532D" fontSize="11" fontWeight="600" fontFamily="JetBrains Mono, monospace">
          POUCH 02 · 140g
        </text>
        <text x="248" y="168" fill="#111814" fontSize="13" fontWeight="600" fontFamily="DM Sans, sans-serif">
          Steamed Quinoa
        </text>
        <g transform="translate(274, 190)">
          <circle cx="42" cy="30" r="32" fill="#E7D8C5" stroke="#A68B6B" strokeWidth="1.5" />
          <circle cx="30" cy="22" r="3" fill="#8C6239" />
          <circle cx="46" cy="16" r="2.5" fill="#5C4033" />
          <circle cx="54" cy="32" r="3" fill="#A68B6B" />
          <circle cx="36" cy="38" r="2.5" fill="#5C4033" />
          <circle cx="24" cy="34" r="2.5" fill="#8C6239" />
          <circle cx="48" cy="44" r="2.5" fill="#8C6239" />
        </g>

        {/* Pouch 3: Washed Greens & Peppers */}
        <rect x="54" y="282" width="164" height="140" rx="10" fill="#F2F6F0" stroke="#D5E0D1" strokeWidth="1.5" />
        <text x="68" y="306" fill="#14532D" fontSize="11" fontWeight="600" fontFamily="JetBrains Mono, monospace">
          POUCH 03 · 110g
        </text>
        <text x="68" y="324" fill="#111814" fontSize="13" fontWeight="600" fontFamily="DM Sans, sans-serif">
          Washed Peppers
        </text>
        <g transform="translate(82, 342)">
          <path d="M12 36 C12 14, 34 8, 44 24 C34 42, 16 44, 12 36 Z" fill="#15803D" />
          <path d="M40 42 C48 20, 74 20, 80 36 C68 50, 48 50, 40 42 Z" fill="#DC2626" opacity="0.85" />
          <path d="M26 16 C36 2, 62 4, 68 18 C52 28, 36 28, 26 16 Z" fill="#F59E0B" opacity="0.9" />
        </g>

        {/* Pouch 4: Herb Dressing */}
        <rect x="234" y="282" width="164" height="140" rx="10" fill="#F2F6F0" stroke="#D5E0D1" strokeWidth="1.5" />
        <text x="248" y="306" fill="#14532D" fontSize="11" fontWeight="600" fontFamily="JetBrains Mono, monospace">
          POUCH 04 · 45g
        </text>
        <text x="248" y="324" fill="#111814" fontSize="13" fontWeight="600" fontFamily="DM Sans, sans-serif">
          Mint Hung Curd
        </text>
        <g transform="translate(274, 342)">
          <circle cx="42" cy="32" r="28" fill="#DCFCE7" stroke="#15803D" strokeWidth="1.5" />
          <circle cx="42" cy="32" r="17" fill="#FFFFFF" />
          <path d="M36 30 C40 22, 48 24, 48 32 C42 36, 36 34, 36 30 Z" fill="#15803D" />
        </g>

        {/* Printed 15-Minute Recipe Card on Right */}
        <rect x="434" y="64" width="168" height="352" rx="12" fill="#FFFFFF" stroke="#CFDACA" strokeWidth="2" />
        <rect x="450" y="82" width="136" height="32" rx="6" fill="#EDF5EF" />
        <text x="462" y="102" fill="#14532D" fontSize="12" fontWeight="700" fontFamily="JetBrains Mono, monospace">
          15-MIN CARD
        </text>

        <text x="450" y="138" fill="#111814" fontSize="14" fontWeight="700" fontFamily="DM Sans, sans-serif">
          42g Protein
        </text>
        <text x="450" y="156" fill="#4B584E" fontSize="11" fontFamily="JetBrains Mono, monospace">
          540 kcal · 14 min
        </text>
        <line x1="450" y1="172" x2="586" y2="172" stroke="#E2E8E0" strokeWidth="1" />

        {/* 4 Steps on Card */}
        {[
          { num: '01', label: 'Sear paneer & peppers', time: '04:00' },
          { num: '02', label: 'Steam tri-color quinoa', time: '03:00' },
          { num: '03', label: 'Toss & glaze aromatics', time: '02:00' },
          { num: '04', label: 'Drizzle mint curd', time: '01:00' },
        ].map((step, i) => {
          const y = 196 + i * 52;
          return (
            <g key={step.num}>
              <text x="450" y={y} fill="#15803D" fontSize="11" fontWeight="700" fontFamily="JetBrains Mono, monospace">
                {step.num}
              </text>
              <text x="472" y={y} fill="#111814" fontSize="11.5" fontWeight="500" fontFamily="DM Sans, sans-serif">
                {step.label}
              </text>
              <text x="472" y={y + 16} fill="#4B584E" fontSize="10.5" fontFamily="JetBrains Mono, monospace">
                Timer {step.time}
              </text>
            </g>
          );
        })}

        <rect x="450" y="376" width="136" height="24" rx="4" fill="#14532D" />
        <text x="466" y="392" fill="#FFFFFF" fontSize="10.5" fontWeight="600" fontFamily="JetBrains Mono, monospace">
          FARM-TO-PAN · ₹220
        </text>
      </svg>
    </div>
  );
};

export const MealIllustration: React.FC<{ meal: MealKit }> = ({ meal }) => {
  return (
    <div
      className="w-full aspect-[4/3] relative flex items-center justify-center overflow-hidden border-b border-[#E2E8E0]"
      style={{ backgroundColor: meal.surfaceTint }}
    >
      <svg
        viewBox="0 0 360 270"
        className="w-full h-full"
        role="img"
        aria-label={meal.title}
      >
        <rect width="360" height="270" fill={meal.surfaceTint} />

        {/* Plate / Bowl Base */}
        <circle cx="180" cy="138" r="88" fill="#FFFFFF" stroke="#D5E0D1" strokeWidth="2" />
        <circle cx="180" cy="138" r="74" fill="#FAFBF9" stroke="#E5ECE3" strokeWidth="1" />

        {meal.illustrationKey === 'quinoa-bowl' && (
          <g>
            {/* Quinoa bed */}
            <circle cx="164" cy="144" r="44" fill="#E8DCCB" />
            <circle cx="148" cy="132" r="3" fill="#9A7B56" />
            <circle cx="164" cy="158" r="3" fill="#7A5C3E" />
            <circle cx="178" cy="136" r="2.5" fill="#9A7B56" />
            {/* Paneer cubes */}
            <rect x="172" y="102" width="26" height="22" rx="4" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
            <rect x="196" y="120" width="26" height="22" rx="4" fill="#FCE7B2" stroke="#D97706" strokeWidth="1.5" />
            <rect x="180" y="142" width="24" height="22" rx="4" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
            {/* Bell pepper & mint leaves */}
            <path d="M126 116 C138 102, 160 106, 164 120 C148 128, 134 126, 126 116 Z" fill="#DC2626" opacity="0.85" />
            <path d="M138 158 C154 150, 174 162, 166 178 C152 178, 140 168, 138 158 Z" fill="#15803D" />
            <circle cx="204" cy="166" r="14" fill="#DCFCE7" stroke="#15803D" strokeWidth="1.2" />
          </g>
        )}

        {meal.illustrationKey === 'sesame-wok' && (
          <g>
            {/* Bok choy leaves */}
            <path d="M120 130 C134 102, 166 102, 176 126 C158 142, 134 144, 120 130 Z" fill="#15803D" />
            <path d="M180 148 C196 124, 228 128, 232 152 C214 166, 190 164, 180 148 Z" fill="#166534" />
            {/* Edamame & soya */}
            <ellipse cx="154" cy="156" rx="14" ry="9" fill="#84CC16" stroke="#3F6212" strokeWidth="1.2" />
            <ellipse cx="182" cy="122" rx="14" ry="9" fill="#A3E635" stroke="#3F6212" strokeWidth="1.2" />
            <rect x="150" y="128" width="22" height="18" rx="6" fill="#C28E5C" stroke="#78350F" strokeWidth="1.2" />
            <rect x="184" y="138" width="22" height="18" rx="6" fill="#B47B48" stroke="#78350F" strokeWidth="1.2" />
            <circle cx="170" cy="166" r="2.2" fill="#111814" />
            <circle cx="192" cy="112" r="2.2" fill="#111814" />
            <circle cx="144" cy="144" r="2.2" fill="#111814" />
          </g>
        )}

        {meal.illustrationKey === 'tandoori-wrap' && (
          <g>
            {/* Rolled multigrain wrap halves */}
            <rect x="122" y="114" width="116" height="34" rx="16" fill="#D6B88D" stroke="#8C6239" strokeWidth="1.5" transform="rotate(-14 180 138)" />
            <rect x="128" y="142" width="106" height="32" rx="15" fill="#C49F6E" stroke="#8C6239" strokeWidth="1.5" transform="rotate(10 180 158)" />
            <circle cx="148" cy="122" r="7" fill="#EA580C" />
            <circle cx="212" cy="154" r="7" fill="#15803D" />
            <circle cx="186" cy="134" r="5" fill="#FACC15" />
          </g>
        )}

        {meal.illustrationKey === 'moong-chilla' && (
          <g>
            {/* Golden folded chilla */}
            <path d="M116 146 A64 64 0 0 1 244 146 Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.8" />
            <path d="M126 154 A54 54 0 0 0 234 154 Z" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.4" />
            {/* Avocado smash scoop */}
            <circle cx="180" cy="132" r="22" fill="#65A30D" stroke="#365314" strokeWidth="1.4" />
            <circle cx="176" cy="128" r="10" fill="#BEF264" />
            {/* Microgreens */}
            <path d="M168 116 L176 104 M182 114 L188 102 M192 118 L200 108" stroke="#14532D" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {meal.illustrationKey === 'millet-pasta' && (
          <g>
            {/* Penne ribbons */}
            <rect x="132" y="116" width="38" height="14" rx="6" fill="#EAB308" stroke="#854D0E" strokeWidth="1.2" transform="rotate(24 151 123)" />
            <rect x="172" y="112" width="38" height="14" rx="6" fill="#EAB308" stroke="#854D0E" strokeWidth="1.2" transform="rotate(-18 191 119)" />
            <rect x="148" y="144" width="38" height="14" rx="6" fill="#CA8A04" stroke="#854D0E" strokeWidth="1.2" transform="rotate(-10 167 151)" />
            <rect x="184" y="142" width="38" height="14" rx="6" fill="#EAB308" stroke="#854D0E" strokeWidth="1.2" transform="rotate(28 203 149)" />
            {/* Pesto & cherry tomatoes */}
            <circle cx="144" cy="152" r="9" fill="#DC2626" />
            <circle cx="214" cy="126" r="9" fill="#DC2626" />
            <circle cx="178" cy="136" r="11" fill="#15803D" opacity="0.85" />
          </g>
        )}

        {meal.illustrationKey === 'texmex-skillet' && (
          <g>
            {/* Skillet handle */}
            <rect x="262" y="132" width="38" height="12" rx="6" fill="#27322A" />
            <circle cx="180" cy="138" r="68" fill="none" stroke="#27322A" strokeWidth="4" />
            {/* Rajma, corn & rice */}
            <circle cx="152" cy="126" r="12" fill="#991B1B" />
            <circle cx="176" cy="118" r="10" fill="#1F2937" />
            <circle cx="204" cy="132" r="11" fill="#991B1B" />
            <circle cx="156" cy="154" r="6" fill="#FACC15" />
            <circle cx="170" cy="160" r="6" fill="#FACC15" />
            <circle cx="184" cy="154" r="6" fill="#FACC15" />
            {/* Crema swirl */}
            <circle cx="182" cy="138" r="18" fill="#FFFFFF" stroke="#15803D" strokeWidth="1.5" />
            <path d="M174 138 Q182 128 190 138" fill="none" stroke="#15803D" strokeWidth="2" />
          </g>
        )}

        {/* Quiet corner macro label */}
        <text
          x="20"
          y="28"
          fill="#14532D"
          fontSize="11"
          fontWeight="600"
          fontFamily="JetBrains Mono, monospace"
        >
          {meal.prepMinutes} MIN PREP · {meal.proteinGrams}G PROTEIN
        </text>
      </svg>
    </div>
  );
};
