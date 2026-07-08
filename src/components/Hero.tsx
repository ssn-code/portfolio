import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code, Server, Shield, BrainCircuit, Terminal, ArrowDownRight } from 'lucide-react';

const roles = [
  'Full Stack Development Learner',
  'Machine Learning Enthusiast',
  'Cybersecurity Learner',
  'Problem Solver'
];

interface HeroProps {
  onViewProjects: () => void;
  onContact: () => void;
}

export default function Hero({ onViewProjects, onContact }: HeroProps) {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-12 overflow-hidden">
      <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center relative z-10">
        
        {/* Modern Tech Indicator Tag */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-xs text-cyan-400 font-mono tracking-wider mb-6 border border-cyan-500/10"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          STATUS: ACTIVELY LEARNING & BUILDING
        </motion.div>

        {/* Headings */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-8xl font-sans font-extrabold tracking-tight text-white mb-2"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-200 via-white to-slate-400">
            ShivShakthi
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-2xl font-sans text-cyan-300 font-medium tracking-wide mb-6"
        >
          Computer Science Engineering Student
        </motion.p>

        {/* Animate-cycled Roles */}
        <div className="h-12 md:h-16 flex items-center justify-center mb-10 overflow-hidden relative w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={roleIndex}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="text-xl md:text-3xl font-mono text-slate-300 select-none flex items-center gap-2.5"
            >
              <Terminal className="w-5 h-5 md:w-7 md:h-7 text-cyan-400" />
              <span>{roles[roleIndex]}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Minimal Bio overview inside Hero */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="max-w-2xl text-slate-400 md:text-lg leading-relaxed mb-12"
        >
          Welcome to my digital space. As a CS student, I focus on laying a strong foundation across full-stack systems, modern machine learning paradigms, network security, and cryptographic ledger designs.
        </motion.p>

        {/* Call to Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <button
            onClick={onViewProjects}
            className="group px-8 py-3.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium shadow-[0_4px_20px_rgba(59,130,246,0.35)] hover:shadow-[0_4px_25px_rgba(34,211,238,0.5)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border border-cyan-400/20"
          >
            View Projects
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDownRight className="w-4 h-4" />
            </motion.span>
          </button>
          <button
            onClick={onContact}
            className="px-8 py-3.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-medium border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            Contact
          </button>
        </motion.div>

        {/* Icon strip representing learning focal areas */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="hidden md:flex items-center gap-12 mt-24 text-slate-400"
        >
          <div className="flex flex-col items-center gap-1.5">
            <Code className="w-5 h-5 text-blue-400" />
            <span className="text-[10px] font-mono tracking-widest text-slate-500">DEV</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <BrainCircuit className="w-5 h-5 text-cyan-400" />
            <span className="text-[10px] font-mono tracking-widest text-slate-500">AI / ML</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Shield className="w-5 h-5 text-indigo-400" />
            <span className="text-[10px] font-mono tracking-widest text-slate-500">CYBER</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Server className="w-5 h-5 text-emerald-400" />
            <span className="text-[10px] font-mono tracking-widest text-slate-500">LEDGER</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
