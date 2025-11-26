import { useState, useEffect } from 'react';

// Helper component for navigation links
function NavLink({ text, href }) {
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    // Basic check for active state
    if (window.location.pathname === href) {
      setIsActive(true);
    }
  }, [href]);

  return (
    <a
      href={href}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? 'bg-blue-500 text-white'
          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
      }`}
    >
      {text}
    </a>
  );
}

export default function Navbar() {
  return (
    <nav className="w-full bg-gradient-to-r from-gray-950 to-gray-900 border-b border-gray-800 px-6 py-3 flex items-center justify-between">
      {/* Left Side: Logo and Nav Links */}
      <div className="flex items-center gap-6">
        <h1 className="text-xl font-bold text-white">
          Unified CyberSec
        </h1>
        <div className="flex items-center gap-2">
          <NavLink text="Dashboard" href="/dashboard" />
          <NavLink text="IDS/IPS" href="/ids" />
          <NavLink text="Network Monitor" href="/network" />
          <NavLink text="Ransomware" href="/ransomware" />
          <NavLink text="Backup" href="/backup" />
          <NavLink text="AI Negotiator" href="/negotiator" />
          <NavLink text="Settings" href="/settings" />
        </div>
      </div>

      {/* Right Side: User Profile */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white">
          A
        </div>
        <div>
          <p className="text-sm font-medium text-white">Admin User</p>
          <p className="text-xs text-gray-400">System Administrator</p>
        </div>
      </div>
    </nav>
  );
}