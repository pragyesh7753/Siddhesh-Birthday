import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  shape: string;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  life: number;
  maxLife: number;
}

interface Balloon {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  stringLength: number;
}

export default function Confetti() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  useEffect(() => {
    const colors = ['#ff69b4', '#ff1493', '#9370db', '#00bfff', '#ffd700', '#ff6347', '#32cd32', '#ff4500'];
    const shapes = ['🎉', '🎊', '✨', '⭐', '🎈', '🎁', '🎂', '🍰', '🌟', '💖'];

    // Create confetti particles
    const initialParticles: Particle[] = Array.from({ length: 200 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -50 - Math.random() * 100,
      vx: (Math.random() - 0.5) * 8,
      vy: Math.random() * 4 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 12 + 6,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      opacity: 1,
      life: 0,
      maxLife: Math.random() * 200 + 300,
    }));

    // Create floating balloons
    const initialBalloons: Balloon[] = Array.from({ length: 8 }, (_, i) => ({
      id: i + 1000,
      x: Math.random() * (window.innerWidth - 100) + 50,
      y: window.innerHeight + 100,
      vx: (Math.random() - 0.5) * 2,
      vy: -Math.random() * 2 - 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 20 + 30,
      stringLength: Math.random() * 50 + 30,
    }));

    setParticles(initialParticles);
    setBalloons(initialBalloons);

    const animate = () => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: particle.x + particle.vx + Math.sin(particle.life * 0.02) * 0.5,
          y: particle.y + particle.vy,
          vy: particle.vy + 0.12, // gravity
          vx: particle.vx * 0.999, // air resistance
          rotation: particle.rotation + particle.rotationSpeed,
          life: particle.life + 1,
          opacity: Math.max(0, 1 - (particle.life / particle.maxLife)),
        })).filter(particle => 
          particle.y < window.innerHeight + 100 && 
          particle.opacity > 0.1 &&
          particle.x > -50 && 
          particle.x < window.innerWidth + 50
        )
      );

      setBalloons(prev =>
        prev.map(balloon => ({
          ...balloon,
          x: balloon.x + balloon.vx + Math.sin(Date.now() * 0.001 + balloon.id) * 0.5,
          y: balloon.y + balloon.vy,
          vx: balloon.vx + (Math.random() - 0.5) * 0.1,
        })).filter(balloon => balloon.y > -200)
      );
    };

    const interval = setInterval(animate, 16);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setParticles([]);
      setBalloons([]);
    }, 12000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Confetti Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute transition-opacity duration-100"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            transform: `rotate(${particle.rotation}deg)`,
            opacity: particle.opacity,
          }}
        >
          <div
            className="flex items-center justify-center font-bold shadow-lg"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              fontSize: `${particle.size * 0.8}px`,
              color: particle.color,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
            }}
          >
            {particle.shape}
          </div>
        </div>
      ))}

      {/* Floating Balloons */}
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className="absolute"
          style={{
            left: `${balloon.x}px`,
            top: `${balloon.y}px`,
          }}
        >
          <div className="relative">
            {/* Balloon */}
            <div
              className="rounded-full shadow-lg animate-pulse"
              style={{
                width: `${balloon.size}px`,
                height: `${balloon.size * 1.2}px`,
                background: `radial-gradient(ellipse at 30% 30%, ${balloon.color}, ${balloon.color}dd)`,
                boxShadow: `0 4px 8px rgba(0,0,0,0.2), inset -2px -2px 4px rgba(255,255,255,0.3)`,
              }}
            />
            {/* String */}
            <div
              className="absolute left-1/2 top-full w-0.5 bg-gray-400"
              style={{
                height: `${balloon.stringLength}px`,
                transform: 'translateX(-50%)',
              }}
            />
            {/* String end */}
            <div
              className="absolute left-1/2 w-2 h-2 bg-gray-600 rounded-full"
              style={{
                top: `${balloon.size * 1.2 + balloon.stringLength}px`,
                transform: 'translateX(-50%)',
              }}
            />
          </div>
        </div>
      ))}

      {/* Sparkle effects */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute text-yellow-400 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              fontSize: `${Math.random() * 10 + 15}px`,
            }}
          >
            ✨
          </div>
        ))}
      </div>
    </div>
  );
}
