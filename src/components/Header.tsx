import React, { useState } from 'react';
import { Menu, X, ShoppingBag, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export type ActivePage = 'storefront' | 'kitchen' | 'venture';

interface HeaderProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage, sectionId?: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  onNavigate,
  cartCount,
  onOpenCart,
}) => {
  const { user, authBusy, loginWithGoogle, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: ActivePage, sectionId?: string) => {
    setMobileMenuOpen(false);
    onNavigate(page, sectionId);
  };

  const firstName = user?.displayName?.split(' ')[0] || 'Account';

  return (
    <header className="sticky top-0 z-40 bg-[#FAFBF9]/95 backdrop-blur-sm border-b border-[#E2E8E0]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick('storefront', 'top')}
          className="font-display text-xl font-bold tracking-tight text-[#111814] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14532D]"
        >
          NutriFuel
        </button>

        {/* Zone 2: 5 concise single-line text links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-[#4B584E]"
        >
          <button
            type="button"
            onClick={() => handleNavClick('storefront', 'menu')}
            className={`hover:text-[#111814] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activePage === 'storefront' ? 'text-[#111814]' : ''
            }`}
          >
            Menu
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('storefront', 'trial-box')}
            className="hover:text-[#111814] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Trial Box
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('storefront', 'subscriptions')}
            className="hover:text-[#111814] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Subscriptions
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('kitchen')}
            className={`hover:text-[#111814] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activePage === 'kitchen' ? 'text-[#14532D] underline underline-offset-4' : ''
            }`}
          >
            My Kitchen
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('venture')}
            className={`hover:text-[#111814] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activePage === 'venture' ? 'text-[#14532D] underline underline-offset-4' : ''
            }`}
          >
            Venture Plan
          </button>
        </nav>

        {/* Zone 3: Bag + Primary Google Auth Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Open shopping bag with ${cartCount} items`}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-[#111814] hover:bg-[#EEF2EC] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#14532D]" />
            <span className="tabular-nums">Bag ({cartCount})</span>
          </button>

          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleNavClick('kitchen')}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-[#111814] bg-white border border-[#DCE5DA] rounded-lg hover:bg-[#F2F5F1] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={firstName}
                    referrerPolicy="no-referrer"
                    className="w-5 h-5 rounded-full object-cover"
                  />
                ) : (
                  <span className="w-5 h-5 rounded-full bg-[#14532D] text-white text-xs flex items-center justify-center">
                    {firstName.charAt(0)}
                  </span>
                )}
                <span className="max-w-[110px] truncate">{firstName}</span>
              </button>
              <button
                type="button"
                onClick={() => void logout()}
                disabled={authBusy}
                aria-label="Sign out"
                title="Sign out"
                className="p-2 text-[#4B584E] hover:text-[#111814] hover:bg-[#EEF2EC] rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => void loginWithGoogle()}
              disabled={authBusy}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#14532D] text-white rounded-lg hover:bg-[#166534] transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-60"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81Z"
                />
              </svg>
              <span>{authBusy ? 'Signing in...' : 'Sign in with Google'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 text-[#111814] hover:bg-[#EEF2EC] rounded-lg cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E2E8E0] bg-white px-4 py-4 space-y-2">
          <button
            type="button"
            onClick={() => handleNavClick('storefront', 'menu')}
            className="block w-full text-left px-3 py-2.5 text-sm font-medium text-[#111814] rounded-lg hover:bg-[#F2F5F1]"
          >
            Menu
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('storefront', 'trial-box')}
            className="block w-full text-left px-3 py-2.5 text-sm font-medium text-[#111814] rounded-lg hover:bg-[#F2F5F1]"
          >
            Trial Box
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('storefront', 'subscriptions')}
            className="block w-full text-left px-3 py-2.5 text-sm font-medium text-[#111814] rounded-lg hover:bg-[#F2F5F1]"
          >
            Subscriptions
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('kitchen')}
            className="block w-full text-left px-3 py-2.5 text-sm font-medium text-[#111814] rounded-lg hover:bg-[#F2F5F1]"
          >
            My Kitchen
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('venture')}
            className="block w-full text-left px-3 py-2.5 text-sm font-medium text-[#111814] rounded-lg hover:bg-[#F2F5F1]"
          >
            Venture Plan
          </button>
          <div className="pt-2 border-t border-[#E2E8E0]">
            {user ? (
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm font-medium text-[#111814] truncate">
                  {user.displayName || user.email}
                </span>
                <button
                  type="button"
                  onClick={() => void logout()}
                  className="text-sm font-medium text-[#14532D] hover:underline"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => void loginWithGoogle()}
                disabled={authBusy}
                className="w-full px-4 py-2.5 text-sm font-medium bg-[#14532D] text-white rounded-lg hover:bg-[#166534]"
              >
                Sign in with Google
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
