
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface ShirtModel3DProps {
  color: string;
  design?: string;
  rotationSpeed?: number;
  autoRotate?: boolean;
}

export const ShirtModel3D: React.FC<ShirtModel3DProps> = ({
  color = '#ffffff',
  design,
  rotationSpeed = 0.01,
  autoRotate = false
}) => {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      {/* Basic T-shirt geometry */}
      <boxGeometry args={[2, 2.5, 0.2]} />
      <meshStandardMaterial color={color} />
      
      {/* Design overlay if provided */}
      {design && (
        <mesh position={[0, 0, 0.11]}>
          <planeGeometry args={[1.5, 1.5]} />
          <meshStandardMaterial 
            map={null} 
            transparent 
            opacity={0.9}
          />
        </mesh>
      )}
    </mesh>
  );
};
