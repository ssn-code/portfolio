import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  glow?: boolean;
}

export default function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate a fixed set of randomized particles at mount to ensure server consistency
    const temp: Particle[] = Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 20, // 20s to 40s
      delay: Math.random() * -20, // Negative delay so they start animated
      glow: Math.random() > 0.85,
    }));
    setParticles(temp);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-bg opacity-30"></div>

      {/* Radial Glow Elements */}
      <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full glow-bg-cyan opacity-40 blur-3xl"></div>
      <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full glow-bg-blue opacity-40 blur-3xl"></div>
      <div className="absolute top-[40%] right-[10%] w-[35%] h-[35%] rounded-full glow-bg-cyan opacity-25 blur-3xl"></div>

      {/* Floating Sparkles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${
            p.glow 
              ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]' 
              : 'bg-slate-500/40'
          }`}
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: ['0vh', '-100vh'],
            x: ['0vw', `${(p.id % 2 === 0 ? 1 : -1) * (Math.random() * 8 + 2)}vw`],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
