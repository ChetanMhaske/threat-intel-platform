// src/pages/IDS.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";

/**
 * IDS page: shows AI-model decisions (simulated)
 * - Anomaly score list
 * - Model confidence and feature weights (simulated)
 */

function mkAnomaly(i) {
  const ips = `10.0.0.${Math.floor(2 + Math.random() * 220)}`;
  return {
    id: i,
    ip: ips,
    score: +(Math.random() * 0.95 + 0.05).toFixed(2),
    reason: ["TLS mismatches", "High connection rate", "Payload anomaly", "Unusual server port"][Math.floor(Math.random() * 4)],
    time: new Date().toISOString(),
  };
}

export default function IDS() {
  const [anomalies, setAnomalies] = useState([]);
  useEffect(() => {
    // seed
    const seed = Array.from({ length: 6 }).map((_, i) => mkAnomaly(i + 1));
    setAnomalies(seed);
    const t = setInterval(() => {
      setAnomalies((prev) => [...prev.slice(-19), mkAnomaly(Date.now())]);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      <Sidebar />
      <main className="flex-1 p-8">
        <Topbar title="AI IDS / IPS — Anomaly Engine" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">Detected Anomalies</h3>
            <div className="space-y-3 max-h-96 overflow-auto custom-scroll">
              {anomalies.map((a) => (
                <div key={a.id} className="flex items-center justify-between p-3 bg-slate-900 rounded">
                  <div>
                    <div className="font-semibold">{a.ip}</div>
                    <div className="text-xs text-slate-400">{a.reason}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm ${a.score > 0.8 ? "text-rose-400" : a.score > 0.5 ? "text-yellow-300" : "text-slate-300"}`}>
                      Score: {a.score}
                    </div>
                    <div className="text-xs text-slate-500">{new Date(a.time).toLocaleTimeString()}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setAnomalies((p) => [mkAnomaly(Date.now()), ...p])}
                className="px-4 py-2 rounded bg-cyan-600 hover:bg-cyan-700"
              >
                Force Anomaly
              </button>
              <button
                onClick={() => setAnomalies([])}
                className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">Model Insights (Simulated)</h3>
            <p className="text-sm text-slate-300">Algorithm: Hybrid Autoencoder + Isolation Forest</p>

            <div className="mt-4 space-y-3">
              <div>
                <p className="text-xs text-slate-400">False Positive Rate (est.)</p>
                <div className="text-xl font-bold">2.3%</div>
              </div>
              <div>
                <p className="text-xs text-slate-400">Detection Latency</p>
                <div className="text-xl font-bold">~2.5s</div>
              </div>
              <div>
                <p className="text-xs text-slate-400">Top Features</p>
                <ul className="text-sm list-disc pl-5 text-slate-300">
                  <li>Connection rate</li>
                  <li>Payload entropy</li>
                  <li>New destination ports</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
