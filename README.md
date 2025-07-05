# 🏢 Bidsphere — B2B Tender Management Platform

Bidsphere is a professional platform where companies can:
- Register & manage their profile
- Create, edit, and delete tenders
- Browse and apply to tenders from other companies
- Submit proposals
- Manage everything from a modern dashboard

---

## 🔧 Tech Stack

- Frontend: HTML, CSS, JavaScript *(later upgraded to Next.js)*
- Backend: Node.js, Express.js
- Database: PostgreSQL (via Supabase) https://dbdiagram.io/d
- Authentication: JWT
- Hosting: Vercel (frontend), Render (backend)

---

## 📦 Folder Structure

bidsphere/
├── backend/
├── frontend/
├── frontend-next/
└── README.md

yaml
Copy
Edit


---

## 🛠️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/aayushi2882/bidsphere.git
cd bidsphere

2️⃣ Backend Setup
bash
Copy
Edit
cd backend
npm install
🔐 Create a .env file inside /backend with:

ini
Copy
Edit
PORT=5000
DATABASE_URL=your_postgresql_url
JWT_SECRET=your_jwt_secret
➡️ Then run:

bash
Copy
Edit
npm run dev
🟢 Backend runs on: http://localhost:5000

3️⃣ Frontend Setup (Plain HTML Version)
Just open frontend/login.html or frontend/dashboard.html in your browser.

4️⃣ Frontend Setup (Next.js Version)
bash
Copy
Edit
cd frontend-next
npm install
npm run dev
🟢 Next.js runs on: http://localhost:3000

🧪 Test Credentials
makefile
Copy
Edit
Email: test@example.com
Password: test1234

📌 Features
🔐 JWT Auth

🏢 Company profile CRUD

📑 Tender management

🌐 Explore tenders & submit proposals

🖼️ Logo uploads with Supabase Storage


---

### ✅ STEP 3: Save and Push to GitHub

Open terminal in that same folder and run:

```bash
git add README.md
git commit -m "📝 Add complete README with setup instructions"
git push origin main
