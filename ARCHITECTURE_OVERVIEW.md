# 🏗️ Architecture Overview – Bidsphere B2B Platform

## 📦 API Design

All routes follow RESTful conventions and are organized as:

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/auth/signup` | POST | ❌ | Create new user |
| `/api/auth/login` | POST | ❌ | Authenticate user and return JWT |
| `/api/company` | GET | ✅ | Fetch logged-in user's company |
| `/api/company` | POST | ✅ | Create company profile |
| `/api/company` | PUT | ✅ | Update company profile |
| `/api/tenders` | POST | ✅ | Create a new tender |
| `/api/tenders` | GET | ✅ | List logged-in company's tenders |
| `/api/tenders/:id` | PUT | ✅ | Update a tender |
| `/api/tenders/:id` | DELETE | ✅ | Delete a tender |
| `/api/explore/tenders` | GET | ✅ | Explore tenders by other companies |
| `/api/explore/propose/:id` | POST | ✅ | Send a proposal on a tender |

---

## 🔐 Authentication Flow

- User signs up or logs in using:
  - `POST /api/auth/signup`
  - `POST /api/auth/login`
- On successful login, a **JWT token** is returned.
- The token is stored in **localStorage** on the frontend.
- All protected routes check for token via a middleware:
  - `Authorization: Bearer <token>`
- If token is missing/invalid/expired → user is redirected to `/login`.

---

## 🗂 Storage Integration (Supabase)

- Company logos/images are uploaded to **Supabase Storage**.
- After uploading, the **public URL** of the image is stored in the `logo_url` field of the company table.
- Images are displayed using `<img src="logo_url" />` in dashboard & explore pages.

---

## 💾 Tech Stack

- **Frontend**: HTML/CSS + JavaScript (with ongoing migration to Next.js)
- **Backend**: Node.js + Express.js
- **Database**: PostgreSQL (via Supabase)
- **Storage**: Supabase Storage
- **Auth**: JWT (stateless token-based)

---

> Built with ❤️ as part of internship assignment.  

Added architecture overview markdown
