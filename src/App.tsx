import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header, ActivePage } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MenuCatalogSection } from './components/MenuCatalogSection';
import { TrialAndSubscriptionSection } from './components/TrialAndSubscriptionSection';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { MyKitchenSection } from './components/MyKitchenSection';
import { VenturePlanView } from './components/VenturePlanView';
import { RecipeDrawerModal } from './components/RecipeDrawerModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { CityHub, MealKit } from './data/nutrifuelData';

function NutriFuelAppShell() {
  const [activePage, setActivePage] = useState<ActivePage>('storefront');
  const [builderMode, setBuilderMode] = useState<'trial' | 'subscription'>('trial');
  const [selectedHub, setSelectedHub] = useState<CityHub>('Dehradun');
  const [inspectedMeal, setInspectedMeal] = useState<MealKit | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleNavigate = (page: ActivePage, sectionId?: string) => {
    setActivePage(page);
    if (page === 'storefront' && sectionId) {
      if (sectionId === 'trial-box') setBuilderMode('trial');
      if (sectionId === 'subscriptions') setBuilderMode('subscription');
      window.setTimeout(() => {
        if (sectionId === 'top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }
      }, 40);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAddToBag = (meal: MealKit) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.meal.id === meal.id);
      if (existing) {
        return prev.map((i) =>
          i.meal.id === meal.id ? { ...i, quantity: Math.min(10, i.quantity + 1) } : i
        );
      }
      return [...prev, { meal, quantity: 1 }];
    });
  };

  const handleUpdateQty = (mealId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((i) =>
          i.meal.id === mealId ? { ...i, quantity: i.quantity + delta } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const handleRemoveItem = (mealId: string) => {
    setCartItems((prev) => prev.filter((i) => i.meal.id !== mealId));
  };

  const totalBagCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBF9] text-[#111814]">
      <Header
        activePage={activePage}
        onNavigate={handleNavigate}
        cartCount={totalBagCount}
        onOpenCart={() => setCartOpen(true)}
      />

      <main className="flex-1">
        {activePage === 'storefront' && (
          <>
            <HeroSection
              onClaimTrial={() => handleNavigate('storefront', 'trial-box')}
              onExploreMenu={() => handleNavigate('storefront', 'menu')}
              onGoToKitchen={() => handleNavigate('kitchen')}
            />
            <MenuCatalogSection
              selectedHub={selectedHub}
              onSelectHub={setSelectedHub}
              onAddToBag={handleAddToBag}
              onInspectRecipe={setInspectedMeal}
            />
            <TrialAndSubscriptionSection
              selectedHub={selectedHub}
              onSelectHub={setSelectedHub}
              initialMode={builderMode}
              onGoToKitchen={() => handleNavigate('kitchen')}
            />
            <CraftsmanshipSection
              onOpenVenturePlan={() => handleNavigate('venture')}
            />
          </>
        )}

        {activePage === 'kitchen' && <MyKitchenSection />}

        {activePage === 'venture' && <VenturePlanView />}
      </main>

      <footer className="bg-white border-t border-[#E2E8E0] py-10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-display text-lg font-bold text-[#111814]">NutriFuel</p>
            <p className="text-xs text-[#4B584E] mt-1">
              Fresh 15-minute organic vegetarian meal kits · Dehradun, Gurgaon, Noida &amp; Bangalore
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-[#4B584E]">
            <button
              type="button"
              onClick={() => handleNavigate('storefront', 'menu')}
              className="hover:text-[#111814] cursor-pointer"
            >
              Weekly Menu
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('storefront', 'trial-box')}
              className="hover:text-[#111814] cursor-pointer"
            >
              3-Meal Trial Box
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('kitchen')}
              className="hover:text-[#111814] cursor-pointer"
            >
              My Kitchen
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('venture')}
              className="hover:text-[#111814] cursor-pointer"
            >
              Venture Plan
            </button>
          </div>
        </div>
      </footer>

      <RecipeDrawerModal
        meal={inspectedMeal}
        onClose={() => setInspectedMeal(null)}
        onAddToBag={handleAddToBag}
      />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
        selectedHub={selectedHub}
        onSelectHub={setSelectedHub}
        onGoToKitchen={() => handleNavigate('kitchen')}
      />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <NutriFuelAppShell />
      </AuthProvider>
    </ErrorBoundary>
  );
}
