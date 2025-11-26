// src/pages/Network.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";

/**
 * Network page: lists active connections, shows risk score per connection.
 * Data is simulated locally (agent telemetry stub).
 */

function mkConn(i) {
  const proto = Math.random() > 0.5 ? "TCP" : "UDP";
  const local = `192.168.1.${Math.floor(2 + Math.random() * 240)}`;
  const remote = `34.23.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  return {
    id: `${i}-${Date.now()}`,
    local,
    remote,
    proto,
    bytes: Math.floor(Math.random() * 50000),
    started: new Date().toISOString(),
    risk: +(Math.random() * 0.9).toFixed(2),
  };
}

export default function Network() {
  const [conns, setConns] = useState([]);
  useEffect(() => {
    setConns(Array.from({ length: 8 }).map((_, i) => mkConn(i + 1)));
    const t = setInterval(() => {
      setConns((p) => [...p.slice(-15), mkConn(Math.floor(Math.random() * 9999))]);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      <Sidebar />
      <main className="flex-1 p-8">
        <Topbar title="Network Monitor — Live Connections" />
        <div className="mt-6 grid grid-cols-1">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">Active Connections</h3>
            <div className="overflow-auto custom-scroll max-h-96">
              <table className="w-full text-left">
                <thead className="text-slate-400 text-xs">
                  <tr>
                    <th className="px-3 py-2">Local</th>
                    <th className="px-3 py-2">Remote</th>
                    <th className="px-3 py-2">Proto</th>
                    <th className="px-3 py-2">Bytes</th>
                    <th className="px-3 py-2">Risk</th>
                    <th className="px-3 py-2">Started</th>
                  </tr>
                </thead>
                <tbody>
                  {conns.map((c) => (
                    <tr key={c.id} className="border-t border-slate-800">
                      <td className="px-3 py-2">{c.local}</td>
                      <td className="px-3 py-2">{c.remote}</td>
                      <td className="px-3 py-2">{c.proto}</td>
                      <td className="px-3 py-2">{c.bytes}</td>
                      <td className="px-3 py-2">
                        <div className="w-24 bg-slate-700 rounded h-2 relative">
                          <div style={{
                            width: `${Math.min(100, c.risk * 100)}%`,
                            background: c.risk > 0.7 ? "linear-gradient(90deg,#ef4444,#f97316)" : "linear-gradient(90deg,#38bdf8,#10b981)",
                            height: "100%",
                          }} />
                        </div>
                        <div className="text-xs text-slate-400 mt-1">{c.risk}</div>
                      </td>
                      <td className="px-3 py-2 text-xs text-slate-400">{new Date(c.started).toLocaleTimeString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setConns((p) => [mkConn(Date.now()), ...p])}
                className="px-4 py-2 rounded bg-cyan-600 hover:bg-cyan-700"
              >
                Create Connection
              </button>
              <button
                onClick={() => setConns([])}
                className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
