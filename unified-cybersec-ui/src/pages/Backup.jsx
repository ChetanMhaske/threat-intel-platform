// src/pages/Backup.jsx
import React, { useState } from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";

/**
 * Backup & Recovery UI (simulated)
 * - Start backup (local simulation)
 * - Show last snapshot list
 * - Restore snapshot (simulated)
 */

const sampleSnapshots = [
  { id: "snap-20251125-1300", date: "2025-11-25 13:00", size: "1.2 GB", status: "Healthy" },
  { id: "snap-20251124-2200", date: "2025-11-24 22:00", size: "960 MB", status: "Healthy" },
];

export default function Backup() {
  const [snapshots, setSnapshots] = useState(sampleSnapshots);
  const [status, setStatus] = useState("");

  const startBackup = () => {
    setStatus("Running backup...");
    setTimeout(() => {
      const snap = { id: `snap-${Date.now()}`, date: new Date().toLocaleString(), size: `${Math.floor(500 + Math.random() * 1500)} MB`, status: "Healthy" };
      setSnapshots((s) => [snap, ...s]);
      setStatus("Backup completed");
      setTimeout(() => setStatus(""), 2000);
    }, 3000);
  };

  const restore = (id) => {
    setStatus(`Restoring ${id}...`);
    setTimeout(() => {
      setStatus(`Restore ${id} completed`);
      setTimeout(() => setStatus(""), 2000);
    }, 3000);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      <Sidebar />
      <main className="flex-1 p-8">
        <Topbar title="Automated Backup & Recovery" />
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">Snapshots</h3>
            <div className="max-h-96 overflow-auto custom-scroll space-y-3">
              {snapshots.map((s) => (
                <div key={s.id} className="flex items-center justify-between p-3 bg-slate-900 rounded">
                  <div>
                    <div className="font-semibold">{s.id}</div>
                    <div className="text-xs text-slate-400">{s.date} • {s.size}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-300">{s.status}</div>
                    <button onClick={() => restore(s.id)} className="mt-2 px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-sm">Restore</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">Controls</h3>
            <div className="space-y-3">
              <button onClick={startBackup} className="w-full py-2 rounded bg-cyan-600 hover:bg-cyan-700">Start Backup</button>
              <button onClick={() => { setSnapshots([]); setStatus("Cleared snapshots"); setTimeout(() => setStatus(""), 1500); }} className="w-full py-2 rounded bg-gray-700">Clear Snapshots</button>
              <div className="text-sm text-slate-400 mt-2">{status}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
