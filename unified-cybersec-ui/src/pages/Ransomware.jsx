// src/pages/Ransomware.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";

/**
 * Ransomware detection & prevention UI (local simulation)
 * - Shows recent file events, detection score
 * - Buttons to Isolate, Kill process, Recover from backup (simulated)
 */

function mkFileEvent(i) {
  const names = ["document.docx", "photo.jpg", "important.xlsx", "notes.txt", "presentation.pptx"];
  return {
    id: `${i}-${Date.now()}`,
    file: names[Math.floor(Math.random() * names.length)],
    action: ["modified", "renamed", "deleted", "encrypted"][Math.floor(Math.random() * 4)],
    path: `C:\\Users\\user\\Documents\\${Math.random() < 0.5 ? "Work" : "Personal"}`,
    time: new Date().toISOString(),
  };
}

export default function Ransomware() {
  const [events, setEvents] = useState([]);
  const [detected, setDetected] = useState(false);
  const [detectionScore, setDetectionScore] = useState(0);

  useEffect(() => {
    setEvents(Array.from({ length: 6 }).map((_, i) => mkFileEvent(i + 1)));
    const t = setInterval(() => {
      setEvents((p) => [...p.slice(-29), mkFileEvent(Date.now())]);
      // ML stub: slowly increase detection score if many 'encrypted' actions appear
      const encCount = events.filter((e) => e.action === "encrypted").length;
      const newScore = Math.min(1, detectionScore + encCount * 0.02 + Math.random() * 0.01);
      setDetectionScore(newScore);
      if (newScore > 0.6) setDetected(true);
    }, 4000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleIsolate = () => {
    setDetected(false);
    setDetectionScore(0);
    setEvents([]);
  };

  const handleRecover = () => {
    // simulated recovery: remove encrypted events
    setEvents((p) => p.filter((e) => e.action !== "encrypted"));
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      <Sidebar />
      <main className="flex-1 p-8">
        <Topbar title="Ransomware Detection & Response" />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">File Events Stream</h3>
            <div className="max-h-96 overflow-auto custom-scroll space-y-3">
              {events.map((e) => (
                <div key={e.id} className="flex items-center justify-between p-3 bg-slate-900 rounded">
                  <div>
                    <div className="font-semibold">{e.file}</div>
                    <div className="text-xs text-slate-400">{e.path}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm ${e.action === "encrypted" ? "text-rose-400" : "text-slate-300"}`}>
                      {e.action}
                    </div>
                    <div className="text-xs text-slate-500">{new Date(e.time).toLocaleTimeString()}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <button onClick={() => setEvents((p) => [mkFileEvent(Date.now()), ...p])} className="px-4 py-2 rounded bg-cyan-600 hover:bg-cyan-700">Add File Event</button>
              <button onClick={handleRecover} className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-700">Recover Encrypted Files</button>
              <button onClick={() => { setEvents([]); setDetectionScore(0); setDetected(false); }} className="px-4 py-2 rounded bg-gray-700">Clear</button>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">Detection Panel</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-300">Detection Score</p>
                <div className="text-3xl font-bold">{Math.round(detectionScore * 100)}%</div>
              </div>

              <div>
                <p className="text-sm text-slate-300">Status</p>
                <div className={`mt-2 inline-block px-3 py-1 rounded ${detected ? "bg-rose-600" : "bg-emerald-600"}`}>
                  {detected ? "Ransomware Suspected" : "No Active Threats"}
                </div>
              </div>

              <div className="space-y-2">
                <button onClick={() => { setDetected(true); setDetectionScore(0.85); }} className="w-full py-2 rounded bg-rose-600">Isolate Host (Simulate)</button>
                <button onClick={handleIsolate} className="w-full py-2 rounded bg-amber-600">Kill Process & Quarantine</button>
                <button onClick={() => { setDetected(false); setDetectionScore(0); }} className="w-full py-2 rounded bg-cyan-600">Acknowledge</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
