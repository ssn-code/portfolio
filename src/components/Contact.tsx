import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Github, Linkedin, Send, MessageSquareCode, Check, AlertCircle } from 'lucide-react';
import { GuestbookMessage } from '../types';

export default function Contact() {
  const [messages, setMessages] = useState<GuestbookMessage[]>([]);
  const [formData, setFormData] = useState({ name: '', role: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Pre-seed some educational encouraging notes
  useEffect(() => {
    const saved = localStorage.getItem('ssn_portfolio_messages');
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      const defaultMsgs: GuestbookMessage[] = [
        {
          id: 'def1',
          name: 'Academic Peer',
          role: 'CSE Student @ College',
          message: 'Excellent SecureSphere implementation! The PostGIS spatial sorting looks really clean. Let\'s collaborate on web map modules.',
          timestamp: 'June 10, 2026'
        },
        {
          id: 'def2',
          name: 'Tech Mentor',
          role: 'Full Stack Engineer',
          message: 'ShivShakthi, your focus on solid machine learning foundations and cybersecurity is very refreshing. Keep coding clean platforms!',
          timestamp: 'May 28, 2026'
        }
      ];
      setMessages(defaultMsgs);
      localStorage.setItem('ssn_portfolio_messages', JSON.stringify(defaultMsgs));
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    const newMessage: GuestbookMessage = {
      id: Date.now().toString(),
      name: formData.name,
      role: formData.role.trim() || 'Visitor',
      message: formData.message,
      timestamp: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    };

    const updated = [newMessage, ...messages];
    setMessages(updated);
    localStorage.setItem('ssn_portfolio_messages', JSON.stringify(updated));
    setFormData({ name: '', role: '', message: '' });
    setStatus('success');
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden bg-slate-900/10">
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
            Connect & Collab
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-white mt-2"
          >
            Get In Touch
          </motion.h3>
          <div className="w-12 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-500 mt-4 rounded-full"></div>
        </div>

        {/* Outer Layout split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Form & Contact Info */}
          <div className="lg:col-span-6 space-y-8 flex flex-col justify-between">
            
            <div className="glass-panel p-8 rounded-2xl border border-slate-800/80">
              <h4 className="text-xl font-bold font-sans text-white mb-6 flex items-center gap-2">
                <Send className="w-5 h-5 text-cyan-400" />
                <span>Send a Message</span>
              </h4>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">Your Affiliation / Role</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="e.g. Peer Researcher / Recruiter"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">Message *</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Share feedback, suggestions or collaboration notes..."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none transition-all duration-300 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium text-sm rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(59,130,246,0.2)] hover:shadow-[0_4px_20px_rgba(34,211,238,0.3)] cursor-pointer"
                  >
                    Transmit Message
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

              {/* Status Alert logs */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-3 bg-emerald-500/5 border border-emerald-500/25 rounded-lg flex items-center gap-2 text-emerald-400 text-xs font-sans"
                  >
                    <Check className="w-4 h-4 flex-shrink-0" />
                    <span>Message received! Appended directly to the live Guestbook scroll.</span>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-3 bg-red-500/5 border border-red-500/25 rounded-lg flex items-center gap-2 text-red-400 text-xs font-sans"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Failed to align: Please key in your Name and Message content.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Direct Coordinates */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a 
                href="mailto:ssn20061412@gmail.com"
                className="glass-panel p-4 rounded-xl border border-slate-800/85 hover:border-cyan-500/30 transition-all duration-300 flex flex-col items-center justify-center text-center group font-sans"
              >
                <Mail className="w-5 h-5 text-cyan-400 mb-2 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">EMAIL</span>
                <span className="text-xs text-slate-300 mt-1 truncate max-w-full">ssn20061412</span>
              </a>

              <a 
                href="https://github.com/ssn"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel p-4 rounded-xl border border-slate-800/85 hover:border-blue-500/30 transition-all duration-300 flex flex-col items-center justify-center text-center group font-sans"
              >
                <Github className="w-5 h-5 text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">GITHUB</span>
                <span className="text-xs text-slate-300 mt-1 truncate max-w-full">@ssn</span>
              </a>

              <a 
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel p-4 rounded-xl border border-slate-800/85 hover:border-indigo-500/30 transition-all duration-300 flex flex-col items-center justify-center text-center group font-sans"
              >
                <Linkedin className="w-5 h-5 text-indigo-400 mb-2 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">LINKEDIN</span>
                <span className="text-xs text-slate-300 mt-1 truncate max-w-full">Connect</span>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive guestbook logger / scroll */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="glass-panel p-8 rounded-2xl border border-slate-800/80 flex flex-col h-full max-h-[500px]">
              
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-900">
                <div className="flex items-center gap-2">
                  <MessageSquareCode className="w-5 h-5 text-cyan-400" />
                  <h4 className="text-xl font-bold font-sans text-white">Live App Guestbook</h4>
                </div>
                <span className="text-[9px] font-mono bg-cyan-950/40 text-cyan-400 border border-cyan-500/10 px-2 py-0.5 rounded-full">
                  SYNCED LOCAL STORAGE
                </span>
              </div>

              {/* Message Feed container */}
              <div className="flex-grow overflow-y-auto space-y-4 pr-1 scrollbar-thin">
                <AnimatePresence initial={false}>
                  {messages.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 bg-slate-950 border border-slate-900 rounded-xl flex flex-col justify-between"
                    >
                      <div className="flex items-start justify-between gap-2.5 mb-2">
                        <div>
                          <span className="text-sm font-semibold text-white font-sans">{item.name}</span>
                          <span className="text-[10px] font-mono text-slate-500 ml-2 block sm:inline-block">
                            ({item.role})
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono flex-shrink-0">{item.timestamp}</span>
                      </div>
                      <p className="text-slate-300 text-xs leading-relaxed font-sans">{item.message}</p>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {messages.length === 0 && (
                  <div className="h-full flex items-center justify-center text-center py-12 text-slate-600 font-sans text-xs">
                    No active transmissions in memory. Send a prompt to create the first!
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
