import React from 'react';
import { ArrowRight } from 'lucide-react';
import { HeroMealKitComposition } from './MealArtwork';
import { useAuth } from '../context/AuthContext';

interface HeroSectionProps {
  onClaimTrial: () => void;
  onExploreMenu: () => void;
  onGoToKitchen: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onClaimTrial,
  onExploreMenu,
  onGoToKitchen,
}) => {
  const { user, authBusy, authError, loginWithGoogle } = useAuth();

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
            <p className="text-base sm:text-lg text-[#4B584E] leading-relaxed max-w-xl mb-7">
              NutriFuel delivers pre-washed, exact-measure organic vegetarian ingredients and step-by-step recipe cards to your doorstep. Skip grocery runs, chopping, and greasy takeout without losing control of your protein goals.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 mb-6">
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

            {/* Front-Page Google Sign-In Bar */}
            <div className="pt-5 border-t border-[#E2E8E0] max-w-xl">
              {user ? (
                <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-[#DCE5DA] rounded-xl px-4 py-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || 'Signed in user'}
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <span className="w-8 h-8 rounded-full bg-[#14532D] text-white text-xs font-semibold flex items-center justify-center shrink-0">
                        {(user.displayName || 'N').charAt(0)}
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#111814] truncate">
                        Signed in as {user.displayName || user.email}
                      </p>
                      <p className="text-[11px] text-[#4B584E] truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onGoToKitchen}
                    className="px-3.5 py-2 text-xs font-semibold text-[#14532D] bg-[#F2F5F1] border border-[#CFDACA] rounded-lg hover:bg-[#E5ECE3] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Open My Kitchen
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => void loginWithGoogle()}
                      disabled={authBusy}
                      className="inline-flex items-center gap-2.5 px-5 py-2.5 text-sm font-semibold text-[#111814] bg-white border border-[#CFDACA] rounded-lg hover:bg-[#F2F5F1] transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-60"
                    >
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fill="#4285F4"
                          d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82Z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24Z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.27 14.29c-.24-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09Z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96Z"
                        />
                      </svg>
                      <span>{authBusy ? 'Signing in with Google...' : 'Sign in with Google'}</span>
                    </button>
                    <span className="text-xs text-[#4B584E]">
                      Save delivery address, track orders &amp; manage weekly kits
                    </span>
                  </div>
                  {authError && (
                    <p role="alert" className="text-xs text-[#991B1B]">
                      {authError}
                    </p>
                  )}
                </div>
              )}
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
