
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { ShirtModel3D } from './ShirtModel3D';

interface ShirtViewer360Props {
  shirtColor: string;
  userDesign?: string;
  autoRotate?: boolean;
}

export const ShirtViewer360: React.FC<ShirtViewer360Props> = ({
  shirtColor,
  userDesign,
  autoRotate = false
}) => {
  return (
    <div className="w-full h-96 bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg overflow-hidden">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        
        {/* Environment */}
        <Environment preset="studio" />
        
        {/* 3D Shirt Model */}
        <Suspense fallback={null}>
          <ShirtModel3D 
            color={shirtColor}
            design={userDesign}
            autoRotate={autoRotate}
          />
        </Suspense>
        
        {/* Camera Controls */}
        <OrbitControls 
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={8}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI - Math.PI / 6}
        />
      </Canvas>
    </div>
  );
};
