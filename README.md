An intelligent full-stack web application that helps users **analyze their skills, identify gaps, and get personalized career guidance** using AI.

---

##  Overview

The **Career Platform** is designed to solve a real-world problem:
👉 *“Students and job seekers don’t know what skills they need for their dream role or how to reach there.”*

This system bridges that gap by:

* Understanding the user's **current skillset**
* Identifying their **target career goal**
* Using **AI to generate required skills**
* Comparing both to show **skill gaps**
* Providing a **career roadmap**
* Helping with **resume generation**

---

##  How the System Works

### 1️⃣ User Profile Creation

* User logs in using **Firebase Authentication**
* Fills in:

  * Name, Bio
  * Skills (with proficiency level)
  * Experience
  * Career Goal (e.g., AI Researcher, Web Developer)

---

### 2️⃣ Skill Gap Analysis

#### 🔹 Step 1: User Skills

* Stored as:

```json
[
  { "name": "Python", "level": "Beginner" },
  { "name": "Machine Learning", "level": "Intermediate" }
]
```

* Converted into numeric values:
  | Level        | Score |
  |-------------|------|
  | Beginner     | 3    |
  | Intermediate | 6    |
  | Advanced     | 9    |

---

#### 🔹 Step 2: Target Role Skills (AI-powered)

* The system uses **Gemini AI API** to generate:

```json
{
  "Machine Learning": 9,
  "Deep Learning": 8,
  "Statistics": 8
}
```

* These are:

  * **Cached in MongoDB**
  * Not fetched every time (to avoid API limits)

---

#### 🔹 Step 3: Comparison

* A **Radar Chart** is generated using:

  * User skills vs Target role skills

📊 Result:

* Visual representation of:

  * Strengths
  * Weak areas
  * Missing skills

---

### 3️⃣ Career Roadmap Generation

* Based on user skills, the system generates:

```
Step 1: Learn Python basics  
Step 2: Study Machine Learning  
Step 3: Build Projects  
Step 4: Learn Deep Learning  
```

* Helps user understand:
  👉 *“What to do next?”*

---

### 4️⃣ Resume Builder (AI-based)

* User inputs:

  * Education
  * Skills
  * Experience

* System generates a structured resume using AI

* Features:
  ✅ Resume Preview
  ✅ Download as PDF
  ✅ Clean formatting

---

### 5️⃣ Backend Architecture

* **Node.js + Express**
* MongoDB for storage
* Firebase middleware for authentication

#### Key APIs:

* `/api/profile` → Manage user profile
* `/api/dashboard` → Skill gap + roadmap
* `/api/resume/generate` → AI resume
* `/api/career-agent` → AI career assistant

---

### 6️⃣ AI Integration

* Uses **Google Gemini API**

* Functions:

  * Generate role-based skills
  * Create career roadmap
  * Generate resume content

* Includes:
  ✅ Response parsing
  ✅ Error handling
  ✅ MongoDB caching

---

## 🛠 Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Chart.js (Radar Chart)

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### Authentication

* Firebase Authentication

### AI

* Google Gemini API

---

## 📊 Features Summary

✅ Skill Gap Analysis (Radar Chart)
✅ AI-based Role Skill Generation
✅ Career Roadmap Generator
✅ Resume Builder + PDF Download
✅ Firebase Authentication
✅ MongoDB Caching (API optimization)

---

## 🚀 Future Enhancements

* 📈 Skill Progress Tracking
* 🎯 Personalized Learning Paths
* 📄 Resume Templates
* 🌐 Multi-language Support
* 🤖 **Custom AI Model (In-house)**

  * Build our own ML model trained on real user data
  * Analyze patterns from users’ skills, goals, and career paths
  * Predict the **most optimal career decisions**
  * Use AI to **support and explain those decisions** (hybrid AI system)
  * Reduce dependency on external APIs like Gemini

---

## 💡 Key Highlights

* AI-driven decision system
* Real-world problem solving
* Scalable backend architecture
* Optimized API usage with caching
* Clean UI with data visualization
* Ai chatbot for assistance

---

## 👨‍💻 Author

**Viraj Kamble**

---

## ⭐ If you like this project

Give it a ⭐ on GitHub and share it!

---
