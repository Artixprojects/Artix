export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  videoUrl?: string;
  type: 'video' | 'image';
  year: string;
}

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'NEURAL ARCH V1',
    category: 'AI SYSTEMS',
    description: 'A generative architectural system powered by neural networks, exploring the intersection of biological growth and synthetic structure.',
    thumbnail: 'https://picsum.photos/seed/artix-p1/1200/800',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-connection-lines-31590-large.mp4',
    type: 'video',
    year: '2024'
  },
  {
    id: 'p2',
    title: 'CYBERNETIC DREAMS',
    category: 'MOTION DESIGN',
    description: 'An abstract exploration of machine consciousness through high-fidelity fluid simulations and procedural textures.',
    thumbnail: 'https://picsum.photos/seed/artix-p2/1200/800',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-blue-mesh-23344-large.mp4',
    type: 'video',
    year: '2024'
  },
  {
    id: 'p3',
    title: 'QUANTUM INTERFACE',
    category: 'INTERACTIVE',
    description: 'Experimental UI design for a quantum computing dashboard, focusing on multi-dimensional data visualization.',
    thumbnail: 'https://picsum.photos/seed/artix-p3/1200/800',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-circuit-board-animation-with-glowing-lines-41257-large.mp4',
    type: 'video',
    year: '2023'
  },
  {
    id: 'p4',
    title: 'SYNTHETIC HORIZON',
    category: 'BRAND FILM',
    description: 'A cinematic brand film for a future-tech conglomerate, blending live-action with advanced CGI environments.',
    thumbnail: 'https://picsum.photos/seed/artix-p4/1200/800',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-at-night-with-neon-lights-23346-large.mp4',
    type: 'video',
    year: '2024'
  },
  {
    id: 'p5',
    title: 'VOID RUNNER',
    category: 'MOTION',
    description: 'A high-speed chase through a neon-drenched megacity, exploring light trails and motion blur techniques.',
    thumbnail: 'https://picsum.photos/seed/artix-p5/1200/800',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-tunnel-of-neon-lights-at-high-speed-23348-large.mp4',
    type: 'video',
    year: '2023'
  },
  {
    id: 'p6',
    title: 'BIO-SYNTHESIS',
    category: 'AI SYSTEMS',
    description: 'Generative biological forms that react to real-time environmental data, creating a living digital sculpture.',
    thumbnail: 'https://picsum.photos/seed/artix-p6/1200/800',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-organic-forms-moving-slowly-23350-large.mp4',
    type: 'video',
    year: '2024'
  },
  {
    id: 'p7',
    title: 'DATA STREAM',
    category: 'INTERACTIVE',
    description: 'Real-time global data visualization platform, processing millions of data points into a cinematic flow.',
    thumbnail: 'https://picsum.photos/seed/artix-p7/1200/800',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-digital-rain-of-binary-code-23352-large.mp4',
    type: 'video',
    year: '2024'
  },
  {
    id: 'p8',
    title: 'CHRONOS',
    category: 'BRAND FILM',
    description: 'An exploration of time and entropy through macro-cinematography and slow-motion physical effects.',
    thumbnail: 'https://picsum.photos/seed/artix-p8/1200/800',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-ink-dropping-into-water-in-slow-motion-23354-large.mp4',
    type: 'video',
    year: '2023'
  },
  // Thumbnail-only projects
  ...Array.from({ length: 12 }).map((_, i) => ({
    id: `t${i}`,
    title: `CREATIVE WORK ${i + 1}`,
    category: 'EXPERIMENTAL',
    description: 'A deep dive into procedural generation and abstract form exploration.',
    thumbnail: `https://picsum.photos/seed/artix-thumb-${i}/1200/800`,
    type: 'image' as const,
    year: '2023'
  }))
];
