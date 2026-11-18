import React, { useEffect, useState } from 'react';
import { X, Plus, Minus, Trash2, CheckCircle2 } from 'lucide-react';
import {
  CityHub,
  HUB_DETAILS,
  MEAL_ADDONS,
  MealKit,
} from '../data/nutrifuelData';
import { useAuth } from '../context/AuthContext';

export interface CartItem {
  meal: MealKit;
  quantity: number;
}

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (mealId: string, delta: number) => void;
  onRemoveItem: (mealId: string) => void;
  onClearCart: () => void;
  selectedHub: CityHub;
  onSelectHub: (hub: CityHub) => void;
  onGoToKitchen: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  open,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  selectedHub,
  onSelectHub,
  onGoToKitchen,
}) => {
  const { user, profile, loginWithGoogle, placeOrder } = useAuth();
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [postalCode, setPostalCode] = useState('248001');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      if (profile.postalCode) setPostalCode(profile.postalCode);
      if (profile.deliveryAddress) setDeliveryAddress(profile.deliveryAddress);
    } else {
      const hubInfo = HUB_DETAILS.find((h) => h.city === selectedHub);
      if (hubInfo) setPostalCode(hubInfo.samplePins[0]);
    }
  }, [profile, selectedHub]);

  if (!open) return null;

  const totalKitCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const kitsSubtotal = items.reduce(
    (sum, item) => sum + item.meal.priceInr * item.quantity,
    0
  );
  const addonsSubtotal = selectedAddons.reduce((sum, id) => {
    const addon = MEAL_ADDONS.find((a) => a.id === id);
    return sum + (addon ? addon.priceInr : 0);
  }, 0);
  const grandTotal = kitsSubtotal + addonsSubtotal;

  const toggleAddon = (id: string) => {
    setSelectedAddons((curr) =>
      curr.includes(id) ? curr.filter((x) => x !== id) : [...curr, id]
    );
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (items.length === 0) {
      setErrorMsg('Add at least one meal kit to checkout.');
      return;
    }
    if (totalKitCount > 10) {
      setErrorMsg('Maximum 10 kits per single a la carte order.');
      return;
    }
    if (!/^[1-9][0-9]{5}$/.test(postalCode.trim())) {
      setErrorMsg('Enter a valid 6-digit Indian PIN code.');
      return;
    }
    if (deliveryAddress.trim().length < 5) {
      setErrorMsg('Enter your full apartment, hostel, or corporate park address.');
      return;
    }

    setSubmitting(true);
    try {
      let activeUser = user;
      if (!activeUser) {
        activeUser = await loginWithGoogle();
        if (!activeUser) {
          setErrorMsg('Google Sign-In is required to confirm your order.');
          return;
        }
      }

      const expandedMealIds: string[] = [];
      items.forEach((item) => {
        for (let i = 0; i < item.quantity; i += 1) {
          expandedMealIds.push(item.meal.id);
        }
      });

      const orderId = await placeOrder({
        orderType: 'a-la-carte',
        mealIds: expandedMealIds.slice(0, 10),
        addonIds: selectedAddons.slice(0, 5),
        itemCount: totalKitCount,
        subtotal: grandTotal,
        discountAmount: 0,
        totalAmount: grandTotal,
        cityHub: selectedHub,
        postalCode: postalCode.trim(),
        deliveryAddress: deliveryAddress.trim(),
      });

      setConfirmedOrderId(orderId);
      setSelectedAddons([]);
      onClearCart();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Checkout failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/45 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
    >
      <div className="w-full max-w-md h-full bg-[#FAFBF9] border-l border-[#E2E8E0] flex flex-col overflow-hidden">
        <div className="px-6 py-4 bg-white border-b border-[#E2E8E0] flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg font-bold text-[#111814]">
              Your Meal-Kit Bag
            </h2>
            <p className="text-xs text-[#4B584E]">
              A la carte single kits &amp; protein add-ons
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setConfirmedOrderId(null);
              onClose();
            }}
            aria-label="Close bag"
            className="p-2 text-[#4B584E] hover:text-[#111814] hover:bg-[#F2F5F1] rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {confirmedOrderId ? (
            <div className="bg-white border border-[#A7F3D0] rounded-xl p-6 space-y-3">
              <CheckCircle2 className="w-8 h-8 text-[#15803D]" />
              <h3 className="font-display text-xl font-bold text-[#111814]">
                Order #{confirmedOrderId.slice(0, 6).toUpperCase()} Confirmed
              </h3>
              <p className="text-sm text-[#4B584E] leading-relaxed">
                Your fresh pre-portioned meal kits are scheduled for cold-bag dispatch in{' '}
                <strong className="text-[#111814]">{selectedHub}</strong>.
              </p>
              <button
                type="button"
                onClick={() => {
                  setConfirmedOrderId(null);
                  onClose();
                  onGoToKitchen();
                }}
                className="w-full py-2.5 text-sm font-medium bg-[#14532D] text-white rounded-lg hover:bg-[#166534] cursor-pointer"
              >
                View Order in My Kitchen
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <p className="text-sm font-medium text-[#111814]">Your bag is empty</p>
              <p className="text-xs text-[#4B584E]">
                Add any 15-minute vegetarian high-protein kit from the weekly menu.
              </p>
            </div>
          ) : (
            <>
              {/* Kit Line Items */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.meal.id}
                    className="bg-white border border-[#E2E8E0] rounded-xl p-4 flex items-start justify-between gap-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#111814]">
                        {item.meal.title}
                      </p>
                      <p className="font-mono text-xs text-[#4B584E] mt-0.5 tabular-nums">
                        ₹{item.meal.priceInr} each · {item.meal.proteinGrams}g protein
                      </p>

                      <div className="flex items-center gap-2 mt-3">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.meal.id, -1)}
                          aria-label={`Decrease ${item.meal.title}`}
                          className="w-7 h-7 flex items-center justify-center border border-[#CFDACA] rounded-md text-[#111814] hover:bg-[#F2F5F1] cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono text-xs font-semibold w-6 text-center tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.meal.id, 1)}
                          aria-label={`Increase ${item.meal.title}`}
                          className="w-7 h-7 flex items-center justify-center border border-[#CFDACA] rounded-md text-[#111814] hover:bg-[#F2F5F1] cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-mono text-sm font-semibold text-[#111814] tabular-nums">
                        ₹{item.meal.priceInr * item.quantity}
                      </p>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.meal.id)}
                        aria-label={`Remove ${item.meal.title}`}
                        className="mt-4 p-1.5 text-[#4B584E] hover:text-[#991B1B] cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Premium Add-Ons (Mission 7) */}
              <div>
                <h3 className="font-display text-sm font-semibold text-[#111814] mb-2.5">
                  Optional High-Protein Add-Ons
                </h3>
                <div className="space-y-2">
                  {MEAL_ADDONS.map((addon) => {
                    const checked = selectedAddons.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleAddon(addon.id)}
                        className={`w-full text-left p-3 rounded-lg border transition-colors cursor-pointer flex items-center justify-between gap-3 ${
                          checked
                            ? 'bg-[#F3F8F4] border-[#14532D]'
                            : 'bg-white border-[#E2E8E0] hover:bg-[#FAFBF9]'
                        }`}
                      >
                        <div>
                          <p className="text-xs font-semibold text-[#111814]">
                            {addon.title}
                          </p>
                          <p className="text-[11px] text-[#4B584E]">
                            {addon.proteinBoost} · {addon.description}
                          </p>
                        </div>
                        <span className="font-mono text-xs font-semibold text-[#14532D] shrink-0 tabular-nums">
                          {checked ? 'Added' : `+₹${addon.priceInr}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Form */}
              <form id="cart-checkout-form" onSubmit={handleCheckout} className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-medium text-[#111814] mb-1">
                    City Hub
                  </label>
                  <select
                    value={selectedHub}
                    onChange={(e) => onSelectHub(e.target.value as CityHub)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#CFDACA] rounded-lg"
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
                    required
                    className="w-full px-3 py-2 text-xs font-mono bg-white border border-[#CFDACA] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#111814] mb-1">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    maxLength={240}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Flat / Hostel / Corporate Park"
                    required
                    className="w-full px-3 py-2 text-xs bg-white border border-[#CFDACA] rounded-lg"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-[#991B1B] bg-[#FEF2F2] border border-[#FECACA] rounded-lg p-2.5">
                    {errorMsg}
                  </p>
                )}
              </form>
            </>
          )}
        </div>

        {items.length > 0 && !confirmedOrderId && (
          <div className="p-6 bg-white border-t border-[#E2E8E0] space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#4B584E]">
                Total ({totalKitCount} kit{totalKitCount > 1 ? 's' : ''})
              </span>
              <span className="font-mono text-lg font-bold text-[#111814] tabular-nums">
                ₹{grandTotal}
              </span>
            </div>
            <button
              type="submit"
              form="cart-checkout-form"
              disabled={submitting}
              className="w-full py-3 text-sm font-semibold bg-[#14532D] text-white rounded-lg hover:bg-[#166534] transition-colors cursor-pointer disabled:opacity-60"
            >
              {submitting
                ? 'Confirming order...'
                : user
                ? `Place Order (₹${grandTotal})`
                : `Sign in with Google & Pay ₹${grandTotal}`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
