
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { removeBackground, loadImage } from '@/utils/backgroundRemoval';

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
  const [processedUserPhoto, setProcessedUserPhoto] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const processUserPhoto = async () => {
    if (!userPhoto) return;
    
    setIsProcessing(true);
    try {
      console.log('Starting photo processing...');
      
      // Convert user photo to image element
      const response = await fetch(userPhoto);
      const blob = await response.blob();
      const imageElement = await loadImage(blob);
      
      // Remove background
      const processedBlob = await removeBackground(imageElement);
      const processedUrl = URL.createObjectURL(processedBlob);
      
      setProcessedUserPhoto(processedUrl);
      console.log('Photo processing completed');
    } catch (error) {
      console.error('Error processing photo:', error);
      // Fallback to original photo if processing fails
      setProcessedUserPhoto(userPhoto);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative aspect-[3/4] bg-gradient-to-b from-gray-100 to-gray-200 overflow-hidden">
      {/* Processing indicator */}
      {isProcessing && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Processing your photo...</p>
          </div>
        </div>
      )}

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
            src={processedUserPhoto || userPhoto}
            alt="Your avatar"
            className="w-80 h-96 object-cover rounded-lg shadow-2xl"
          />
          
          {/* Enhanced Clothing Overlay with better positioning */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div 
              className="absolute rounded-lg overflow-hidden shadow-lg"
              style={{
                top: '15%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '70%',
                height: '45%',
                opacity: 0.9,
                mixBlendMode: 'multiply'
              }}
            >
              <img
                src={selectedOutfit.image}
                alt={selectedOutfit.name}
                className="w-full h-full object-cover"
                style={{
                  filter: selectedColor !== 'white' ? `hue-rotate(${
                    selectedColor === 'black' ? '0deg' :
                    selectedColor === 'blue' ? '220deg' :
                    selectedColor === 'navy' ? '240deg' :
                    selectedColor === 'red' ? '0deg' :
                    selectedColor === 'gray' ? '0deg' :
                    selectedColor === 'pink' ? '320deg' :
                    '0deg'
                  }) saturate(1.2)` : 'none'
                }}
              />
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

      {/* Process Photo Button */}
      {!processedUserPhoto && !isProcessing && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <Button 
            onClick={processUserPhoto}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2"
          >
            Enhance Fitting
          </Button>
        </div>
      )}
    </div>
  );
};
