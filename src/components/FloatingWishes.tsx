import { useState, useEffect } from 'react';

interface FloatingWish {
  id: number;
  text: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  emoji: string;
  life: number;
  maxLife: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

const wishTexts = [
  "Happy Birthday!",
  "Dreams come true!",
  "Joy & Happiness!",
  "Amazing year ahead!",
  "You're wonderful!",
  "Magical day!",
  "Celebrating you!",
  "Fantastic year!",
  "Best wishes!",
  "Amazing birthday!",
  "Lots of love!",
  "Best year yet!",
];

const emojis = ['🎉', '🎂', '🎈', '✨', '🌟', '💖', '🎁', '🥳', '🍰', '🎊', '💫', '🌈'];
const colors = [
  'from-pink-400 to-rose-500',
  'from-purple-400 to-indigo-500',
  'from-blue-400 to-cyan-500',
  'from-emerald-400 to-teal-500',
  'from-yellow-400 to-orange-500',
  'from-red-400 to-pink-500',
];

export default function FloatingWishes() {
  const [wishes, setWishes] = useState<FloatingWish[]>([]);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;

    const createWish = () => {
      const newWish: FloatingWish = {
        id: Date.now() + Math.random(),
        text: wishTexts[Math.floor(Math.random() * wishTexts.length)],
        x: Math.random() * (window.innerWidth - 200),
        y: window.innerHeight + 50,
        vx: (Math.random() - 0.5) * 2,
        vy: -Math.random() * 2 - 1,
        size: Math.random() * 4 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        life: 0,
        maxLife: Math.random() * 300 + 400,
        opacity: 1,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
      };
      
      setWishes(prev => [...prev, newWish]);
    };

    const animate = () => {
      setWishes(prev => 
        prev.map(wish => ({
          ...wish,
          x: wish.x + wish.vx + Math.sin(wish.life * 0.01) * 0.5,
          y: wish.y + wish.vy,
          vx: wish.vx + (Math.sin(wish.life * 0.005) * 0.02),
          life: wish.life + 1,
          opacity: Math.max(0, 1 - (wish.life / wish.maxLife)),
          rotation: wish.rotation + wish.rotationSpeed,
        })).filter(wish => 
          wish.y > -200 && 
          wish.opacity > 0.1 &&
          wish.x > -400 && 
          wish.x < window.innerWidth + 100
        )
      );
    };

    // Create initial wishes
    for (let i = 0; i < 2; i++) {
      setTimeout(createWish, i * 3000);
    }

    // Continue creating wishes
    const wishInterval = setInterval(createWish, 5000);
    const animationInterval = setInterval(animate, 50);

    const timeout = setTimeout(() => {
      setIsActive(false);
      clearInterval(wishInterval);
      setTimeout(() => {
        clearInterval(animationInterval);
        setWishes([]);
      }, 10000);
    }, 30000);

    return () => {
      clearInterval(wishInterval);
      clearInterval(animationInterval);
      clearTimeout(timeout);
    };
  }, [isActive]);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {wishes.map((wish) => (
        <div
          key={wish.id}
          className="absolute transition-opacity duration-300"
          style={{
            left: `${wish.x}px`,
            top: `${wish.y}px`,
            opacity: wish.opacity,
            transform: `rotate(${wish.rotation}deg)`,
          }}
        >
          <div
            className={`bg-gradient-to-r ${wish.color} text-white px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm border border-white/30 flex items-center gap-1.5 whitespace-nowrap`}
            style={{
              fontSize: `${wish.size}px`,
              boxShadow: '0 4px 16px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <span className="text-sm">{wish.emoji}</span>
            <span className="font-medium drop-shadow-sm text-xs">{wish.text}</span>
            <span className="text-sm">{wish.emoji}</span>
          </div>
        </div>
      ))}

      {/* Sparkle Trail Effects */}
      {wishes.map((wish) => (
        <div
          key={`trail-${wish.id}`}
          className="absolute pointer-events-none"
          style={{
            left: `${wish.x + 150}px`,
            top: `${wish.y + 20}px`,
          }}
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-yellow-300 animate-ping"
              style={{
                left: `${i * -15 + Math.sin(wish.life * 0.1 + i) * 8}px`,
                top: `${i * 8 + Math.cos(wish.life * 0.1 + i) * 4}px`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: '1.5s',
                opacity: wish.opacity * 0.5,
                fontSize: '8px',
              }}
            >
              ✨
            </div>
          ))}
        </div>
      ))}

      {/* Heart Rain Effect */}
      <div className="absolute inset-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`heart-${i}`}
            className="absolute text-pink-400 animate-bounce"
            style={{
              left: `${(i * 15) % 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              fontSize: `${10 + Math.random() * 6}px`,
              opacity: 0.4,
            }}
          >
            💖
          </div>
        ))}
      </div>

      {/* Birthday Confetti Text */}
      {/* <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 pointer-events-none">
        <div className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-pulse opacity-20">
          🎂 HAPPY BIRTHDAY 🎂
        </div>
      </div> */}

      {/* Floating Emojis */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={`emoji-${i}`}
          className="absolute text-2xl font-bold text-purple-300 animate-bounce opacity-25"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${4 + Math.random() * 2}s`,
          }}
        >
          {i === 0 ? '🎉' : i === 1 ? '🎊' : i === 2 ? '🎈' : '🎁'}
        </div>
      ))}
    </div>
  );
}