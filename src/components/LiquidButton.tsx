import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { Magnetic } from './Magnetic';
import { cn } from '../lib/utils';

const LiquidMaterial = shaderMaterial(
  {
    uTime: 0,
    uHover: 0,
    uColor: new THREE.Color('#ffffff'),
    uResolution: new THREE.Vector2(1, 1),
  },
  // Vertex Shader
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // Fragment Shader
  `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uHover;
  uniform vec3 uColor;
  uniform vec2 uResolution;

  // Rounded Rectangle distance function
  float sdRoundedRect(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
  }

  void main() {
    vec2 uv = vUv - 0.5;
    uv.x *= uResolution.x / uResolution.y;
    
    // Liquid distortion
    float noise = sin(vUv.y * 15.0 + uTime * 3.0) * 0.02 * uHover;
    noise += cos(vUv.x * 15.0 + uTime * 2.0) * 0.02 * uHover;
    
    vec2 distortedUv = uv + noise;
    
    // Pill shape dimensions
    vec2 size = vec2((uResolution.x / uResolution.y) * 0.45, 0.4);
    float radius = 0.4;
    
    float d = sdRoundedRect(distortedUv, size, radius);
    float alpha = smoothstep(0.01, 0.0, d);
    
    // Subtle glow on hover
    float glow = smoothstep(0.1, -0.2, d) * 0.3 * uHover;
    
    vec3 finalColor = uColor + glow;
    
    gl_FragColor = vec4(finalColor, alpha);
  }
  `
);

extend({ LiquidMaterial });

interface LiquidButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

export const LiquidButton: React.FC<LiquidButtonProps> = ({ text, onClick, className }) => {
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Magnetic strength={0.15}>
      <div 
        ref={containerRef}
        className={cn("relative group cursor-pointer", className)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onClick}
      >
        <div className="absolute inset-0 -z-10 scale-[1.2]">
          <Canvas 
            gl={{ alpha: true, antialias: true }} 
            orthographic 
            camera={{ left: -1, right: 1, top: 1, bottom: -1, near: 0.1, far: 1000, zoom: 1 }}
          >
            <LiquidButtonScene hovered={hovered} />
          </Canvas>
        </div>
        <span className="relative z-10 px-14 py-6 block text-black font-display font-bold text-xl tracking-tight transition-transform group-hover:scale-105">
          {text}
        </span>
      </div>
    </Magnetic>
  );
};

const LiquidButtonScene: React.FC<{ hovered: boolean }> = ({ hovered }) => {
  const materialRef = useRef<any>(null);
  const hoverVal = useRef(0);
  const { size } = useThree();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.getElapsedTime();
      hoverVal.current = THREE.MathUtils.lerp(hoverVal.current, hovered ? 1 : 0, 0.1);
      materialRef.current.uHover = hoverVal.current;
      materialRef.current.uResolution.set(size.width, size.height);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      {/* @ts-ignore */}
      <liquidMaterial ref={materialRef} transparent />
    </mesh>
  );
};
