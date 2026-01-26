
import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Terminal, Cpu, Zap, Activity, ShieldCheck, Database, Compass, Layers, Globe, Code, Settings } from 'lucide-react';

const NeuralCore = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Outer Rotating Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute w-[80vw] h-[80vw] lg:w-[60rem] lg:h-[60rem] border border-cyan-500/10 rounded-full flex items-center justify-center"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-cyan-400 to-transparent"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-t from-purple-500 to-transparent"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] w-20 bg-gradient-to-r from-cyan-400 to-transparent"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[1px] w-20 bg-gradient-to-l from-purple-500 to-transparent"></div>
      </motion.div>

      {/* Middle Gear Ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="absolute w-[60vw] h-[60vw] lg:w-[45rem] lg:h-[45rem] border-[0.5px] border-dashed border-white/5 rounded-full flex items-center justify-center"
      >
        <div className="absolute inset-0 opacity-10">
          <Settings size="100%" strokeWidth={0.2} className="text-cyan-400" />
        </div>
      </motion.div>

      {/* Internal Orbitals */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ rotate: 360 }}
          transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}
          className="absolute border border-cyan-500/20 rounded-full"
          style={{ width: `${30 + i * 15}%`, height: `${30 + i * 15}%` }}
        >
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_15px_#00f2ff]" 
          />
        </motion.div>
      ))}

      {/* Core Glow */}
      <div className="absolute w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full animate-pulse"></div>
    </div>
  );
};

const TechTicker = () => (
  <div className="absolute bottom-24 left-0 w-full border-y border-white/[0.02] bg-black/20 backdrop-blur-md overflow-hidden py-3 pointer-events-none hidden md:block">
    <motion.div 
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="flex gap-20 mono text-[9px] font-bold text-cyan-500/40 uppercase tracking-[1em] whitespace-nowrap items-center"
    >
      {[...Array(6)].map((_, i) => (
        <React.Fragment key={i}>
          <span className="flex items-center gap-4"><Activity size={10} /> NEURAL_LINK_ESTABLISHED</span>
          <span className="flex items-center gap-4"><Compass size={10} /> VECTOR_SPACE_ACTIVE</span>
          <span className="flex items-center gap-4"><Layers size={10} /> MULTI_LAYER_RENDER_SYNC</span>
          <span className="flex items-center gap-4"><Cpu size={10} /> QUANTUM_PROCESS_INIT</span>
        </React.Fragment>
      ))}
    </motion.div>
  </div>
);

const DecorativeFrame = () => (
  <div className="absolute inset-10 lg:inset-20 border border-white/[0.02] pointer-events-none hidden xl:block">
    <div className="absolute top-0 left-0 w-8 h-[1px] bg-cyan-400"></div>
    <div className="absolute top-0 left-0 w-[1px] h-8 bg-cyan-400"></div>
    <div className="absolute bottom-0 right-0 w-8 h-[1px] bg-cyan-400"></div>
    <div className="absolute bottom-0 right-0 w-[1px] h-8 bg-cyan-400"></div>
    
    <div className="absolute top-1/2 left-0 -translate-x-1/2 mono text-[8px] -rotate-90 tracking-[0.5em] text-zinc-800">NAV_SYSTEM_v4.2</div>
    <div className="absolute top-1/2 right-0 translate-x-1/2 mono text-[8px] rotate-90 tracking-[0.5em] text-zinc-800">DATA_SYNC_0x99</div>
  </div>
);

const FloatingHUD = ({ icon: Icon, label, position }: { icon: any, label: string, position: string }) => (
  <motion.div 
    animate={{ 
      y: [0, -20, 0],
      opacity: [0.15, 0.4, 0.15],
      rotate: [0, 5, 0]
    }}
    transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, ease: "easeInOut" }}
    className={`absolute ${position} hidden lg:flex flex-col items-center gap-3 mono text-[8px] tracking-[0.3em] font-black text-cyan-500/60 uppercase group cursor-default`}
  >
    <div className="w-14 h-14 border border-white/5 flex items-center justify-center tech-frame bg-black/40 backdrop-blur-xl group-hover:border-cyan-400 transition-colors">
      <Icon size={20} />
    </div>
    <span className="group-hover:text-cyan-400 transition-colors">{label}</span>
  </motion.div>
);

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = "Engineering high-fidelity creative ecosystems with radical aesthetics.";
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltX = useSpring(useTransform(mouseY, [-500, 500], [8, -8]), { damping: 25, stiffness: 150 });
  const tiltY = useSpring(useTransform(mouseX, [-500, 500], [-8, 8]), { damping: 25, stiffness: 150 });

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 35);

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX - innerWidth / 2);
      mouseY.set(e.clientY - innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-6 lg:px-12 perspective-container" ref={containerRef}>
      <NeuralCore />
      <DecorativeFrame />
      
      {/* Interactive Floating HUD Elements */}
      <FloatingHUD icon={Globe} label="Geo_Sync" position="top-[12%] left-[12%]" />
      <FloatingHUD icon={Code} label="Source_Ref" position="top-[22%] right-[18%]" />
      <FloatingHUD icon={ShieldCheck} label="Secure_Pipe" position="bottom-[32%] left-[8%]" />
      <FloatingHUD icon={Database} label="Core_Data" position="bottom-[38%] right-[12%]" />

      <motion.div 
        style={{ rotateX: tiltX, rotateY: tiltY }}
        className="relative z-10 max-w-[95vw] w-full pt-20 pb-40 flex flex-col items-center text-center overflow-visible"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center mb-16 overflow-visible"
        >
          <div className="flex items-center gap-4 px-8 py-3 bg-white/[0.03] border border-white/5 text-cyan-400 mono text-[10px] font-black tracking-[0.8em] uppercase backdrop-blur-3xl tech-frame mb-20 shadow-[0_0_40px_rgba(0,242,255,0.05)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#00f2ff]"></span>
            System_Sync: Active
          </div>
          
          <div className="relative group px-10">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[20vw] lg:text-[24rem] font-black leading-[0.85] select-none text-white/95 group-hover:text-white transition-all duration-700"
            >
              <span className="gradient-text italic tracking-[-0.04em] group-hover:drop-shadow-[0_0_80px_rgba(0,242,255,0.5)] transition-all">ARTIX</span>
            </motion.h1>
            
            {/* Visual Glitch Echos */}
            <div className="absolute -top-6 -left-6 opacity-[0.04] text-[20vw] lg:text-[24rem] font-black leading-[0.85] select-none pointer-events-none blur-[4px] text-cyan-500 -z-10 group-hover:opacity-[0.12] transition-all italic tracking-[-0.04em]">
              ARTIX
            </div>
            <div className="absolute top-6 left-6 opacity-[0.03] text-[20vw] lg:text-[24rem] font-black leading-[0.85] select-none pointer-events-none blur-[2px] text-purple-500 -z-10 group-hover:opacity-[0.08] transition-all italic tracking-[-0.04em]">
              ARTIX
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col items-center max-w-4xl w-full">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mono text-zinc-400 text-lg md:text-3xl mb-20 leading-relaxed text-center min-h-[5rem] px-6 font-light tracking-tight"
          >
            {displayText}<span className="animate-pulse text-cyan-400 font-black">_</span>
          </motion.div>
          
          <div className="flex flex-col sm:flex-row items-center gap-12 justify-center w-full sm:w-auto">
            <button 
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-24 py-11 bg-cyan-500 text-black font-black text-sm uppercase tracking-[0.6em] overflow-hidden transition-all hover:bg-white tech-frame w-full sm:w-auto shadow-[0_0_80px_rgba(0,242,255,0.3)] hover:scale-110 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-4 justify-center">
                INITIATE_SYNC <Zap size={22} fill="currentColor" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
            
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-24 py-11 border border-white/10 text-white font-black text-sm uppercase tracking-[0.6em] hover:bg-white/5 transition-all tech-frame w-full sm:w-auto flex items-center gap-4 justify-center group hover:border-cyan-400/50"
            >
              ACCESS_TERMINAL <Terminal size={22} className="group-hover:text-cyan-400 transition-colors" />
            </button>
          </div>
        </div>
      </motion.div>

      <TechTicker />

      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 cursor-pointer opacity-20 hover:opacity-100 transition-opacity"
        onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="mono text-[10px] uppercase tracking-[1em] font-black text-zinc-500">DECRYPT_BELOW</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-500 to-transparent"></div>
      </motion.div>
    </div>
  );
};

export default Hero;
