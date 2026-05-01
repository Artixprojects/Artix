import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { cn } from '../lib/utils';

interface LayeredTextProps {
  text: string;
  className?: string;
}

export const LayeredText: React.FC<LayeredTextProps> = ({ text, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth) - 0.5);
      mouseY.set((e.clientY / innerHeight) - 0.5);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const springConfig = { damping: 30, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Split apart effect
  const z1 = useTransform(scrollYProgress, [0, 0.5, 1], [0, 100, 200]);
  const z2 = useTransform(scrollYProgress, [0, 0.5, 1], [0, 50, 100]);
  const z3 = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, 0]);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-10, 10]);

  return (
    <div 
      ref={containerRef} 
      className={cn("relative perspective-2000 py-20", className)}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        {/* Back Ghost Layer */}
        <motion.div
          style={{ translateZ: z1, opacity: useTransform(scrollYProgress, [0, 0.5], [0, 0.3]) }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none text-white/20 blur-sm"
        >
          <h2 className="text-6xl md:text-[12vw] font-display font-bold tracking-tighter leading-none whitespace-nowrap">
            {text}
          </h2>
        </motion.div>

        {/* Mid Shadow Layer */}
        <motion.div
          style={{ translateZ: z2, opacity: useTransform(scrollYProgress, [0, 0.5], [0.5, 0.6]) }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none text-white/40"
        >
          <h2 className="text-6xl md:text-[12vw] font-display font-bold tracking-tighter leading-none whitespace-nowrap">
            {text}
          </h2>
        </motion.div>

        {/* Front Layer */}
        <motion.div
          style={{ translateZ: z3 }}
          className="relative flex items-center justify-center"
        >
          <h2 className="text-6xl md:text-[12vw] font-display font-bold tracking-tighter leading-none whitespace-nowrap">
            {text}
          </h2>
        </motion.div>
      </motion.div>
    </div>
  );
};

import { useMotionValue } from 'motion/react';
