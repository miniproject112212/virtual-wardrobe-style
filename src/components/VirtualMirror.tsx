
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface VirtualMirrorProps {
  userPhoto: string;
  selectedOutfit: any;
  selectedSize: string;
  selectedColor: string;
  zoomLevel: number;
  rotationAngle: number;
}

export const VirtualMirror: React.FC<VirtualMirrorProps> = ({
  userPhoto,
  selectedOutfit,
  selectedSize,
  selectedColor,
  zoomLevel,
  rotationAngle
}) => {
  return (
    <div className="relative aspect-[3/4] bg-gradient-to-b from-gray-100 to-gray-200 overflow-hidden">
      {/* User Avatar with Clothing Overlay */}
      <div 
        className="absolute inset-0 flex items-center justify-center transition-transform duration-300"
        style={{
          transform: `scale(${zoomLevel / 100}) rotate(${rotationAngle}deg)`
        }}
      >
        <div className="relative">
          {/* User Photo */}
          <img
            src={userPhoto}
            alt="Your avatar"
            className="w-80 h-96 object-cover rounded-lg shadow-2xl"
          />
          
          {/* Improved Clothing Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Clothing Item positioned better */}
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-56 h-40 rounded-lg overflow-hidden shadow-lg">
              <img
                src={selectedOutfit.image}
                alt={selectedOutfit.name}
                className="w-full h-full object-cover opacity-85 mix-blend-multiply"
                style={{
                  filter: selectedColor !== 'white' ? `hue-rotate(${
                    selectedColor === 'black' ? '0deg' :
                    selectedColor === 'blue' ? '220deg' :
                    selectedColor === 'navy' ? '240deg' :
                    selectedColor === 'red' ? '0deg' :
                    selectedColor === 'gray' ? '0deg' :
                    selectedColor === 'pink' ? '320deg' :
                    '0deg'
                  })` : 'none'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10"></div>
            </div>
          </div>
          
          {/* Size indicator */}
          <div className="absolute top-4 left-4">
            <Badge className="bg-white/90 text-gray-800 border">
              Size: {selectedSize}
            </Badge>
          </div>
        </div>
      </div>

      {/* Fitting Indicators */}
      <div className="absolute top-4 right-4 space-y-2">
        <Badge className="bg-green-500 text-white">
          Perfect Fit
        </Badge>
        <Badge variant="outline" className="bg-white/80">
          95% Match
        </Badge>
      </div>
    </div>
  );
};
