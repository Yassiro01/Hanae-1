import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { NO_PHRASES, IMAGES } from './constants';
import FloatingHearts, { HeartMode } from './components/FloatingHearts';

const App: React.FC = () => {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);

  const yesButtonSize = noCount * 20 + 16;
  
  // Ensure the No button text loops or stays at the last phrase
  const getNoButtonText = () => {
    return NO_PHRASES[Math.min(noCount, NO_PHRASES.length - 1)];
  };

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const handleYesClick = () => {
    setYesPressed(true);
    triggerConfetti();
  };

  const handleReset = () => {
    setYesPressed(false);
    setNoCount(0);
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults, 
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, 
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  // Preload images for smoother transition
  useEffect(() => {
    const img1 = new Image();
    const img2 = new Image();
    img1.src = IMAGES.ASKING;
    img2.src = IMAGES.SUCCESS;
  }, []);

  // Determine background mode
  let mood: HeartMode = 'love';
  let bgClass = 'bg-[#ffe4e6]'; // Default Pink

  if (yesPressed) {
    mood = 'celebration';
    bgClass = 'bg-gradient-to-br from-pink-200 to-purple-200';
  } else if (noCount > 0) {
    mood = 'sad';
    // Dark grey for sad/rainy mood
    bgClass = 'bg-slate-600'; 
  }

  return (
    <div className={`min-h-screen ${bgClass} flex flex-col items-center justify-center overflow-hidden selection:bg-rose-200 transition-colors duration-700`}>
      {/* Background Animation */}
      <FloatingHearts mode={mood} />
      
      <div className="z-10 w-full max-w-md p-4 text-center relative">
        {yesPressed ? (
          <div className="animate-in fade-in zoom-in duration-700 flex flex-col items-center gap-6">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur opacity-30 animate-pulse"></div>
              <img 
                src={IMAGES.SUCCESS} 
                alt="Happy celebration" 
                className="relative rounded-lg shadow-xl w-64 h-64 object-cover border-4 border-white"
                onError={(e) => {
                    (e.target as HTMLImageElement).src = IMAGES.FALLBACK_SUCCESS;
                }}
              />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-extrabold text-pink-600 tracking-tight drop-shadow-sm">
                Yay! Hanae said YES! 
              </h1>
              <div className="text-lg text-gray-700 font-medium font-serif italic leading-relaxed">
                "My heart is yours, forever and true,<br/>
                 I can't wait to spend my life with you." ❤️<br/>
                 <span className="block mt-2 text-pink-500 font-semibold not-italic">- Love, Yassir</span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm border border-pink-100 animate-bounce">
                <p className="text-xl font-bold text-pink-500">
                    You accepted, so send me a kiss on WhatsApp! 😘
                </p>
            </div>

            <button
              onClick={handleReset}
              className="mt-4 px-8 py-2 bg-white text-pink-500 font-bold rounded-full shadow-lg hover:bg-pink-50 hover:scale-105 transition-all duration-300 opacity-80 hover:opacity-100"
            >
              Replay ↺
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-8">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-300 to-rose-300 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
              <img 
                src={IMAGES.ASKING} 
                alt="Please be mine" 
                className="relative rounded-xl shadow-lg w-64 h-64 object-cover border-4 border-white transform transition-transform duration-500 hover:scale-[1.02]"
                onError={(e) => {
                    (e.target as HTMLImageElement).src = IMAGES.FALLBACK_ASK;
                }}
              />
            </div>

            <h1 className={`text-4xl md:text-5xl font-extrabold drop-shadow-sm px-4 transition-colors duration-300 ${noCount > 0 ? 'text-white' : 'text-gray-800'}`}>
              Hanae, will you be my wife?
            </h1>

            <div className="flex flex-wrap justify-center items-center gap-4 w-full min-h-[100px]">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-green-200 z-20 whitespace-nowrap"
                style={{ fontSize: yesButtonSize, padding: '12px 24px' }}
                onClick={handleYesClick}
              >
                Yes
              </button>

              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-red-200 transition-all z-10"
                onClick={handleNoClick}
              >
                {noCount === 0 ? "No" : getNoButtonText()}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;