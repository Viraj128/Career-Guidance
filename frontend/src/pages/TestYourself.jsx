// src/pages/TestYourself.jsx
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { getAuth } from "firebase/auth";


export default function TestYourself() {
  const { user } = useAuth();
  console.log("Logged in user:", user); 
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);

  const startTest = async () => {
  setLoading(true);
  try {
    // 1️⃣ Get user profile
    const token = await getAuth().currentUser.getIdToken();
    const resProfile = await fetch("/api/profile", {
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });
    const profile = await resProfile.json();
    const careerGoal = profile.careerGoal || "General";

    // 2️⃣ Call backend test generation
    const resTest = await fetch("/api/test", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ careerGoal }),
    });
    const data = await resTest.json();
    setQuestions(data.questions || []);
    setStarted(true);
  } catch (err) {
    console.error("Error generating test:", err);
  }
  setLoading(false);
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center justify-center p-6">
      {!started ? (
        <div className="text-center max-w-xl">
          <h1 className="text-4xl font-bold text-purple-700 mb-4">🧠 Test Yourself</h1>
          <p className="text-gray-600 mb-6">
            Here you can practice questions tailored to your <span className="font-semibold">career goal</span> 
            and <span className="font-semibold">roadmap progress</span>.  
            Get instant feedback and track your readiness 🚀
          </p>
          <button
            onClick={startTest}
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-3 rounded-xl shadow-lg hover:scale-105 transform transition"
          >
            {loading ? "Preparing your test..." : "Start Test"}
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-2xl shadow-lg max-w-lg w-full">
          {questions.length > 0 ? (
            questions.map((q, idx) => (
              <div key={idx} className="mb-6">
                <h2 className="font-semibold text-lg mb-3">{idx + 1}. {q.question}</h2>
                <div className="grid gap-3">
                  {q.options.map((opt, i) => (
                    <button
                      key={i}
                      className="px-4 py-2 bg-purple-100 rounded-xl hover:bg-purple-200 transition"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No questions found.</p>
          )}
        </div>
      )}
    </div>
  );
}
