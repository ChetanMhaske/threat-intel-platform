// src/pages/Settings.jsx
import React, { useState } from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";

export default function Settings() {
  const [autoBackup, setAutoBackup] = useState(true);
  const [agentMode, setAgentMode] = useState("Hybrid AI");
  const [accent, setAccent] = useState("Hybrid Blue-Green");

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      <Sidebar />
      <main className="flex-1 p-8">
        <Topbar title="Settings" />
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">General Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Auto Backup</p>
                  <p className="text-xs text-slate-400">Enable scheduled backups</p>
                </div>
                <input type="checkbox" checked={autoBackup} onChange={() => setAutoBackup(!autoBackup)} />
              </div>

              <div>
                <p className="text-sm font-semibold">Agent Mode</p>
                <select value={agentMode} onChange={(e) => setAgentMode(e.target.value)} className="mt-2 px-3 py-2 bg-gray-900 rounded">
                  <option>Hybrid AI</option>
                  <option>Rules only</option>
                  <option>Learning Mode</option>
                </select>
              </div>

              <div>
                <p className="text-sm font-semibold">Accent</p>
                <select value={accent} onChange={(e) => setAccent(e.target.value)} className="mt-2 px-3 py-2 bg-gray-900 rounded">
                  <option>Hybrid Blue-Green</option>
                  <option>Emerald</option>
                  <option>Azure</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">Security</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm">Require Admin Approval</p>
                <input type="checkbox" defaultChecked className="ml-2" />
              </div>
              <div>
                <p className="text-sm mt-2">Auto-Isolate on High Threat</p>
                <input type="checkbox" defaultChecked className="ml-2" />
              </div>
              <div className="text-xs text-slate-400 mt-3">Settings here are local frontend-only placeholders for the demo. Will be saved to backend later.</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
