import { motion } from 'motion/react';
import { BookOpen, Trophy, Sparkles, Lightbulb } from 'lucide-react';

export default function About() {
  const highlights = [
    {
      icon: Lightbulb,
      title: 'Problem Solver',
      text: 'Approach CS theory and programming challenges with a step-by-step modular analytical mindset.',
      color: 'text-cyan-400',
      bg: 'rgba(6, 182, 212, 0.05)',
    },
    {
      icon: BookOpen,
      title: 'Continuous Growth',
      text: 'Highly motivated autodidact regularly pursuing independent micro-credentials and research.',
      color: 'text-blue-400',
      bg: 'rgba(59, 130, 246, 0.05)',
    },
    {
      icon: Sparkles,
      title: 'Practical Builder',
      text: 'Eager to construct functional code environments that address standard security and intelligence problems.',
      color: 'text-indigo-400',
      bg: 'rgba(99, 102, 241, 0.05)',
    },
    {
      icon: Trophy,
      title: 'Active CSE Learner',
      text: 'Curious about blockchain consensus mechanics, robust deep learning models, and secure architectures.',
      color: 'text-emerald-400',
      bg: 'rgba(16, 185, 129, 0.05)',
    }
  ];

  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-xs font-mono uppercase tracking-widest text-cyan-400"
          >
            Developer Background
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-white mt-2"
          >
            About Me
          </motion.h3>
          <div className="w-12 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-500 mt-4 rounded-full"></div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Detailed Narrative */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6 text-slate-300 md:text-lg leading-relaxed font-sans"
          >
            <p>
              I'm a <span className="text-cyan-300 font-semibold">Computer Science Engineering student</span> passionate about building practical solutions with technology. My interests span <span className="text-indigo-300">Cybersecurity</span>, <span className="text-cyan-300">Distributed Systems</span>, <span className="text-blue-300">Database Design</span>, and <span className="text-emerald-300">Software Development</span>.
            </p>
            <p>
              I enjoy turning ideas into working projects because I learn best by building, experimenting, and solving real-world problems. Every project helps me strengthen my understanding of system design, programming, security, and modern development practices.
            </p>
            <p>
              I'm constantly learning new technologies, improving my skills, and exploring ways to create secure, efficient, and scalable applications. My goal is to grow into a software engineer who can solve complex problems with curiosity, discipline, and a commitment to continuous learning.
            </p>
          </motion.div>

          {/* Quick Pillars/Characteristics cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-panel p-5 rounded-xl border border-slate-800/80 hover:border-blue-500/30 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(59,130,246,0.05)]"
                >
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 border border-white/5"
                    style={{ backgroundColor: item.bg }}
                  >
                    <IconComponent className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <h4 className="text-white font-medium text-base mb-1.5">{item.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{item.text}</p>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
