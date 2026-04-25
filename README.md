# 🌌 Odyssey - Gamified Language Learning Platform

> A high-fidelity, interactive web application designed to make language learning immersive, structured, and engaging.

Odyssey represents a modern approach to educational platforms, moving away from cartoonish interfaces towards an "Architectural Sophistication" design system. It features a dark-mode, glassmorphic UI built for serious learners who appreciate gamified progression.

## 🚀 Tech Stack

* **Frontend Framework:** React 18 (Initialized with Vite for lightning-fast HMR)
* **Styling:** Tailwind CSS v4 (Using native CSS variables and @theme)
* **Routing:** React Router v6
* **Icons & Typography:** Google Fonts (Inter, Newsreader) & Material Symbols

## ✨ Key Features

* **Architectural UI/UX:** A bespoke design system utilizing "Frosted Obsidian" glassmorphism, deep slate blues, and sharp-edged micro-radius components.
* **Gamified Progression:** Interactive "Constellation Map" lesson tracking, streak counters, and health/heart systems.
* **Multi-Modal Learning:** Dedicated interfaces for Speaking, Reading, Writing, and Listening exercises.
* **Challenge Arena:** High-intensity quiz and puzzle modes with interactive drag-and-drop word banks and timers.
* **Precision Translator:** A clean, bidirectional translation tool with intelligent definition pop-ups.
* **Comprehensive Dashboards:** Detailed user profiles, achievement galleries, and past-course review archives.

## 📂 Project Structure

```text
language-app/
├── public/
├── src/
│   ├── assets/         # Static images, SVG icons, and media
│   ├── components/     # Reusable UI elements (Sidebar, Modals, Cards)
│   ├── pages/          # Main route views
│   │   ├── Login.jsx   # Gateway & Authentication
│   │   ├── Home.jsx    # Core Learning Hub
│   │   └── ...         # (Translator, Profile, Quizzes, etc.)
│   ├── App.jsx         # Global routing and layout wrapper
│   ├── main.jsx        # React entry point
│   └── index.css       # Global styles, Tailwind @theme, & custom CSS classes
├── index.html
├── vite.config.js      # Vite & Tailwind plugin configuration
└── package.json
