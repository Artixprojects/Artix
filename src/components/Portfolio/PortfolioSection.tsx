import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { PORTFOLIO_PROJECTS, Project } from '../../constants/portfolio';
import { PortfolioItem } from './PortfolioItem';
import { ProjectModal } from './ProjectModal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const PortfolioSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: triggerRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-78%"]);
  const springX = useSpring(x, { damping: 25, stiffness: 120 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background darkening effect
      gsap.to(".portfolio-bg-overlay", {
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
        opacity: 0.9,
      });

      // Title reveal
      gsap.from(".portfolio-title span", {
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 90%",
          end: "top 20%",
          scrub: 1,
        },
        y: 80,
        opacity: 0,
        stagger: 0.05,
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={triggerRef} className="relative min-h-[220vh]">
      <div className="portfolio-bg-overlay fixed inset-0 bg-black opacity-0 pointer-events-none z-0" />
      
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden z-10">
        {/* Header - Absolute to not interfere with centering */}
        <div className="absolute top-20 left-6 md:left-24 z-20">
          <h2 className="portfolio-title text-[10px] font-mono uppercase tracking-[0.5em] text-artix-muted mb-4 overflow-hidden">
            <span className="inline-block">03 / SELECTED WORK</span>
          </h2>
          <div className="portfolio-title overflow-hidden py-2">
            <h3 className="text-4xl md:text-[5vw] font-display font-bold tracking-tighter leading-[0.9]">
              <span className="inline-block">CINEMATIC</span><br />
              <span className="inline-block italic text-artix-muted">ARCHIVE.</span>
            </h3>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <motion.div 
          ref={horizontalRef}
          style={{ x: springX }}
          className="flex gap-12 md:gap-20 px-6 md:px-24 items-center pt-20"
        >
          {PORTFOLIO_PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              style={{
                y: index % 2 === 0 ? -20 : 20,
              }}
            >
              <PortfolioItem 
                project={project} 
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Progress Indicator */}
        <div className="absolute bottom-12 left-6 md:left-24 right-6 md:right-24 h-[1px] bg-white/10">
          <motion.div 
            className="h-full bg-white origin-left"
            style={{ scaleX: scrollYProgress }}
          />
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};
