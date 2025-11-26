import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Shield,
  Activity,
  Network,
  FileWarning,
  MessageSquare,
  Database,
  Settings,
  LockKeyhole,
} from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: Activity, to: "/dashboard" },
  { id: "network", label: "Network Monitor", icon: Network, to: "/network" },
  { id: "ids", label: "IDS / IPS", icon: Shield, to: "/ids" },
  { id: "ransomware", label: "Ransomware", icon: FileWarning, to: "/ransomware" },
  { id: "negotiator", label: "AI Negotiator", icon: MessageSquare, to: "/negotiator" },
  { id: "backup", label: "Backup & Recovery", icon: Database, to: "/backup" },
  { id: "settings", label: "Settings", icon: Settings, to: "/settings" },
];

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);

  const isActive = (path) => location.pathname === path;

  return (
    <aside
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
      className={`
        group
        h-screen
        sticky top-0
        z-30
        m-2
        flex flex-col
        rounded-3xl
        border border-cyan-500/30
        bg-slate-950/70
        backdrop-blur-2xl
        shadow-[0_0_45px_rgba(34,211,238,0.45)]
        transition-all duration-300 ease-out
        ${collapsed ? "w-[80px]" : "w-72"}
      `}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-cyan-500/10">
        <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center">
          <LockKeyhole className="w-5 h-5 text-slate-950" />
        </div>

        {!collapsed && (
          <div>
            <p className="text-sm font-semibold text-white">Unified CyberSec</p>
            <p className="text-[11px] text-cyan-300/80">AI-Driven SOC Console</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="px-2 py-1 flex-grow space-y-1">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.to);

            return (
              <li key={item.id}>
                <Link
                  to={item.to}
                  className={`
                    flex items-center gap-3
                    rounded-2xl
                    px-3 py-2.5
                    text-sm
                    transition-all duration-200
                    ${
                      active
                        ? "bg-gradient-to-r from-cyan-500/30 via-emerald-500/20 to-transparent text-white border border-cyan-400/50 shadow-[0_0_24px_rgba(56,189,248,0.6)]"
                        : "text-slate-300/80 hover:text-white hover:bg-slate-900/60 border border-transparent"
                    }
                  `}
                >
                  <div
                    className={`
                      w-8 h-8 rounded-2xl flex items-center justify-center
                      bg-slate-900/80 border
                      ${
                        active
                          ? "border-emerald-400/70 shadow-[0_0_20px_rgba(16,185,129,0.8)] bg-gradient-to-br from-cyan-400/90 to-emerald-400/90"
                          : "border-cyan-500/30 group-hover:border-cyan-400/60"
                      }
                    `}
                  >
                    <Icon className={`w-4 h-4 ${active ? "text-slate-900" : "text-cyan-200"}`} />
                  </div>

                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Static User Info (Frontend Only) */}
      <div className="px-3 py-2 border-t border-cyan-500/15">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center text-cyan-300 text-sm font-bold">
            A
          </div>

          {!collapsed && (
            <div>
              <p className="text-xs text-white font-semibold">Admin User</p>
              <p className="text-[11px] text-slate-400">Local Demo Mode</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
