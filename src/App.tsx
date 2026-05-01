import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'motion/react';
import { Magnetic } from './components/Magnetic';
import { cn } from './lib/utils';
import { SERVICES, GENERAL_PACKAGES, NICHE_PACKAGES } from './constants/data';
import { 
  ArrowUpRight, 
  ChevronRight, 
  Instagram, 
  Globe, 
  MessageCircle,
  Layout,
  Video,
  Share2,
  TrendingUp,
  Cpu,
  Printer,
  Phone,
  Mail
} from 'lucide-react';
import Lenis from 'lenis';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on('scroll', (e: any) => {
      setScrollProgress(e.progress);
    });

    return () => lenis.destroy();
  }, []);

  return (
    <div ref={containerRef} className="bg-artix-bg text-artix-accent selection:bg-black selection:text-white overflow-x-hidden luxury-gradient min-h-screen font-sans gray-texture">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-[100] backdrop-blur-md border-b border-black/5 bg-white/70">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-display font-bold tracking-tight">ARTIX</div>
          <div className="hidden md:flex items-center gap-10 text-[14px] font-medium text-artix-muted">
            <a href="#services" className="hover:text-black transition-colors">Services</a>
            <a href="#packages" className="hover:text-white transition-colors border border-black/10 px-4 py-1.5 rounded-full hover:bg-black transition-all">Pricing</a>
            <a href="#contact" className="hover:text-black transition-colors">Contact</a>
          </div>
          <Magnetic strength={0.2}>
            <button className="bg-black text-white text-[13px] font-semibold px-6 py-2.5 rounded-full hover:opacity-85 transition-all">
              DM Now
            </button>
          </Magnetic>
        </div>
      </nav>

      {/* Hero Section - Redesigned to be attractive and creative in white */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-luxury-blue/5 blur-[150px] rounded-full" />
          <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-luxury-purple/5 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-black/5 text-[12px] font-bold tracking-widest text-black/50 uppercase mb-6">
              The Evolution of Presence
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-6xl md:text-9xl font-display font-bold tracking-tighter leading-[0.95] mb-10 text-black px-4"
          >
            Digital Presence <br />
            <span className="text-black/20">Stands Out</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-3xl text-artix-muted mb-16 max-w-3xl mx-auto font-light leading-relaxed"
          >
            We blend avant-garde design with strategic engineering to craft 
            your digital legacy.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8"
          >
            <Magnetic strength={0.1}>
              <button className="bg-black text-white text-[16px] font-semibold px-12 py-5 rounded-full flex items-center gap-3 hover:scale-[1.02] shadow-[0_20px_50px_rgba(0,0,0,0.1)] active:scale-95 transition-all">
                Get Started
                <ChevronRight className="w-5 h-5 opacity-50" />
              </button>
            </Magnetic>
            <button className="text-black text-[16px] font-medium px-8 py-5 rounded-full hover:bg-black/5 transition-all">
              Services
            </button>
          </motion.div>
        </div>

        {/* Dynamic & Creative Element: Floating Abstract Glass Cards */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
           {/* Card 1 */}
           <motion.div 
             animate={{ 
               y: [0, -30, 0],
               rotate: [-5, -2, -5],
               x: [0, 10, 0]
             }}
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-[25%] left-[5%] w-64 h-80 glass-apple rounded-3xl p-6 shadow-xl hidden xl:block border-black/[0.03]"
           >
              <div className="w-12 h-12 bg-black rounded-xl mb-6 flex items-center justify-center">
                <Layout className="text-white w-6 h-6" />
              </div>
              <div className="space-y-4">
                <div className="h-3 w-2/3 bg-black/10 rounded-full" />
                <div className="h-3 w-full bg-black/5 rounded-full" />
                <div className="h-3 w-1/2 bg-black/5 rounded-full" />
                <div className="pt-8 h-32 w-full bg-black/[0.02] rounded-2xl" />
              </div>
           </motion.div>

           {/* Card 2 */}
           <motion.div 
             animate={{ 
               y: [0, 40, 0],
               rotate: [10, 15, 10],
               x: [0, -15, 0]
             }}
             transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
             className="absolute bottom-[10%] right-[8%] w-72 h-[450px] glass-apple rounded-3xl p-6 shadow-2xl hidden lg:block border-black/[0.03]"
           >
              <div className="w-full h-1/2 bg-gradient-to-br from-gray-50 to-gray-200 rounded-2xl mb-8 flex items-center justify-center">
                 <Video className="text-black/20 w-12 h-12" />
              </div>
              <div className="space-y-4">
                <div className="h-4 w-3/4 bg-black/10 rounded-full" />
                <div className="h-4 w-1/2 bg-black/5 rounded-full" />
                <div className="mt-20 flex gap-2">
                  <div className="h-8 w-8 rounded-full bg-black/5" />
                  <div className="h-8 w-8 rounded-full bg-black/5" />
                  <div className="h-8 w-16 rounded-full bg-black/5" />
                </div>
              </div>
           </motion.div>
        </div>
      </section>

      {/* Stats Section - Updated for light theme */}
      <section className="py-40 bg-white border-y border-black/[0.03]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-32 items-center">
            {[
              { val: "100+", label: "Designs Created" },
              { val: "200+", label: "Videos Edited" },
              { val: "50K+", label: "Views Generated" },
              { val: "20+", label: "Brands Worked With" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
              >
                <div className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-black">
                  {stat.val}
                </div>
                <div className="text-[12px] font-bold text-artix-muted uppercase tracking-[0.3em]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services + Charges Section */}
      <section id="services" className="py-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-24 text-center">
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tighter text-black">Precision Services</h2>
            <p className="text-xl md:text-2xl text-artix-muted max-w-3xl mx-auto font-light leading-relaxed">
              We provide surgical precision in every pixel and every frame we deliver.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {SERVICES.map((cat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="glass-apple p-10 rounded-[2.5rem] flex flex-col hover:shadow-2xl hover:bg-white transition-all duration-500"
              >
                <div className="mb-10 flex items-center justify-between">
                  <h3 className="text-2xl font-display font-bold text-black">{cat.title}</h3>
                  <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center text-black/20">
                    {idx === 0 && <Layout className="w-5 h-5" />}
                    {idx === 1 && <Video className="w-5 h-5" />}
                    {idx === 2 && <Share2 className="w-5 h-5" />}
                    {idx === 3 && <Globe className="w-5 h-5" />}
                    {idx === 4 && <TrendingUp className="w-5 h-5" />}
                    {idx === 5 && <Cpu className="w-5 h-5" />}
                    {idx === 6 && <Printer className="w-5 h-5" />}
                  </div>
                </div>
                <div className="space-y-5 flex-grow">
                  {cat.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-black/[0.03] pb-3 last:border-0 group cursor-default">
                      <span className="text-[16px] text-artix-muted group-hover:text-black transition-colors">{item.name}</span>
                      <span className="text-[16px] font-semibold text-black/40">{item.price}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Packages Section */}
      <section id="pricing" className="py-40 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tighter text-black">Strategic Plans</h2>
            <p className="text-xl md:text-2xl text-artix-muted font-light">Elevating your business at any scale.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {GENERAL_PACKAGES.map((pkg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={cn(
                  "p-12 rounded-[3.5rem] flex flex-col h-[520px] transition-all duration-700 relative overflow-hidden",
                  pkg.highlighted 
                    ? "bg-black text-white shadow-[0_40px_100px_rgba(0,0,0,0.15)] scale-105 z-10" 
                    : "bg-[#f5f5f7] text-black border border-black/5"
                )}
              >
                <h4 className="text-2xl font-display font-bold mb-6">{pkg.name}</h4>
                <div className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tighter">{pkg.price}</div>
                <p className={cn("text-[17px] font-light mb-10 leading-relaxed", pkg.highlighted ? "text-white/60" : "text-artix-muted")}>
                  {pkg.desc}
                </p>
                
                <div className="mt-auto space-y-8">
                   <div className="h-[1.5px] bg-white/10 w-full" />
                   <ul className="text-sm space-y-4 font-medium opacity-80">
                      <li className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-[10px]">✓</div>
                        Top-tier Creative Support
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-[10px]">✓</div>
                        Bi-weekly Strategy Sync
                      </li>
                   </ul>
                   <button className={cn(
                     "w-full py-5 rounded-full text-[15px] font-bold transition-all",
                     pkg.highlighted ? "bg-white text-black hover:scale-[1.02]" : "bg-black text-white hover:opacity-90"
                   )}>
                     Select {pkg.name}
                   </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Niche Packages Section */}
      <section className="py-40 bg-artix-bg">
        <div className="max-w-7xl mx-auto px-6 mb-24">
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tighter text-black">Industry Niche</h2>
          <p className="text-xl md:text-2xl text-artix-muted font-light">Custom tailored growth for specific markets.</p>
        </div>

        <div className="relative">
          <motion.div 
            className="flex gap-10 px-6 md:px-24"
            drag="x"
            dragConstraints={{ right: 0, left: -2000 }}
          >
            {NICHE_PACKAGES.map((pkg, i) => (
              <motion.div 
                key={i}
                className="flex-shrink-0 w-[350px] glass-apple p-12 rounded-[3.5rem] group hover:bg-white hover:shadow-2xl transition-all duration-500"
              >
                <h4 className="text-3xl font-display font-bold mb-12 text-black group-hover:translate-x-1 transition-transform">{pkg.industry}</h4>
                <div className="space-y-10">
                  <div className="space-y-2">
                    <div className="text-[12px] font-bold tracking-widest text-artix-muted uppercase">Basic Tier</div>
                    <div className="text-2xl font-bold text-black">{pkg.basicPrice}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-[12px] font-bold tracking-widest text-luxury-blue uppercase flex items-center gap-2">
                       Professional
                       <span className="text-[10px] bg-luxury-blue/10 text-luxury-blue px-3 py-1 rounded-full">Primary</span>
                    </div>
                    <div className="text-3xl font-bold text-black">{pkg.proPrice}</div>
                  </div>
                </div>
                <div className="mt-16 pt-8 border-t border-black/[0.03]">
                  <ul className="space-y-4 text-[15px] text-artix-muted">
                    <li>• Industry-specific Content</li>
                    <li>• Targeted Audience Strategy</li>
                    <li>• Monthly Performance Review</li>
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="mt-12 px-6 md:px-24 text-xs font-medium uppercase tracking-[0.4em] text-artix-muted/40 flex items-center gap-6">
             <div className="w-20 h-[1.5px] bg-black/10" />
             Scroll horizontally to explore
          </div>
        </div>
      </section>

      {/* Contact Section - White Minimalist Final */}
      <section id="contact" className="py-60 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-20"
          >
            <h2 className="text-7xl md:text-[140px] font-display font-bold tracking-tighter mb-4 text-black leading-none">Let's build.</h2>
            <p className="text-2xl md:text-4xl text-artix-muted max-w-2xl mx-auto font-light leading-snug">
              Unrivaled digital excellence. <br /> Slots are strictly limited.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mt-32 max-w-5xl mx-auto">
              <div className="space-y-4">
                 <Magnetic strength={0.2}>
                   <a href="https://wa.me/yournumber" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-black/5 rounded-2xl mx-auto flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer">
                      <MessageCircle className="w-6 h-6" />
                   </a>
                 </Magnetic>
                 <div className="text-[11px] font-bold uppercase tracking-widest text-artix-muted">WhatsApp</div>
                 <a href="https://wa.me/yournumber" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold hover:opacity-50 transition-all">Connect Now</a>
              </div>
              <div className="space-y-4">
                 <Magnetic strength={0.2}>
                   <a href="https://instagram.com/artix.design" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-black/5 rounded-2xl mx-auto flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer">
                      <Instagram className="w-6 h-6" />
                   </a>
                 </Magnetic>
                 <div className="text-[11px] font-bold uppercase tracking-widest text-artix-muted">Instagram</div>
                 <a href="https://instagram.com/artix.design" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold hover:opacity-50 transition-all">@artix.design</a>
              </div>
              <div className="space-y-4">
                 <Magnetic strength={0.2}>
                   <a href="tel:+1234567890" className="w-12 h-12 bg-black/5 rounded-2xl mx-auto flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer">
                      <Phone className="w-6 h-6" />
                   </a>
                 </Magnetic>
                 <div className="text-[11px] font-bold uppercase tracking-widest text-artix-muted">Call Us</div>
                 <a href="tel:+1234567890" className="text-lg font-semibold hover:opacity-50 transition-all">Direct Line</a>
              </div>
              <div className="space-y-4">
                 <Magnetic strength={0.2}>
                   <a href="mailto:hello@artix.digital" className="w-12 h-12 bg-black/5 rounded-2xl mx-auto flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer">
                      <Mail className="w-6 h-6" />
                   </a>
                 </Magnetic>
                 <div className="text-[11px] font-bold uppercase tracking-widest text-artix-muted">Email</div>
                 <a href="mailto:hello@artix.digital" className="text-lg font-semibold hover:opacity-50 transition-all">Send Message</a>
              </div>
            </div>

            <div className="pt-32">
              <Magnetic strength={0.1}>
                <button className="bg-black text-white text-2xl font-display font-bold px-20 py-8 rounded-full hover:scale-105 shadow-[0_30px_70px_rgba(0,0,0,0.15)] active:scale-95 transition-all">
                  Reserve a Slot
                </button>
              </Magnetic>
            </div>
            
            <div className="pt-60 text-[11px] font-bold text-artix-muted/30 uppercase tracking-[0.8em]">
              Artix Studio — Excellence Sustained.
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
