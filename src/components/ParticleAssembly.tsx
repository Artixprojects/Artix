import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface ParticleAssemblyProps {
  children: React.ReactNode;
  className?: string;
}

export const ParticleAssembly: React.FC<ParticleAssemblyProps> = ({ children, className }) => {
  const particles = Array.from({ length: 12 });

  return (
    <div className={cn("relative group", className)}>
      {/* Particles */}
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: (Math.random() - 0.5) * 400, 
            y: (Math.random() - 0.5) * 400, 
            opacity: 0,
            scale: 0
          }}
          whileInView={{ 
            x: 0, 
            y: 0, 
            opacity: 0.4,
            scale: 1
          }}
          viewport={{ once: true }}
          transition={{ 
            duration: 1.5, 
            delay: i * 0.05, 
            ease: [0.22, 1, 0.36, 1] 
          }}
          className="absolute w-1 h-1 bg-white rounded-full pointer-events-none z-10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative z-0 h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};
