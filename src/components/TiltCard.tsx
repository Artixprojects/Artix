import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'motion/react';
import { cn } from '../lib/utils';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export const TiltCard: React.FC<TiltCardProps> = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { damping: 20, stiffness: 150 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { damping: 20, stiffness: 150 });

  const lightX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), { damping: 20, stiffness: 150 });
  const lightY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), { damping: 20, stiffness: 150 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = event.clientX - rect.left;
    const mouseYPos = event.clientY - rect.top;

    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;

    x.set(xPct);
    y.set(yPct);
    
    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative group cursor-pointer perspective-1000",
        className
      )}
    >
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
        style={{
          background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.15) 0%, transparent 80%)`,
          // @ts-ignore
          '--mouse-x': useTransform(lightX, (v) => `${v}%`),
          // @ts-ignore
          '--mouse-y': useTransform(lightY, (v) => `${v}%`),
        } as any}
      />
      <div className="relative z-0 h-full">
        {children}
      </div>
    </motion.div>
  );
};
