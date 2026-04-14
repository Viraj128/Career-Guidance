console.log("aiService object:", aiService);

// src/components/Chatbot.jsx
import React, { useState } from "react";
import aiService from "../services/aiService";

export default function Chatbot({ initialHistory = [] }) {
  const [messages, setMessages] = useState(initialHistory);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await aiService.chatAgent(input, messages);
      const botText = res?.data?.output || res?.data?.response || "No answer";
      setMessages((m) => [...m, { role: "assistant", content: botText }]);
    } catch (err) {
      console.error(err);
      setMessages((m) => [...m, { role: "assistant", content: "Sorry, something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded shadow p-4">
      <div className="flex-1 overflow-auto mb-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
            <div className={`inline-block px-3 py-2 rounded ${m.role === "user" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-800"}`}>
              {m.content}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask the career assistant..."
          className="flex-1 border rounded px-3 py-2"
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button onClick={send} disabled={loading} className="bg-slate-800 text-white px-4 py-2 rounded">
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
