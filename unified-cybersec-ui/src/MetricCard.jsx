// src/MetricCard.jsx
export default function MetricCard({ label, value, accent = "blue" }) {
  const color =
    accent === "red" ? "from-rose-600 to-rose-500" :
    accent === "yellow" ? "from-amber-500 to-amber-400" :
    "from-cyan-400 to-emerald-400";

  return (
    <div className={`bg-gradient-to-r ${color} p-4 rounded-xl shadow-md text-slate-900`}>
      <div className="text-sm font-medium">{label}</div>
      <div className="text-2xl font-bold mt-2">{value}</div>
    </div>
  );
}
