
import React, { useState } from 'react';
import { RotateCcw, Palette, Download, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShirtViewer360 } from '../3D/ShirtViewer360';

interface ShirtCustomizerProps {
  selectedShirt: any;
  userDesign: string | null;
  onSaveDesign: (design: any) => void;
}

export const ShirtCustomizer: React.FC<ShirtCustomizerProps> = ({
  selectedShirt,
  userDesign,
  onSaveDesign
}) => {
  const [selectedColor, setSelectedColor] = useState(selectedShirt?.colors?.[0] || '#ffffff');
  const [autoRotate, setAutoRotate] = useState(false);

  if (!selectedShirt) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <Palette className="w-10 h-10 text-gray-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Shirt Model</h3>
                <p className="text-gray-600">Choose a shirt from our collection to start customizing</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSaveDesign = () => {
    onSaveDesign({
      ...selectedShirt,
      customColor: selectedColor,
      userDesign,
      savedAt: new Date().toISOString()
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Customize Your {selectedShirt.name}</h2>
        <p className="text-lg text-gray-600">Rotate, adjust colors, and perfect your design</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* 3D Viewer */}
        <div className="lg:col-span-2">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <RotateCcw className="w-5 h-5 text-blue-600" />
                  360° View
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAutoRotate(!autoRotate)}
                >
                  {autoRotate ? 'Stop Rotation' : 'Auto Rotate'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ShirtViewer360
                shirtColor={selectedColor}
                userDesign={userDesign || undefined}
                autoRotate={autoRotate}
              />
            </CardContent>
          </Card>
        </div>

        {/* Customization Controls */}
        <div className="space-y-6">
          {/* Shirt Information */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>{selectedShirt.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-2xl font-bold text-gray-900">
                ${selectedShirt.price}
              </div>
              
              {/* Color Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Shirt Color</label>
                <div className="flex gap-3 flex-wrap">
                  {selectedShirt.colors.map((color: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color 
                          ? 'border-blue-500 ring-2 ring-blue-200' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {userDesign && (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">Your Design</label>
                  <img
                    src={userDesign}
                    alt="Your design"
                    className="w-16 h-16 object-contain bg-white rounded border"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={handleSaveDesign}
              className="w-full gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              <Download className="w-4 h-4" />
              Save Design
            </Button>
            <Button 
              className="w-full gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <ShoppingCart className="w-4 h-4" />
              Order Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
