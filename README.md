# 🚀 Certificate Verification System

A production-grade MERN stack application for issuing and verifying certificates securely.

---

## 🔥 Features

* JWT Authentication (Admin/User)
* Excel Bulk Upload
* Certificate Generation (PDF)
* QR Code Verification
* Public Verification API
* Tamper Detection (Hashing)
* Role-Based Access Control
* Secure APIs & Rate Limiting

---

## 🏗️ Tech Stack

* Frontend: React.js + Tailwind
* Backend: Node.js + Express
* Database: MongoDB
* Auth: JWT + bcrypt

---

## ⚙️ Setup Instructions

### 1. Clone Repo

```bash
git clone https://github.com/your-username/certificate-verification-system.git
```

### 2. Backend Setup

```bash
cd backend
npm install
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create `.env` in backend:

```
MONGO_URI=
JWT_SECRET=
JWT_REFRESH_SECRET=
BASE_URL=http://localhost:5000
```

---

## 📡 API Endpoints

* POST /api/auth/register
* POST /api/auth/login
* POST /api/upload/excel
* GET /api/certificates/:id
* GET /api/certificates/verify/:id

---

## 👨‍💻 Author

Rajeev Dahiya
