import React, { useEffect, useState } from 'react';

export type HeartMode = 'love' | 'sad' | 'celebration';

interface Heart {
  id: number;
  left: number;
  animationDuration: number;
  delay: number;
  size: number;
  emoji: string;
}

interface FloatingHeartsProps {
  mode?: HeartMode;
}

const EMOJIS = {
  // Strictly red hearts and roses as requested
  love: ['❤️', '♥️', '🌹', '❣️', '😍'], 
  // Rain and sad faces
  sad: ['💔', '😢', '🌧️', '💧', '⛈️', '😿'],
  // Flowers and hearts
  celebration: ['❤️', '💖', '🌹', '🌸', '💐', '🌺', '🌷', '🌻', '✨', '💍']
};

const FloatingHearts: React.FC<FloatingHeartsProps> = ({ mode = 'love' }) => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const newHearts: Heart[] = [];
    const emojiSet = EMOJIS[mode];
    // More particles for celebration
    const count = mode === 'celebration' ? 50 : 30;

    for (let i = 0; i < count; i++) {
      newHearts.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: Math.random() * 10 + 10, // 10-20 seconds
        delay: Math.random() * 15,
        size: Math.random() * 20 + 15, // Slightly larger icons
        emoji: emojiSet[Math.floor(Math.random() * emojiSet.length)],
      });
    }
    setHearts(newHearts);
  }, [mode]);

  const isSad = mode === 'sad';
  const animationName = isSad ? 'animate-fall' : 'animate-fly';
  
  // Sad mode: Rain falls from top
  // Love/Celebration: Hearts fly from bottom
  const verticalPosition = isSad ? { top: '-50px' } : { bottom: '-50px' };
  
  // Grayscale for sad mode
  const colorClass = isSad ? 'grayscale opacity-70' : '';

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={`${heart.id}-${mode}`}
          className={`absolute ${animationName} ${colorClass} select-none`}
          style={{
            left: `${heart.left}%`,
            ...verticalPosition,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.animationDuration}s`,
            animationDelay: `-${heart.delay}s`, 
          }}
        >
          {heart.emoji}
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;