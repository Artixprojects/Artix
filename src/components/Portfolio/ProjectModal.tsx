import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Project } from '../../constants/portfolio';
import { X } from 'lucide-react';
import { Magnetic } from '../Magnetic';
import { LiquidButton } from '../LiquidButton';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-12"
    >
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/95 backdrop-blur-xl"
      />

      {/* Content Container */}
      <motion.div
        layoutId={`project-${project.id}`}
        className="relative w-full max-w-7xl h-full max-h-[90vh] glass rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-2xl"
      >
        {/* Media Section */}
        <div className="relative w-full md:w-[65%] h-1/2 md:h-full bg-black flex items-center justify-center border-b md:border-b-0 md:border-r border-white/10">
          {project.type === 'video' ? (
            <video
              src={project.videoUrl}
              autoPlay
              loop
              controls
              className="w-full h-full object-contain"
            />
          ) : (
            <img 
              src={project.thumbnail} 
              className="w-full h-full object-cover"
              alt={project.title}
              referrerPolicy="no-referrer"
            />
          )}
        </div>

        {/* Info Section */}
        <div className="w-full md:w-[35%] h-1/2 md:h-full p-8 md:p-12 lg:p-16 flex flex-col justify-between bg-black/40 backdrop-blur-md overflow-y-auto">
          <div className="space-y-10">
            <div className="space-y-6">
              <span className="text-xs font-mono uppercase tracking-[0.5em] text-artix-muted block">
                {project.category} / {project.year}
              </span>
              <div className="overflow-visible py-2">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tighter leading-[0.95]">
                  {project.title}
                </h2>
              </div>
            </div>

            <div className="space-y-8">
              <p className="text-artix-muted text-base md:text-lg font-light leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {['WebGL', 'React', 'GLSL', 'AI'].map(tag => (
                  <span key={tag} className="px-3 py-1.5 rounded-full border border-white/10 text-[9px] font-mono uppercase tracking-widest text-white/60">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-10">
            <LiquidButton text="Launch Experience" className="w-full" />
          </div>
        </div>

        {/* Close Button */}
        <div className="absolute top-6 right-6 md:top-10 md:right-10 z-50">
          <Magnetic strength={0.4}>
            <button 
              onClick={onClose}
              className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all backdrop-blur-md"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </Magnetic>
        </div>
      </motion.div>
    </motion.div>
  );
};
