import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { VENTURE_PLAN } from '../data/nutrifuelData';

function formatInrIndian(num: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(num);
}

export const VenturePlanView: React.FC = () => {
  const [selectedCompetitor, setSelectedCompetitor] = useState(
    VENTURE_PLAN.competitorMatrix[0]
  );

  // Unit economics interactive scenario modeler
  const [activeScenarioId, setActiveScenarioId] = useState('base');
  const [customers, setCustomers] = useState(300);
  const [ordersPerCustomer, setOrdersPerCustomer] = useState(12);
  const [sellingPrice, setSellingPrice] = useState(220);
  const [variableCost, setVariableCost] = useState(110);
  const [fixedCost, setFixedCost] = useState(45000);

  const applyScenario = (id: string) => {
    const found = VENTURE_PLAN.unitEconomicsScenarios.find((s) => s.id === id);
    if (!found) return;
    setActiveScenarioId(found.id);
    setCustomers(found.customers);
    setOrdersPerCustomer(found.ordersPerCustomer);
    setSellingPrice(found.sellingPrice);
    setVariableCost(found.variableCost);
    setFixedCost(found.fixedCost);
  };

  const monthlyOrders = customers * ordersPerCustomer;
  const monthlyRevenue = monthlyOrders * sellingPrice;
  const contributionPerSale = sellingPrice - variableCost;
  const totalContribution = monthlyOrders * contributionPerSale;
  const operatingSurplus = totalContribution - fixedCost;
  const grossMarginPct =
    sellingPrice > 0 ? Math.round((contributionPerSale / sellingPrice) * 100) : 0;

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-14">
        {/* Header */}
        <div className="pb-8 border-b border-[#E2E8E0] flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-mono text-[#15803D] mb-2">
              {VENTURE_PLAN.header.program} · {VENTURE_PLAN.header.institution}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#111814] [text-wrap:balance]">
              NutriFuel Venture Blueprint &amp; Unit Economics
            </h1>
            <p className="text-sm text-[#4B584E] mt-2">
              Founder Contact: {VENTURE_PLAN.header.founderEmail} · Plan Date:{' '}
              {VENTURE_PLAN.header.generatedDate}
            </p>
          </div>

          <a
            href="/assets/aistudio/vikalp.0251mba645_dgu.ac.in__1__339615a2.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#14532D] bg-white border border-[#CFDACA] rounded-lg hover:bg-[#F2F5F1] transition-colors whitespace-nowrap shrink-0"
          >
            <FileText className="w-4 h-4" />
            <span>Open Source Venture PDF</span>
          </a>
        </div>

        {/* Missions 0–4: Friction, JTBD & CVP */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-[#E2E8E0] rounded-xl p-6 space-y-3">
            <p className="text-xs font-mono text-[#15803D]">
              Mission 0 &amp; 1 · Friction {VENTURE_PLAN.mission1and2.frictionId}
            </p>
            <h2 className="font-display text-xl font-bold text-[#111814]">
              Customer Friction
            </h2>
            <p className="text-sm text-[#4B584E] leading-relaxed">
              {VENTURE_PLAN.mission0.problemSolved}
            </p>
            <p className="text-xs font-medium text-[#111814] pt-2 border-t border-[#E2E8E0]">
              Evidence: {VENTURE_PLAN.mission1and2.evidenceSummary}
            </p>
          </div>

          <div className="bg-white border border-[#E2E8E0] rounded-xl p-6 space-y-3">
            <p className="text-xs font-mono text-[#15803D]">
              Mission 2 · Jobs To Be Done
            </p>
            <h2 className="font-display text-xl font-bold text-[#111814]">
              15-Minute Functional Job
            </h2>
            <p className="text-sm text-[#4B584E] leading-relaxed">
              {VENTURE_PLAN.mission1and2.functionalJob}
            </p>
            <p className="text-xs text-[#4B584E] pt-2 border-t border-[#E2E8E0]">
              <strong className="text-[#111814]">Emotional:</strong>{' '}
              {VENTURE_PLAN.mission1and2.emotionalJob}
            </p>
          </div>

          <div className="bg-white border border-[#E2E8E0] rounded-xl p-6 space-y-3">
            <p className="text-xs font-mono text-[#15803D]">
              Mission 3 &amp; 4 · Beachhead &amp; CVP
            </p>
            <h2 className="font-display text-xl font-bold text-[#111814]">
              Tech Corridors &amp; Campuses
            </h2>
            <p className="text-sm text-[#4B584E] leading-relaxed">
              {VENTURE_PLAN.mission3and4.beachheadSegment}
            </p>
            <p className="text-xs font-mono text-[#14532D] pt-2 border-t border-[#E2E8E0]">
              WTP: {VENTURE_PLAN.mission3and4.willingnessToPay}
            </p>
          </div>
        </div>

        {/* Mission 5 & 6: Competitor Battlefield Matrix */}
        <div className="bg-white border border-[#E2E8E0] rounded-xl p-6 sm:p-8">
          <div className="mb-6">
            <p className="text-xs font-mono text-[#15803D] mb-1">
              Mission 5 &amp; 6 · Competitor Battlefield &amp; Positioning
            </p>
            <h2 className="font-display text-2xl font-bold text-[#111814]">
              Nutritional Control vs. Speed of Prep
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* SVG 2x2 Matrix */}
            <div className="lg:col-span-7 bg-[#FAFBF9] border border-[#E2E8E0] rounded-xl p-4">
              <svg
                viewBox="0 0 520 380"
                className="w-full h-auto"
                role="img"
                aria-label="Competitor positioning scatter plot comparing NutriFuel against Swiggy/Zomato, Local Tiffins, and Blinkit/Zepto"
              >
                {/* Quadrant lines */}
                <line x1="60" y1="320" x2="480" y2="320" stroke="#9CA3AF" strokeWidth="1.5" />
                <line x1="60" y1="30" x2="60" y2="320" stroke="#9CA3AF" strokeWidth="1.5" />
                <line
                  x1="270"
                  y1="30"
                  x2="270"
                  y2="320"
                  stroke="#D1D5DB"
                  strokeDasharray="4 4"
                />
                <line
                  x1="60"
                  y1="175"
                  x2="480"
                  y2="175"
                  stroke="#D1D5DB"
                  strokeDasharray="4 4"
                />

                {/* Top-right target zone */}
                <rect
                  x="270"
                  y="30"
                  width="210"
                  height="145"
                  fill="#DCFCE7"
                  opacity="0.35"
                />
                <text
                  x="375"
                  y="48"
                  textAnchor="middle"
                  fill="#15803D"
                  fontSize="10"
                  fontWeight="600"
                  fontFamily="JetBrains Mono, monospace"
                >
                  HIGH HEALTH · HIGH CONVENIENCE
                </text>

                {/* Axis labels */}
                <text
                  x="270"
                  y="356"
                  textAnchor="middle"
                  fill="#111814"
                  fontSize="11.5"
                  fontWeight="600"
                  fontFamily="DM Sans, sans-serif"
                >
                  Nutritional Control &amp; Health Focus (0–10) →
                </text>
                <text
                  x="22"
                  y="175"
                  textAnchor="middle"
                  fill="#111814"
                  fontSize="11.5"
                  fontWeight="600"
                  fontFamily="DM Sans, sans-serif"
                  transform="rotate(-90 22 175)"
                >
                  Convenience &amp; Speed of Prep (0–10) →
                </text>

                {VENTURE_PLAN.competitorMatrix.map((comp) => {
                  const cx = 60 + (comp.axisX / 10) * 420;
                  const cy = 320 - (comp.axisY / 10) * 290;
                  const isNutriFuel = comp.name === 'NutriFuel';
                  const isSelected = selectedCompetitor.name === comp.name;

                  return (
                    <g
                      key={comp.name}
                      onClick={() => setSelectedCompetitor(comp)}
                      className="cursor-pointer"
                    >
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isSelected ? 15 : 11}
                        fill={isNutriFuel ? '#14532D' : '#FFFFFF'}
                        stroke={isNutriFuel ? '#14532D' : '#4B584E'}
                        strokeWidth={isSelected ? 3 : 2}
                      />
                      <text
                        x={cx}
                        y={cy + 3.5}
                        textAnchor="middle"
                        fill={isNutriFuel ? '#FFFFFF' : '#111814'}
                        fontSize="9.5"
                        fontWeight="700"
                        fontFamily="JetBrains Mono, monospace"
                      >
                        {comp.axisX},{comp.axisY}
                      </text>
                      <text
                        x={cx}
                        y={cy - 18}
                        textAnchor="middle"
                        fill="#111814"
                        fontSize="11"
                        fontWeight={isNutriFuel ? '700' : '500'}
                        fontFamily="DM Sans, sans-serif"
                      >
                        {comp.name.split('(')[0].trim()}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Selected Competitor Detail */}
            <div className="lg:col-span-5 space-y-5">
              <div className="flex flex-wrap gap-1.5">
                {VENTURE_PLAN.competitorMatrix.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedCompetitor(c)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                      selectedCompetitor.name === c.name
                        ? 'bg-[#14532D] text-white border-[#14532D]'
                        : 'bg-white text-[#4B584E] border-[#E2E8E0] hover:text-[#111814]'
                    }`}
                  >
                    {c.name.split('(')[0].trim()}
                  </button>
                ))}
              </div>

              <div className="p-5 bg-[#FAFBF9] border border-[#E2E8E0] rounded-xl space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono text-[#15803D]">
                    {selectedCompetitor.type}
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#111814] tabular-nums">
                    X:{selectedCompetitor.axisX} / Y:{selectedCompetitor.axisY}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-[#111814]">
                  {selectedCompetitor.name}
                </h3>
                <p className="font-mono text-xs text-[#4B584E]">
                  Price: {selectedCompetitor.price}
                </p>
                <p className="text-sm text-[#111814]">
                  <strong>Strength:</strong> {selectedCompetitor.strength}
                </p>
                <p className="text-sm text-[#4B584E]">
                  <strong>Weakness:</strong> {selectedCompetitor.weakness}
                </p>
              </div>

              <p className="text-xs text-[#4B584E] leading-relaxed">
                {VENTURE_PLAN.positioningStatement}
              </p>
            </div>
          </div>
        </div>

        {/* Mission 7 & 8: Unit Economics & TAM/SAM/SOM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Interactive Financial Modeler */}
          <div className="lg:col-span-7 bg-white border border-[#E2E8E0] rounded-xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono text-[#15803D] mb-1">
                  Mission 7 · Revenue &amp; Unit Economics
                </p>
                <h2 className="font-display text-2xl font-bold text-[#111814]">
                  Interactive Scenario Modeler
                </h2>
              </div>

              <div className="flex items-center gap-1 p-1 bg-[#F2F5F1] border border-[#E2E8E0] rounded-lg w-fit">
                {VENTURE_PLAN.unitEconomicsScenarios.map((sc) => (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => applyScenario(sc.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                      activeScenarioId === sc.id
                        ? 'bg-white text-[#111814] shadow-sm'
                        : 'text-[#4B584E] hover:text-[#111814]'
                    }`}
                  >
                    {sc.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Output KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-[#E2E8E0]">
              <div>
                <p className="font-mono text-lg font-bold text-[#111814] tabular-nums">
                  {formatInrIndian(monthlyRevenue)}
                </p>
                <p className="text-xs text-[#4B584E]">Monthly Revenue</p>
              </div>
              <div>
                <p
                  className={`font-mono text-lg font-bold tabular-nums ${
                    operatingSurplus >= 0 ? 'text-[#14532D]' : 'text-[#991B1B]'
                  }`}
                >
                  {formatInrIndian(operatingSurplus)}
                </p>
                <p className="text-xs text-[#4B584E]">Operating Surplus</p>
              </div>
              <div>
                <p className="font-mono text-lg font-bold text-[#111814] tabular-nums">
                  ₹{contributionPerSale} ({grossMarginPct}%)
                </p>
                <p className="text-xs text-[#4B584E]">Contribution / Kit</p>
              </div>
              <div>
                <p className="font-mono text-lg font-bold text-[#111814] tabular-nums">
                  {monthlyOrders.toLocaleString('en-IN')}
                </p>
                <p className="text-xs text-[#4B584E]">Monthly Kits</p>
              </div>
            </div>

            {/* Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
              <label className="block space-y-1.5">
                <div className="flex justify-between font-medium text-[#111814]">
                  <span>Active Subscribers</span>
                  <span className="font-mono tabular-nums">{customers}</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={1000}
                  step={25}
                  value={customers}
                  onChange={(e) => setCustomers(Number(e.target.value))}
                  className="w-full accent-[#14532D]"
                />
              </label>

              <label className="block space-y-1.5">
                <div className="flex justify-between font-medium text-[#111814]">
                  <span>Orders / Customer / Month</span>
                  <span className="font-mono tabular-nums">{ordersPerCustomer}</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={20}
                  step={1}
                  value={ordersPerCustomer}
                  onChange={(e) => setOrdersPerCustomer(Number(e.target.value))}
                  className="w-full accent-[#14532D]"
                />
              </label>

              <label className="block space-y-1.5">
                <div className="flex justify-between font-medium text-[#111814]">
                  <span>Kit Selling Price (INR)</span>
                  <span className="font-mono tabular-nums">₹{sellingPrice}</span>
                </div>
                <input
                  type="range"
                  min={150}
                  max={300}
                  step={5}
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(Number(e.target.value))}
                  className="w-full accent-[#14532D]"
                />
              </label>

              <label className="block space-y-1.5">
                <div className="flex justify-between font-medium text-[#111814]">
                  <span>Variable Cost / Kit (INR)</span>
                  <span className="font-mono tabular-nums">₹{variableCost}</span>
                </div>
                <input
                  type="range"
                  min={80}
                  max={160}
                  step={5}
                  value={variableCost}
                  onChange={(e) => setVariableCost(Number(e.target.value))}
                  className="w-full accent-[#14532D]"
                />
              </label>
            </div>
          </div>

          {/* TAM / SAM / SOM Market Size */}
          <div className="lg:col-span-5 bg-white border border-[#E2E8E0] rounded-xl p-6 sm:p-8 space-y-6">
            <div>
              <p className="text-xs font-mono text-[#15803D] mb-1">
                Mission 8 · Market Size &amp; Demand
              </p>
              <h2 className="font-display text-2xl font-bold text-[#111814]">
                India Urban Meal-Kit Opportunity
              </h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-[#FAFBF9] border border-[#E2E8E0] rounded-xl">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-xs font-mono text-[#4B584E]">TAM</span>
                  <span className="font-mono text-base font-bold text-[#111814] tabular-nums">
                    {VENTURE_PLAN.marketSize.tamFormatted}
                  </span>
                </div>
                <p className="text-xs text-[#4B584E] mt-1">
                  {VENTURE_PLAN.marketSize.tamDetail}
                </p>
              </div>

              <div className="p-4 bg-[#FAFBF9] border border-[#E2E8E0] rounded-xl">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-xs font-mono text-[#4B584E]">SAM</span>
                  <span className="font-mono text-base font-bold text-[#111814] tabular-nums">
                    {VENTURE_PLAN.marketSize.samFormatted}
                  </span>
                </div>
                <p className="text-xs text-[#4B584E] mt-1">
                  {VENTURE_PLAN.marketSize.samDetail}
                </p>
              </div>

              <div className="p-4 bg-[#F2F6F0] border border-[#CFDACA] rounded-xl">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-xs font-mono text-[#14532D] font-semibold">
                    SOM (Year 1 Target)
                  </span>
                  <span className="font-mono text-base font-bold text-[#14532D] tabular-nums">
                    {VENTURE_PLAN.marketSize.somFormatted}
                  </span>
                </div>
                <p className="text-xs text-[#4B584E] mt-1">
                  {VENTURE_PLAN.marketSize.somDetail}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission 9: 30-Day GTM Experiment */}
        <div className="bg-white border border-[#E2E8E0] rounded-xl p-6 sm:p-8">
          <div className="mb-6">
            <p className="text-xs font-mono text-[#15803D] mb-1">
              Mission 9 · 30-Day Go-To-Market Experiment
            </p>
            <h2 className="font-display text-2xl font-bold text-[#111814]">
              Four-Week Trial-to-Subscriber Conversion Plan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {VENTURE_PLAN.gtm30Day.map((w) => (
              <div
                key={w.week}
                className="p-5 bg-[#FAFBF9] border border-[#E2E8E0] rounded-xl flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <p className="font-mono text-xs font-semibold text-[#14532D]">
                    {w.week} · {w.owner}
                  </p>
                  <h3 className="font-display text-base font-bold text-[#111814]">
                    {w.channel}
                  </h3>
                  <p className="text-xs text-[#4B584E] leading-relaxed">
                    {w.action}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8E0]">
                  <p className="text-[11px] font-mono text-[#111814] font-semibold">
                    Target: {w.target}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission 10 & 11: MVP Scope + Top 3 Evidence Assumptions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-white border border-[#E2E8E0] rounded-xl p-6 sm:p-8 space-y-5">
            <div>
              <p className="text-xs font-mono text-[#15803D] mb-1">
                Mission 10 · MVP Scope
              </p>
              <h2 className="font-display text-xl font-bold text-[#111814]">
                What Ships Now vs. Excluded
              </h2>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#14532D] mb-2">
                Included in Phase 1 MVP
              </p>
              <ul className="space-y-2 text-xs text-[#111814]">
                {VENTURE_PLAN.mvpScope.included.map((item) => (
                  <li key={item} className="leading-relaxed">
                    · {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-4 border-t border-[#E2E8E0]">
              <p className="text-xs font-semibold text-[#4B584E] mb-2">
                Intentionally Excluded
              </p>
              <ul className="space-y-2 text-xs text-[#4B584E]">
                {VENTURE_PLAN.mvpScope.excluded.map((item) => (
                  <li key={item} className="leading-relaxed">
                    · {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white border border-[#E2E8E0] rounded-xl p-6 sm:p-8 space-y-5">
            <div>
              <p className="text-xs font-mono text-[#15803D] mb-1">
                Mission 11 · Evidence Review
              </p>
              <h2 className="font-display text-xl font-bold text-[#111814]">
                Top 3 Pilot Validation Assumptions
              </h2>
            </div>

            <div className="divide-y divide-[#E2E8E0]">
              {VENTURE_PLAN.assumptions.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 space-y-1.5">
                  <p className="text-sm font-semibold text-[#111814]">
                    {item.id}. {item.assumption}
                  </p>
                  <p className="text-xs text-[#4B584E]">
                    <strong className="text-[#111814]">Pilot Test:</strong> {item.test}
                  </p>
                  <p className="text-xs font-mono text-[#14532D]">
                    Pass Threshold: {item.evidenceNeeded}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
