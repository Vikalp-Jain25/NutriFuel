import React, { useEffect, useState } from 'react';
import { X, Play, Pause, RotateCcw, Check, Clock } from 'lucide-react';
import { MealKit } from '../data/nutrifuelData';
import { useAuth } from '../context/AuthContext';

interface RecipeDrawerModalProps {
  meal: MealKit | null;
  onClose: () => void;
  onAddToBag: (meal: MealKit) => void;
}

export const RecipeDrawerModal: React.FC<RecipeDrawerModalProps> = ({
  meal,
  onClose,
  onAddToBag,
}) => {
  const { user, logCookingSession } = useAuth();
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [totalElapsedSeconds, setTotalElapsedSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [sessionSaved, setSessionSaved] = useState(false);

  useEffect(() => {
    if (!meal) return;
    setActiveStepIdx(0);
    setRemainingSeconds(meal.steps[0]?.durationSeconds || 180);
    setTotalElapsedSeconds(0);
    setRunning(false);
    setCompletedSteps([]);
    setSessionSaved(false);
  }, [meal]);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setTotalElapsedSeconds((t) => t + 1);
      setRemainingSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [running]);

  if (!meal) return null;

  const currentStep = meal.steps[activeStepIdx];

  const formatMmSs = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const rem = sec % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  const handleSelectStep = (idx: number) => {
    setActiveStepIdx(idx);
    setRemainingSeconds(meal.steps[idx].durationSeconds);
    setRunning(false);
  };

  const handleCompleteStep = async () => {
    if (!completedSteps.includes(activeStepIdx)) {
      const updated = [...completedSteps, activeStepIdx];
      setCompletedSteps(updated);

      if (updated.length === meal.steps.length) {
        setRunning(false);
        if (user && !sessionSaved) {
          await logCookingSession({
            mealId: meal.id,
            mealTitle: meal.title,
            elapsedSeconds: Math.max(60, totalElapsedSeconds),
          });
          setSessionSaved(true);
        }
      }
    }
    if (activeStepIdx < meal.steps.length - 1) {
      const next = activeStepIdx + 1;
      setActiveStepIdx(next);
      setRemainingSeconds(meal.steps[next].durationSeconds);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/45 flex items-center justify-end"
      role="dialog"
      aria-modal="true"
      aria-label={`${meal.title} 15-Minute Recipe Card`}
    >
      <div className="w-full max-w-2xl h-full bg-[#FAFBF9] border-l border-[#E2E8E0] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-[#E2E8E0] px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-mono text-[#15803D]">
              Printed &amp; Interactive 15-Minute Recipe Card
            </p>
            <h2 className="font-display text-xl font-bold text-[#111814]">
              {meal.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close recipe card"
            className="p-2 text-[#4B584E] hover:text-[#111814] hover:bg-[#F2F5F1] rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-8 flex-1">
          {/* Nutrition summary bar */}
          <div className="bg-white border border-[#E2E8E0] rounded-xl p-5 grid grid-cols-5 gap-3 text-center">
            <div>
              <p className="font-mono text-base font-semibold text-[#111814] tabular-nums">
                {meal.calories}
              </p>
              <p className="text-xs text-[#4B584E]">kcal</p>
            </div>
            <div>
              <p className="font-mono text-base font-semibold text-[#14532D] tabular-nums">
                {meal.proteinGrams}g
              </p>
              <p className="text-xs text-[#4B584E]">Protein</p>
            </div>
            <div>
              <p className="font-mono text-base font-semibold text-[#111814] tabular-nums">
                {meal.carbsGrams}g
              </p>
              <p className="text-xs text-[#4B584E]">Carbs</p>
            </div>
            <div>
              <p className="font-mono text-base font-semibold text-[#111814] tabular-nums">
                {meal.fatsGrams}g
              </p>
              <p className="text-xs text-[#4B584E]">Fats</p>
            </div>
            <div>
              <p className="font-mono text-base font-semibold text-[#111814] tabular-nums">
                {meal.prepMinutes}m
              </p>
              <p className="text-xs text-[#4B584E]">Total</p>
            </div>
          </div>

          {/* Pre-Portioned Organic Pouches */}
          <div>
            <h3 className="font-display text-base font-semibold text-[#111814] mb-3">
              Exact-measure pouches inside your box
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {meal.pouches.map((pouch, idx) => (
                <div
                  key={pouch.name}
                  className="bg-white border border-[#E2E8E0] rounded-lg p-3.5"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-mono text-xs text-[#15803D]">
                      Pouch 0{idx + 1}
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#111814] tabular-nums">
                      {pouch.measure}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-[#111814]">
                    {pouch.name}
                  </p>
                  <p className="text-xs text-[#4B584E] mt-0.5">{pouch.prepNote}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Live Step Timer Panel */}
          <div className="bg-white border border-[#CFDACA] rounded-xl p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8E0]">
              <div>
                <p className="text-xs font-mono text-[#15803D]">
                  Step {currentStep.stepNumber} of {meal.steps.length}
                </p>
                <h3 className="font-display text-lg font-bold text-[#111814]">
                  {currentStep.title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-3.5 py-2 bg-[#F2F5F1] border border-[#E2E8E0] rounded-lg flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#14532D]" />
                  <span className="font-mono text-lg font-semibold text-[#111814] tabular-nums">
                    {formatMmSs(remainingSeconds)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setRunning((r) => !r)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium bg-[#14532D] text-white rounded-lg hover:bg-[#166534] cursor-pointer whitespace-nowrap"
                >
                  {running ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      <span>Start Step</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRunning(false);
                    setRemainingSeconds(currentStep.durationSeconds);
                  }}
                  aria-label="Reset step timer"
                  className="p-2 text-[#4B584E] hover:text-[#111814] bg-[#F2F5F1] rounded-lg cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-sm text-[#111814] leading-relaxed my-4">
              {currentStep.instruction}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-xs text-[#4B584E] tabular-nums">
                Total elapsed: {formatMmSs(totalElapsedSeconds)} (target ≤ 15:00)
              </span>
              <button
                type="button"
                onClick={() => void handleCompleteStep()}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-[#EEF5EF] text-[#14532D] border border-[#BBF7D0] rounded-lg hover:bg-[#DCFCE7] cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>
                  {activeStepIdx === meal.steps.length - 1
                    ? 'Mark Meal Complete'
                    : 'Done & Next Step'}
                </span>
              </button>
            </div>

            {sessionSaved && (
              <p className="mt-3 text-xs font-medium text-[#15803D]">
                Cooking session saved to My Kitchen ({formatMmSs(totalElapsedSeconds)}).
              </p>
            )}
          </div>

          {/* All Steps List */}
          <div className="space-y-2.5">
            {meal.steps.map((step, idx) => {
              const isDone = completedSteps.includes(idx);
              const isActive = idx === activeStepIdx;
              return (
                <button
                  key={step.stepNumber}
                  type="button"
                  onClick={() => handleSelectStep(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-colors cursor-pointer flex items-start justify-between gap-4 ${
                    isActive
                      ? 'bg-white border-[#14532D]'
                      : 'bg-white border-[#E2E8E0] hover:bg-[#F2F5F1]'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#4B584E] mb-1">
                      <span className="text-[#14532D] font-semibold">
                        0{step.stepNumber}
                      </span>
                      <span>·</span>
                      <span className="tabular-nums">
                        {Math.round(step.durationSeconds / 60)} min
                      </span>
                      {isDone && (
                        <>
                          <span>·</span>
                          <span className="text-[#15803D] font-semibold">Completed</span>
                        </>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-[#111814]">
                      {step.title}
                    </p>
                    <p className="text-xs text-[#4B584E] mt-1 leading-relaxed">
                      {step.instruction}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sticky Footer Action */}
        <div className="sticky bottom-0 bg-white border-t border-[#E2E8E0] px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-base font-semibold text-[#111814] tabular-nums">
              ₹{meal.priceInr}
            </p>
            <p className="text-xs text-[#4B584E]">Pre-portioned kit + printed recipe card</p>
          </div>
          <button
            type="button"
            onClick={() => {
              onAddToBag(meal);
              onClose();
            }}
            className="px-5 py-2.5 text-sm font-medium bg-[#14532D] text-white rounded-lg hover:bg-[#166534] transition-colors cursor-pointer whitespace-nowrap"
          >
            Add Kit to Bag
          </button>
        </div>
      </div>
    </div>
  );
};
