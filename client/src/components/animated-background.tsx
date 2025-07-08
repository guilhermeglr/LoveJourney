import { useEffect, useState } from 'react';
import { Theme } from '@/hooks/use-theme';

interface AnimatedBackgroundProps {
  theme: Theme;
}

export function AnimatedBackground({ theme }: AnimatedBackgroundProps) {
  const [particles, setParticles] = useState<Array<{ id: number; emoji: string; left: number; size: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    const createParticle = () => {
      const emojis = ['💕', '✨', '💖', '🌹', '💫', '💝', '🎀', '💗'];
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      const particle = {
        id: Date.now() + Math.random(),
        emoji,
        left: Math.random() * 100,
        size: Math.random() * 25 + 15,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 3,
      };

      setParticles(prev => [...prev, particle]);

      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== particle.id));
      }, 5000);
    };

    // Create initial particles
    for (let i = 0; i < 5; i++) {
      setTimeout(createParticle, i * 400);
    }

    // Continue creating particles
    const interval = setInterval(createParticle, 2000);

    return () => clearInterval(interval);
  }, []);

  const getThemeClass = () => {
    switch (theme) {
      case 'sunset':
        return 'gradient-sunset';
      case 'ocean':
        return 'gradient-ocean';
      default:
        return 'gradient-romantic';
    }
  };

  return (
    <div className={`fixed inset-0 ${getThemeClass()} transition-all duration-1000 ease-in-out`}>
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle text-white/30"
            style={{
              left: `${particle.left}%`,
              fontSize: `${particle.size}px`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          >
            {particle.emoji}
          </div>
        ))}
      </div>
    </div>
  );
}
