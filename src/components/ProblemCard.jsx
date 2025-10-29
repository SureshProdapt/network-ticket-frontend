function ProblemCard({ problem, solution, color }) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/30 transition group cursor-pointer relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition duration-500" />
      <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-lg mb-4 shadow-lg shadow-${color.split('-')[1]}-500/50 group-hover:shadow-xl transition`} />
      <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition">{problem}</h3>
      <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition">{solution}</p>
    </div>
  );
}
