import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { LabShader } from './LabShader';

export const Scene3D: React.FC<{ scrollProgress: number; velocity: number }> = ({ scrollProgress, velocity }) => {
  const coreRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { camera, mouse } = useThree();

  const particlePositions = useMemo(() => {
    const positions = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Camera movement based on scroll and mouse
    const targetZ = 5 - scrollProgress * 15;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
    
    // Perspective shift on mouse move
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 2, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 2, 0.05);
    camera.lookAt(0, 0, -5);

    if (coreRef.current) {
      coreRef.current.rotation.y = time * (0.2 + velocity * 0.5);
      coreRef.current.rotation.z = time * 0.1;
      
      // Reactive to scroll velocity
      const targetScale = 1 + scrollProgress * 0.5 + velocity * 0.2;
      coreRef.current.scale.setScalar(THREE.MathUtils.lerp(coreRef.current.scale.x, targetScale, 0.1));
      
      // Distortion based on velocity
      if (coreRef.current.material instanceof THREE.MeshPhysicalMaterial || (coreRef.current.material as any).distort !== undefined) {
        (coreRef.current.material as any).distort = 0.4 + velocity * 0.5;
        (coreRef.current.material as any).speed = 2 + velocity * 5;
      }
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.05;
      // Stretch particles based on velocity
      particlesRef.current.scale.z = 1 + velocity * 2;
    }
    
    if (groupRef.current) {
      groupRef.current.position.y = -scrollProgress * 20;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4444ff" />

      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere ref={coreRef} args={[1, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#ffffff"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.1}
            metalness={0.9}
          />
        </Sphere>
      </Float>

      <Points ref={particlesRef} positions={particlePositions}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      <LabShader scrollProgress={scrollProgress} />
    </group>
  );
};

