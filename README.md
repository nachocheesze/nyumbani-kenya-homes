# 🏠 Nyumbani - Smart African Property Management Platform

**Nyumbani** is a full-featured real estate and property management web platform designed for the African market, starting with Kenya. Inspired by Zillow, it empowers landlords, tenants, agents, and real estate companies to manage properties, leases, payments, and services with ease.

---

## 🚀 Features

### 🔑 Authentication & User Roles
- Supabase-auth with email/password
- Role-based access: `tenant`, `landlord`, `agent`, `real_estate_company`, `admin`, `super_admin`, `caretaker`, `developer`, `investor`, `short_term_host`, `service_provider`
- Auto-profile creation with secure protected routes

### 🏠 Property Management
- Add, edit, and manage property listings
- Assign agents to properties
- Location mapping and property amenities
- Advanced property search and comparison (planned)

### 👤 Tenant Management
- Add and manage tenants
- View rental history, lease terms, and payment status
- Move-in/out checklists and profile verification

### 💳 Wallet & Payments
- Integrated wallet system (via Paystack)
- Rent deposits and withdrawals
- Micro-loans and rent advances (bank partnerships ready)
- Landlord/agent payout tracking

### 🛠 Maintenance & Services
- Maintenance ticketing system for tenants
- Service provider marketplace (plumbers, electricians, etc.)
- Smart home upgrade support
- Utility outage reporting and WiFi comparison

### 📊 Dashboards
- Fully role-based dashboards
- Overview and actions tailored per role
- Admin/Super Admin can manage users, roles, and the platform

### 🏢 Real Estate Company Support
- Companies can manage agents and properties
- Assign properties to agents
- Integrated team operations

### 📂 Additional Tools (Planned/Active)
- Insurance partnerships integration
- Developer-landlord matching
- Receipt and report generation (for caretakers)
- Messaging, document management, and notifications

---

## 🛠 Tech Stack

- **Frontend:** React + Vite + TypeScript + Tailwind CSS
- **Backend:** Supabase (Database + Auth + RLS Policies)
- **Payments:** Paystack
- **Hosting:** Vercel (recommended) or any modern frontend platform
- **State Management:** Supabase hooks + React Context

---

## 🔐 Roles and Access (Sample)

| Role               | Can Add Property | Can Add Tenant | Special Features                             |
|--------------------|------------------|----------------|-----------------------------------------------|
| Tenant             | ❌               | ❌             | Wallet, payment history, maintenance          |
| Landlord           | ✅               | ✅             | Properties, tenants, lease management         |
| Agent              | ✅ (if assigned) | ✅             | Assigned properties only                      |
| Real Estate Company| ✅               | ✅             | Manage agents, assign properties              |
| Admin              | ✅               | ✅             | Manage users, full access                     |
| Super Admin        | ✅               | ✅             | Platform-wide control                         |
| Caretaker          | ❌               | ❌             | View water usage, manage waste, receipts      |

---

## 🧪 Running Locally

```bash
git clone https://github.com/yourusername/nyumbani.git
cd nyumbani
npm install
npm run dev
