
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO } from '../constants';
import { ExternalLink } from 'lucide-react';

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(PORTFOLIO.map(item => item.category))];

  const filteredItems = filter === 'All' 
    ? PORTFOLIO 
    : PORTFOLIO.filter(item => item.category === filter);

  return (
    <div className="space-y-24">
      <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-8 py-3 rounded-none mono text-[10px] font-bold tracking-[0.2em] transition-all tech-frame ${
              filter === cat 
                ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.3)]' 
                : 'bg-zinc-950 text-zinc-500 border border-white/5 hover:text-white hover:border-cyan-500/40'
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, idx) => (
            <motion.div 
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group relative aspect-[4/3] tech-frame overflow-hidden bg-black border border-white/5"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-tr from-cyan-500/0 via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform translate-x-full group-hover:translate-x-[-100%] transition-transform ease-in-out"></div>
              
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105 opacity-40 group-hover:opacity-100"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500 flex flex-col justify-end p-10">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="mono text-[9px] font-black text-cyan-500 uppercase tracking-[0.3em] mb-3 block">{item.category}</span>
                  <h4 className="text-3xl font-black text-white leading-none tracking-tighter uppercase italic">{item.title}</h4>
                </div>
              </div>
              
              {/* Hover indicator HUD */}
              <div className="absolute top-8 left-8 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center gap-3">
                 <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping"></div>
                 <span className="mono text-[8px] text-cyan-500 font-bold tracking-[0.2em]">VIEWING_FILE_{item.id}</span>
              </div>

              <div className="absolute top-8 right-8 w-14 h-14 border border-cyan-500/50 bg-cyan-500/5 flex items-center justify-center text-cyan-400 opacity-0 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-500 tech-frame">
                 <ExternalLink size={20} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Portfolio;
