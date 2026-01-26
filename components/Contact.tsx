
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Instagram, Youtube, Twitter, Send, MapPin, Globe } from 'lucide-react';

const Contact: React.FC = () => {
  const contactInfo = [
    { icon: Mail, label: 'Neural Uplink', value: 'Artixprojects@gmail.com', link: 'mailto:Artixprojects@gmail.com' },
    { icon: Phone, label: 'Comm Link 01', value: '+91 9350122347', link: 'tel:+919350122347' },
    { icon: Phone, label: 'Comm Link 02', value: '+91 9536240238', link: 'tel:+919536240238' },
    { icon: Phone, label: 'Comm Link 03', value: '+91 8199991927', link: 'tel:+918199991927' },
  ];

  const socials = [
    { icon: Instagram, link: 'https://www.instagram.com/artixprojects/', label: 'Instagram' },
    { icon: Youtube, link: 'https://www.youtube.com/@artixprojects', label: 'YouTube' },
    { icon: Twitter, link: 'https://twitter.com/artixprojects', label: 'Twitter' },
  ];

  return (
    <div className="px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
        <div>
          <div className="mono text-cyan-400 text-[10px] font-black tracking-[0.8em] uppercase mb-8 opacity-80 flex items-center gap-6">
            <span className="w-12 h-[1px] bg-cyan-400/50"></span>
            MODULE // 0x03 TERMINAL
          </div>
          <h2 className="text-6xl md:text-8xl font-black mb-10 italic uppercase tracking-tighter leading-none">
            INITIATE <br />
            <span className="gradient-text">COLLABORATION</span>
          </h2>
          <p className="text-xl text-zinc-400 leading-relaxed mb-16 max-w-lg font-light">
            Ready to synchronize your brand with our neural creative systems? Access our secure channels below.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contactInfo.map((info, idx) => (
              <motion.a 
                key={idx} 
                href={info.link}
                whileHover={{ scale: 1.02 }}
                className="group p-8 bg-zinc-950 border border-white/5 hover:border-cyan-500/30 transition-all tech-frame relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-12 h-12 border border-white/5 bg-white/5 text-cyan-400 flex items-center justify-center mb-6 group-hover:bg-cyan-500 group-hover:text-black transition-all tech-frame">
                  <info.icon size={20} />
                </div>
                <div className="mono text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-2 group-hover:text-cyan-500/60 transition-colors">{info.label}</div>
                <div className="text-lg font-bold text-white break-words tracking-tight">{info.value}</div>
              </motion.a>
            ))}
          </div>

          <div className="mt-20 pt-10 border-t border-white/5">
             <div className="flex flex-col md:flex-row md:items-center gap-10">
               <span className="mono text-zinc-500 font-black uppercase tracking-[0.4em] text-[10px]">Neural_Broadcast:</span>
               <div className="flex gap-6">
                 {socials.map((social, i) => (
                   <motion.a 
                     key={i} 
                     href={social.link} 
                     target="_blank"
                     rel="noopener noreferrer"
                     whileHover={{ y: -5, scale: 1.1 }}
                     className="w-14 h-14 border border-white/5 bg-zinc-950 flex items-center justify-center text-white hover:text-cyan-400 hover:border-cyan-400 transition-all tech-frame relative group"
                     title={social.label}
                   >
                     <social.icon size={22} />
                     <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity mono text-[8px] text-cyan-500 font-bold tracking-widest">
                       {social.label.toUpperCase()}
                     </div>
                   </motion.a>
                 ))}
               </div>
             </div>
          </div>
        </div>

        <div className="relative">
          <div className="bg-[#05050a] p-10 md:p-16 border border-white/5 tech-frame h-full relative z-10">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Globe size={120} className="text-cyan-500" />
            </div>
            
            <h3 className="text-3xl font-black mb-10 italic uppercase tracking-tight">Quick Inquiry</h3>
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-3">
                <label className="mono text-[10px] font-black uppercase tracking-widest text-zinc-500">Subject Identity</label>
                <input 
                  type="text" 
                  placeholder="Full Name / Brand Name" 
                  className="w-full bg-black border border-white/10 tech-frame px-8 py-5 focus:outline-none focus:border-cyan-500/50 transition-all text-white placeholder:text-zinc-800"
                />
              </div>
              <div className="space-y-3">
                <label className="mono text-[10px] font-black uppercase tracking-widest text-zinc-500">Comm ID (Email)</label>
                <input 
                  type="email" 
                  placeholder="name@domain.com" 
                  className="w-full bg-black border border-white/10 tech-frame px-8 py-5 focus:outline-none focus:border-cyan-500/50 transition-all text-white placeholder:text-zinc-800"
                />
              </div>
              <div className="space-y-3">
                <label className="mono text-[10px] font-black uppercase tracking-widest text-zinc-500">Data Packet (Message)</label>
                <textarea 
                  rows={4} 
                  placeholder="Define your creative requirements..." 
                  className="w-full bg-black border border-white/10 tech-frame px-8 py-5 focus:outline-none focus:border-cyan-500/50 transition-all text-white resize-none placeholder:text-zinc-800"
                ></textarea>
              </div>
              <motion.button 
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-8 bg-white text-black font-black text-xl uppercase tracking-[0.5em] hover:bg-cyan-400 transition-all tech-frame flex items-center justify-center gap-4 shadow-[0_0_50px_rgba(255,255,255,0.05)]"
              >
                Send Message <Send size={20} />
              </motion.button>
            </form>
          </div>
          
          {/* Visual fluff */}
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px] -z-10 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-cyan-500/5 rounded-full pointer-events-none -z-10 rotate-45"></div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
