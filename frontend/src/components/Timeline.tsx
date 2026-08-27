import { motion } from 'motion/react';
import { Code, BookOpen, BrainCircuit, ShieldAlert, Rocket, CheckCircle2, Circle } from 'lucide-react';
import { TimelineEvent } from '../types';

const timelineEvents: TimelineEvent[] = [
  {
    id: 'stage1',
    title: 'Started Programming',
    subtitle: 'Self-Directed Fundamentals',
    description: 'Initiated my CS coding stream. Mastered fundamental algorithms, dry-run variable traces, logical scripting, object-oriented concepts, and computational theory using Python.',
    iconName: 'Code',
    tag: 'THE COMPILER CORE',
    status: 'completed',
  },
  {
    id: 'stage2',
    title: 'Learning Web Development',
    subtitle: 'Frontend & APIs Integration',
    description: 'Mastered standard web architectures including CSS, responsive mobile grid systems, DOM rendering, complex React layout state hooks, and client-server async exchanges.',
    iconName: 'Terminal',
    tag: 'CLIENT SHELLS',
    status: 'completed',
  },

  {
    id: 'stage4',
    title: 'Learning Cybersecurity',
    subtitle: 'Defensive Infrastructures & Keys',
    description: 'Analyzing security basics—specifically OAuth flow policies, standard TLS/SSL keys, sanitizing inputs, encryption standards, and checking SQL injection protection rules.',
    iconName: 'Shield',
    tag: 'SECURITY AUDITS',
    status: 'learning',
  },
  {
    id: 'stage5',
    title: 'Building Real-World Projects',
    subtitle: 'Full Stack Integration',
    description: 'Composing comprehensive programs (such as SENTINEL) utilizing robust micro-framework backends, relational databases, and customized visual elements.',
    iconName: 'Award',
    tag: 'ACTIVE STAGE',
    status: 'learning',
  }
];

export default function Timeline() {
  const getEventIcon = (name: string, status: string) => {
    const cls = status === 'completed' ? 'text-cyan-400' : 'text-blue-400';
    switch (name) {
      case 'Code':
        return <Code className={`w-5 h-5 ${cls}`} />;
      case 'Cpu':
        return <BrainCircuit className={`w-5 h-5 ${cls}`} />;
      case 'Shield':
        return <ShieldAlert className={`w-5 h-5 ${cls}`} />;
      case 'Award':
        return <Rocket className={`w-5 h-5 ${cls}`} />;
      default:
        return <BookOpen className={`w-5 h-5 ${cls}`} />;
    }
  };

  return (
    <section id="journey" className="py-24 px-6 relative overflow-hidden bg-slate-950/20">
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-xs font-mono uppercase tracking-widest text-cyan-400"
          >
            Milestones Tracker
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-white mt-2"
          >
            Learning Journey
          </motion.h3>
          <div className="w-12 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-500 mt-4 rounded-full"></div>
        </div>

        {/* Timeline Line & Node Layout */}
        <div className="relative border-l border-slate-800/80 ml-4 md:ml-32 space-y-12">
          
          {timelineEvents.map((event, idx) => {
            const isCompleted = event.status === 'completed';
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: '-100px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-8 md:pl-12 group"
              >
                
                {/* Year tag left-aligned on desktop, fallback to top on mobile */}
                <div className="absolute top-1.5 -left-4 md:-left-36 hidden md:block text-right w-24">
                  <span className={`text-xs font-mono font-bold tracking-widest ${
                    isCompleted ? 'text-slate-400' : 'text-cyan-400'
                  }`}>
                    {event.status === 'completed' ? 'STAGE 0' + (idx + 1) : 'ACTIVE'}
                  </span>
                </div>

                {/* Node Dot / Marker */}
                <div className="absolute top-1.5 -left-[17px] w-8 h-8 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center z-10 transition-all duration-300 group-hover:border-blue-500/50 group-hover:shadow-[0_0_12px_rgba(59,130,246,0.3)]">
                  {getEventIcon(event.iconName, event.status)}
                </div>

                {/* Panel Card */}
                <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 hover:border-slate-700/80 transition-all duration-300 relative">
                  
                  {/* Glowing connector back */}
                  <div className={`absolute top-0 bottom-0 -left-6 md:-left-10 w-[1px] ${
                    isCompleted ? 'bg-gradient-to-b from-cyan-500/25 to-blue-500/25' : 'bg-slate-800/50'
                  }`} />

                  <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
                    
                    {/* Event indicators */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest">
                        {event.tag}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-1.5">
                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          COMPLETED
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-cyan-300 bg-cyan-500/5 border border-cyan-500/10 px-2 py-0.5 rounded-full animate-pulse">
                          <Circle className="w-2.5 h-2.5 fill-cyan-400 stroke-none" />
                          IN PROGRESS
                        </span>
                      )}
                    </div>

                  </div>

                  <h4 className="text-lg md:text-xl font-bold font-sans text-white group-hover:text-cyan-300 transition-colors duration-200">
                    {event.title}
                  </h4>
                  {event.subtitle && (
                    <p className="text-xs font-mono text-slate-400 mt-0.5 mb-3">{event.subtitle}</p>
                  )}

                  <p className="text-slate-400 text-sm leading-relaxed font-sans mt-2">
                    {event.description}
                  </p>

                </div>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
