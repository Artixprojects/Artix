import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Project } from '../../constants/portfolio';
import { cn } from '../../lib/utils';

interface PortfolioItemProps {
  project: Project;
  index: number;
  onClick: () => void;
}

export const PortfolioItem: React.FC<PortfolioItemProps> = ({ project, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { damping: 20, stiffness: 150 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { damping: 20, stiffness: 150 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }

  function handleMouseEnter() {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }

  const isVideo = project.type === 'video';

  return (
    <motion.div
      layoutId={`project-${project.id}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative flex-shrink-0 cursor-pointer group",
        isVideo ? "w-[70vw] md:w-[45vw] aspect-[16/9]" : "w-[40vw] md:w-[25vw] aspect-[4/5]"
      )}
    >
      {/* Floating Effect Layers */}
      <div className="absolute inset-0 bg-white/5 rounded-3xl -z-10 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
      
      <div className="relative h-full w-full rounded-3xl overflow-hidden glass border-white/5 group-hover:border-white/20 transition-colors duration-500">
        {/* Thumbnail */}
        <img 
          src={project.thumbnail} 
          alt={project.title}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out",
            isHovered ? "scale-110 opacity-0" : "scale-100 opacity-40"
          )}
          referrerPolicy="no-referrer"
        />

        {/* Video Preview */}
        {isVideo && (
          <video
            ref={videoRef}
            src={project.videoUrl}
            muted
            loop
            playsInline
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
              isHovered ? "opacity-80" : "opacity-0"
            )}
          />
        )}

        {/* Content Overlay */}
        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                {project.category}
              </span>
              <span className="text-[10px] font-mono text-white/30">{project.year}</span>
            </div>
            <h4 className="text-3xl md:text-5xl font-display font-bold tracking-tighter leading-none group-hover:translate-x-2 transition-transform duration-500">
              {project.title}
            </h4>
            <p className="text-artix-muted text-sm font-light max-w-xs opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
              {project.description}
            </p>
          </div>
        </div>

        {/* Animated Border / Glow */}
        <div 
          className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.1) 0%, transparent 60%)`,
          }}
        />
      </div>
    </motion.div>
  );
};
