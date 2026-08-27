import { motion } from 'motion/react';
import { Terminal, Cpu, HardDrive } from 'lucide-react';
import { SkillGroup } from '../types';

const skillGroups: SkillGroup[] = [
  {
    category: 'Programming',
    skills: [
      { name: 'Python', level: 'Core', percentage: 90 },
      { name: 'JavaScript', level: 'Core', percentage: 80 },
      { name: 'SQL', level: 'Core', percentage: 85 },
      { name: 'HTML', level: 'Core', percentage: 95 },
      { name: 'CSS', level: 'Core', percentage: 88 }
    ]
  },
  {
    category: 'Frameworks & Tools',
    skills: [
      { name: 'React', level: 'Core', percentage: 82 },
      { name: 'FastAPI', level: 'Core', percentage: 80 },
      { name: 'PostgreSQL', level: 'Familiar', percentage: 75 },
      { name: 'Git', level: 'Familiar', percentage: 85 },
      { name: 'Linux', level: 'Exploring', percentage: 70 },
      { name: 'VS Code', level: 'Core', percentage: 92 }
    ]
  },
  {
    category: 'Learning Areas',
    skills: [
      { name: 'Cybersecurity Fundamentals', level: 'Exploring', percentage: 70 },
      { name: 'Blockchain', level: 'Exploring', percentage: 60 }
    ]
  }
];

export default function Skills() {
  const getIcon = (category: string) => {
    switch (category) {
      case 'Programming':
        return <Terminal className="w-5 h-5 text-cyan-400" />;
      case 'Frameworks & Tools':
        return <Cpu className="w-5 h-5 text-blue-400" />;
      default:
        return <HardDrive className="w-5 h-5 text-indigo-400" />;
    }
  };

  const getColorStyles = (category: string) => {
    switch (category) {
      case 'Programming':
        return {
          headerBg: 'bg-cyan-500/5 border-cyan-500/10 text-cyan-400',
          barColor: 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]',
        };
      case 'Frameworks & Tools':
        return {
          headerBg: 'bg-blue-500/5 border-blue-500/10 text-blue-400',
          barColor: 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]',
        };
      default:
        return {
          headerBg: 'bg-indigo-500/5 border-indigo-500/10 text-indigo-400',
          barColor: 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]',
        };
    }
  };

  return (
    <section id="skills" className="py-24 px-6 relative overflow-hidden bg-slate-900/10">
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
            Technical Abstraction
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-white mt-2"
          >
            Skills Matrix
          </motion.h3>
          <div className="w-12 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-500 mt-4 rounded-full"></div>
        </div>

        {/* Skill Panels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillGroups.map((group, groupIdx) => {
            const styles = getColorStyles(group.category);
            return (
              <motion.div
                key={groupIdx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-100px' }}
                transition={{ duration: 0.6, delay: groupIdx * 0.15 }}
                className="glass-panel p-6 rounded-2xl border border-slate-800/80 flex flex-col h-full"
              >
                
                {/* Category Header */}
                <div className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border mb-6 ${styles.headerBg}`}>
                  {getIcon(group.category)}
                  <h4 className="font-mono text-xs font-semibold tracking-wider uppercase">{group.category}</h4>
                </div>

                {/* Skill List */}
                <div className="space-y-5 flex-grow">
                  {group.skills.map((skill, skillIdx) => (
                    <div key={skillIdx} className="group/item">
                      <div className="flex justify-between items-center mb-1 text-sm">
                        <span className="text-slate-200 group-hover/item:text-white transition-colors duration-200 font-medium font-sans">
                          {skill.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border border-slate-700/60 ${
                            skill.level === 'Core' 
                              ? 'bg-cyan-500/5 text-cyan-400 border-cyan-500/10'
                              : skill.level === 'Familiar'
                              ? 'bg-blue-500/5 text-blue-400 border-blue-500/10'
                              : 'bg-indigo-500/5 text-indigo-400 border-indigo-500/10'
                          }`}>
                            {skill.level}
                          </span>
                        </div>
                      </div>
                      
                      {/* Skill percentage line */}
                      <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.percentage}%` }}
                          viewport={{ once: false }}
                          transition={{ duration: 1, delay: skillIdx * 0.05 + 0.2 }}
                          className={`h-full ${styles.barColor}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
