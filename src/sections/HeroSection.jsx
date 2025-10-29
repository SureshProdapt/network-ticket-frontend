import React from 'react';
import Button from '../components/Button';

export default function HeroSection({ setCurrentPage }) {
  return (
    <section className="w-full py-32 px-6 relative overflow-hidden min-h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80")',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/70 to-gray-900" />

      <div className="w-full max-w-4xl mx-auto text-center relative z-10 space-y-10">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Network Support Service
        </h1>

        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
          Expert solutions for all your network connectivity issues. We provide fast, reliable support for broadband problems, slow internet, connection failures, and frequent disconnections. Get back online quickly with our dedicated team of network specialists.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
        <Button text="Get Started" to="/signup" />
        <Button text="Login" to="/login" variant="outline" />

        </div>

        <div className="space-y-6">
          {/* <p className="text-gray-400">We solve problems like:</p> */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {[
              '"My broadband is not working."',
              '"Internet is slow."',
              '"No connection since morning."',
              '"Frequent disconnections."',
            ].map((problem, idx) => (
              <div
                key={idx}
                className="bg-gray-800 bg-opacity-50 backdrop-blur border border-gray-700 rounded-lg p-5 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/30 transition cursor-pointer group"
              >
                <p className="text-gray-300 group-hover:text-cyan-400 transition text-center">
                  {problem}
                </p>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
}
