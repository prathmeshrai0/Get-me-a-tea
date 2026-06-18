## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Overview

```text
OAuth Authentication
        ↓
Creator Profile Management
        ↓
Dynamic Donation Pages
        ↓
Razorpay Order Creation
        ↓
Payment Verification
        ↓
Transaction History
```
 
<details>
<summary>Key Concepts Used</summary>

## Authentication (NextAuth)

Implemented GitHub OAuth authentication using NextAuth. When a user signs in, the application checks whether the user already exists in MongoDB. If not, a new user profile is automatically created. Session callbacks are used to attach custom user information such as username and profile picture to the authenticated session.

---

## Dynamic Web Pages

Implemented dynamic routing using Next.js App Router. Each user receives a personalized public donation page accessible through:

/users/[username]

User-specific information and donation history are fetched dynamically from MongoDB based on the username present in the URL.

---

## Razorpay Order Creation

Integrated the Razorpay Node.js SDK to create payment orders dynamically. When a supporter initiates a donation, the backend creates a Razorpay order using the creator's payment credentials and stores a pending transaction record in MongoDB.

---

## Payment Verification

After a successful payment, Razorpay sends the order ID, payment ID, and signature to the backend. The application verifies the payment signature using Razorpay's verification utility before marking the transaction as completed. This prevents unauthorized or fake payment confirmations.

---

## MongoDB & Mongoose

Used MongoDB Atlas as the cloud database and Mongoose as the ODM (Object Data Modeling) library.

Created dedicated schemas and models for:

- User Management
- Payment Records

The User model stores profile information and payment configuration, while the Payment model stores donation details, transaction status, contributor information, and payment history.

---

## Database Operations

Implemented CRUD operations using Mongoose, including:

- User profile creation
- User profile updates
- Fetching user information
- Creating payment records
- Updating payment status
- Retrieving donation history

Maintained data consistency when usernames are updated by synchronizing related payment records.

---

## Backend Development

Implemented backend business logic using Next.js Server Actions and API Routes.

Server Actions are used for:

- User profile updates
- Order creation
- Data retrieval

API Routes are used for:

- Payment verification
- Payment status handling

---

## Deployment

Deployed the application on Vercel and connected it with MongoDB Atlas for cloud-hosted data storage. Environment variables were used to securely manage database connections, authentication credentials, and payment gateway configuration.
</details>
<details>
<summary>Razorpay Payment Flow</summary>
## 1. User Clicks "Pay"

Frontend sends donation details:

```js
await initiate(amount, username, paymentForm);
```

Example:

```text
Amount = ₹100
Donor = Rahul
Creator = Prathmesh
```

↓

## 2. Backend Creates Razorpay Order

```js
var instance = new Razorpay({
  key_id: razorpayID,
  key_secret: razorpaySecret,
});

let x = await instance.orders.create({
  amount: 10000, // paise
  currency: "INR",
});
```

Razorpay returns:

```json
{
  "id": "order_ABC123"
}
```

↓

## 3. Store Pending Transaction

```js
await Payment.create({
  oid: x.id,
  amount: amount / 100,
  isDone: false,
});
```

MongoDB:

```text
order_ABC123
Status = Pending
```

↓

## 4. Send Order ID Back To Frontend

```js
return x;
```

Frontend receives:

```text
order_ABC123
```

↓

## 5. Open Razorpay Checkout

```js
var rzp1 = new Razorpay(options);
rzp1.open();
```

Razorpay popup opens:

```text
UPI
Cards
Net Banking
Wallets
```

↓

## 6. User Makes Payment

```text
User Pays ₹100
```

Money Flow:

```text
Donor
  ↓
Razorpay
  ↓
Creator's Razorpay Account
```

↓

## 7. Razorpay Sends Payment Details

Razorpay sends:

```text
razorpay_order_id
razorpay_payment_id
razorpay_signature
```

to:

```text
/api/razorpay
```

↓

## 8. Verify Payment

```js
let isPaymentDone = validatePaymentVerification(
  {
    order_id: body.razorpay_order_id,
    payment_id: body.razorpay_payment_id,
  },
  body.razorpay_signature,
  razorpaySecret,
);
```

Purpose:

```text
Confirm payment actually came from Razorpay
```

↓

## 9. Update Transaction Status

```js
await Payment.findOneAndUpdate(
  { oid: body.razorpay_order_id },
  { isDone: true },
);
```

MongoDB:

```text
order_ABC123
Status = Completed
```

↓

## 10. Redirect User

```js
return NextResponse.redirect(
  `/users/${updatePayment.to_user}?payment-done=true`,
);
```

↓

## 11. Display Donation History

```js
fetchPayments(username);
```

Shows:

```text
Rahul donated ₹100
Aman donated ₹50
Neha donated ₹200
```

---

Question: Why is Order ID Needed?

Answer:

Order ID uniquely identifies a payment request.

Example:

```text
Rahul → ₹100
Aman  → ₹50
Neha  → ₹200
```

Razorpay creates:

```text
order_A
order_B
order_C
```

After payment, Razorpay sends back:

```text
order_B
```

Using the Order ID, the backend can identify:

- Which donation was made
- Which creator should receive it
- How much amount was paid
- Which MongoDB record should be updated

Without an Order ID, the backend would not know which payment record belongs to which transaction.

In short:

Order ID acts as a unique transaction reference that connects Razorpay payments with records stored in MongoDB.

 </details>

<details> 
  <summary>Questions</summary>

  ### Why MongoDB (NoSQL) Instead of SQL?

  #### Interview Answer

  I chose MongoDB because the application's data was naturally document-oriented. The project primarily manages user profiles and payment records, which can be represented efficiently as JSON-like documents.

  MongoDB integrated well with Next.js and Mongoose, allowing me to define schemas and interact with the database using JavaScript objects.

  Although a relational database such as MySQL or PostgreSQL could also be used, the project did not require complex joins or highly relational data structures. Most operations involved:

  - Creating and updating user profiles
  - Creating payment records
  - Verifying payments
  - Fetching donation history
  - Updating transaction status

  For these requirements, MongoDB provided a simple and flexible solution.

  ### Key Takeaway

  I selected MongoDB because the application primarily works with document-based data and does not require complex relational queries, making development faster and more straightforward.

</details>
