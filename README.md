# 🚀 All-in-One Social Media Platform

A centralized platform to create, manage, and publish content across multiple social media platforms with a single click.

---

## 📌 Overview

This project allows users to:
* Create content once
* Customize per platform
* Publish instantly or schedule posts
* Manage multiple social accounts

Supported platforms (MVP):
* Twitter (X)
* LinkedIn

Future support:
* Instagram
* Facebook
* YouTube

---

## 🏗️ Architecture

### 1. Frontend
* **Framework:** React / Next.js
* **Features:** User dashboard, Post editor, Platform selector

### 2. Backend
* **Framework:** Node.js (Express)
* **Features:** Handles authentication, post processing, API communication

### 3. Queue System
* **Tech:** Redis + BullMQ
* **Features:** Handles background jobs for publishing posts reliably

### 4. Database
* **Tech:** PostgreSQL (via Prisma ORM)

### 5. Storage
* **Tech:** AWS S3 / Cloudinary for media files

---

## 🔁 Workflow

1. User creates a post.
2. Selects target platforms.
3. Content is normalized per platform.
4. Job is added to the BullMQ queue.
5. Worker processes job and publishes to each platform via APIs.

---

## 🔐 Authentication

OAuth 2.0 is used for connecting social accounts.

Each user stores:
* Access token
* Refresh token
* Expiry time

---

## 🗂️ Database Schema

Included in `backend/prisma/schema.prisma`:
* `User`
* `Account`
* `Post`
* `PostTarget`

---

## ⚙️ Setup Instructions

### Prerequisites
* Node.js (v18+)
* PostgreSQL
* Redis

### 1. Setup Backend
```bash
cd backend
npm install
# Set up .env variables based on .env.example
npx prisma db push
npm run dev
```

### 2. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🔌 API Endpoints (Backend)

* `POST /api/posts` - Create Post
* `GET /api/auth/:platform` - Connect Account
* `POST /api/posts/:id/publish` - Publish Post

---

## 🚧 Limitations & Future
* Not all platforms allow direct posting.
* API rate limits apply.
* **Future:** Post scheduling calendar, analytics dashboard, AI caption generator, auto media resizing, and team collaboration.

---

## 📄 License
MIT License

# ALL-IN-ONE
