# 🌍 Translify — Language Learning & AI Translator Platform

Translify is a full-stack language learning web application that combines real-time translation, AI-powered assistance, and interactive learning through quizzes and progress tracking.

It is designed to deliver a modern, immersive, and gamified language learning experience.

---

## 🚀 Features

### 🔐 Authentication

* User registration and login (JWT-based)
* Secure password hashing using bcrypt
* Protected routes with middleware

### 🌐 AI Translator

* Real-time text translation
* Debounced API calls for performance optimization
* Clean and responsive UI
* Error handling and loading states

### 📜 Translation History

* Stores user-specific translation history
* Sorted by latest activity
* Dynamic UI rendering

### 🎮 Learning System (Quiz Engine)

* Lesson-based question system
* Answer validation via backend
* Instant feedback (correct/incorrect)
* Smooth question transitions

### 📊 Gamification & Progress Tracking

* XP-based reward system
* Lesson completion tracking
* Progress percentage calculation
* Dashboard reflecting real-time updates

### 🧠 AI Tutor (Experimental)

* Sentence improvement suggestions
* Explanation of text (modular backend support)

---

## 🏗️ Tech Stack

### Frontend

* HTML5, Tailwind CSS
* Vanilla JavaScript
* Glassmorphism UI design

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* REST API architecture
---

## 📂 Project Structure

```
backend/
│
├── models/
│   ├── User.js
│   ├── Lesson.js
│   └── Translation.js
│
├── routes/
│   ├── auth.js
│   ├── lesson.js
│   └── translate.js
│
├── middleware/
│   ├── auth.js
│   └── errorHandler.js
│
├── controllers/
│   └── translateController.js
│
├── server.js
└── .env
```

---

## ⚙️ Environment Variables

Create a `.env` file in the backend folder:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
```

---

---

## 🔐 Security Features

* JWT-based authentication
* Password hashing (bcrypt)
* Rate limiting (express-rate-limit)
* Input validation
* Protected API routes

---

## 🎯 Future Improvements

* AI-powered conversational tutor
* Voice input & pronunciation analysis
* Leaderboard system
* Lesson creation dashboard (admin panel)
* Mobile responsiveness improvements
* Full React-based frontend

---

## 📸 Screenshots

> Add screenshots here after deployment

---

## 🌟 Project Status

🚧 In active development
🚀 Ready for deployment

---

## 🤝 Contribution

Contributions, issues, and feature requests are welcome.

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Rajommkar**

---

## 💡 Inspiration

Built as a full-stack learning project to combine:

* Language learning
* AI tools
* Gamification
* Modern UI/UX

---

⭐ If you like this project, consider starring the repository!
