import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Menu, X, ArrowUpRight, ChevronRight, Terminal } from 'lucide-react';

// Component Imports
import ParticleBackground from './components/ParticleBackground';
import CursorGlow from './components/CursorGlow';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Timeline from './components/Timeline';
import Contact from './components/Contact';

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Shrink nav bar on scroll
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Identify active navigation anchor
      const sections = ['home', 'about', 'skills', 'projects', 'education', 'journey', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section === 'home' ? 'root' : section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const target = id === 'home' ? document.getElementById('root') : document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navLinks = [
    { name: 'About', target: 'about' },
    { name: 'Skills', target: 'skills' },
    { name: 'Projects', target: 'projects' },
    { name: 'Education', target: 'education' },
    { name: 'Journey', target: 'journey' },
    { name: 'Contact', target: 'contact' },
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      
      {/* Absolute Backdrop Layers */}
      <ParticleBackground />
      <CursorGlow />

      {/* Floating Top Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-slate-950/80 backdrop-blur-md py-4 border-b border-white/5' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('home')}
            className="group flex items-center gap-1.5 font-sans font-extrabold text-xl font-mono text-white tracking-wider hover:opacity-90 transition-opacity cursor-pointer"
          >
            <span className="text-cyan-400">&lt;</span>
            SSN
            <span className="text-blue-500">/&gt;</span>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => scrollToSection(link.target)}
                className={`text-sm font-medium transition-colors duration-200 relative py-1 cursor-pointer ${
                  activeSection === link.target 
                    ? 'text-cyan-400' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {link.name}
                {activeSection === link.target && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
            
            {/* Direct interactive sandbox trigger button */}
            <button
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-wider text-cyan-400 bg-cyan-950/30 hover:bg-cyan-950/60 border border-cyan-500/20 hover:border-cyan-500/40 px-3.5 py-1.5 rounded-lg transition-all duration-200 cursor-pointer"
            >
              PING GUESTBOOK
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </nav>

          {/* Hamburger Menu on Mobile */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => scrollToSection('contact')}
              className="text-[10px] font-mono font-semibold text-cyan-400 bg-cyan-950/40 border border-cyan-500/10 px-2.5 py-1 rounded-md"
            >
              GUESTBOOK
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Panel Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[73px] z-30 bg-slate-950/95 backdrop-blur-lg px-6 py-8 border-b border-white/5 md:hidden"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.target}
                  onClick={() => scrollToSection(link.target)}
                  className={`text-lg font-medium text-left py-2.5 border-b border-slate-900/40 flex items-center justify-between cursor-pointer ${
                    activeSection === link.target ? 'text-cyan-400' : 'text-slate-300'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Single Page Layout Container */}
      <main className="relative">
        
        {/* HERO AREA */}
        <div id="home">
          <Hero 
            onViewProjects={() => scrollToSection('projects')} 
            onContact={() => scrollToSection('contact')} 
          />
        </div>

        {/* ABOUT ME AREA */}
        <div className="border-t border-slate-950">
          <About />
        </div>

        {/* SKILLS SECTION */}
        <div className="border-t border-slate-950">
          <Skills />
        </div>

        {/* PROJECTS SHOWCASE AREA */}
        <div className="border-t border-slate-950">
          <Projects />
        </div>

        {/* EDUCATION HUB */}
        <div className="border-t border-slate-950">
          <Education />
        </div>

        {/* JOURNEY & TIMELINE CHRONOLOGY */}
        <div className="border-t border-slate-950">
          <Timeline />
        </div>

        {/* CONTACT MATRICES & FORM / LIVE LOGGER */}
        <div className="border-t border-slate-950 pb-16">
          <Contact />
        </div>

      </main>

      {/* Footer Area */}
      <footer className="relative py-12 px-6 border-t border-slate-900">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          
          <div className="flex items-center gap-2.5 text-xs text-slate-500 font-mono">
            <Terminal className="w-4 h-4 text-cyan-500" />
            <span>SHIVSHAKTHI PORTFOLIO © 2026 • CSE STUDENT EXPEDITIONS</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400 font-mono">
            <span className="hidden sm:inline-block">Status: Building Operational Tools</span>
            <button 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-cyan-400 transition-colors duration-200 cursor-pointer uppercase flex items-center gap-1"
            >
              PAGE TOP ↑
            </button>
          </div>

        </div>
      </footer>

    </div>
  );
}
