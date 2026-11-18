import React, { useEffect, useState } from 'react';
import { Trash2, PauseCircle, PlayCircle, XCircle, Clock } from 'lucide-react';
import {
  CityHub,
  DietaryGoal,
  HUB_DETAILS,
  MEAL_KITS,
} from '../data/nutrifuelData';
import { useAuth } from '../context/AuthContext';

export const MyKitchenSection: React.FC = () => {
  const {
    user,
    authReady,
    authBusy,
    loginWithGoogle,
    profile,
    subscriptions,
    orders,
    feedbackList,
    cookingLogs,
    updateProfile,
    updateSubscriptionStatus,
    cancelOrder,
    submitFeedback,
    deleteFeedback,
  } = useAuth();

  // Profile form state
  const [displayName, setDisplayName] = useState('');
  const [cityHub, setCityHub] = useState<CityHub>('Dehradun');
  const [postalCode, setPostalCode] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [dietaryGoal, setDietaryGoal] = useState<DietaryGoal>('Lean Muscle');
  const [profileSaved, setProfileSaved] = useState(false);
  const [profileErr, setProfileErr] = useState<string | null>(null);

  // Week 3 Pilot Feedback form state
  const [fbMealId, setFbMealId] = useState(MEAL_KITS[0].id);
  const [prepMinutes, setPrepMinutes] = useState(13);
  const [tasteRating, setTasteRating] = useState(5);
  const [freshnessRating, setFreshnessRating] = useState(5);
  const [npsScore, setNpsScore] = useState(9);
  const [fbComment, setFbComment] = useState('');
  const [fbSaved, setFbSaved] = useState(false);
  const [fbBusy, setFbBusy] = useState(false);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || '');
      setCityHub(profile.cityHub || 'Dehradun');
      setPostalCode(profile.postalCode || '');
      setDeliveryAddress(profile.deliveryAddress || '');
      setPhone(profile.phone || '');
      setDietaryGoal(profile.dietaryGoal || 'Lean Muscle');
    }
  }, [profile]);

  if (!authReady) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-20 text-center">
        <p className="text-sm text-[#4B584E]">Loading your NutriFuel Kitchen...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <section className="py-20">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <div className="bg-white border border-[#E2E8E0] rounded-xl p-8 sm:p-10 text-center space-y-5">
            <p className="text-xs font-mono text-[#15803D]">
              Google Account Required
            </p>
            <h1 className="font-display text-3xl font-bold text-[#111814] [text-wrap:balance]">
              Sign in to manage your subscriptions, orders, and 15-minute logs
            </h1>
            <p className="text-sm text-[#4B584E] leading-relaxed">
              Use your Google account to save your Dehradun, Gurgaon, Noida, or Bangalore delivery details, pause or modify weekly meal boxes, and submit Week 3 pilot feedback.
            </p>
            <button
              type="button"
              onClick={() => void loginWithGoogle()}
              disabled={authBusy}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3 text-sm font-semibold bg-[#14532D] text-white rounded-lg hover:bg-[#166534] transition-colors cursor-pointer disabled:opacity-60"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81Z"
                />
              </svg>
              <span>{authBusy ? 'Signing in...' : 'Continue with Google'}</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileErr(null);
    setProfileSaved(false);
    if (postalCode.trim() && !/^[1-9][0-9]{5}$/.test(postalCode.trim())) {
      setProfileErr('Postal PIN code must be 6 digits (e.g. 248001).');
      return;
    }
    if (phone.trim() && !/^[0-9+\-\s]{10,15}$/.test(phone.trim())) {
      setProfileErr('Phone number must be 10–15 digits.');
      return;
    }
    try {
      await updateProfile({
        displayName,
        cityHub,
        postalCode,
        deliveryAddress,
        phone,
        dietaryGoal,
      });
      setProfileSaved(true);
    } catch (err) {
      setProfileErr(err instanceof Error ? err.message : 'Failed to save profile.');
    }
  };

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    setFbBusy(true);
    setFbSaved(false);
    const meal = MEAL_KITS.find((m) => m.id === fbMealId) || MEAL_KITS[0];
    try {
      await submitFeedback({
        mealId: meal.id,
        mealTitle: meal.title,
        prepMinutes,
        tasteRating,
        freshnessRating,
        npsScore,
        cityHub,
        comment: fbComment,
      });
      setFbComment('');
      setFbSaved(true);
    } finally {
      setFbBusy(false);
    }
  };

  const getMealTitle = (id: string) =>
    MEAL_KITS.find((m) => m.id === id)?.title || id;

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10">
        {/* Account Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E2E8E0]">
          <div>
            <p className="text-xs font-mono text-[#15803D] mb-1">
              Authenticated Customer Kitchen
            </p>
            <h1 className="font-display text-3xl font-bold text-[#111814]">
              Welcome back, {profile?.displayName || user.displayName}
            </h1>
            <p className="text-sm text-[#4B584E] mt-1">{user.email}</p>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div>
              <p className="font-mono text-lg font-semibold text-[#111814] tabular-nums">
                {subscriptions.filter((s) => s.status === 'active').length}
              </p>
              <p className="text-xs text-[#4B584E]">Active Plans</p>
            </div>
            <div>
              <p className="font-mono text-lg font-semibold text-[#111814] tabular-nums">
                {orders.length}
              </p>
              <p className="text-xs text-[#4B584E]">Orders</p>
            </div>
            <div>
              <p className="font-mono text-lg font-semibold text-[#14532D] tabular-nums">
                {cookingLogs.length}
              </p>
              <p className="text-xs text-[#4B584E]">15-Min Logs</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Subscriptions & Orders */}
          <div className="lg:col-span-7 space-y-8">
            {/* Subscriptions */}
            <div className="bg-white border border-[#E2E8E0] rounded-xl p-6">
              <h2 className="font-display text-xl font-bold text-[#111814] mb-4">
                Your Subscriptions
              </h2>

              {subscriptions.length === 0 ? (
                <p className="text-sm text-[#4B584E]">
                  No weekly subscriptions yet. Build a 3-meal or 5-meal weekly plan on the storefront to automate your deliveries.
                </p>
              ) : (
                <div className="space-y-4">
                  {subscriptions.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-4 border border-[#E2E8E0] rounded-xl space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-[#111814]">
                            {sub.mealsPerWeek} Meals / Week · {sub.cityHub}
                          </p>
                          <p className="font-mono text-xs text-[#4B584E] tabular-nums">
                            ₹{sub.weeklyTotal}/wk (₹{sub.pricePerKit}/kit) · {sub.deliverySlot}
                          </p>
                        </div>
                        <span
                          className={`text-xs font-mono font-semibold uppercase ${
                            sub.status === 'active'
                              ? 'text-[#15803D]'
                              : sub.status === 'paused'
                              ? 'text-[#B45309]'
                              : 'text-[#6B7280]'
                          }`}
                        >
                          Status: {sub.status}
                        </span>
                      </div>

                      <p className="text-xs text-[#4B584E]">
                        <strong className="text-[#111814]">Weekly rotation:</strong>{' '}
                        {sub.selectedMealIds.map(getMealTitle).join(' · ')}
                      </p>

                      {sub.status !== 'cancelled' && (
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          {sub.status === 'active' ? (
                            <button
                              type="button"
                              onClick={() => void updateSubscriptionStatus(sub.id, 'paused')}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#F2F5F1] text-[#111814] rounded-lg hover:bg-[#E5ECE3] cursor-pointer"
                            >
                              <PauseCircle className="w-3.5 h-3.5" />
                              <span>Pause Week</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => void updateSubscriptionStatus(sub.id, 'active')}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#ECFDF5] text-[#14532D] rounded-lg hover:bg-[#D1FAE5] cursor-pointer"
                            >
                              <PlayCircle className="w-3.5 h-3.5" />
                              <span>Resume</span>
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => void updateSubscriptionStatus(sub.id, 'cancelled')}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#991B1B] hover:bg-[#FEF2F2] rounded-lg cursor-pointer"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Cancel Plan</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Orders */}
            <div className="bg-white border border-[#E2E8E0] rounded-xl p-6">
              <h2 className="font-display text-xl font-bold text-[#111814] mb-4">
                Trial Boxes &amp; A La Carte Orders
              </h2>
              {orders.length === 0 ? (
                <p className="text-sm text-[#4B584E]">
                  No orders yet. Claim your 50%-off 3-meal trial box for ₹330 from the home page.
                </p>
              ) : (
                <div className="divide-y divide-[#E2E8E0]">
                  {orders.map((order) => (
                    <div key={order.id} className="py-4 first:pt-0 last:pb-0 space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-[#111814]">
                          {order.orderType === 'trial-box'
                            ? '3-Meal Trial Box (50% Off)'
                            : `A La Carte Order (${order.itemCount} kits)`}
                        </p>
                        <span className="font-mono text-sm font-semibold text-[#111814] tabular-nums">
                          ₹{order.totalAmount}
                        </span>
                      </div>
                      <p className="text-xs text-[#4B584E]">
                        {order.mealIds.map(getMealTitle).join(' · ')}
                      </p>
                      <div className="flex items-center justify-between gap-2 text-xs text-[#4B584E]">
                        <span>
                          {order.cityHub} ({order.postalCode}) · Status:{' '}
                          <strong className="text-[#14532D]">{order.status}</strong>
                        </span>
                        {order.status === 'confirmed' && (
                          <button
                            type="button"
                            onClick={() => void cancelOrder(order.id)}
                            className="text-xs text-[#991B1B] hover:underline cursor-pointer"
                          >
                            Cancel Order
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 15-Minute Cooking Timer Logs */}
            <div className="bg-white border border-[#E2E8E0] rounded-xl p-6">
              <h2 className="font-display text-xl font-bold text-[#111814] mb-4">
                Completed 15-Minute Cooking Logs
              </h2>
              {cookingLogs.length === 0 ? (
                <p className="text-sm text-[#4B584E]">
                  Open any meal kit&apos;s 15-Min Card and mark steps complete to verify your actual weeknight prep speed.
                </p>
              ) : (
                <div className="divide-y divide-[#E2E8E0]">
                  {cookingLogs.map((log) => (
                    <div
                      key={log.id}
                      className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3"
                    >
                      <span className="text-sm font-medium text-[#111814]">
                        {log.mealTitle}
                      </span>
                      <span className="font-mono text-xs text-[#14532D] inline-flex items-center gap-1 tabular-nums">
                        <Clock className="w-3.5 h-3.5" />
                        {Math.floor(log.elapsedSeconds / 60)}m {log.elapsedSeconds % 60}s
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Profile & Pilot Feedback */}
          <div className="lg:col-span-5 space-y-8">
            {/* Delivery Profile */}
            <form
              onSubmit={handleSaveProfile}
              className="bg-white border border-[#E2E8E0] rounded-xl p-6 space-y-4"
            >
              <h2 className="font-display text-xl font-bold text-[#111814]">
                Delivery &amp; Macro Profile
              </h2>

              <div>
                <label className="block text-xs font-medium text-[#111814] mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  maxLength={100}
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-sm bg-[#FAFBF9] border border-[#CFDACA] rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#111814] mb-1">
                    City Hub
                  </label>
                  <select
                    value={cityHub}
                    onChange={(e) => setCityHub(e.target.value as CityHub)}
                    className="w-full px-3 py-2 text-sm bg-[#FAFBF9] border border-[#CFDACA] rounded-lg"
                  >
                    {HUB_DETAILS.map((h) => (
                      <option key={h.city} value={h.city}>
                        {h.city}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#111814] mb-1">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="248001"
                    className="w-full px-3 py-2 text-sm font-mono bg-[#FAFBF9] border border-[#CFDACA] rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#111814] mb-1">
                  Dietary Goal
                </label>
                <select
                  value={dietaryGoal}
                  onChange={(e) => setDietaryGoal(e.target.value as DietaryGoal)}
                  className="w-full px-3 py-2 text-sm bg-[#FAFBF9] border border-[#CFDACA] rounded-lg"
                >
                  <option value="Lean Muscle">Lean Muscle (40g+ Protein)</option>
                  <option value="Balanced Maintenance">Balanced Maintenance</option>
                  <option value="Calorie Deficit">Calorie Deficit (&lt;500 kcal)</option>
                  <option value="Student Fuel">Student Fuel (Budget &amp; Quick)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#111814] mb-1">
                  Mobile Number
                </label>
                <input
                  type="text"
                  maxLength={15}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 9876543210"
                  className="w-full px-3 py-2 text-sm font-mono bg-[#FAFBF9] border border-[#CFDACA] rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#111814] mb-1">
                  Default Delivery Address
                </label>
                <textarea
                  rows={2}
                  maxLength={240}
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Apartment, Campus Hostel, or Tech Park"
                  className="w-full px-3 py-2 text-sm bg-[#FAFBF9] border border-[#CFDACA] rounded-lg"
                />
              </div>

              {profileErr && (
                <p className="text-xs text-[#991B1B]">{profileErr}</p>
              )}
              {profileSaved && (
                <p className="text-xs font-medium text-[#15803D]">
                  Profile saved to your account.
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 text-sm font-semibold bg-[#14532D] text-white rounded-lg hover:bg-[#166534] cursor-pointer"
              >
                Save Delivery Profile
              </button>
            </form>

            {/* Week 3 Pilot Feedback Submission */}
            <form
              onSubmit={handleSubmitFeedback}
              className="bg-white border border-[#E2E8E0] rounded-xl p-6 space-y-4"
            >
              <div>
                <p className="text-xs font-mono text-[#15803D]">
                  Mission 9 Week 3 · Pilot Evidence
                </p>
                <h2 className="font-display text-xl font-bold text-[#111814]">
                  Log 15-Minute Prep Feedback
                </h2>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#111814] mb-1">
                  Meal Kit Cooked
                </label>
                <select
                  value={fbMealId}
                  onChange={(e) => setFbMealId(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-[#FAFBF9] border border-[#CFDACA] rounded-lg"
                >
                  {MEAL_KITS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#111814] mb-1">
                    Prep Time (Minutes)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={prepMinutes}
                    onChange={(e) => setPrepMinutes(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-mono bg-[#FAFBF9] border border-[#CFDACA] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#111814] mb-1">
                    NPS Score (0–10)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={npsScore}
                    onChange={(e) => setNpsScore(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-mono bg-[#FAFBF9] border border-[#CFDACA] rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#111814] mb-1">
                    Taste Rating (1–5)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={tasteRating}
                    onChange={(e) => setTasteRating(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-mono bg-[#FAFBF9] border border-[#CFDACA] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#111814] mb-1">
                    Freshness Rating (1–5)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={freshnessRating}
                    onChange={(e) => setFreshnessRating(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-mono bg-[#FAFBF9] border border-[#CFDACA] rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#111814] mb-1">
                  Recipe Clarity &amp; Portion Notes
                </label>
                <textarea
                  rows={2}
                  maxLength={500}
                  value={fbComment}
                  onChange={(e) => setFbComment(e.target.value)}
                  placeholder="Was 15 minutes realistic after work? How were the portion sizes?"
                  className="w-full px-3 py-2 text-sm bg-[#FAFBF9] border border-[#CFDACA] rounded-lg"
                />
              </div>

              {fbSaved && (
                <p className="text-xs font-medium text-[#15803D]">
                  Feedback logged for Week 3 pilot tracking.
                </p>
              )}

              <button
                type="submit"
                disabled={fbBusy}
                className="w-full py-2.5 text-sm font-semibold bg-[#F2F5F1] text-[#14532D] border border-[#CFDACA] rounded-lg hover:bg-[#E5ECE3] cursor-pointer"
              >
                {fbBusy ? 'Submitting...' : 'Submit Pilot Feedback'}
              </button>

              {feedbackList.length > 0 && (
                <div className="pt-4 border-t border-[#E2E8E0] space-y-2">
                  <p className="text-xs font-semibold text-[#111814]">
                    Your Submitted Logs ({feedbackList.length})
                  </p>
                  {feedbackList.map((item) => (
                    <div
                      key={item.id}
                      className="text-xs text-[#4B584E] flex items-center justify-between gap-2 py-1"
                    >
                      <span className="truncate">
                        {item.mealTitle} · {item.prepMinutes}m · Taste {item.tasteRating}/5
                      </span>
                      <button
                        type="button"
                        onClick={() => void deleteFeedback(item.id)}
                        aria-label="Delete feedback"
                        className="p-1 text-[#4B584E] hover:text-[#991B1B] cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
