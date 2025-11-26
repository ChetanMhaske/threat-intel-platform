import { Bell, ShieldCheck, ChevronsDown } from "lucide-react";

export default function Topbar({ title }) {
  return (
    <header
      className="
        sticky top-0 z-20
        flex items-center justify-between
        backdrop-blur-xl
        bg-slate-950/60
        border-b border-cyan-500/10
        px-6 py-4
        rounded-3xl
        shadow-[0_0_25px_rgba(0,255,184,0.18)]
        transition-all duration-300
      "
    >
      {/* Title */}
      <div className="flex items-center gap-3">
        <ShieldCheck className="w-6 h-6 text-emerald-400" />
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </div>

      {/* Right-side controls */}
      <div className="flex items-center gap-6">

        {/* Live pulse */}
        <div className="flex items-center gap-2">
          <span className="relative">
            <span className="w-3 h-3 rounded-full bg-emerald-400 absolute animate-ping opacity-70"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
          </span>

          <p className="text-xs text-emerald-300 font-medium">LIVE MODE</p>
        </div>

        {/* Current time */}
        <p className="text-xs text-cyan-300 hidden md:block">
          {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>

        {/* Notifications icon */}
        <button className="relative hover:scale-110 transition">
          <Bell className="w-6 h-6 text-cyan-300" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>

        {/* Static user profile */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center text-slate-900 font-bold shadow-md">
            A
          </div>

          <div className="hidden md:block">
            <p className="text-sm text-slate-200">Admin User</p>
            <p className="text-[10px] text-slate-500">Local Session</p>
          </div>

          <ChevronsDown className="w-4 h-4 text-cyan-300" />
        </div>
      </div>
    </header>
  );
}
