# 🛍️ NovaStore — E-Commerce Frontend Application

**NovaStore** is a modern, full-stack e-commerce web application built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS** on the frontend, powered by a **Strapi REST API** backend. It features a user profile system, dynamic cart and wishlist management, and a streamlined cash-on-delivery checkout workflow.

### 🔗 [Live Demo](https://nova-store-git-main-ahmed-hamdy.vercel.app/)

---

## ✨ Features

### User Authentication & Security
- **Token-based Authentication:** Secure JWT storage in `localStorage` for persistent user sessions.
- **Route Protection:** Client-side layout guards (`app/profile/layout.tsx`) protecting user-specific routes such as Profile, Orders, Wishlist, and Checkout.

### User Profile & Dashboard
- **Profile Overview:** Displays user details and account status.
- **Activity Cards:** Quick navigation links to Wishlist and Order history with dynamic item counters.
- **Optimized Metrics:** Fast counter queries using Strapi pagination metadata (`meta.pagination.total`) for minimal data transfer.

### Wishlist Management
- **Dedicated Wishlist View:** `/profile/wishlist` page rendering all user-saved products.
- **Real-Time State Synchronization:** Instant removal of products from the UI upon deletion without page reloads.

### Cart & Checkout Workflow
- **Cart Tracking:** Dynamic calculation and synchronization of cart subtotal and total in `localStorage`.
- **Event-Driven Header Sync:** Custom `cartUpdated` window events to update cart indicators across the navigation bar instantly.
- **Cash on Delivery (COD):** Simplified checkout form tailored specifically for Cash on Delivery orders.
- **Automated Cart Cleanup:** Automatic removal of all user cart items from Strapi and reset of stored totals upon placing an order.

### Order History
- **Purchases Overview:** `/profile/orders` page displaying a complete list of previous orders.
- **Order Details:** Displays truncated Order IDs, creation dates, order status tags, and total costs.

---

## 🛠️ Tech Stack

- **Frontend Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** React Icons (`react-icons`)
- **Backend API:** Strapi CMS (REST API)
- **State & Communication:** Client State, `localStorage`, Custom DOM Events

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory of the project and define your Strapi backend URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:1337
```

> **Note:** Make sure your local Strapi server is running on port `1337` before starting the frontend application.

---

## ⚙️ Backend Repository

This frontend application connects to a custom Strapi Headless CMS backend. You can find the backend source code, API endpoints, and content types here:
- **Strapi Backend:** [backend_strapi](https://github.com/Ahmed207-dev/backend_strapi)

---

## 🚀 Getting Started

1. **Clone and start the Strapi backend** from the [backend_strapi](https://github.com/Ahmed207-dev/backend_strapi) repository.
2. **Clone this frontend repository:**
   ```bash
   git clone [https://github.com/Ahmed207-dev/nova-store.git](https://github.com/Ahmed207-dev/nova-store.git)
   cd nova-store
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Configure environment variables:** Create a `.env.local` file in the root folder and add `NEXT_PUBLIC_API_URL=http://localhost:1337`.
5. **Run the development server:**
   ```bash
   npm run dev
   ```
