import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { CityHub, HUB_DETAILS, MEAL_KITS } from '../data/nutrifuelData';
import { useAuth } from '../context/AuthContext';

interface TrialAndSubscriptionSectionProps {
  selectedHub: CityHub;
  onSelectHub: (hub: CityHub) => void;
  initialMode?: 'trial' | 'subscription';
  onGoToKitchen: () => void;
}

type PlanOption = '3-meals-weekly' | '5-meals-weekly' | '4-week-auto';

export const TrialAndSubscriptionSection: React.FC<TrialAndSubscriptionSectionProps> = ({
  selectedHub,
  onSelectHub,
  initialMode = 'trial',
  onGoToKitchen,
}) => {
  const { user, profile, loginWithGoogle, placeOrder, createSubscription } = useAuth();

  const [mode, setMode] = useState<'trial' | 'subscription'>(initialMode);
  const [trialMealIds, setTrialMealIds] = useState<string[]>([
    MEAL_KITS[0].id,
    MEAL_KITS[1].id,
    MEAL_KITS[2].id,
  ]);

  const [planType, setPlanType] = useState<PlanOption>('3-meals-weekly');
  const [subMealIds, setSubMealIds] = useState<string[]>([
    MEAL_KITS[0].id,
    MEAL_KITS[1].id,
    MEAL_KITS[3].id,
  ]);
  const [deliverySlot, setDeliverySlot] = useState<'Evening 5-7 PM' | 'Morning 7-9 AM'>(
    'Evening 5-7 PM'
  );

  const [postalCode, setPostalCode] = useState('248001');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    if (profile) {
      if (profile.postalCode) setPostalCode(profile.postalCode);
      if (profile.deliveryAddress) setDeliveryAddress(profile.deliveryAddress);
    } else {
      const hubInfo = HUB_DETAILS.find((h) => h.city === selectedHub);
      if (hubInfo) setPostalCode(hubInfo.samplePins[0]);
    }
  }, [profile, selectedHub]);

  const requiredSubCount = planType === '5-meals-weekly' ? 5 : 3;
  const pricePerKit: 220 | 187 = planType === '4-week-auto' ? 187 : 220;
  const weeklyTotal = requiredSubCount * pricePerKit;

  const toggleMealSelection = (
    id: string,
    current: string[],
    setter: (next: string[]) => void,
    maxCount: number
  ) => {
    setErrorMsg(null);
    if (current.includes(id)) {
      if (current.length <= 1) return;
      setter(current.filter((m) => m !== id));
    } else if (current.length < maxCount) {
      setter([...current, id]);
    } else {
      setter([...current.slice(1), id]);
    }
  };

  const handlePlanChange = (nextPlan: PlanOption) => {
    setPlanType(nextPlan);
    const targetCount = nextPlan === '5-meals-weekly' ? 5 : 3;
    if (subMealIds.length > targetCount) {
      setSubMealIds(subMealIds.slice(0, targetCount));
    } else if (subMealIds.length < targetCount) {
      const missing = MEAL_KITS.map((m) => m.id).filter((id) => !subMealIds.includes(id));
      setSubMealIds([...subMealIds, ...missing.slice(0, targetCount - subMealIds.length)]);
    }
  };

  const validateDeliveryFields = () => {
    const cleanPin = postalCode.trim();
    const cleanAddress = deliveryAddress.trim();
    if (!/^[1-9][0-9]{5}$/.test(cleanPin)) {
      return 'Enter a valid 6-digit Indian PIN code (e.g. 248001, 122002).';
    }
    if (cleanAddress.length < 5 || cleanAddress.length > 240) {
      return 'Enter a delivery address (5–240 characters, e.g. apartment or tech park block).';
    }
    return null;
  };

  const handleSubmitTrial = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (trialMealIds.length !== 3) {
      setErrorMsg('Select exactly 3 meal kits for your 50%-off trial box.');
      return;
    }
    const validationError = validateDeliveryFields();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setSubmitting(true);
    try {
      let activeUser = user;
      if (!activeUser) {
        activeUser = await loginWithGoogle();
        if (!activeUser) {
          setErrorMsg('Please complete Google Sign-In to confirm your trial order.');
          return;
        }
      }

      const orderId = await placeOrder({
        orderType: 'trial-box',
        mealIds: trialMealIds,
        addonIds: [],
        itemCount: 3,
        subtotal: 660,
        discountAmount: 330,
        totalAmount: 330,
        cityHub: selectedHub,
        postalCode: postalCode.trim(),
        deliveryAddress: deliveryAddress.trim(),
      });

      setSuccessMsg(
        `Trial Box #${orderId.slice(0, 6).toUpperCase()} confirmed for ₹330 in ${selectedHub}. Track it in My Kitchen.`
      );
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Unable to place trial order.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (subMealIds.length !== requiredSubCount) {
      setErrorMsg(`Please select ${requiredSubCount} meal kits for your weekly rotation.`);
      return;
    }
    const validationError = validateDeliveryFields();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setSubmitting(true);
    try {
      let activeUser = user;
      if (!activeUser) {
        activeUser = await loginWithGoogle();
        if (!activeUser) {
          setErrorMsg('Please complete Google Sign-In to activate your subscription.');
          return;
        }
      }

      const subId = await createSubscription({
        planType,
        mealsPerWeek: requiredSubCount as 3 | 5,
        pricePerKit,
        weeklyTotal,
        cityHub: selectedHub,
        postalCode: postalCode.trim(),
        deliveryAddress: deliveryAddress.trim(),
        deliverySlot,
        selectedMealIds: subMealIds,
      });

      setSuccessMsg(
        `Subscription #${subId.slice(0, 6).toUpperCase()} activated (${requiredSubCount} kits/week at ₹${pricePerKit}/kit).`
      );
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Unable to activate subscription.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="trial-box" className="py-16 sm:py-20 bg-[#F2F5F1] border-b border-[#E2E8E0]">
      <div id="subscriptions" className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-mono text-[#15803D] mb-2">
              Trial &amp; Recurring Plans
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#111814] [text-wrap:balance]">
              Start with 50% off a 3-meal trial box or build a weekly plan
            </h2>
          </div>

          <div className="flex items-center gap-1 p-1 bg-white border border-[#DCE5DA] rounded-lg w-fit">
            <button
              type="button"
              onClick={() => {
                setMode('trial');
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                mode === 'trial'
                  ? 'bg-[#14532D] text-white'
                  : 'text-[#4B584E] hover:text-[#111814]'
              }`}
            >
              3-Meal Trial Box (₹330)
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('subscription');
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                mode === 'subscription'
                  ? 'bg-[#14532D] text-white'
                  : 'text-[#4B584E] hover:text-[#111814]'
              }`}
            >
              Weekly Subscriptions
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Meal Selector */}
          <div className="lg:col-span-7 bg-white border border-[#E2E8E0] rounded-xl p-6 sm:p-8">
            {mode === 'subscription' && (
              <div className="mb-8">
                <h3 className="font-display text-base font-semibold text-[#111814] mb-3">
                  1. Choose your subscription cadence
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => handlePlanChange('3-meals-weekly')}
                    className={`text-left p-4 rounded-xl border transition-colors cursor-pointer ${
                      planType === '3-meals-weekly'
                        ? 'border-[#14532D] bg-[#F5F9F5]'
                        : 'border-[#E2E8E0] hover:bg-[#FAFBF9]'
                    }`}
                  >
                    <p className="text-sm font-semibold text-[#111814]">3 Meals / Week</p>
                    <p className="font-mono text-base font-bold text-[#14532D] mt-1 tabular-nums">
                      ₹660 / wk
                    </p>
                    <p className="text-xs text-[#4B584E] mt-1">₹220 per kit · 12/mo base</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePlanChange('5-meals-weekly')}
                    className={`text-left p-4 rounded-xl border transition-colors cursor-pointer ${
                      planType === '5-meals-weekly'
                        ? 'border-[#14532D] bg-[#F5F9F5]'
                        : 'border-[#E2E8E0] hover:bg-[#FAFBF9]'
                    }`}
                  >
                    <p className="text-sm font-semibold text-[#111814]">5 Meals / Week</p>
                    <p className="font-mono text-base font-bold text-[#14532D] mt-1 tabular-nums">
                      ₹1,100 / wk
                    </p>
                    <p className="text-xs text-[#4B584E] mt-1">Weekday full coverage</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePlanChange('4-week-auto')}
                    className={`text-left p-4 rounded-xl border transition-colors cursor-pointer ${
                      planType === '4-week-auto'
                        ? 'border-[#14532D] bg-[#F5F9F5]'
                        : 'border-[#E2E8E0] hover:bg-[#FAFBF9]'
                    }`}
                  >
                    <p className="text-sm font-semibold text-[#111814]">4-Week Auto (15% Off)</p>
                    <p className="font-mono text-base font-bold text-[#14532D] mt-1 tabular-nums">
                      ₹561 / wk
                    </p>
                    <p className="text-xs text-[#4B584E] mt-1">₹187/kit · 3 meals/wk</p>
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="font-display text-base font-semibold text-[#111814]">
                {mode === 'trial'
                  ? 'Select 3 vegetarian kits for your trial box'
                  : `2. Pick ${requiredSubCount} kits for your weekly box`}
              </h3>
              <span className="font-mono text-xs text-[#14532D] font-semibold tabular-nums">
                {mode === 'trial'
                  ? `${trialMealIds.length} / 3 selected`
                  : `${subMealIds.length} / ${requiredSubCount} selected`}
              </span>
            </div>

            <div className="divide-y divide-[#E2E8E0] border border-[#E2E8E0] rounded-xl overflow-hidden">
              {MEAL_KITS.map((meal) => {
                const activeList = mode === 'trial' ? trialMealIds : subMealIds;
                const isSelected = activeList.includes(meal.id);
                const maxAllowed = mode === 'trial' ? 3 : requiredSubCount;

                return (
                  <button
                    key={meal.id}
                    type="button"
                    onClick={() =>
                      toggleMealSelection(
                        meal.id,
                        activeList,
                        mode === 'trial' ? setTrialMealIds : setSubMealIds,
                        maxAllowed
                      )
                    }
                    className={`w-full text-left p-4 flex items-center justify-between gap-4 transition-colors cursor-pointer ${
                      isSelected ? 'bg-[#F3F8F4]' : 'bg-white hover:bg-[#FAFBF9]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#4B584E] mb-0.5">
                        <span className="font-mono text-[#14532D] font-semibold tabular-nums">
                          {meal.proteinGrams}g Protein
                        </span>
                        <span>·</span>
                        <span className="font-mono tabular-nums">{meal.prepMinutes} min</span>
                        <span>·</span>
                        <span className="font-mono tabular-nums">{meal.calories} kcal</span>
                      </div>
                      <p className="text-sm font-semibold text-[#111814]">{meal.title}</p>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#14532D] border-[#14532D] text-white'
                          : 'border-[#CFDACA] bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Delivery & Checkout Form */}
          <form
            onSubmit={mode === 'trial' ? handleSubmitTrial : handleSubmitSubscription}
            className="lg:col-span-5 bg-white border border-[#E2E8E0] rounded-xl p-6 sm:p-8 space-y-5"
          >
            <div>
              <p className="text-xs font-mono text-[#15803D] mb-1">
                {mode === 'trial' ? 'Introductory Offer · 50% Off' : 'Automated Weekly Fulfillment'}
              </p>
              <h3 className="font-display text-2xl font-bold text-[#111814]">
                {mode === 'trial' ? '3-Meal Trial Box Summary' : 'Subscription Summary'}
              </h3>
            </div>

            {mode === 'trial' ? (
              <div className="py-4 border-y border-[#E2E8E0] space-y-2 text-sm">
                <div className="flex justify-between text-[#4B584E]">
                  <span>3 Pre-Portioned Organic Kits (₹220 each)</span>
                  <span className="font-mono tabular-nums">₹660</span>
                </div>
                <div className="flex justify-between text-[#15803D] font-medium">
                  <span>First-Box 50% Trial Discount</span>
                  <span className="font-mono tabular-nums">-₹330</span>
                </div>
                <div className="flex justify-between text-[#111814] font-bold text-base pt-2 border-t border-[#E2E8E0]">
                  <span>Total Payable</span>
                  <span className="font-mono tabular-nums">₹330</span>
                </div>
              </div>
            ) : (
              <div className="py-4 border-y border-[#E2E8E0] space-y-2 text-sm">
                <div className="flex justify-between text-[#4B584E]">
                  <span>{requiredSubCount} Weekly Meal Kits</span>
                  <span className="font-mono tabular-nums">₹{pricePerKit} / kit</span>
                </div>
                <div className="flex justify-between text-[#4B584E]">
                  <span>24-Hr Farm-to-Hub Cold Delivery</span>
                  <span className="font-mono text-[#15803D]">Included</span>
                </div>
                <div className="flex justify-between text-[#111814] font-bold text-base pt-2 border-t border-[#E2E8E0]">
                  <span>Weekly Subscription Total</span>
                  <span className="font-mono tabular-nums">₹{weeklyTotal}</span>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="builder-hub"
                  className="block text-xs font-medium text-[#111814] mb-1.5"
                >
                  Delivery City Hub
                </label>
                <select
                  id="builder-hub"
                  value={selectedHub}
                  onChange={(e) => onSelectHub(e.target.value as CityHub)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAFBF9] border border-[#CFDACA] rounded-lg text-[#111814] focus:outline-2 focus:outline-[#14532D]"
                >
                  {HUB_DETAILS.map((h) => (
                    <option key={h.city} value={h.city}>
                      {h.city} ({h.corridors.split('·')[0].trim()})
                    </option>
                  ))}
                </select>
              </div>

              {mode === 'subscription' && (
                <div>
                  <label
                    htmlFor="builder-slot"
                    className="block text-xs font-medium text-[#111814] mb-1.5"
                  >
                    Preferred Delivery Window
                  </label>
                  <select
                    id="builder-slot"
                    value={deliverySlot}
                    onChange={(e) =>
                      setDeliverySlot(
                        e.target.value as 'Evening 5-7 PM' | 'Morning 7-9 AM'
                      )
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAFBF9] border border-[#CFDACA] rounded-lg text-[#111814] focus:outline-2 focus:outline-[#14532D]"
                  >
                    <option value="Evening 5-7 PM">Evening 5–7 PM (Post-Work Window)</option>
                    <option value="Morning 7-9 AM">Morning 7–9 AM (Pre-Office Window)</option>
                  </select>
                </div>
              )}

              <div>
                <label
                  htmlFor="builder-pin"
                  className="block text-xs font-medium text-[#111814] mb-1.5"
                >
                  6-Digit Postal PIN Code
                </label>
                <input
                  id="builder-pin"
                  type="text"
                  maxLength={6}
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="e.g. 248001"
                  required
                  className="w-full px-3.5 py-2.5 text-sm font-mono bg-[#FAFBF9] border border-[#CFDACA] rounded-lg text-[#111814] focus:outline-2 focus:outline-[#14532D]"
                />
              </div>

              <div>
                <label
                  htmlFor="builder-address"
                  className="block text-xs font-medium text-[#111814] mb-1.5"
                >
                  Apartment, Hostel, or Tech Park Address
                </label>
                <textarea
                  id="builder-address"
                  rows={2}
                  maxLength={240}
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Tower B, Flat 402, IT Park Corridor..."
                  required
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAFBF9] border border-[#CFDACA] rounded-lg text-[#111814] focus:outline-2 focus:outline-[#14532D]"
                />
              </div>
            </div>

            {errorMsg && (
              <div
                role="alert"
                className="p-3 rounded-lg bg-[#FEF2F2] border border-[#FECACA] text-xs text-[#991B1B]"
              >
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div className="p-3.5 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] text-xs text-[#065F46] space-y-2">
                <p className="font-medium">{successMsg}</p>
                <button
                  type="button"
                  onClick={onGoToKitchen}
                  className="text-xs font-semibold underline cursor-pointer"
                >
                  Open My Kitchen Dashboard
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 px-5 text-sm font-semibold bg-[#14532D] text-white rounded-lg hover:bg-[#166534] transition-colors cursor-pointer disabled:opacity-60 inline-flex items-center justify-center gap-2"
            >
              <span>
                {submitting
                  ? 'Saving to your account...'
                  : mode === 'trial'
                  ? user
                    ? 'Order 3-Meal Trial Box (₹330)'
                    : 'Sign in with Google & Claim Trial Box'
                  : user
                  ? `Activate Subscription (₹${weeklyTotal}/wk)`
                  : 'Sign in with Google & Start Plan'}
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
