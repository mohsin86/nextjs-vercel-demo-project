# 🚀 Next.js Full Stack User Management System

A full-stack web application built with **Next.js, Prisma, PostgreSQL, and JWT authentication**, featuring user registration, authentication, and admin-level management features.

---

## 🌐 Live Demo

👉 https://nextjs-vercel-demo-project.vercel.app/

---

## 📌 Features

### 👤 User Features
- User registration with validation (React Hook Form + Zod)
- Secure login with JWT authentication
- Password hashing (bcrypt)
- Forgot password / reset password flow
- Profile management

---

### 🛠️ Admin Features
After admin login, the admin can:

- 👥 Manage users (view, create, update, delete)
- ✅ Manage todos assigned to users
- 🔐 Change user passwords securely
- 📊 Access full system data control panel

---

## 🔐 Authentication & Security
- JWT-based authentication system
- Protected API routes
- Password hashing using bcrypt
- Role-based access control (Admin / User)

---

## 🧰 Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Auth:** JWT (jose)
- **Validation:** Zod + React Hook Form

---

## 🗄️ Database Models

- User
- Todo
- Role-based access system

---

## ⚙️ Setup Instructions

```bash
# install dependencies
npm install

# generate prisma client
npx prisma generate

# run migrations
npx prisma migrate dev

# start development server
npm run dev