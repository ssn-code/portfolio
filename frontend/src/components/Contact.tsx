import { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Github, Linkedin, Send, MessageSquareCode, Check, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', role: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Trim values
    const name = formData.name.trim();
    const email = formData.email.trim();
    const role = formData.role.trim();
    const message = formData.message.trim();

    // Frontend validation
    if (!name || name.length < 2 || name.length > 80) {
      setErrorMessage('Name must be between 2 and 80 characters.');
      setStatus('error');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email) || email.length > 320) {
      setErrorMessage('Please enter a valid email address.');
      setStatus('error');
      return;
    }
    if (role.length > 120) {
      setErrorMessage('Role/Affiliation cannot exceed 120 characters.');
      setStatus('error');
      return;
    }
    if (!message || message.length < 10 || message.length > 1500) {
      setErrorMessage('Message must be between 10 and 1500 characters.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, role: role || undefined, message }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', role: '', message: '' });
      } else {
        setErrorMessage(data.message || 'Unable to transmit your message. Please try again.');
        setStatus('error');
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      setErrorMessage('Unable to transmit your message. Please try again.');
      setStatus('error');
    }
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
                    disabled={status === 'submitting'}
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">Your Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    disabled={status === 'submitting'}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. alex@example.com"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">Your Affiliation / Role</label>
                  <input
                    type="text"
                    name="role"
                    disabled={status === 'submitting'}
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="e.g. Peer Researcher / Recruiter"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">Message *</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    disabled={status === 'submitting'}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Share feedback, suggestions or collaboration notes..."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none transition-all duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className={`w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium text-sm rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(59,130,246,0.2)] hover:shadow-[0_4px_20px_rgba(34,211,238,0.3)] ${status === 'submitting' ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {status === 'submitting' ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Transmit Message</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
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
                    <span>Message transmitted successfully. I'll get back to you soon.</span>
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
                    <span>{errorMessage || 'Unable to transmit your message. Please try again.'}</span>
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

          {/* Right Column: Secure contact guidelines */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="glass-panel p-8 rounded-2xl border border-slate-800/80 flex flex-col h-full justify-between">
              
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-900">
                  <div className="flex items-center gap-2">
                    <MessageSquareCode className="w-5 h-5 text-cyan-400" />
                    <h4 className="text-xl font-bold font-sans text-white">Contact Channel</h4>
                  </div>
                  <span className="text-[9px] font-mono bg-cyan-950/40 text-cyan-400 border border-cyan-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    ● SECURE CONTACT CHANNEL
                  </span>
                </div>

                <div className="space-y-6 text-slate-300 text-sm leading-relaxed font-sans">
                  <p>
                    Your message will be transmitted securely over a standard SSL/TLS channel directly to my system.
                  </p>
                  
                  <div className="space-y-4 mt-8">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                      <div>
                        <strong className="text-white block text-xs uppercase font-mono tracking-wider text-cyan-400">Direct Delivery</strong>
                        <span>Submissions trigger a real-time notification to my personal inbox via Resend.</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                      <div>
                        <strong className="text-white block text-xs uppercase font-mono tracking-wider text-cyan-400">Persistent Storage</strong>
                        <span>Your message is securely stored in a relational PostgreSQL database on Neon.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                      <div>
                        <strong className="text-white block text-xs uppercase font-mono tracking-wider text-cyan-400">Response Window</strong>
                        <span>I typically review all incoming inquiries and get back to you within 24 to 48 hours.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-900 text-xs text-slate-500 font-mono">
                SSL TRANSFERS ACTIVE & ENCRYPTED IN TRANSIT
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
