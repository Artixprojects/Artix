
import React from 'react';
import { motion } from 'framer-motion';
import { TEAM_MEMBERS } from '../constants';
import { Fingerprint, Activity, Terminal, Settings } from 'lucide-react';

const Team: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
      {TEAM_MEMBERS.map((member, idx) => (
        <motion.div
          key={member.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1, duration: 0.8 }}
          className="group relative flex flex-col items-center"
        >
          {/* Personnel Node Container */}
          <div className="relative w-full aspect-[4/5] overflow-hidden tech-frame border border-white/5 bg-zinc-900/40 group-hover:border-cyan-400/40 transition-all duration-700 shadow-2xl">
            
            {/* Rotating HUD Background for each member */}
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.05] group-hover:opacity-[0.15] transition-opacity">
              <Settings size={300} className="animate-[spin_20s_linear_infinite]" />
            </div>

            {/* Scanning Laser Line */}
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400/60 shadow-[0_0_15px_#00f2ff] animate-scan opacity-0 group-hover:opacity-100"></div>
            </div>

            {/* Portrait */}
            <img 
              src={member.imageUrl} 
              alt={member.name} 
              className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105 opacity-50 group-hover:opacity-100 relative z-10"
            />

            {/* Metadata Badges */}
            <div className="absolute top-4 right-4 z-30 flex flex-col items-end gap-2">
               <div className="mono text-[7px] text-cyan-400 font-bold bg-black/60 px-2 py-1 border border-cyan-400/20">
                 AUTHORIZED
               </div>
               <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-transparent"></div>
            </div>

            <div className="absolute bottom-4 left-4 z-30 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
               <div className="mono text-[8px] text-zinc-400 font-bold tracking-[0.2em] bg-black/80 px-3 py-1 mb-2">
                 NODE::{member.id}
               </div>
            </div>
          </div>

          {/* Personnel Identity Labels */}
          <div className="mt-8 text-center w-full">
            <h3 className="text-3xl lg:text-4xl font-black italic tracking-tighter uppercase group-hover:text-cyan-400 transition-colors mb-1">
              {member.name}
            </h3>
            
            <div className="flex flex-col gap-1 items-center">
               <span className="mono text-[9px] text-zinc-500 font-black tracking-[0.5em] uppercase">
                  {member.role}
               </span>
               <div className="flex items-center gap-3 mt-4 opacity-30 group-hover:opacity-100 transition-opacity">
                  <Fingerprint size={12} className="text-cyan-400" />
                  <div className="w-4 h-[1px] bg-zinc-800"></div>
                  <Activity size={12} className="text-purple-400" />
               </div>
            </div>

            <div className="mt-6 p-3 bg-white/5 border border-white/5 tech-frame group-hover:border-cyan-400/20 transition-all">
               <div className="flex items-center justify-center gap-2">
                  <Terminal size={12} className="text-cyan-500/50" />
                  <span className="mono text-[8px] text-zinc-400 font-bold tracking-[0.1em] uppercase">
                    {member.specialization}
                  </span>
               </div>
            </div>
          </div>
        </motion.div>
      ))}

      <style>{`
        @keyframes scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Team;
