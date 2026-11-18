# NutriFuel Firestore Security Specification (Phase 0)

## 1. Data Invariants
1. **Strict Ownership**: Every document in `/users/{userId}`, `/subscriptions/{subscriptionId}`, `/orders/{orderId}`, `/feedback/{feedbackId}`, and `/cookingLogs/{logId}` belongs exclusively to a single verified Google-authenticated user (`request.auth.uid` with `request.auth.token.email_verified == true`).
2. **PII Isolation**: Customer `email`, `phone`, and `deliveryAddress` reside only in owner-scoped documents (`/users`, `/subscriptions`, `/orders`). No collection permits cross-user reads or blanket `allow list: if isSignedIn()`.
3. **Immutable Ownership & Timestamps**: `userId`/`uid` and `createdAt` cannot be modified after creation. All `createdAt` and `updatedAt` fields must equal `request.time`.
4. **Terminal State Locking**: Once an `Order` reaches `delivered` or `cancelled`, or a `Subscription` reaches `cancelled`, no client updates are permitted.
5. **Strict Key & Size Enforcement**: Every create enforces `hasAll` + `hasOnly` (no shadow fields), every update uses `affectedKeys().hasOnly(...)` inside named action branches, and every string/list enforces explicit size and regex boundaries.
6. **Price & Economic Integrity**: `Order` and `Subscription` validate numeric bounds (`pricePerKit == 220 || pricePerKit == 187`, `totalAmount >= 0`, `mealsPerWeek in [3, 5]`) and bounded list lengths (`mealIds.size() >= 1 && mealIds.size() <= 10`).

## 2. The "Dirty Dozen" Adversarial Payloads
1. **Shadow Field Injection on UserProfile**: `{ uid: A, email: A, ..., isAdmin: true }` -> `PERMISSION_DENIED` (`hasOnly` blocks `isAdmin`).
2. **Unverified Email Spoof**: Request with `request.auth.token.email_verified == false` -> `PERMISSION_DENIED`.
3. **Cross-User Subscription Hijack**: User B attempts `get` or `create` subscription with `userId: User A` -> `PERMISSION_DENIED`.
4. **Blanket List Scraping**: User B queries `collection(db, 'orders')` without `where('userId', '==', B)` -> `PERMISSION_DENIED` (`resource.data.userId == request.auth.uid`).
5. **1.5KB Document ID Poisoning**: Creating `/orders/<1500 char string>` -> `PERMISSION_DENIED` (`isValidId` max 128 chars + regex).
6. **Negative Price Tampering**: Creating an order with `totalAmount: -500` or `subtotal: 0` -> `PERMISSION_DENIED`.
7. **Unbounded Array Exhaustion**: Creating an order with 500 `mealIds` -> `PERMISSION_DENIED` (`mealIds.size() <= 10`).
8. **Terminal State Bypass (Order)**: Updating an order from `cancelled` back to `confirmed` -> `PERMISSION_DENIED`.
9. **Terminal State Bypass (Subscription)**: Reactivating a `cancelled` subscription via `update` -> `PERMISSION_DENIED`.
10. **Client Timestamp Forgery**: Creating a feedback entry with `createdAt` set to a past date instead of `serverTimestamp()` -> `PERMISSION_DENIED` (`createdAt == request.time`).
11. **Immutable Owner Swap**: Updating a subscription's `userId` to another user -> `PERMISSION_DENIED` (`affectedKeys().hasOnly(...)` + `incoming().userId == existing().userId`).
12. **Type Poisoning on Update**: Updating `status: 12345` or `comment` with a 5KB string -> `PERMISSION_DENIED` (`isValidSubscription`/`isValidFeedback` runs first on every update).
