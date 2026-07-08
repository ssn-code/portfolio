import { motion } from 'motion/react';
import { GraduationCap, BookOpen, ShieldAlert, Binary, Layers } from 'lucide-react';

export default function Education() {
  const courses = [
    { name: 'Data Structures & Algorithms', desc: 'Space/Time optimization, graphs, search algorithms.' },
    { name: 'Database Management (SQL)', desc: 'Relational schemas, queries, normalization patterns.' },
    { name: 'Machine Learning Foundations', desc: 'Regression, classification, feature evaluation models.' },
    { name: 'Network Security Basics', desc: 'Secure handshakes, JWT session security, authorization.' },
  ];

  return (
    <section id="education" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-950/5 pointer-events-none"></div>
      
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
            Academic Foundation
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-white mt-2"
          >
            Education & Academy
          </motion.h3>
          <div className="w-12 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-500 mt-4 rounded-full"></div>
        </div>

        {/* Education Highlight Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Institution Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass-panel p-8 rounded-2xl border border-slate-800/80 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-cyan-500/5 rounded-xl border border-cyan-500/10 text-cyan-400">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">UNDERGRADUATE CANDIDATE</span>
                  <h4 className="text-xl md:text-2xl font-bold text-white mt-1">Computer Science Engineering</h4>
                  <p className="text-sm font-mono text-slate-400 mt-1">Bachelor of Engineering (B.E. / B.Tech Equivalency)</p>
                </div>
              </div>

              <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                Pursuing a rigorous structural course outline covering fundamental computational architectures, mathematics, and advanced programming logic. Continuously working to supplement university curriculum with industry-aligned frameworks.
              </p>

              <div className="grid grid-cols-2 gap-4 border-t border-slate-900 pt-6">
                <div>
                  <p className="text-xs font-mono text-slate-500 uppercase">Focus Area</p>
                  <p className="text-slate-200 mt-1 font-medium text-sm">Distributed Systems & AI/ML</p>
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-500 uppercase">Status</p>
                  <p className="text-slate-200 mt-1 font-medium text-sm">Full-Time Student</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-900/40 text-xs font-mono text-slate-500 flex items-center gap-2">
              <Binary className="w-4 h-4 text-cyan-500/50" />
              <span>LOGICAL ANALYSIS & COMPILATION ROBUSTNESS</span>
            </div>
          </motion.div>

          {/* Core Modules Grid */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <h5 className="text-xs uppercase font-mono tracking-widest text-slate-400 mb-1 pl-1">Targeted Course Modules:</h5>
            {courses.map((course, idx) => (
              <motion.div
                key={course.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: '-100px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel p-4 rounded-xl border border-slate-800/80 flex gap-3.5 items-start hover:border-slate-700/60 transition-colors duration-200"
              >
                <div className="p-1.5 bg-slate-900 rounded border border-slate-800 text-slate-400 mt-0.5">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h6 className="text-sm font-semibold text-slate-200 font-sans">{course.name}</h6>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{course.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
