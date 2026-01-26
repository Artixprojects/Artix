
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, Video, Layout, Code, PenTool, Smartphone, 
  ShoppingBag, Printer, Briefcase, Star, Cpu, Megaphone,
  Fingerprint, Layers, Maximize, Zap
} from 'lucide-react';
import { SERVICES } from '../constants';

const ICON_MAP: Record<string, any> = {
  Palette, Video, Layout, Code, PenTool, Smartphone, ShoppingBag, Printer, Briefcase, Star, Cpu, Megaphone
};

const Services: React.FC = () => {
  const sortedServices = [...SERVICES].sort((a, b) => {
    const order = { design: 1, video: 2, social: 3, development: 4 };
    return order[a.category] - order[b.category];
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800/30 border border-zinc-800/50">
      {sortedServices.map((service, index) => {
        const IconComponent = ICON_MAP[service.icon];
        return (
          <motion.div 
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, zIndex: 10 }}
            transition={{ 
              delay: index * 0.05,
              scale: { type: "spring", stiffness: 300, damping: 20 }
            }}
            className={`group relative p-12 md:p-16 lg:p-20 bg-[#010103] hover:bg-zinc-900/60 transition-all duration-500 flex flex-col h-full border border-zinc-900/50 overflow-hidden hover:shadow-[0_0_80px_rgba(0,242,255,0.08)] ${
              index % 4 === 0 ? 'lg:col-span-1' : ''
            }`}
          >
            {/* HUD Corner Accents */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/5 group-hover:border-cyan-400 group-hover:scale-125 transition-all"></div>
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/5 group-hover:border-cyan-400 group-hover:scale-125 transition-all"></div>
            
            {/* Animated Loading Bar */}
            <div className="absolute top-0 left-0 w-0 h-[3px] bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-1000 ease-in-out"></div>

            <div className="mb-14 flex items-center justify-between relative">
               <motion.div 
                 whileHover={{ rotate: 15, scale: 1.1 }}
                 className="inline-flex p-8 bg-black border border-white/5 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-700 tech-frame shadow-[0_0_20px_rgba(0,242,255,0.05)] group-hover:shadow-[0_0_50px_rgba(0,242,255,0.4)]"
               >
                {IconComponent && <IconComponent size={36} />}
              </motion.div>
              <div className="flex flex-col items-end opacity-10 group-hover:opacity-100 transition-all duration-700">
                <span className="mono text-[10px] text-zinc-500 tracking-tighter">NODE_ACCESS</span>
                <span className="mono text-[12px] text-cyan-400 font-black tracking-widest">00{index + 1}</span>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Fingerprint size={12} className="text-cyan-500/50" />
                <span className="mono text-[10px] text-zinc-500 font-black uppercase tracking-[0.5em]">{service.category}</span>
              </div>
              <h3 className="text-4xl font-black tracking-tighter uppercase italic group-hover:text-cyan-400 transition-colors leading-[0.9]">
                {service.title}
              </h3>
            </div>
            
            <div className="flex-grow flex flex-col justify-between">
              <div>
                <p className="text-zinc-500 text-lg mb-6 leading-relaxed font-light group-hover:text-zinc-300 transition-colors">
                  {service.details}
                </p>
                
                {/* Revealable Specifications */}
                <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-700 opacity-0 group-hover:opacity-100 mb-8">
                  <div className="space-y-3 pt-4 border-t border-white/5">
                    {service.specifications?.map((spec, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Zap size={10} className="text-cyan-400" />
                        <span className="mono text-[10px] text-zinc-400 uppercase tracking-widest">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technical Metadata (Revealed on hover) */}
              <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 hidden lg:block mb-10">
                <div className="flex items-center gap-6 mono text-[9px] text-cyan-500/60 font-black tracking-[0.2em] uppercase">
                  <div className="flex items-center gap-2"><Layers size={12}/> V_L03</div>
                  <div className="flex items-center gap-2"><Maximize size={12}/> SC_09</div>
                  <div className="w-12 h-[1px] bg-cyan-500/20"></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-12 border-t border-zinc-900 group-hover:border-cyan-500/30">
              <div className="flex flex-col">
                <span className="mono text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em] group-hover:text-cyan-400/70 transition-colors">Computation Core</span>
                <span className="text-4xl font-black text-white glow-text leading-none mt-2 group-hover:scale-105 transition-transform origin-left">{service.price}</span>
              </div>
              <div className="w-14 h-14 border border-white/5 bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-700 tech-frame shadow-xl group-hover:-rotate-12">
                <Maximize size={24} />
              </div>
            </div>

            {/* Background watermark */}
            <div className="absolute -bottom-24 -right-16 opacity-[0.01] group-hover:opacity-[0.06] pointer-events-none transition-all duration-1000 transform group-hover:rotate-6 group-hover:scale-110">
              <span className="text-[15rem] font-black italic">{service.id}</span>
            </div>
          </motion.div>
        );
      })}
      
      {/* High-Impact Footer CTA in Services Grid */}
      <motion.div 
        whileInView={{ opacity: [0, 1], y: [60, 0] }}
        whileHover={{ scale: 1.01 }}
        className="lg:col-span-3 p-24 relative overflow-hidden bg-[#020208] border border-cyan-400/20 flex flex-col md:flex-row items-center justify-between gap-20 mt-32 tech-frame shadow-[0_0_100px_rgba(0,242,255,0.05)] hover:shadow-[0_0_120px_rgba(0,242,255,0.1)] transition-shadow duration-700"
      >
        <div className="absolute inset-0 grid-bg opacity-10"></div>
        <div className="hud-scan"></div>
        <div className="relative z-10 text-center md:text-left max-w-4xl">
          <div className="mono text-cyan-400 text-[12px] mb-8 tracking-[1em] font-black uppercase flex items-center gap-4">
            <span className="w-10 h-[1px] bg-cyan-400"></span>
            Proprietary Architecture
          </div>
          <h4 className="text-6xl md:text-8xl font-black mb-10 italic uppercase tracking-tighter leading-[0.8]">Neural <br/><span className="gradient-text">Custom Synthesis</span></h4>
          <p className="text-zinc-500 text-2xl font-light leading-relaxed mb-4">
            Don't just scale—evolve. We engineer specialized autonomous engines for enterprise branding and data-driven creative pipelines.
          </p>
        </div>
        <button 
           onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
           className="relative z-10 bg-white text-black px-20 py-10 font-black text-2xl uppercase tracking-[0.6em] hover:bg-cyan-400 hover:scale-110 active:scale-95 transition-all tech-frame shadow-[0_0_80px_rgba(255,255,255,0.1)] group"
        >
          <span className="relative z-10">Start Sync</span>
          <div className="absolute inset-0 bg-cyan-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
        </button>
      </motion.div>
    </div>
  );
};

export default Services;
