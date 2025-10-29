function HeroSection({ setCurrentPage }) {
  return (
    <section className="pt-24 pb-20 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80")',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/70 to-gray-900" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Network Support Service
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
          Expert solutions for all your network connectivity issues. We provide fast, reliable support for broadband problems, slow internet, connection failures, and frequent disconnections. Get back online quickly with our dedicated team of network specialists.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setCurrentPage('signup')}
            className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-400 text-gray-900 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-400/50 transition transform hover:scale-105 active:scale-95"
          >
            Get Started
          </button>
          <button
            onClick={() => setCurrentPage('login')}
            className="px-8 py-3 border-2 border-cyan-400 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-400 hover:text-gray-900 transition active:scale-95"
          >
            Login
          </button>
        </div>

        <p className="text-gray-400 mb-6">We solve problems like:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {[
            '"My broadband is not working."',
            '"Internet is slow."',
            '"No connection since morning."',
            '"Frequent disconnections."',
          ].map((problem, idx) => (
            <div
              key={idx}
              className="bg-gray-800 bg-opacity-50 backdrop-blur border border-gray-700 rounded-lg p-4 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/30 transition cursor-pointer group"
            >
              <p className="text-gray-300 group-hover:text-cyan-400 transition">{problem}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
