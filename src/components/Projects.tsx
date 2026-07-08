import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Activity, LayoutTemplate, Map, FileCode, Cpu, Github, ExternalLink, ChevronRight } from 'lucide-react';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: 'securesphere',
    title: 'SecureSphere',
    description: 'Crime reporting and safety intelligence platform designed to organize and analyze geospatial incident records. Empowers local communities with critical safety statistics, mapping systems, and route assessment logs.',
    tech: ['FastAPI', 'PostgreSQL', 'PostGIS', 'React', 'Leaflet'],
    category: 'web',
    githubUrl: 'https://github.com/ssn/securesphere-safety',
    details: [
      'Engineered GIS schema structures using PostgreSQL and PostGIS to query nearest incident vectors in under 12ms.',
      'Implemented real-time heatmaps using Leaflet.js to cluster and overlay historical incident density maps.',
      'Constructed a robust backend API using FastAPI to handle incident reporting, token authorization, and automated category matching.'
    ],
    metrics: [
      { label: 'Query Performance', value: '< 12ms' },
      { label: 'PostGIS Clustered Points', value: '4,000+' },
      { label: 'Endpoints Created', value: '18+' }
    ]
  },
  {
    id: 'heartprediction',
    title: 'Heart Disease Prediction System',
    description: 'An analytical machine learning model designed to classify and evaluate risk indicators for cardiovascular diseases. Utilizes standard healthcare features to output risk probabilities and comparative classifier metrics.',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib'],
    category: 'ml',
    githubUrl: 'https://github.com/ssn/heart-disease-ml',
    details: [
      'Processed and normalized standard physiological attributes (cholesterol, age, maximum heart rate) using Scikit-Learn preprocessing.',
      'Trained Random Forest, SVM, and Logistic Regression models, achieving an optimal predictive classification accuracy of 87.4%.',
      'Designed a correlation matrix and feature importance plotting workflow to identify key predictors of cardiovascular failures.'
    ],
    metrics: [
      { label: 'Classifier Accuracy', value: '87.4%' },
      { label: 'Model F1-Score', value: '0.86' },
      { label: 'Trained Samples', value: '1,025' }
    ]
  },
  {
    id: 'webUI',
    title: 'Web Development Projects',
    description: 'A structured curation of responsive single-page web products and interactive user interface experiments. Focuses heavily on design system implementation, performance benchmarks, and semantic web layouts.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion'],
    category: 'web',
    githubUrl: 'https://github.com/ssn/frontend-challenges',
    details: [
      'Built 10+ reusable, highly interactive components using React Hooks, minimizing redundant state renders.',
      'Crafted custom fluid layouts optimized for mobile displays with rich glassmorphism visual designs and Tailwind transitions.',
      'Explored state persistence workflows using Web Storage API to preserve client UI configurations across reboots.'
    ],
    metrics: [
      { label: 'Vite Build Time', value: '< 1.5s' },
      { label: 'Lighthouse Design Score', value: '98/100' },
      { label: 'Responsive Presets', value: '5+' }
    ]
  }
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState<string>(projects[0].id);

  const currentProject = projects.find((p) => p.id === activeProject) || projects[0];

  const getProjectIcon = (id: string) => {
    switch (id) {
      case 'securesphere':
        return <ShieldAlert className="w-6 h-6 text-cyan-400 animate-pulse" />;
      case 'heartprediction':
        return <Activity className="w-6 h-6 text-blue-400" />;
      default:
        return <LayoutTemplate className="w-6 h-6 text-indigo-400" />;
    }
  };

  const getGeometryMock = (id: string) => {
    switch (id) {
      case 'securesphere':
        return (
          <div className="absolute inset-0 bg-slate-950/80 rounded-2xl flex flex-col items-center justify-center p-6 border border-slate-800 overflow-hidden font-mono text-[10px] text-slate-500">
            <div className="absolute top-4 left-4 text-cyan-500/50 flex items-center gap-1">
              <Map className="w-3.5 h-3.5" />
              <span>GIS ROUTING INTERFACE</span>
            </div>
            
            {/* Visual Heatmap Wireframe */}
            <div className="relative w-48 h-28 border border-slate-800 rounded bg-slate-900/40 mt-3 flex items-center justify-center">
              <div className="absolute inset-2 grid-bg opacity-40"></div>
              {/* GIS heat zones */}
              <div className="absolute w-12 h-12 rounded-full bg-cyan-500/20 blur-xl top-4 right-12 animate-pulse"></div>
              <div className="absolute w-16 h-16 rounded-full bg-blue-500/10 blur-xl bottom-2 left-8"></div>
              
              {/* Heat lines */}
              <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M 10 50 Q 30 20 50 50 T 90 50" fill="none" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="1" strokeDasharray="4 2" />
                <circle cx="50" cy="50" r="3" fill="#06b6d4" className="animate-ping" />
                <circle cx="50" cy="50" r="2" fill="#06b6d4" />
                <circle cx="30" cy="35" r="1.5" fill="#ef4444" />
                <circle cx="70" cy="50" r="1.5" fill="#ef4444" />
              </svg>
            </div>
            <div className="mt-4 text-center">
              <p className="text-cyan-400">SELECT s.id, s.coords, ST_Distance(s.geom, pt) ORDER BY s.coords</p>
              <p className="text-slate-600 mt-1">PostGIS Spatial Query Optimized</p>
            </div>
          </div>
        );
      case 'heartprediction':
        return (
          <div className="absolute inset-0 bg-slate-950/80 rounded-2xl flex flex-col items-center justify-center p-6 border border-slate-800 overflow-hidden font-mono text-[10px] text-slate-500">
            <div className="absolute top-4 left-4 text-blue-500/50 flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5" />
              <span>SciKit Classifier Core</span>
            </div>
            
            {/* Health Wave & ML Weights */}
            <div className="relative w-48 h-28 border border-slate-800 rounded bg-slate-900/40 mt-3 p-2 flex flex-col justify-end">
              <div className="flex-grow flex items-center justify-center">
                <svg className="w-full h-12" viewBox="0 0 100 40">
                  <path d="M 0 20 L 30 20 L 35 10 L 40 30 L 45 20 L 50 20 L 55 5 L 60 35 L 65 20 L 100 20" fill="none" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="1.5" />
                </svg>
              </div>
              <div className="grid grid-cols-3 gap-1 border-t border-slate-800/80 pt-1 text-center text-[8px]">
                <div>
                  <div className="text-blue-400 font-semibold">ROC-AUC</div>
                  <div>0.91</div>
                </div>
                <div>
                  <div className="text-blue-400 font-semibold">LogLoss</div>
                  <div>0.312</div>
                </div>
                <div>
                  <div className="text-blue-400 font-semibold">Precision</div>
                  <div>0.88</div>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-blue-400">RandomForestClassifier(n_estimators=100, max_depth=8)</p>
              <p className="text-slate-600 mt-1">Model Accuracy Yielded: 87.4%</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="absolute inset-0 bg-slate-950/80 rounded-2xl flex flex-col items-center justify-center p-6 border border-slate-800 overflow-hidden font-mono text-[10px] text-slate-500">
            <div className="absolute top-4 left-4 text-indigo-500/50 flex items-center gap-1">
              <FileCode className="w-3.5 h-3.5" />
              <span>COMPILER & STATE BENCHMARKS</span>
            </div>
            
            {/* UI Component tree visual mockup */}
            <div className="w-44 h-28 border border-slate-800 rounded bg-slate-900/40 mt-3 p-3 flex flex-col gap-1.5 justify-center">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-950 border border-slate-800 text-[8px] text-indigo-400">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                <span>App.tsx (Root Client Shell)</span>
              </div>
              <div className="ml-4 flex items-center gap-1.5 px-2 py-1 rounded bg-slate-950 border border-slate-800 text-[8px] text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                <span>ContextProviders.tsx (State API)</span>
              </div>
              <div className="ml-8 flex items-center gap-1.5 px-2 py-1 rounded bg-slate-950 border border-slate-800 text-[8px] text-cyan-400">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                <span>InteractiveGrid.tsx (HMR Active)</span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-indigo-400">npm run build | Vite compilation succeeded</p>
              <p className="text-slate-600 mt-1">Responsive components, zero hydration overhead</p>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="projects" className="py-24 px-6 relative overflow-hidden">
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
            Practical Implementations
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-white mt-2"
          >
            Projects Portfolio
          </motion.h3>
          <div className="w-12 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-500 mt-4 rounded-full"></div>
        </div>

        {/* Navigation Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => setActiveProject(project.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium font-sans border transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeProject === project.id
                  ? 'bg-blue-600/10 border-blue-500/40 text-white shadow-[0_4px_20px_rgba(59,130,246,0.1)]'
                  : 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {getProjectIcon(project.id)}
              <span>{project.title}</span>
            </button>
          ))}
        </div>

        {/* Showcase Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            
            {/* Left Narrative */}
            <div className="lg:col-span-7 flex flex-col justify-between glass-panel p-8 rounded-2xl border border-slate-800/80">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                    {getProjectIcon(currentProject.id)}
                  </div>
                  <h4 className="text-2xl font-bold font-sans text-white">{currentProject.title}</h4>
                </div>

                <p className="text-slate-300 mb-6 text-sm md:text-base leading-relaxed">
                  {currentProject.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {currentProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-md font-mono text-[10px] uppercase font-semibold tracking-wider bg-slate-900 border border-slate-800 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Substantive Technical list info */}
                <div className="space-y-3.5 mb-8">
                  <h5 className="text-xs uppercase font-mono tracking-widest text-slate-400">Learning Benchmarks & Challenges:</h5>
                  {currentProject.details?.map((detail, idx) => (
                    <div key={idx} className="flex gap-2.5 text-sm text-slate-300 leading-relaxed">
                      <ChevronRight className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Links & metadata footer inside card */}
              <div className="flex flex-wrap gap-4 items-center justify-between pt-6 border-t border-slate-900">
                <div className="flex items-center gap-3">
                  <a
                    href={currentProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors duration-200 border border-slate-800 bg-slate-950 px-3.5 py-2 rounded-lg"
                  >
                    <Github className="w-3.5 h-3.5" />
                    REPOSITORY
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </div>
                
                {/* Active Learning Status Indicator */}
                <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  <span>MAPPED & SYSTEM COMPILING</span>
                </div>
              </div>

            </div>

            {/* Right Graphic Panel */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-auto">
              <div className="absolute inset-0 glow-bg-cyan/10 rounded-2xl blur-xl"></div>
              {getGeometryMock(currentProject.id)}
              
              {/* Metrics Overlay Panel */}
              <div className="absolute bottom-4 left-4 right-4 glass-panel p-3 border border-slate-900/80 rounded-xl grid grid-cols-3 gap-2 text-center select-none backdrop-blur-md">
                {currentProject.metrics?.map((m) => (
                  <div key={m.label}>
                    <div className="text-xs font-mono text-slate-400 mb-0.5 truncate">{m.label}</div>
                    <div className="text-sm font-semibold font-sans text-cyan-300 truncate">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
