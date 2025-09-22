// Script to seed 50 MCQ questions into the database
const mongoose = require('mongoose');
const Question = require('./models/question');
require('dotenv').config();

const questions = [
  // 50 sample MCQ questions
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'London', 'Paris', 'Madrid'],
    answer: 'Paris',
    category: 'General Knowledge',
    difficulty: 'easy'
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    answer: 'Mars',
    category: 'Science',
    difficulty: 'easy'
  },
  {
    question: 'Who wrote "Romeo and Juliet"?',
    options: ['William Wordsworth', 'William Shakespeare', 'John Keats', 'Charles Dickens'],
    answer: 'William Shakespeare',
    category: 'Literature',
    difficulty: 'easy'
  },
  {
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
    answer: 'Pacific Ocean',
    category: 'Geography',
    difficulty: 'easy'
  },
  {
    question: 'Which element has the chemical symbol O?',
    options: ['Gold', 'Oxygen', 'Silver', 'Iron'],
    answer: 'Oxygen',
    category: 'Science',
    difficulty: 'easy'
  },
  // ... 45 more sample questions ...
];

// Add more questions to reach 50
for (let i = 6; i <= 50; i++) {
  questions.push({
    question: `Sample MCQ Question #${i}`,
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    answer: 'Option A',
    category: 'Sample',
    difficulty: 'medium'
  });
}

async function seedQuestions() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await Question.deleteMany({});
    await Question.insertMany(questions);
    console.log('Seeded 50 MCQ questions successfully!');
    process.exit();
  } catch (err) {
    console.error('Error seeding questions:', err);
    process.exit(1);
  }
}

seedQuestions();
