import React, { useRef, useMemo } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

const DistortionMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color('#ffffff'),
    uMouse: new THREE.Vector2(0, 0),
    uScroll: 0,
  },
  // Vertex Shader
  `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform float uScroll;

  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Subtle wave distortion based on time and scroll
    pos.z += sin(pos.x * 2.0 + uTime) * 0.1;
    pos.z += cos(pos.y * 2.0 + uTime) * 0.1;
    pos.z += sin(pos.x * 5.0 + uScroll * 10.0) * 0.05;

    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
  `,
  // Fragment Shader
  `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform vec3 uColor;
  uniform vec2 uMouse;

  void main() {
    // Chromatic aberration-like effect
    float dist = distance(vUv, uMouse);
    float strength = smoothstep(0.5, 0.0, dist);
    
    vec3 color = uColor;
    color.r += strength * 0.2;
    color.b += sin(uTime) * 0.1;
    
    // Add subtle grid
    float grid = sin(vUv.x * 50.0) * sin(vUv.y * 50.0);
    color += grid * 0.02;

    gl_FragColor = vec4(color, 0.1 + strength * 0.2);
  }
  `
);

extend({ DistortionMaterial });

export const LabShader: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.getElapsedTime();
      materialRef.current.uScroll = scrollProgress;
      materialRef.current.uMouse.lerp(
        new THREE.Vector2(
          (state.mouse.x + 1) / 2,
          (state.mouse.y + 1) / 2
        ),
        0.1
      );
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -20, 0]}>
      <planeGeometry args={[20, 20, 64, 64]} />
      {/* @ts-ignore */}
      <distortionMaterial ref={materialRef} transparent side={THREE.DoubleSide} />
    </mesh>
  );
};
