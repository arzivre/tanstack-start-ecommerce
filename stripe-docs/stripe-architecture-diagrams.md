# Stripe Connect Architecture Diagrams

Use these diagrams in your video presentation or convert them to slides.

---

## 🔄 Payment Flow Diagram

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                       STRIPE CONNECT PAYMENT FLOW                              ║
╚═══════════════════════════════════════════════════════════════════════════════╝

    ┌─────────────┐                                              ┌─────────────┐
    │             │                                              │             │
    │  👤 CUSTOMER │                                              │  🏪 VENDOR  │
    │             │                                              │             │
    └──────┬──────┘                                              └──────▲──────┘
           │                                                            │
           │ 1. Add products to cart                                    │ 7. Automatic
           │ 2. Click Checkout                                          │    Payout
           │                                                            │
           ▼                                                            │
    ┌──────────────────────────────────────────────────────────────────────────┐
    │                                                                          │
    │                    ╔═══════════════════════════════╗                     │
    │                    ║                               ║                     │
    │                    ║     🏢 SHOP STACK PLATFORM    ║                     │
    │                    ║                               ║                     │
    │                    ╠═══════════════════════════════╣                     │
    │                    ║  • API Server                 ║                     │
    │                    ║  • Database                   ║                     │
    │                    ║  • Webhook Handler            ║                     │
    │                    ╚═══════════════════════════════╝                     │
    │                              │         ▲                                 │
    │                              │         │                                 │
    │                    3. Create │         │ 5. Webhook:                     │
    │                    Payment   │         │ payment_intent                  │
    │                    Intent    │         │ .succeeded                      │
    │                              │         │                                 │
    │                              ▼         │                                 │
    │                    ┌─────────────────────────────┐                       │
    │                    │                             │                       │
    │                    │     💳 STRIPE API           │───────────────────────┤
    │                    │                             │                       │
    │                    └──────────▲──────────────────┘                       │
    │                               │                                          │
    │         4. Card payment       │                                          │
    │         via Stripe Elements   │                                          │
    │                               │                                          │
    └───────────────────────────────┼──────────────────────────────────────────┘
                                    │
                                    │
           ┌────────────────────────┘
           │
           │ 6. Order Confirmation Email
           ▼
    ┌─────────────┐
    │             │
    │  📧 EMAIL   │
    │             │
    └─────────────┘
```

---

## 🏪 Vendor Onboarding Flow

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                       VENDOR STRIPE CONNECT ONBOARDING                         ║
╚═══════════════════════════════════════════════════════════════════════════════╝

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │   👤 VENDOR DASHBOARD                                                │
    │                                                                     │
    │   ┌─────────────────────────────────────────────────────────────┐   │
    │   │  Settings  →  Payment Settings                               │   │
    │   │                                                              │   │
    │   │  ╔═══════════════════════════════════════════════════════╗   │   │
    │   │  ║                                                       ║   │   │
    │   │  ║   🔗 Connect with Stripe                               ║   │   │
    │   │  ║                                                       ║   │   │
    │   │  ║   Connect your Stripe account to receive payments     ║   │   │
    │   │  ║   from customers.                                     ║   │   │
    │   │  ║                                                       ║   │   │
    │   │  ║   [ 🔗 Connect with Stripe ]  ←── Click this button    ║   │   │
    │   │  ║                                                       ║   │   │
    │   │  ╚═══════════════════════════════════════════════════════╝   │   │
    │   │                                                              │   │
    │   └─────────────────────────────────────────────────────────────┘   │
    │                                                                     │
    └───────────────────────────────────┬─────────────────────────────────┘
                                        │
                                        │ 1. Creates Express Account
                                        │ 2. Generates Onboarding Link
                                        │
                                        ▼
    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │   💳 STRIPE HOSTED ONBOARDING                                        │
    │                                                                     │
    │   ┌─────────────────────────────────────────────────────────────┐   │
    │   │                                                              │   │
    │   │   Step 1: Business Details                                   │   │
    │   │   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━    │   │
    │   │   • Business name                                            │   │
    │   │   • Business address                                         │   │
    │   │   • Tax information                                          │   │
    │   │                                                              │   │
    │   │   Step 2: Personal Information                               │   │
    │   │   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━    │   │
    │   │   • Name, DOB, SSN (last 4)                                  │   │
    │   │   • Home address                                             │   │
    │   │                                                              │   │
    │   │   Step 3: Bank Account                                       │   │
    │   │   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━    │   │
    │   │   • Routing number                                           │   │
    │   │   • Account number                                           │   │
    │   │                                                              │   │
    │   │   Step 4: Identity Verification                              │   │
    │   │   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━    │   │
    │   │   • Upload ID document                                       │   │
    │   │                                                              │   │
    │   └─────────────────────────────────────────────────────────────┘   │
    │                                                                     │
    │                    [ Submit and Continue ]                          │
    │                                                                     │
    └───────────────────────────────────┬─────────────────────────────────┘
                                        │
                                        │ 3. Redirects back to app
                                        │ 4. Webhook updates status
                                        │
                                        ▼
    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │   ✅ CONNECTED VENDOR DASHBOARD                                      │
    │                                                                     │
    │   ┌─────────────────────────────────────────────────────────────┐   │
    │   │  Settings  →  Payment Settings                               │   │
    │   │                                                              │   │
    │   │  ╔═══════════════════════════════════════════════════════╗   │   │
    │   │  ║                                                       ║   │   │
    │   │  ║   Stripe Connect  [ Connected ✓ ]                     ║   │   │
    │   │  ║                                                       ║   │   │
    │   │  ║   ┌─────────────┐ ┌─────────────┐ ┌─────────────┐     ║   │   │
    │   │  ║   │ ✓ Onboarding│ │ ✓ Charges   │ │ ✓ Payouts   │     ║   │   │
    │   │  ║   │   Complete  │ │   Enabled   │ │   Enabled   │     ║   │   │
    │   │  ║   └─────────────┘ └─────────────┘ └─────────────┘     ║   │   │
    │   │  ║                                                       ║   │   │
    │   │  ║   [ 📊 Open Stripe Dashboard ]                        ║   │   │
    │   │  ║                                                       ║   │   │
    │   │  ╚═══════════════════════════════════════════════════════╝   │   │
    │   │                                                              │   │
    │   └─────────────────────────────────────────────────────────────┘   │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘
```

---

## 💻 Code Architecture

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                           FILE STRUCTURE                                       ║
╚═══════════════════════════════════════════════════════════════════════════════╝

src/
├── lib/
│   └── stripe/
│       ├── index.ts ─────────────────┐
│       │                             │  ┌─────────────────────────────────┐
│       │   • Stripe SDK init         │──│  Core payment functions         │
│       │   • createPaymentIntent()   │  │  - Create payment intent        │
│       │   • getPaymentIntent()      │  │  - Cancel payment               │
│       │   • createRefund()          │  │  - Create refund                │
│       │   • dollarsToCents()        │  └─────────────────────────────────┘
│       │                             │
│       └── connect.ts ───────────────┤
│                                     │  ┌─────────────────────────────────┐
│           • createConnectedAccount()│──│  Stripe Connect functions       │
│           • createAccountLink()     │  │  - Vendor account creation      │
│           • getAccountStatus()      │  │  - Onboarding links             │
│           • createLoginLink()       │  │  - Dashboard access             │
│           • createDestinationCharge│  │  - Payment splitting            │
│           • constructWebhookEvent() │  └─────────────────────────────────┘
│                                     │
├── hooks/
│   └── vendor/
│       └── use-vendor-stripe-connect.tsx ──┐
│                                           │  ┌─────────────────────────────┐
│           • vendorStripeConnectKeys       │──│  React Query hooks          │
│           • vendorStripeStatusQueryOptions│  │  - Status fetching          │
│           • useStartStripeOnboarding()    │  │  - Onboarding mutations     │
│           • useGetStripeDashboard()       │  │  - Dashboard access         │
│           • useVendorStripeConnect()      │  └─────────────────────────────┘
│                                           │
├── components/
│   ├── templates/vendor/settings/
│   │   └── vendor-settings-template.tsx ───┤
│   │                                       │  ┌─────────────────────────────┐
│   │       • VendorSettingsTemplate        │──│  Vendor Settings UI         │
│   │       • PaymentSettingsSection        │  │  - Connect button           │
│   │                                       │  │  - Status display           │
│   │                                       │  └─────────────────────────────┘
│   └── base/checkout/
│       └── stripe-payment-dialog.tsx ──────┤
│                                           │  ┌─────────────────────────────┐
│           • loadStripe()                  │──│  Customer Payment UI        │
│           • <Elements> provider           │  │  - Stripe Elements          │
│           • <PaymentElement>              │  │  - Card input               │
│           • confirmPayment()              │  │  - Payment confirmation     │
│                                           │  └─────────────────────────────┘
│
└── routes/api/webhooks/
    └── stripe.ts ──────────────────────────┤
                                            │  ┌─────────────────────────────┐
        • POST handler                      │──│  Webhook Handler            │
        • Signature verification            │  │  - account.updated          │
        • account.updated handler           │  │  - payment_intent.succeeded │
        • payment_intent.succeeded handler  │  │  - Email notifications      │
                                            │  └─────────────────────────────┘
```

---

## 💰 Payment Split Diagram

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                       DESTINATION CHARGE PAYMENT SPLIT                         ║
╚═══════════════════════════════════════════════════════════════════════════════╝

   Customer pays: $100.00
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   ┌─────────────────────────────────────────────────────────────────────────┐
   │                                                                         │
   │  💳 Customer Card: $100.00                                               │
   │                                                                         │
   └────────────────────────────────────┬────────────────────────────────────┘
                                        │
                                        ▼
   ┌─────────────────────────────────────────────────────────────────────────┐
   │                                                                         │
   │  💰 STRIPE PROCESSES PAYMENT                                             │
   │                                                                         │
   │  ┌───────────────────────────────────────────────────────────────────┐  │
   │  │                                                                   │  │
   │  │   Total Charge:              $100.00                              │  │
   │  │   ─────────────────────────────────────────────                   │  │
   │  │   Stripe Processing Fee:     -  $3.20  (2.9% + $0.30)             │  │
   │  │   Application Fee:           - $10.00  (Platform's cut)           │  │
   │  │   ─────────────────────────────────────────────                   │  │
   │  │   Vendor Receives:           = $86.80                             │  │
   │  │                                                                   │  │
   │  └───────────────────────────────────────────────────────────────────┘  │
   │                                                                         │
   └─────────────────────────────────────────────────────────────────────────┘
                                        │
                    ┌───────────────────┼───────────────────┐
                    │                   │                   │
                    ▼                   ▼                   ▼
   ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐
   │                     │  │                     │  │                     │
   │  🏢 Platform:        │  │  🏪 Vendor:          │  │  💳 Stripe:          │
   │     $10.00          │  │     $86.80          │  │     $3.20           │
   │  (application_fee)  │  │  (transfer_data)    │  │  (processing fee)   │
   │                     │  │                     │  │                     │
   └─────────────────────┘  └─────────────────────┘  └─────────────────────┘

   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   Code that makes this happen:
   ┌─────────────────────────────────────────────────────────────────────────┐
   │                                                                         │
   │   const paymentIntent = await stripe.paymentIntents.create({           │
   │     amount: 10000,                    // $100.00 in cents               │
   │     currency: 'usd',                                                    │
   │     transfer_data: {                                                    │
   │       destination: 'acct_xxx',        // Vendor's Stripe account        │
   │     },                                                                  │
   │     application_fee_amount: 1000,     // $10.00 platform fee            │
   │   });                                                                   │
   │                                                                         │
   └─────────────────────────────────────────────────────────────────────────┘
```

---

## 🔔 Webhook Events Flow

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                           WEBHOOK EVENTS HANDLED                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝

                              STRIPE SERVERS
                                    │
                                    │ Sends webhook events
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│   POST /api/webhooks/stripe                                                     │
│                                                                                 │
│   1. Verify signature ──────────────────────────────────────────────────────┐   │
│                                                                             │   │
│      const event = constructWebhookEvent(body, signature, webhookSecret);   │   │
│                                                                             │   │
│   2. Handle event ─────────────────────────────────────────────────────────┘   │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
           ┌────────────────────────┼────────────────────────┐
           │                        │                        │
           ▼                        ▼                        ▼
┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐
│                     │  │                     │  │                     │
│  account.updated    │  │ payment_intent      │  │ payment_intent      │
│                     │  │ .succeeded          │  │ .payment_failed     │
└──────────┬──────────┘  └──────────┬──────────┘  └──────────┬──────────┘
           │                        │                        │
           ▼                        ▼                        ▼
┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐
│                     │  │                     │  │                     │
│ Update vendor in DB │  │ • Update order      │  │ • Log failure       │
│                     │  │   status to PAID    │  │ • Notify customer   │
│ • stripeOnboarding  │  │                     │  │                     │
│   Complete          │  │ • Send customer     │  │                     │
│ • chargesEnabled    │  │   confirmation      │  │                     │
│ • payoutsEnabled    │  │   email             │  │                     │
│                     │  │                     │  │                     │
│                     │  │ • Send vendor       │  │                     │
│                     │  │   notification      │  │                     │
│                     │  │   email             │  │                     │
│                     │  │                     │  │                     │
│                     │  │ • Create in-app     │  │                     │
│                     │  │   notification      │  │                     │
│                     │  │                     │  │                     │
└─────────────────────┘  └─────────────────────┘  └─────────────────────┘
```

---

## 🧪 Test Cards Reference

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                           STRIPE TEST CARDS                                    ║
╚═══════════════════════════════════════════════════════════════════════════════╝

┌───────────────────────────┬──────────────────────────────────────────────────┐
│ Card Number               │ Description                                      │
├───────────────────────────┼──────────────────────────────────────────────────┤
│ 4242 4242 4242 4242       │ ✅ Visa - Successful payment                      │
├───────────────────────────┼──────────────────────────────────────────────────┤
│ 5555 5555 5555 4444       │ ✅ Mastercard - Successful payment                │
├───────────────────────────┼──────────────────────────────────────────────────┤
│ 4000 0000 0000 9995       │ ❌ Insufficient funds                             │
├───────────────────────────┼──────────────────────────────────────────────────┤
│ 4000 0000 0000 0002       │ ❌ Card declined                                  │
├───────────────────────────┼──────────────────────────────────────────────────┤
│ 4000 0025 0000 3155       │ 🔐 Requires 3D Secure authentication              │
├───────────────────────────┼──────────────────────────────────────────────────┤
│ 4000 0000 0000 0341       │ ❌ Always fails at attach                         │
├───────────────────────────┼──────────────────────────────────────────────────┤
│ 4000 0000 0000 3220       │ 🔐 3DS2 required on all transactions              │
└───────────────────────────┴──────────────────────────────────────────────────┘

For all test cards use:
  • Expiry: Any future date (e.g., 12/34)
  • CVC: Any 3 digits (e.g., 123)
  • ZIP: Any 5 digits (e.g., 12345)
```

---

## 📱 Environment Variables

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                           REQUIRED ENV VARIABLES                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│   # ==========================================                                  │
│   # Stripe Configuration                                                        │
│   # ==========================================                                  │
│                                                                                 │
│   # Server-side secret key (starts with sk_)                                    │
│   STRIPE_SECRET_KEY=sk_test_51xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx                 │
│                                                                                 │
│   # Client-side publishable key (starts with pk_)                               │
│   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx       │
│                                                                                 │
│   # Webhook signing secret (starts with whsec_)                                 │
│   STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx                  │
│                                                                                 │
│   # ==========================================                                  │
│   # Application URLs                                                            │
│   # ==========================================                                  │
│                                                                                 │
│   # Base URL for redirects after Stripe onboarding                              │
│   VITE_APP_URL=http://localhost:3000                                            │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘

Where to find these:
  • API Keys: https://dashboard.stripe.com/test/apikeys
  • Webhook Secret: https://dashboard.stripe.com/test/webhooks
  • Or use Stripe CLI: stripe listen --forward-to localhost:3000/api/webhooks/stripe
```
