import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';
import {
  auth,
  db,
  handleFirestoreError,
  OperationType,
  signInWithGoogle,
  signOutUser,
  testConnection,
} from '../firebase';
import { CityHub, DietaryGoal } from '../data/nutrifuelData';

function getTimestampMillis(ts: unknown): number {
  if (!ts || typeof ts !== 'object') return 0;
  const maybe = ts as { toMillis?: () => number; seconds?: number };
  if (typeof maybe.toMillis === 'function') return maybe.toMillis();
  if (typeof maybe.seconds === 'number') return maybe.seconds * 1000;
  return 0;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  cityHub: CityHub;
  postalCode?: string;
  deliveryAddress?: string;
  phone?: string;
  dietaryGoal: DietaryGoal;
}

export interface SubscriptionRecord {
  id: string;
  userId: string;
  planType: '3-meals-weekly' | '5-meals-weekly' | '4-week-auto';
  mealsPerWeek: 3 | 5;
  pricePerKit: 220 | 187;
  weeklyTotal: number;
  cityHub: CityHub;
  postalCode: string;
  deliveryAddress: string;
  deliverySlot: 'Evening 5-7 PM' | 'Morning 7-9 AM';
  selectedMealIds: string[];
  status: 'active' | 'paused' | 'cancelled';
  createdAt?: unknown;
}

export interface OrderRecord {
  id: string;
  userId: string;
  orderType: 'trial-box' | 'a-la-carte';
  mealIds: string[];
  addonIds: string[];
  itemCount: number;
  subtotal: number;
  discountAmount: number;
  totalAmount: number;
  cityHub: CityHub;
  postalCode: string;
  deliveryAddress: string;
  status: 'confirmed' | 'preparing' | 'delivered' | 'cancelled';
  createdAt?: unknown;
}

export interface PilotFeedbackRecord {
  id: string;
  userId: string;
  mealId: string;
  mealTitle: string;
  prepMinutes: number;
  underFifteenMinutes: boolean;
  tasteRating: number;
  freshnessRating: number;
  npsScore: number;
  cityHub: CityHub;
  comment: string;
  createdAt?: unknown;
}

export interface CookingLogRecord {
  id: string;
  userId: string;
  mealId: string;
  mealTitle: string;
  elapsedSeconds: number;
  completedAt?: unknown;
}

interface AuthContextValue {
  user: User | null;
  authReady: boolean;
  authBusy: boolean;
  authError: string | null;
  profile: UserProfile | null;
  subscriptions: SubscriptionRecord[];
  orders: OrderRecord[];
  feedbackList: PilotFeedbackRecord[];
  cookingLogs: CookingLogRecord[];
  loginWithGoogle: () => Promise<User | null>;
  logout: () => Promise<void>;
  updateProfile: (patch: {
    displayName: string;
    cityHub: CityHub;
    postalCode: string;
    deliveryAddress: string;
    phone: string;
    dietaryGoal: DietaryGoal;
  }) => Promise<void>;
  placeOrder: (input: {
    orderType: 'trial-box' | 'a-la-carte';
    mealIds: string[];
    addonIds: string[];
    itemCount: number;
    subtotal: number;
    discountAmount: number;
    totalAmount: number;
    cityHub: CityHub;
    postalCode: string;
    deliveryAddress: string;
  }) => Promise<string>;
  cancelOrder: (orderId: string) => Promise<void>;
  createSubscription: (input: {
    planType: '3-meals-weekly' | '5-meals-weekly' | '4-week-auto';
    mealsPerWeek: 3 | 5;
    pricePerKit: 220 | 187;
    weeklyTotal: number;
    cityHub: CityHub;
    postalCode: string;
    deliveryAddress: string;
    deliverySlot: 'Evening 5-7 PM' | 'Morning 7-9 AM';
    selectedMealIds: string[];
  }) => Promise<string>;
  updateSubscriptionStatus: (
    subId: string,
    status: 'active' | 'paused' | 'cancelled'
  ) => Promise<void>;
  updateSubscriptionMeals: (input: {
    subId: string;
    selectedMealIds: string[];
    deliverySlot: 'Evening 5-7 PM' | 'Morning 7-9 AM';
    cityHub: CityHub;
    postalCode: string;
    deliveryAddress: string;
  }) => Promise<void>;
  submitFeedback: (input: {
    mealId: string;
    mealTitle: string;
    prepMinutes: number;
    tasteRating: number;
    freshnessRating: number;
    npsScore: number;
    cityHub: CityHub;
    comment: string;
  }) => Promise<void>;
  deleteFeedback: (feedbackId: string) => Promise<void>;
  logCookingSession: (input: {
    mealId: string;
    mealTitle: string;
    elapsedSeconds: number;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [authBusy, setAuthBusy] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [subscriptions, setSubscriptions] = useState<SubscriptionRecord[]>([]);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [feedbackList, setFeedbackList] = useState<PilotFeedbackRecord[]>([]);
  const [cookingLogs, setCookingLogs] = useState<CookingLogRecord[]>([]);

  useEffect(() => {
    void testConnection();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      setAuthReady(true);

      if (!nextUser) {
        setProfile(null);
        setSubscriptions([]);
        setOrders([]);
        setFeedbackList([]);
        setCookingLogs([]);
        return;
      }

      // Bootstrap user profile if first sign-in
      const userDocRef = doc(db, 'users', nextUser.uid);
      try {
        const snap = await getDoc(userDocRef);
        if (!snap.exists() && nextUser.email && nextUser.emailVerified) {
          const initialName = (nextUser.displayName || 'NutriFuel Member').slice(0, 100);
          await setDoc(userDocRef, {
            uid: nextUser.uid,
            email: nextUser.email,
            displayName: initialName,
            cityHub: 'Dehradun',
            postalCode: '',
            deliveryAddress: '',
            phone: '',
            dietaryGoal: 'Lean Muscle',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        }
      } catch (err) {
        console.error('Profile bootstrap check error:', err);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!authReady || !user) return;

    const unsubProfile = onSnapshot(
      doc(db, 'users', user.uid),
      (snap) => {
        if (snap.exists()) {
          const d = snap.data();
          setProfile({
            uid: d.uid,
            email: d.email,
            displayName: d.displayName,
            cityHub: d.cityHub,
            postalCode: d.postalCode || '',
            deliveryAddress: d.deliveryAddress || '',
            phone: d.phone || '',
            dietaryGoal: d.dietaryGoal,
          });
        }
      },
      (err) => handleFirestoreError(err, OperationType.GET, `users/${user.uid}`)
    );

    const subsQuery = query(
      collection(db, 'subscriptions'),
      where('userId', '==', user.uid)
    );
    const unsubSubs = onSnapshot(
      subsQuery,
      (snap) => {
        const list = snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<SubscriptionRecord, 'id'>),
        }));
        list.sort((a, b) => getTimestampMillis(b.createdAt) - getTimestampMillis(a.createdAt));
        setSubscriptions(list);
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'subscriptions')
    );

    const ordersQuery = query(
      collection(db, 'orders'),
      where('userId', '==', user.uid)
    );
    const unsubOrders = onSnapshot(
      ordersQuery,
      (snap) => {
        const list = snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<OrderRecord, 'id'>),
        }));
        list.sort((a, b) => getTimestampMillis(b.createdAt) - getTimestampMillis(a.createdAt));
        setOrders(list);
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'orders')
    );

    const feedbackQuery = query(
      collection(db, 'feedback'),
      where('userId', '==', user.uid)
    );
    const unsubFeedback = onSnapshot(
      feedbackQuery,
      (snap) => {
        const list = snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<PilotFeedbackRecord, 'id'>),
        }));
        list.sort((a, b) => getTimestampMillis(b.createdAt) - getTimestampMillis(a.createdAt));
        setFeedbackList(list);
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'feedback')
    );

    const logsQuery = query(
      collection(db, 'cookingLogs'),
      where('userId', '==', user.uid)
    );
    const unsubLogs = onSnapshot(
      logsQuery,
      (snap) => {
        const list = snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<CookingLogRecord, 'id'>),
        }));
        list.sort((a, b) => getTimestampMillis(b.completedAt) - getTimestampMillis(a.completedAt));
        setCookingLogs(list);
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'cookingLogs')
    );

    return () => {
      unsubProfile();
      unsubSubs();
      unsubOrders();
      unsubFeedback();
      unsubLogs();
    };
  }, [authReady, user]);

  const loginWithGoogle = async (): Promise<User | null> => {
    setAuthBusy(true);
    setAuthError(null);
    try {
      const signedInUser = await signInWithGoogle();
      return signedInUser;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Google Sign-In failed.';
      setAuthError(msg);
      return null;
    } finally {
      setAuthBusy(false);
    }
  };

  const logout = async () => {
    setAuthBusy(true);
    try {
      await signOutUser();
    } finally {
      setAuthBusy(false);
    }
  };

  const updateProfile: AuthContextValue['updateProfile'] = async (patch) => {
    if (!user) throw new Error('Authentication required');
    const cleanName = patch.displayName.trim().slice(0, 100);
    const cleanPin = patch.postalCode.trim().slice(0, 6);
    const cleanAddress = patch.deliveryAddress.trim().slice(0, 240);
    const cleanPhone = patch.phone.trim().slice(0, 15);
    const path = `users/${user.uid}`;
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        displayName: cleanName || 'NutriFuel Member',
        cityHub: patch.cityHub,
        postalCode: cleanPin,
        deliveryAddress: cleanAddress,
        phone: cleanPhone,
        dietaryGoal: patch.dietaryGoal,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  };

  const placeOrder: AuthContextValue['placeOrder'] = async (input) => {
    if (!user) throw new Error('Authentication required');
    const cleanMeals = input.mealIds.slice(0, 10);
    const cleanAddons = input.addonIds.slice(0, 5);
    const cleanPin = input.postalCode.trim().slice(0, 6);
    const cleanAddress = input.deliveryAddress.trim().slice(0, 240);

    try {
      const ref = await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        orderType: input.orderType,
        mealIds: cleanMeals,
        addonIds: cleanAddons,
        itemCount: Math.max(1, Math.min(10, input.itemCount)),
        subtotal: Math.max(220, Math.min(10000, input.subtotal)),
        discountAmount: Math.max(0, Math.min(input.subtotal, input.discountAmount)),
        totalAmount: Math.max(1, Math.min(10000, input.totalAmount)),
        cityHub: input.cityHub,
        postalCode: cleanPin,
        deliveryAddress: cleanAddress,
        status: 'confirmed',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return ref.id;
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'orders');
    }
  };

  const cancelOrder: AuthContextValue['cancelOrder'] = async (orderId) => {
    if (!user) throw new Error('Authentication required');
    const path = `orders/${orderId}`;
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        status: 'cancelled',
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  };

  const createSubscription: AuthContextValue['createSubscription'] = async (input) => {
    if (!user) throw new Error('Authentication required');
    const cleanMeals = input.selectedMealIds.slice(0, 5);
    const cleanPin = input.postalCode.trim().slice(0, 6);
    const cleanAddress = input.deliveryAddress.trim().slice(0, 240);

    try {
      const ref = await addDoc(collection(db, 'subscriptions'), {
        userId: user.uid,
        planType: input.planType,
        mealsPerWeek: input.mealsPerWeek,
        pricePerKit: input.pricePerKit,
        weeklyTotal: input.weeklyTotal,
        cityHub: input.cityHub,
        postalCode: cleanPin,
        deliveryAddress: cleanAddress,
        deliverySlot: input.deliverySlot,
        selectedMealIds: cleanMeals,
        status: 'active',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return ref.id;
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'subscriptions');
    }
  };

  const updateSubscriptionStatus: AuthContextValue['updateSubscriptionStatus'] = async (
    subId,
    status
  ) => {
    if (!user) throw new Error('Authentication required');
    const path = `subscriptions/${subId}`;
    try {
      await updateDoc(doc(db, 'subscriptions', subId), {
        status,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  };

  const updateSubscriptionMeals: AuthContextValue['updateSubscriptionMeals'] = async (input) => {
    if (!user) throw new Error('Authentication required');
    const path = `subscriptions/${input.subId}`;
    try {
      await updateDoc(doc(db, 'subscriptions', input.subId), {
        selectedMealIds: input.selectedMealIds.slice(0, 5),
        deliverySlot: input.deliverySlot,
        cityHub: input.cityHub,
        postalCode: input.postalCode.trim().slice(0, 6),
        deliveryAddress: input.deliveryAddress.trim().slice(0, 240),
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  };

  const submitFeedback: AuthContextValue['submitFeedback'] = async (input) => {
    if (!user) throw new Error('Authentication required');
    const prepMinutes = Math.max(1, Math.min(60, Math.round(input.prepMinutes)));
    try {
      await addDoc(collection(db, 'feedback'), {
        userId: user.uid,
        mealId: input.mealId.slice(0, 64),
        mealTitle: input.mealTitle.slice(0, 120),
        prepMinutes,
        underFifteenMinutes: prepMinutes <= 15,
        tasteRating: Math.max(1, Math.min(5, Math.round(input.tasteRating))),
        freshnessRating: Math.max(1, Math.min(5, Math.round(input.freshnessRating))),
        npsScore: Math.max(0, Math.min(10, Math.round(input.npsScore))),
        cityHub: input.cityHub,
        comment: input.comment.trim().slice(0, 500),
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'feedback');
    }
  };

  const deleteFeedback: AuthContextValue['deleteFeedback'] = async (feedbackId) => {
    if (!user) throw new Error('Authentication required');
    const path = `feedback/${feedbackId}`;
    try {
      await deleteDoc(doc(db, 'feedback', feedbackId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, path);
    }
  };

  const logCookingSession: AuthContextValue['logCookingSession'] = async (input) => {
    if (!user) return;
    try {
      await addDoc(collection(db, 'cookingLogs'), {
        userId: user.uid,
        mealId: input.mealId.slice(0, 64),
        mealTitle: input.mealTitle.slice(0, 120),
        elapsedSeconds: Math.max(1, Math.min(3600, Math.round(input.elapsedSeconds))),
        completedAt: serverTimestamp(),
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'cookingLogs');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authReady,
        authBusy,
        authError,
        profile,
        subscriptions,
        orders,
        feedbackList,
        cookingLogs,
        loginWithGoogle,
        logout,
        updateProfile,
        placeOrder,
        cancelOrder,
        createSubscription,
        updateSubscriptionStatus,
        updateSubscriptionMeals,
        submitFeedback,
        deleteFeedback,
        logCookingSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
