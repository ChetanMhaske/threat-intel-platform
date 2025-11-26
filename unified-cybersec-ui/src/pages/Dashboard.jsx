// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import MetricCard from "../MetricCard";

/**
 * Dashboard: uses simulated telemetry + ML stub
 * - Shows counters derived from simulated IDS + ransomware modules
 * - Has timeline placeholder and suspicious feed
 */

function generateSampleEvent(id) {
  const sigs = [
    "Port Scan Detected",
    "SSH Brute Force",
    "HTTP Suspicious User-Agent",
    "Large File Write Spike",
    "Possible Ransomware Behavior",
  ];
  const sev = ["Low", "Medium", "High"];
  const s = sigs[Math.floor(Math.random() * sigs.length)];
  return {
    id,
    type: s,
    severity: s.includes("Ransom") ? "High" : sev[Math.floor(Math.random() * sev.length)],
    source: `192.168.1.${Math.floor(2 + Math.random() * 250)}`,
    destination: `192.168.1.${Math.floor(1 + Math.random() * 50)}`,
    time: new Date().toISOString(),
    status: s.includes("Ransom") ? "Isolated" : "Observed",
  };
}

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({
    normal: 1020,
    suspicious: 0,
    threats: 0,
    ransomwareDetected: 0,
  });

  // ML stub: every 4s create 1-2 events and update counts
  useEffect(() => {
    let id = 1;
    const seed = [];
    for (let i = 0; i < 6; i++) seed.push(generateSampleEvent(id++));

    setEvents(seed);
    const t = setInterval(() => {
      const newCount = Math.random() < 0.3 ? 2 : 1;
      setEvents((prev) => {
        const next = [...prev, ...Array.from({ length: newCount }).map(() => generateSampleEvent(id++))];
        // keep last 40
        return next.slice(-40);
      });
    }, 4000);

    return () => clearInterval(t);
  }, []);

  // Recompute stats from events (simple rules)
  useEffect(() => {
    const suspicious = events.filter((e) => e.severity === "Medium" || e.severity === "High").length;
    const threats = events.filter((e) => e.severity === "High").length;
    const ransom = events.filter((e) => /ransom/i.test(e.type)).length;
    setStats((s) => ({ ...s, suspicious, threats, ransomwareDetected: ransom }));
  }, [events]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      <Sidebar />
      <main className="flex-1 p-8">
        <Topbar title="Hybrid AI Threat Overview" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <MetricCard label="Normal Events" value={stats.normal} accent="blue" />
          <MetricCard label="Suspicious Activity" value={stats.suspicious} accent="yellow" />
          <MetricCard label="Confirmed Threats" value={stats.threats} accent="red" />
        </div>

        <section className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">Hybrid AI Threat Activity — Timeline</h3>
            <div className="h-56 rounded-md bg-gradient-to-b from-black/40 to-transparent p-4 grid place-items-center text-slate-400">
              {/* Placeholder area — integrate chart later */}
              Timeline chart placeholder — live simulated stream
            </div>

            <div className="mt-4">
              <h4 className="text-sm text-slate-300 mb-2">Actions</h4>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    // simulate large spike (ransomware)
                    setEvents((prev) => [
                      ...prev,
                      {
                        id: Date.now(),
                        type: "Simulated Ransomware Spike",
                        severity: "High",
                        source: "192.168.1.500",
                        destination: "192.168.1.6",
                        time: new Date().toISOString(),
                        status: "Isolated",
                      },
                    ]);
                  }}
                  className="px-4 py-2 rounded bg-rose-600 hover:bg-rose-700"
                >
                  Simulate Ransomware Spike
                </button>
                <button
                  onClick={() => {
                    // simulate maintenance reset
                    setEvents([]);
                    setStats({ normal: 1000, suspicious: 0, threats: 0, ransomwareDetected: 0 });
                  }}
                  className="px-4 py-2 rounded bg-cyan-600 hover:bg-cyan-700"
                >
                  Reset Feed
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">System Health</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-slate-300">Agents Online</p>
                <div className="text-xl font-bold">6</div>
              </div>
              <div>
                <p className="text-sm text-slate-300">Agents Offline</p>
                <div className="text-xl font-bold">1</div>
              </div>
              <div>
                <p className="text-sm text-slate-300">CPU Usage</p>
                <div className="w-full bg-slate-700 rounded h-3 overflow-hidden mt-2">
                  <div className="h-3" style={{ width: "32%", background: "linear-gradient(90deg,#38bdf8,#10b981)" }} />
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-300">Memory Usage</p>
                <div className="w-full bg-slate-700 rounded h-3 overflow-hidden mt-2">
                  <div className="h-3" style={{ width: "61%", background: "linear-gradient(90deg,#38bdf8,#10b981)" }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Suspicious Activity Feed</h3>
          <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4 space-y-3 max-h-64 overflow-auto custom-scroll">
            {events.length === 0 && <p className="text-slate-400">No events yet — simulate attacks to see alerts.</p>}
            {events
              .slice()
              .reverse()
              .map((e) => (
                <div key={e.id} className="flex items-center justify-between gap-4 bg-slate-800/40 p-3 rounded">
                  <div>
                    <div className="text-sm font-semibold">{e.type}</div>
                    <div className="text-xs text-slate-400">
                      {e.source} → {e.destination} • {new Date(e.time).toLocaleTimeString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm ${e.severity === "High" ? "text-rose-400" : e.severity === "Medium" ? "text-yellow-300" : "text-slate-300"}`}>
                      {e.severity}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">{e.status}</div>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}
