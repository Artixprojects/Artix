
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, ArrowUpRight } from 'lucide-react';
import { PLANS } from '../constants';

const Pricing: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
      {PLANS.map((plan, idx) => (
        <motion.div 
          key={plan.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1, duration: 0.6 }}
          className={`relative p-10 flex flex-col h-full transition-all duration-700 tech-frame group ${
            plan.recommended 
              ? 'bg-[#0a0a1a] border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.1)] lg:scale-110 z-20' 
              : 'bg-black border-white/5 hover:border-cyan-500/20'
          }`}
        >
          {plan.recommended && (
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-cyan-500 text-black text-[9px] font-black uppercase tracking-[0.3em] px-5 py-2 whitespace-nowrap z-30 tech-frame">
              High Demand Mode
            </div>
          )}
          
          <div className="mb-10">
            <h3 className="text-2xl font-black mb-3 tracking-tighter uppercase italic">{plan.name}</h3>
            <p className="text-zinc-500 text-xs font-medium leading-relaxed uppercase tracking-wider">{plan.description}</p>
          </div>
          
          <div className="mb-12">
             <div className="flex items-baseline gap-2 mb-1">
               <span className="text-5xl font-black glow-text">{plan.price}</span>
               <span className="text-zinc-500 mono text-[10px] font-bold">/ PERIOD</span>
             </div>
             <div className="h-0.5 w-12 bg-cyan-500/20"></div>
          </div>
          
          <div className="flex-grow space-y-5 mb-14">
            {plan.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-4 group/item">
                <div className="mt-1 w-5 h-5 border border-cyan-500/20 bg-cyan-500/5 flex items-center justify-center shrink-0 group-hover/item:bg-cyan-500 group-hover/item:text-black transition-colors">
                  <Check size={10} />
                </div>
                <span className="text-zinc-400 text-xs font-bold uppercase tracking-wide group-hover/item:text-white transition-colors">{feature}</span>
              </div>
            ))}
          </div>
          
          <button 
            className={`w-full py-6 font-black text-xs uppercase tracking-[0.4em] transition-all active:scale-95 flex items-center justify-center gap-3 tech-frame ${
              plan.recommended 
                ? 'bg-cyan-500 text-black hover:bg-white' 
                : 'bg-white text-black hover:bg-cyan-500 hover:text-white'
            }`}
          >
            Deploy Module
            <ArrowUpRight size={14} />
          </button>

          {/* Card Fluff */}
          <div className="absolute bottom-2 right-4 mono text-[8px] text-zinc-900 group-hover:text-cyan-900/40 select-none transition-colors">
            NODE_ST_0{idx + 1}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Pricing;
