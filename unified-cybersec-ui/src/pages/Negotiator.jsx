// src/pages/Negotiator.jsx
import React, { useState } from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";

/**
 * AI Negotiator (Frontend simulation)
 * - Local chat UI
 * - System uses canned attacker responses to simulate negotiation
 * - Real LLM (Ollama) integration planned later
 */

const attackerReplies = [
  "We encrypted your files. Send 0.5 BTC to wallet X.",
  "Proof: we left a file 'readme.txt' in /encrypted.",
  "No negotiations, payment required within 48 hours.",
  "We can offer a 20% discount if you agree to pay now.",
];

export default function Negotiator() {
  const [messages, setMessages] = useState([
    { id: 1, who: "system", text: "AI Negotiator ready. Upload sample evidence or start negotiation." },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const id = Date.now();
    setMessages((m) => [...m, { id, who: "operator", text: input }]);
    setInput("");

    // canned simulated attacker response
    setTimeout(() => {
      const reply = attackerReplies[Math.floor(Math.random() * attackerReplies.length)];
      setMessages((m) => [...m, { id: Date.now() + 1, who: "attacker", text: reply }]);
    }, 1200);
  };

  const autoRecover = () => {
    setMessages((m) => [...m, { id: Date.now(), who: "system", text: "Recovery executed: 95% files restored (simulation)." }]);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      <Sidebar />
      <main className="flex-1 p-8">
        <Topbar title="AI Negotiator Command Center" />
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gray-800/50 border border-gray-700 rounded-xl p-6 flex flex-col">
            <h3 className="text-lg font-semibold mb-3">Chat with Attacker (Simulated)</h3>
            <div className="flex-1 bg-slate-900 rounded p-4 overflow-auto custom-scroll space-y-3">
              {messages.map((m) => (
                <div key={m.id} className={`p-3 rounded ${m.who === "operator" ? "bg-cyan-700 self-end text-white" : m.who === "attacker" ? "bg-rose-700 text-white" : "bg-slate-800 text-slate-200"}`}>
                  <div className="text-sm">{m.text}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type message..." className="flex-1 px-4 py-2 rounded bg-gray-900 outline-none" />
              <button onClick={send} className="px-4 py-2 rounded bg-emerald-600">Send</button>
              <button onClick={autoRecover} className="px-4 py-2 rounded bg-amber-600">Simulate Quick-Recover</button>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">Bot Settings</h3>
            <div className="space-y-3">
              <p className="text-sm text-slate-300">Model: Ollama (planned)</p>
              <p className="text-sm text-slate-300">Mode: Simulation</p>
              <p className="text-xs text-slate-500">Note: This UI simulates attacker negotiation flow. Replace with Ollama LLM later.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
