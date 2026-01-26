
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Command } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'INDEX', id: 'hero' },
    { name: 'SYSTEMS', id: 'services' },
    { name: 'PERSONNEL', id: 'team' },
    { name: 'UPGRADES', id: 'pricing' },
    { name: 'UPLINK', id: 'contact' },
  ];

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] p-6 lg:p-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-black/40 backdrop-blur-3xl border border-white/5 px-8 py-5 tech-frame">
        <div 
          className="flex items-center gap-4 cursor-pointer group"
          onClick={() => scrollTo('hero')}
        >
          <div className="relative">
            <div className="w-12 h-12 border border-cyan-500/40 flex items-center justify-center font-black text-2xl italic bg-cyan-500/5 group-hover:bg-cyan-500 group-hover:text-black transition-all tech-frame">
              A
            </div>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-500"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter uppercase leading-none">Artix</span>
            <span className="mono text-[8px] text-zinc-500 tracking-[0.4em] font-bold">NEURAL_ID_00X</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`mono text-[10px] font-bold tracking-[0.4em] transition-all relative group py-2 ${
                activeSection === link.id ? 'text-cyan-400' : 'text-zinc-500 hover:text-white'
              }`}
            >
              {link.name}
              {activeSection === link.id && (
                <motion.div 
                  layoutId="nav-active"
                  className="absolute -bottom-1 left-0 w-full h-[1px] bg-cyan-400 shadow-[0_0_15px_rgba(0,242,255,1)]"
                />
              )}
            </button>
          ))}
          <div className="h-10 w-[1px] bg-zinc-800/50 mx-2"></div>
          <button 
            onClick={() => scrollTo('contact')}
            className="flex items-center gap-3 mono text-[10px] font-black bg-white text-black px-6 py-3 hover:bg-cyan-400 hover:text-white transition-all tech-frame"
          >
            <Command size={14} /> SYS_SYNC
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-3 text-white border border-white/10 tech-frame bg-white/5"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 50, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: 50, rotate: 2 }}
            className="md:hidden absolute top-32 left-6 right-6 bg-[#05050a] border border-cyan-500/20 tech-frame p-10 flex flex-col gap-10 shadow-[0_0_100px_rgba(0,0,0,1)] z-50"
          >
            {navLinks.map((link, idx) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => scrollTo(link.id)}
                className={`text-4xl font-black text-left tracking-tighter italic uppercase ${
                  activeSection === link.id ? 'text-cyan-400' : 'text-white'
                }`}
              >
                {link.name}
              </motion.button>
            ))}
            <button 
              onClick={() => scrollTo('contact')}
              className="bg-cyan-400 text-black w-full py-6 font-black uppercase tracking-[0.4em] text-sm tech-frame"
            >
              Start Uplink
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
