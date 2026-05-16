<div align="center">

# 🌌 Translify

### AI-Powered Gamified Language Learning Platform

<br/>

**Master any language through AI translation, interactive quizzes, and gamified progression — wrapped in a cinematic dark-mode experience.**

<br/>

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v5-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-2.0_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-CDN-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)](LICENSE)

<br/>

<img src="https://img.shields.io/badge/Status-Production_Ready-brightgreen?style=flat-square" alt="Status"/>
&nbsp;
<img src="https://img.shields.io/badge/Architecture-MVC-blueviolet?style=flat-square" alt="Architecture"/>
&nbsp;
<img src="https://img.shields.io/badge/UI-Glassmorphic_Dark_Mode-1a1c1e?style=flat-square" alt="UI"/>

---

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-api-reference">API Reference</a> •
  <a href="#-design-system">Design System</a> •
  <a href="#-roadmap">Roadmap</a>
</p>

</div>

<br/>

## 🎯 About

Translify is a **production-grade, full-stack web application** that merges the power of **Google's Gemini AI** with gamified learning mechanics to create an immersive language learning experience. Every interaction — from translating a sentence to completing a quiz — earns XP, builds streaks, and levels up your linguistic profile.

> *"Where every word is a step in your journey."*

### Why Translify?

| Problem | Translify's Solution |
|:--------|:---------------------|
| Translation apps lack learning context | AI-powered sentence improvement & word-by-word breakdowns |
| Language learning feels like a chore | Gamification engine with XP, streaks, levels & progress tracking |
| Generic, uninspiring UI kills motivation | Cinematic glassmorphic dark-mode interface with micro-animations |
| No feedback on grammar quality | AI tutor scores grammar and provides actionable improvement tips |
| Most tools are either translate OR learn | Unified platform: translate, learn, practice — all in one |

<br/>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🤖 AI-Powered Translation Engine
- Real-time translation via **Google Gemini 2.0 Flash**
- Automatic language detection → any target language
- In-memory **LRU cache** (500 entries, 1hr TTL) for instant repeat lookups
- Database deduplication — never re-translate the same sentence
- **Multi-provider fallback chain**: Gemini AI → Lingva API → Mock (zero downtime)
- Configurable source/target languages via dynamic dropdown

</td>
<td width="50%">

### 🧠 AI Language Tutor
- **Sentence Improvement** — AI analyzes grammar, suggests natural phrasing, and returns a grammar score (0–100)
- **Word Breakdown** — Deep linguistic analysis with part-of-speech tagging, cultural context, and example sentences
- **Translation History** — Persistent history with search & review capabilities

</td>
</tr>
<tr>
<td width="50%">

### 🎮 Gamification System
- **XP Points** — Earn experience for correct quiz answers
- **Daily Streaks** — Consecutive login tracking with automatic reset
- **Level Progression** — Auto-level-up every 100 XP
- **Progress Tracking** — Visual progress bars synced with MongoDB as single source of truth
- **Lesson Completion** — Track completed lessons and accuracy per session

</td>
<td width="50%">

### 🔐 Enterprise-Grade Auth
- **JWT Bearer tokens** with 7-day expiry
- **bcrypt** password hashing (salt rounds auto-managed)
- Protected API routes via custom auth middleware
- Auto-redirect for unauthenticated users
- Strict input validation on all auth endpoints

</td>
</tr>
<tr>
<td width="50%">

### 🛡️ Security & Performance
- Rate limiting — **100 req/15 min** per IP
- Standardized JSON error responses
- Database-first initialization (server listens only after DB connects)
- CORS configured for multi-origin development
- Modular environment configuration via `.env`

</td>
<td width="50%">

### 🎨 Premium UI/UX
- **Glassmorphic dark-mode** design language
- Cinematic page transitions with fade-in animations
- Interactive hover states with spring-physics easing
- Constellation-style progress map visualization
- Toast notification system
- Fully responsive — desktop sidebar, mobile-first layouts

</td>
</tr>
</table>

<br/>

---

## 🛠 Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|:------|:-----------|:--------|
| **Frontend** | HTML5, Tailwind CSS (CDN), Vanilla JS | Glassmorphic UI with micro-animations |
| **Backend** | Node.js, Express.js v5 | RESTful API server |
| **Database** | MongoDB Atlas + Mongoose ODM | User data, translations, lessons |
| **AI Engine** | Google Gemini 2.0 Flash | Translation, grammar analysis, explanations |
| **Auth** | JWT + bcrypt | Stateless authentication |
| **Fallback API** | Lingva Translate | Backup translation provider |
| **Security** | express-rate-limit | DDoS protection & abuse prevention |
| **Typography** | Inter (UI) + Newsreader (Headlines) | Premium dual-font system |
| **Icons** | Material Symbols Outlined | Consistent iconography |
| **Dev Tools** | Nodemon, dotenv | Hot-reload & config management |

</div>

<br/>

---

## 🏗 Architecture

```
Translify/
│
├── 📄 login.html                 # Cinematic onboarding — JWT login
├── 📄 register.html              # User registration
├── 📄 Dashboard.html             # Dynamic dashboard with real-time user data
├── 📄 Translator.html            # AI-powered translator with tutor features
├── 📄 quiz.html                  # Interactive quiz with XP rewards
├── 📄 Navigation.html            # Navigation hub
├── 📄 language.html              # Language selection interface
├── 📄 Activelearning.html        # Active learning exercises
├── 📄 Challenge.html             # Weekly linguistic challenges
├── 📄 Coursereview.html          # Course review & archives
├── 📄 Editprofile.html           # Profile editing
├── 📄 Userprofile.html           # User profile display
├── 📄 Settings.html              # Application settings
├── 📄 notification.html          # Notification center
├── 📄 logout.html                # Secure logout flow
├── 📄 config.js                  # Frontend environment config (auto-detects local vs prod)
├── 📄 utils.js                   # Shared frontend utility helpers
│
└── 📁 backend/
    ├── 📄 server.js              # Express entry — CORS, rate limit, static serving
    ├── 📄 seed.js                # Database seeder for lesson content
    ├── 📄 .env.example           # Environment variable template
    ├── 📄 package.json           # Dependencies & scripts
    │
    ├── 📁 controllers/           # Business Logic (MVC)
    │   ├── authController.js     # Register, Login, Get User
    │   ├── translateController.js # Translate, Improve, Explain, History
    │   └── lessonController.js   # Lesson retrieval & answer submission
    │
    ├── 📁 routes/                # API Route Definitions
    │   ├── auth.js               # /api/register, /api/login, /api/user
    │   ├── translate.js          # /api/translate, /api/translate/history, /improve, /explain
    │   └── lesson.js             # /api/lessons, /api/submit
    │
    ├── 📁 middleware/            # Custom Middleware
    │   ├── auth.js               # JWT Bearer token verification
    │   └── errorHandler.js       # Global error handler
    │
    └── 📁 models/                # Mongoose Schemas
        ├── User.js               # User (name, email, password, xp, streak, level, progress)
        ├── Lesson.js             # Lesson (title, questions with options & correctAnswer)
        └── Translation.js        # Translation (user, original, translated, langs, timestamps)
```

### Data Flow

```
┌─────────────┐    JWT Bearer     ┌──────────────┐     Mongoose      ┌──────────────┐
│   Frontend   │ ──────────────► │  Express API  │ ──────────────► │  MongoDB      │
│  (HTML/JS)   │ ◄────────────── │  (Node.js)    │ ◄────────────── │  Atlas        │
└─────────────┘    JSON Response  └──────┬───────┘                  └──────────────┘
                                         │
                                         │ Gemini AI SDK
                                         ▼
                                  ┌──────────────┐
                                  │  Google       │
                                  │  Gemini 2.0   │
                                  │  Flash        │
                                  └──────┬───────┘
                                         │
                                         │ Fallback
                                         ▼
                                  ┌──────────────┐
                                  │  Lingva API   │
                                  │  (Backup)     │
                                  └──────────────┘
```

<br/>

---

## ⚡ Getting Started

### Prerequisites

| Requirement | Version | Link |
|:------------|:--------|:-----|
| Node.js | v18+ | [Download](https://nodejs.org/) |
| MongoDB Atlas | Free tier | [Sign up](https://www.mongodb.com/atlas) |
| Google AI Studio | API key | [Get key](https://aistudio.google.com/apikey) |
| Git | Latest | [Download](https://git-scm.com/) |

### Installation

```bash
# 1 — Clone the repository
git clone https://github.com/Rajommkar/Language-learner.git
cd Language-learner

# 2 — Install backend dependencies
cd backend
npm install

# 3 — Configure environment variables
cp .env.example .env
```

### Environment Setup

Open `backend/.env` and configure:

```env
# MongoDB connection string (get from Atlas dashboard)
MONGO_URI=mongodb+srv://<username>:<password>@cluster.xxxxx.mongodb.net/translify

# JWT secret key (use a strong random string)
JWT_SECRET=your_super_secret_key_here

# Google Gemini API key (get from AI Studio)
GEMINI_API_KEY=your_gemini_api_key_here
```

### Launch

```bash
# Seed the database with lesson content (first time only)
node seed.js

# Start development server with hot-reload
npm run dev
```

The API server starts at `http://localhost:5000`. Open any HTML file via Live Server (VS Code) or navigate to `http://localhost:5000/login.html`.

### Quick Verification

```bash
# Test the server is running
curl http://localhost:5000/
# Expected: "Server is running 🚀"
```

<br/>

---

## 📡 API Reference

All endpoints are prefixed with `/api`. Protected routes require a `Bearer` token in the `Authorization` header.

### Authentication

| Method | Endpoint | Auth | Description |
|:------:|:---------|:----:|:------------|
| `POST` | `/api/register` | ❌ | Create a new user account |
| `POST` | `/api/login` | ❌ | Authenticate & receive JWT token |
| `GET` | `/api/user` | ✅ | Get current user profile & stats |

### Translation & AI Tutor

| Method | Endpoint | Auth | Description |
|:------:|:---------|:----:|:------------|
| `POST` | `/api/translate` | ✅ | Translate text (Gemini AI → Lingva fallback) |
| `GET` | `/api/translate/history` | ✅ | Retrieve user's translation history (last 50) |
| `POST` | `/api/translate/improve` | ❌ | AI grammar improvement with score |
| `POST` | `/api/translate/explain` | ❌ | AI word-by-word breakdown & cultural context |

### Lessons & Gamification

| Method | Endpoint | Auth | Description |
|:------:|:---------|:----:|:------------|
| `GET` | `/api/lessons` | ✅ | Retrieve available lessons |
| `POST` | `/api/submit` | ✅ | Submit quiz answer & earn XP |

### Example Requests

<details>
<summary><b>📝 Register a new user</b></summary>

```bash
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ommkar",
    "email": "ommkar@example.com",
    "password": "securepass123"
  }'
```

**Response** `201 Created`:
```json
{
  "message": "User registered successfully"
}
```
</details>

<details>
<summary><b>🔑 Login & get token</b></summary>

```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ommkar@example.com",
    "password": "securepass123"
  }'
```

**Response** `200 OK`:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```
</details>

<details>
<summary><b>🌐 Translate text</b></summary>

```bash
curl -X POST http://localhost:5000/api/translate \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Bonjour le monde",
    "sourceLang": "fr",
    "targetLang": "en"
  }'
```

**Response** `200 OK`:
```json
{
  "original": "Bonjour le monde",
  "translated": "Hello world",
  "source": "ai"
}
```
</details>

<details>
<summary><b>🧠 AI Grammar Improvement</b></summary>

```bash
curl -X POST http://localhost:5000/api/translate/improve \
  -H "Content-Type: application/json" \
  -d '{ "text": "Je suis allé au le magasin hier" }'
```

**Response** `200 OK`:
```json
{
  "original": "Je suis allé au le magasin hier",
  "improved": "Je suis allé au magasin hier",
  "translated": "I went to the store yesterday",
  "tips": ["Remove the extra article 'le' after 'au'"],
  "grammarScore": 80
}
```
</details>

<details>
<summary><b>📖 AI Word Breakdown</b></summary>

```bash
curl -X POST http://localhost:5000/api/translate/explain \
  -H "Content-Type: application/json" \
  -d '{ "text": "Hola amigo" }'
```

**Response** `200 OK`:
```json
{
  "original": "Hola amigo",
  "fullMeaning": "Hello friend",
  "language": "Spanish",
  "wordBreakdown": [
    { "original": "Hola", "meaning": "Hello", "partOfSpeech": "interjection" },
    { "original": "amigo", "meaning": "friend", "partOfSpeech": "noun" }
  ],
  "culturalContext": "A common informal greeting in Spanish-speaking countries...",
  "exampleSentences": ["¡Hola amigo! ¿Cómo estás?"]
}
```
</details>

<br/>

---

## 🎨 Design System

Translify follows the **"Architectural Sophistication"** design philosophy — a cinematic, dark-mode glassmorphic aesthetic inspired by premium creative tools and editorial interfaces.

### Color Palette

| Token | Value | Preview | Usage |
|:------|:------|:-------:|:------|
| **Surface** | `#121416` | ![#121416](https://via.placeholder.com/16/121416/121416?text=+) | Base background |
| **Frosted Obsidian** | `rgba(18,20,22,0.85)` + `blur(32px)` | ![#121416](https://via.placeholder.com/16/121416/121416?text=+) | Glass panels, cards |
| **Primary** | `#b0c6ff` | ![#b0c6ff](https://via.placeholder.com/16/b0c6ff/b0c6ff?text=+) | Accents, CTAs, active states |
| **Primary Container** | `#0f52ba` | ![#0f52ba](https://via.placeholder.com/16/0f52ba/0f52ba?text=+) | Buttons, gradients |
| **On-Surface** | `#e2e2e5` | ![#e2e2e5](https://via.placeholder.com/16/e2e2e5/e2e2e5?text=+) | Primary text |
| **Outline** | `#8d909e` | ![#8d909e](https://via.placeholder.com/16/8d909e/8d909e?text=+) | Borders, secondary text |
| **Surface Container** | `#1e2022` | ![#1e2022](https://via.placeholder.com/16/1e2022/1e2022?text=+) | Elevated surfaces |

### Typography

| Role | Font | Weight | Size |
|:-----|:-----|:------:|:----:|
| Headlines & Display | Newsreader | 300–500 | 24–64px |
| Body & Labels | Inter | 400–600 | 12–18px |

### Motion

| Pattern | Easing | Duration |
|:--------|:-------|:---------|
| Page Entrance | `ease-out` | 400ms |
| Card Hover | `cubic-bezier(0.16, 1, 0.3, 1)` | 400ms |
| Button Press | `linear` | 100ms |
| Toast Slide-in | `cubic-bezier(0.16, 1, 0.3, 1)` | 400ms |

<br/>

---

## 🗺 Roadmap

| Phase | Feature | Status |
|:------|:--------|:------:|
| ✅ | Core authentication system (JWT + bcrypt) | **Done** |
| ✅ | AI-powered translator with Gemini 2.0 | **Done** |
| ✅ | Gamification engine (XP, streaks, levels) | **Done** |
| ✅ | Interactive quiz with XP rewards | **Done** |
| ✅ | AI Tutor — grammar improvement & word breakdown | **Done** |
| ✅ | Cinematic glassmorphic UI overhaul | **Done** |
| ✅ | Translation history & caching layer | **Done** |
| 🔜 | Conversational AI tutor with voice input | **Planned** |
| 🔜 | Competitive leaderboards & leagues | **Planned** |
| 🔜 | Linguistic analytics & retention graphs | **Planned** |
| 🔜 | React / Next.js migration | **Planned** |
| 🔜 | PWA support & offline mode | **Planned** |

<br/>

---

## 🤝 Contributing

Contributions are welcome! Whether it's a bug fix, new feature, or design improvement — every PR makes Translify better.

```bash
# 1 — Fork the repository
# 2 — Create a feature branch
git checkout -b feature/amazing-feature

# 3 — Commit your changes
git commit -m "feat: add amazing feature"

# 4 — Push and open a Pull Request
git push origin feature/amazing-feature
```

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

<br/>

---

## 📄 License

Distributed under the **ISC License**. See `LICENSE` for more information.

<br/>

---

<div align="center">

<br/>

**Built with ❤️ and a passion for languages**

*Translify — Where every word is a step in your journey*

<br/>

⭐ **Star this repo** if Translify helped you learn something new!

<br/>

<sub>Made by <a href="https://github.com/Rajommkar">@Rajommkar</a></sub>

</div>
