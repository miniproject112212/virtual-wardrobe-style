
import React, { useRef, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Group } from 'three';
import * as THREE from 'three';

interface DesignPlacement {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

interface ShirtModel3DProps {
  color: string;
  frontDesign?: string;
  backDesign?: string;
  frontPlacement?: DesignPlacement;
  backPlacement?: DesignPlacement;
  showBack?: boolean;
  rotationSpeed?: number;
  autoRotate?: boolean;
}

export const ShirtModel3D: React.FC<ShirtModel3DProps> = ({
  color = '#ffffff',
  frontDesign,
  backDesign,
  frontPlacement = { x: 0, y: 0.2, scale: 1, rotation: 0 },
  backPlacement = { x: 0, y: 0.2, scale: 1, rotation: 0 },
  showBack = false,
  rotationSpeed = 0.01,
  autoRotate = false
}) => {
  const shirtRef = useRef<Group>(null);

  useFrame(() => {
    if (shirtRef.current && autoRotate) {
      shirtRef.current.rotation.y += rotationSpeed;
    }
  });

  // Create realistic t-shirt shape
  const createTShirtGeometry = () => {
    const shape = new THREE.Shape();
    
    // T-shirt outline (simplified but more realistic)
    shape.moveTo(-1, -1.5);
    shape.lineTo(-1, 0.5);
    shape.lineTo(-1.5, 0.5);
    shape.lineTo(-1.5, 1);
    shape.lineTo(-0.8, 1);
    shape.lineTo(-0.8, 1.2);
    shape.lineTo(0.8, 1.2);
    shape.lineTo(0.8, 1);
    shape.lineTo(1.5, 1);
    shape.lineTo(1.5, 0.5);
    shape.lineTo(1, 0.5);
    shape.lineTo(1, -1.5);
    shape.lineTo(-1, -1.5);
    
    const extrudeSettings = {
      depth: 0.1,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 0.02,
      bevelThickness: 0.02
    };
    
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  };

  const shirtGeometry = createTShirtGeometry();

  useEffect(() => {
    if (shirtRef.current) {
      shirtRef.current.rotation.y = showBack ? Math.PI : 0;
    }
  }, [showBack]);

  return (
    <group ref={shirtRef} position={[0, 0, 0]}>
      {/* Main T-shirt body */}
      <mesh position={[0, 0, 0]}>
        <primitive object={shirtGeometry} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>
      
      {/* Front design */}
      {frontDesign && !showBack && (
        <mesh 
          position={[frontPlacement.x, frontPlacement.y, 0.06]}
          rotation={[0, 0, frontPlacement.rotation]}
          scale={[frontPlacement.scale, frontPlacement.scale, 1]}
        >
          <planeGeometry args={[0.8, 0.8]} />
          <meshStandardMaterial 
            transparent 
            opacity={0.9}
            map={useLoader(THREE.TextureLoader, frontDesign)}
          />
        </mesh>
      )}
      
      {/* Back design */}
      {backDesign && showBack && (
        <mesh 
          position={[backPlacement.x, backPlacement.y, 0.06]}
          rotation={[0, Math.PI, backPlacement.rotation]}
          scale={[backPlacement.scale, backPlacement.scale, 1]}
        >
          <planeGeometry args={[0.8, 0.8]} />
          <meshStandardMaterial 
            transparent 
            opacity={0.9}
            map={useLoader(THREE.TextureLoader, backDesign)}
          />
        </mesh>
      )}
    </group>
  );
};
