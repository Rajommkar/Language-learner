const mongoose = require("mongoose");
require("dotenv").config();
const Lesson = require("./models/Lesson");

const lessons = [
  {
    title: "Spanish Greetings",
    level: "beginner",
    questions: [
      {
        question: "How do you say 'Hello' in Spanish?",
        options: ["Hola", "Adiós", "Gracias", "Por favor"],
        correctAnswer: "Hola"
      },
      {
        question: "What does 'Buenos días' mean?",
        options: ["Good night", "Good afternoon", "Good morning", "Hello"],
        correctAnswer: "Good morning"
      },
      {
        question: "How do you say 'Thank you'?",
        options: ["De nada", "Gracias", "Hola", "Perdón"],
        correctAnswer: "Gracias"
      }
    ]
  },
  {
    title: "French Basics",
    level: "beginner",
    questions: [
      {
        question: "How do you say 'Yes' in French?",
        options: ["Non", "Oui", "Merci", "S'il vous plaît"],
        correctAnswer: "Oui"
      },
      {
        question: "What is 'Bonjour'?",
        options: ["Goodbye", "Please", "Hello/Good morning", "Thank you"],
        correctAnswer: "Hello/Good morning"
      }
    ]
  },
  {
    title: "Spanish Numbers (1-5)",
    level: "beginner",
    questions: [
      {
        question: "What is 'Three' in Spanish?",
        options: ["Uno", "Dos", "Tres", "Cuatro"],
        correctAnswer: "Tres"
      },
      {
        question: "What is 'Cinco'?",
        options: ["One", "Three", "Five", "Four"],
        correctAnswer: "Five"
      }
    ]
  }
];

const seedDB = async () => {
  try {
    console.log("Connecting to MongoDB for seeding...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected ✅");

    console.log("Clearing existing lessons...");
    await Lesson.deleteMany({});
    
    console.log("Seeding lessons...");
    await Lesson.insertMany(lessons);
    
    console.log("Database Seeded Successfully! 🚀");
    process.exit();
  } catch (err) {
    console.error("Error seeding database:", err.message);
    process.exit(1);
  }
};

seedDB();
