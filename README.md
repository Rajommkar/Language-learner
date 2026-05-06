# 🌌 Translify — AI-Powered Gamified Language Learning Platform

<div align="center">

**A full-stack, AI-powered language learning application with real-time translation, gamified progression, and an immersive cinematic UI.**

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v5-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-CDN-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

---

## 🎯 Overview

Translify is a **production-grade, full-stack web application** that combines real-time, AI-powered translation with gamified learning mechanics. Built with an "Architectural Sophistication" design philosophy, it features a dark-mode, glassmorphic UI crafted for serious learners who demand both beauty and high-fidelity functionality.

### What Makes Translify Different?

- 🤖 **AI-Powered Translator** — Real-time translation engine integrated with external APIs (with auto-translation and debounced requests)
- 🔐 **Industry-Standard Auth** — JWT-based authentication with Bearer token security and password hashing (bcrypt)
- 🎮 **Gamification Engine** — XP, daily streaks, levels, and lesson completion tracking backed into the MongoDB data model
- 🏗️ **Scalable Architecture** — Built using clean MVC pattern on the backend (controllers, routes, middleware, models)
- 🛡️ **Security First** — Embedded rate limiting, robust input validation, and protected routes

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | HTML5, Tailwind CSS (CDN), JavaScript (Vanilla, Glassmorphic UI) |
| **Backend** | Node.js, Express.js v5 |
| **Database** | MongoDB Atlas (Mongoose ODM) |
| **Authentication** | JWT (JSON Web Tokens) + Bcrypt |
| **Translation API** | LibreTranslate (configurable via .env) / Modular Gemini integration |
| **Security** | express-rate-limit, Bearer token auth, strict input validation |
| **Dev Tools** | Nodemon, dotenv, Axios |
| **Typography & Icons** | Google Fonts (Inter, Newsreader), Material Symbols |

---

## ✨ Key Features

### 🔐 Authentication System
- Secure user registration with bcrypt password hashing
- JWT-based login with 7-day token expiry
- Bearer token format (industry standard)
- Protected API routes via custom auth middleware

### 🌐 AI-Powered Translator
- Real-time text translation via external API integration
- Auto language detection → English output
- Configurable API endpoint (swap providers without code changes)
- Connected to a premium, interactive glassmorphic UI
- Debounced input event listeners to optimize API request frequency

### 📊 Dynamic Dashboard
- Personalized user data fetched dynamically from MongoDB
- Real-time display of user profile details: name, XP, level, and active streak
- Auto-redirect to login if unauthenticated
- Constellation-style progress map visualization

### 🎮 Gamification System
- **XP Points** — Earn experience through exercises and quizzes
- **Streak Tracking** — Daily login streaks with last-active timestamps
- **Level Progression** — Level up automatically as XP accumulates
- **Lesson Completion** — Track completed lessons and questions in the database

### 🛡️ Security & Best Practices
- Rate limiting (100 requests / 15 min per IP)
- Strict input validation on registration and login endpoints
- Standardized error handling with JSON response formats
- Database-first server initialization (starts listening only after successful DB connection)
- Modular environment configurations for all keys and secrets

---

## 📂 Project Structure

```
Translify/
│
├── 📄 login.html              # Login page (connected to backend)
├── 📄 Dashboard.html           # Dynamic dashboard (real user data)
├── 📄 Translator.html          # AI-powered translator UI
├── 📄 Activelearning.html      # Active learning exercises
├── 📄 Challenge.html           # Weekly challenges & quizzes
├── 📄 Coursereview.html        # Course review & archives
├── 📄 Editprofile.html         # Profile editing
├── 📄 Userprofile.html         # User profile display
├── 📄 Settings.html            # App settings
├── 📄 Navigation.html          # Navigation system
├── 📄 language.html            # Language selection
├── 📄 notification.html        # Notification center
├── 📄 logout.html              # Logout flow
├── 📄 utils.js                 # Shared frontend utility helpers
│
└── 📁 backend/
    ├── 📄 server.js            # Express server entry point
    ├── 📄 .env                 # Environment variables (gitignored)
    ├── 📄 .env.example         # Env template for developers
    ├── 📄 package.json         # Dependencies & scripts
    │
    ├── 📁 controllers/         # Business logic (MVC)
    │   ├── authController.js   # Register, Login, Get User logic
    │   └── translateController.js  # Translation logic
    │
    ├── 📁 routes/              # API route definitions
    │   ├── auth.js             # /api/register, /api/login, /api/user
    │   ├── lesson.js           # Lesson retrieval /api/lessons
    │   └── translate.js        # /api/translate
    │
    ├── 📁 middleware/          # Custom middleware
    │   └── auth.js             # JWT verification (Bearer token)
    │
    └── 📁 models/              # Mongoose schemas
        ├── User.js             # User model (with gamification fields)
        ├── Lesson.js           # Lesson questions schema
        └── Translation.js      # Translation history schema
```

---

## 🔌 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/register` | ❌ | Register a new user |
| `POST` | `/api/login` | ❌ | Login & receive JWT token |
| `GET` | `/api/user` | ✅ Bearer | Get authenticated user data |
| `POST` | `/api/translate` | ✅ Bearer | Translate text via AI API & save history |
| `GET` | `/api/translate/history` | ✅ Bearer | Retrieve translation history |
| `GET` | `/api/lessons` | ✅ Bearer | Retrieve lessons list |
| `POST` | `/api/submit` | ✅ Bearer | Submit lesson answers & reward XP |

### Example Requests

**Register:**
```bash
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Ommkar", "email": "test@example.com", "password": "123456"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "123456"}'
```

**Get User (Protected):**
```bash
curl http://localhost:5000/api/user \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Translate:**
```bash
curl -X POST http://localhost:5000/api/translate \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"text": "Hola amigo"}'
```

---

## ⚡ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (free tier works)
- [Git](https://git-scm.com/)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Rajommkar/Language-learner.git
cd Language-learner

# 2. Install backend dependencies
cd backend
npm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, and API URLs

# 4. Start the development server
npm run dev
```

### Environment Variables

Create a `.env` file inside `/backend` with:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
```

---

## 🎨 Design System — "Architectural Sophistication"

| Token | Value | Usage |
|-------|-------|-------|
| **Frosted Obsidian** | `rgba(18,20,22,0.85)` + `blur(32px)` | Glass panels, cards |
| **Primary Blue** | `#b0c6ff` / `#0f52ba` | Accents, CTAs, active states |
| **Surface** | `#121416` | Background base |
| **On-Surface** | `#e2e2e5` | Primary text |
| **Outline** | `#8d909e` | Borders, secondary text |
| **Fonts** | Inter (UI) + Newsreader (Headlines) | Typography system |

---

## 🎯 Future Improvements

- 🗣️ **Conversational AI Tutor** — Real-time audio conversation and pronunciation analysis
- 🏆 **Leaderboards** — Competitive league tables to enhance gamification
- 📊 **Linguistic Analytics** — High-fidelity retention graphs and attrition trackers
- ⚛️ **React Migration** — Complete migration of vanilla components to React/Next.js

---

## 🤝 Contribution

Contributions, issues, and feature requests are welcome! Feel free to open a pull request or submit an issue.

---

## 📜 License

This project is licensed under the ISC License.

---

<div align="center">

**Built with ❤️ and a passion for languages**

*Translify — Where every word is a step in your journey*

⭐ If you like this project, consider starring the repository!

</div>
