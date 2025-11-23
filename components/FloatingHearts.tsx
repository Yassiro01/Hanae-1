import React, { useEffect, useState } from 'react';

export type HeartMode = 'love' | 'sad' | 'celebration';

interface Heart {
  id: number;
  left: number;
  animationDuration: number;
  delay: number;
  opacity: number;
  size: number;
  emoji: string;
}

interface FloatingHeartsProps {
  mode?: HeartMode;
}

const EMOJIS = {
  love: ['❤', '💖', '💕', '💗', '💓'],
  sad: ['💔', '😢', '🌧️', '🥺', '🥀'],
  celebration: ['💍', '🥂', '💒', '💖', '✨', '💑']
};

const FloatingHearts: React.FC<FloatingHeartsProps> = ({ mode = 'love' }) => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const newHearts: Heart[] = [];
    const emojiSet = EMOJIS[mode];

    for (let i = 0; i < 35; i++) {
      newHearts.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: Math.random() * 15 + 10, // 10-25 seconds
        delay: Math.random() * 20,
        opacity: Math.random() * 0.5 + 0.3,
        size: Math.random() * 20 + 10,
        emoji: emojiSet[Math.floor(Math.random() * emojiSet.length)],
      });
    }
    setHearts(newHearts);
  }, [mode]);

  const isSad = mode === 'sad';
  const animationName = isSad ? 'animate-fall' : 'animate-fly';
  const verticalStyle = isSad ? { top: '-50px' } : { bottom: '-50px' };
  
  // Choose color style based on mode
  const colorClass = isSad ? 'text-blue-400 grayscale opacity-80' : 'text-valentine-300';

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={`${heart.id}-${mode}`}
          className={`absolute ${animationName} ${colorClass}`}
          style={{
            left: `${heart.left}%`,
            ...verticalStyle,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.animationDuration}s`,
            animationDelay: `-${heart.delay}s`, 
            opacity: heart.opacity,
          }}
        >
          {heart.emoji}
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;