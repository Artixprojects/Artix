
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useSpring, useMotionValue, useScroll, useTransform, useVelocity, MotionValue } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Team from './components/Team';
import SoundManager from './components/SoundManager';
import { Settings } from 'lucide-react';

const CustomCursor = ({ mouseX, mouseY }: { mouseX: MotionValue<number>, mouseY: MotionValue<number> }) => {
  const springConfig = { damping: 25, stiffness: 200 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  return (
    <>
      <motion.div
        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' } as any}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full z-[9999] pointer-events-none mix-blend-difference shadow-[0_0_15px_white] hidden md:block"
      />
      <motion.div
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' } as any}
        className="fixed top-0 left-0 w-16 h-16 border border-cyan-400/20 rounded-full z-[9998] pointer-events-none flex items-center justify-center transition-transform hidden md:flex"
      >
        <div className="w-[1px] h-4 bg-cyan-400/50 absolute top-0" />
        <div className="w-[1px] h-4 bg-cyan-400/50 absolute bottom-0" />
        <div className="h-[1px] w-4 bg-cyan-400/50 absolute left-0" />
        <div className="h-[1px] w-4 bg-cyan-400/50 absolute right-0" />
        <div className="w-8 h-8 border border-white/5 rounded-full animate-ping opacity-20" />
      </motion.div>
    </>
  );
};

const BackgroundEffects = ({ mouseX, mouseY }: { mouseX: MotionValue<number>, mouseY: MotionValue<number> }) => {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 100 });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#010103]">
      <motion.div style={{ y: yParallax }} className="absolute inset-0 grid-bg opacity-10" />
      
      {/* Rotating Neural Wheels (The "Moving Wheels") */}
      <motion.div 
        style={{ rotate: rotation }}
        className="absolute top-[-10%] right-[-10%] opacity-[0.02] lg:opacity-[0.03] text-cyan-400"
      >
        <Settings size={800} strokeWidth={0.5} className="animate-[spin_40s_linear_infinite]" />
      </motion.div>

      <motion.div 
        style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, -720]) }}
        className="absolute bottom-[-20%] left-[-15%] opacity-[0.01] lg:opacity-[0.02] text-purple-400"
      >
        <Settings size={1200} strokeWidth={0.3} className="animate-[spin_80s_linear_infinite]" />
      </motion.div>

      {/* Floating Sparkles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 10 }}
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: `${Math.random() * 100}%`,
          }}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full blur-[1px]"
        />
      ))}

      <div className="scanline"></div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleScroll = () => {
      const sections = ['hero', 'services', 'team', 'pricing', 'contact'];
      const scrollPos = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPos >= element.offsetTop && scrollPos < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="min-h-screen text-white selection:bg-cyan-400 selection:text-black relative">
      <CustomCursor mouseX={mouseX} mouseY={mouseY} />
      <BackgroundEffects mouseX={mouseX} mouseY={mouseY} />
      <SoundManager />
      
      <Navbar activeSection={activeSection} />
      
      <main className="relative z-10">
        <section id="hero" className="min-h-screen flex items-center justify-center overflow-hidden">
          <Hero />
        </section>
        
        <section id="services" className="py-32 lg:py-64 px-6 md:px-12 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20 lg:mb-32 relative"
          >
            <div className="mono text-cyan-400 text-[10px] font-black tracking-[1.2em] uppercase mb-8 opacity-80 flex items-center gap-6">
              <span className="w-10 lg:w-20 h-[1px] bg-cyan-400/30"></span>
              CORE_SYSTEMS // INFRASTRUCTURE
            </div>
            <h2 className="text-white/90">
              VIRTUAL <br />
              <span className="gradient-text italic tracking-[-0.05em]">SYNAPSE</span>
            </h2>
          </motion.div>
          <Services />
        </section>

        <section id="team" className="py-32 lg:py-64 px-6 md:px-12 max-w-7xl mx-auto relative overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-20 lg:mb-32 relative"
          >
            <div className="mono text-cyan-400 text-[10px] font-black tracking-[1.5em] uppercase mb-8 opacity-80 flex items-center gap-6">
              <span className="w-16 h-[1px] bg-cyan-400/30"></span>
              PERSONNEL // CORE_INTEL
            </div>
          </motion.div>
          <Team />
          
          {/* Subtle spinning wheel in Team Section */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.03] scale-150">
            <Settings size={1000} className="animate-[spin_40s_linear_infinite]" />
          </div>
        </section>

        <section id="pricing" className="py-32 lg:py-64 px-6 md:px-12 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-20 lg:mb-32 text-center relative"
          >
            <div className="mono text-cyan-400 text-[10px] font-black tracking-[1.5em] uppercase mb-8 opacity-80 flex justify-center items-center gap-6">
              <span className="w-10 lg:w-16 h-[1px] bg-cyan-400/30"></span>
              UPGRADE_PATH
              <span className="w-10 lg:w-16 h-[1px] bg-cyan-400/30"></span>
            </div>
            <h2 className="uppercase">
              PHASE <br/><span className="gradient-text italic">SHIFT</span>
            </h2>
          </motion.div>
          <Pricing />
        </section>

        <section id="contact" className="py-32 lg:py-64 bg-black/40 backdrop-blur-3xl border-t border-white/5 relative">
          <Contact />
        </section>
      </main>

      <footer className="py-24 px-6 border-t border-zinc-900 bg-black/95 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="flex items-center gap-8">
             <div className="w-20 h-20 lg:w-24 lg:h-24 border border-cyan-500/40 flex items-center justify-center mono text-4xl font-black italic bg-cyan-500/5 tech-frame">
               A
             </div>
             <div className="mono text-[11px] text-zinc-500 space-y-2 uppercase tracking-widest">
               <p className="text-cyan-400 font-black">STATUS: SYNCED</p>
               <p>&copy; ARTIX_{new Date().getFullYear()}</p>
             </div>
          </div>
          <div className="text-center md:text-right">
            <div className="flex justify-center md:justify-end gap-2">
              {[...Array(10)].map((_, i) => (
                <motion.div 
                  key={i} 
                  animate={{ height: [4, 16, 4] }}
                  transition={{ duration: 0.5 + Math.random(), repeat: Infinity }}
                  className="w-1 bg-cyan-500/40" 
                />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
