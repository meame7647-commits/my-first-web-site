import React, { useState, useEffect } from 'react';

export default function BirthdayCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [animateElements, setAnimateElements] = useState(false);

  const createConfetti = () => {
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.2,
      duration: 2 + Math.random() * 1,
      emoji: ['🎉', '🎈', '🎊', '⭐', '💫', '🌟', '✨', '🎁'][Math.floor(Math.random() * 8)]
    }));
    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 3000);
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      createConfetti();
      setAnimateElements(true);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center p-4 overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20 animate-pulse"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              top: `${20 + i * 15}%`,
              left: `${10 + i * 15}%`,
              background: ['#FFB6C1', '#E6B4FF', '#98FF98', '#FFE5B4', '#B4E5FF', '#FFDAB9'][i],
              animation: `float ${8 + i}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Confetti animation */}
      {confetti.map(item => (
        <div
          key={item.id}
          className="fixed text-2xl pointer-events-none"
          style={{
            left: `${item.left}%`,
            top: '-20px',
            animation: `fall ${item.duration}s linear forwards`,
            animationDelay: `${item.delay}s`,
          }}
        >
          {item.emoji}
        </div>
      ))}

      {/* Main card container */}
      <div className="relative z-10">
        {/* 3D Card */}
        <div
          onClick={handleCardClick}
          className="relative w-80 h-96 cursor-pointer perspective transition-transform duration-500 hover:scale-105"
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Front of card */}
          <div
            className={`absolute w-full h-full bg-gradient-to-br from-pink-200 via-purple-100 to-blue-200 rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center backdrop-blur-sm border-2 border-white border-opacity-50 ${isFlipped ? 'hidden' : ''}`}
            style={{
              backfaceVisibility: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            }}
          >
            {/* Decorative elements on front */}
            <div className="absolute top-4 left-4 text-4xl animate-bounce">🎈</div>
            <div className="absolute top-4 right-4 text-4xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎈</div>
            <div className="absolute bottom-6 left-6 text-3xl animate-pulse">🌟</div>
            <div className="absolute bottom-6 right-6 text-3xl animate-pulse" style={{ animationDelay: '0.5s' }}>✨</div>

            {/* Main text */}
            <div className="text-center z-10">
              <p className="text-sm font-semibold text-purple-600 mb-2 tracking-widest uppercase">Happy Birthday</p>
              <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mb-2 transform hover:scale-110 transition-transform">
                Basma
              </h1>
              <div className="flex justify-center gap-2 text-3xl mt-4">
                <span className="animate-bounce">✨</span>
                <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>🎉</span>
                <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🎊</span>
              </div>
              <p className="text-sm text-purple-700 mt-6 font-medium">Click to reveal your message!</p>
            </div>
          </div>

          {/* Back of card */}
          <div
            className={`absolute w-full h-full bg-gradient-to-br from-purple-300 via-pink-200 to-purple-300 rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center backdrop-blur-sm border-2 border-white border-opacity-50 ${!isFlipped ? 'hidden' : ''}`}
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            }}
          >
            {/* Decorative elements on back */}
            <div className="absolute top-6 left-6 text-2xl">🎁</div>
            <div className="absolute bottom-6 right-6 text-2xl">🎂</div>

            {/* Birthday message */}
            <div className="text-center">
              <p className="text-2xl font-bold text-white mb-4">🌟 Wishing You 🌟</p>
              
              <div className="space-y-3 mb-6">
                <p className="text-lg text-white font-semibold">✨ A day filled with joy</p>
                <p className="text-lg text-white font-semibold">🎪 Moments that sparkle</p>
                <p className="text-lg text-white font-semibold">💖 Love and laughter</p>
                <p className="text-lg text-white font-semibold">🌈 All your dreams come true</p>
              </div>

              <p className="text-sm text-white mt-6 italic font-light">You make the world more beautiful!</p>
              <p className="text-xs text-white mt-3 opacity-80">Click again to flip back</p>
            </div>
          </div>
        </div>

        {/* Floating sparkles around card */}
        {animateElements && [...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl pointer-events-none"
            style={{
              top: `${Math.sin(i * Math.PI / 4) * 120 + 192}px`,
              left: `${Math.cos(i * Math.PI / 4) * 120 + 160}px`,
              animation: `orbit 3s linear infinite`,
              animationDelay: `${i * 0.375}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-8 text-center z-10">
        <p className="text-purple-700 font-semibold text-sm">🎂 Click the card to celebrate 🎂</p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(120px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(120px) rotate(-360deg);
          }
        }

        @supports (perspective: 1000px) {
          div {
            perspective: 1000px;
          }
        }
      `}</style>
    </div>
  );
}