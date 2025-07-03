
import React, { useState } from 'react';
import { RotateCcw, Heart, Share2, ShoppingCart, Maximize, ZoomIn, ZoomOut, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';

interface VirtualFittingRoomProps {
  userPhoto: string | null;
  selectedOutfit: any;
  onSaveFavorite: (outfit: any) => void;
}

export const VirtualFittingRoom: React.FC<VirtualFittingRoomProps> = ({
  userPhoto,
  selectedOutfit,
  onSaveFavorite
}) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(selectedOutfit?.color || 'white');

  const handleRotate = () => {
    setRotationAngle(prev => (prev + 90) % 360);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };

  const handleSaveFavorite = () => {
    if (selectedOutfit) {
      onSaveFavorite({
        ...selectedOutfit,
        size: selectedSize,
        color: selectedColor,
        savedAt: new Date().toISOString()
      });
    }
  };

  if (!userPhoto) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <ZoomIn className="w-10 h-10 text-gray-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Your Photo First</h3>
                <p className="text-gray-600">Please upload your photo to start the virtual fitting experience</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!selectedOutfit) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <ShoppingCart className="w-10 h-10 text-gray-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Select an Outfit to Try</h3>
                <p className="text-gray-600">Browse the wardrobe and select an item to see how it looks on you</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Virtual Fitting Room</h2>
        <p className="text-lg text-gray-600">See how you look in {selectedOutfit.name}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Virtual Mirror */}
        <div className="lg:col-span-2">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <ZoomIn className="w-5 h-5 text-blue-600" />
                  Virtual Mirror
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleZoomOut}>
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-gray-600 min-w-12">{zoomLevel}%</span>
                  <Button variant="outline" size="sm" onClick={handleZoomIn}>
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleRotate}>
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setIsFullscreen(!isFullscreen)}>
                    <Maximize className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
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
                    
                    {/* Clothing Overlay Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-lg"></div>
                    
                    {/* Clothing Item Visualization */}
                    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-64 h-32 bg-gradient-to-b from-blue-200 to-blue-400 opacity-70 rounded-lg border-2 border-blue-300 shadow-lg">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white font-semibold text-lg bg-black/30 px-3 py-1 rounded">
                          {selectedOutfit.name}
                        </span>
                      </div>
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
            </CardContent>
          </Card>
        </div>

        {/* Outfit Details & Controls */}
        <div className="space-y-6">
          {/* Outfit Information */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{selectedOutfit.name}</span>
                <Button variant="ghost" size="sm" onClick={handleSaveFavorite}>
                  <Heart className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">${selectedOutfit.price}</span>
                <Badge variant="secondary" className="capitalize">
                  {selectedOutfit.category}
                </Badge>
              </div>
              
              <p className="text-gray-600">{selectedOutfit.description}</p>

              {/* Size Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Size</label>
                <div className="flex gap-2 flex-wrap">
                  {selectedOutfit.sizes?.map((size: string) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                      className="min-w-12"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Color</label>
                <div className="flex gap-2 flex-wrap">
                  {selectedOutfit.colors?.map((color: string) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor === color ? 'border-blue-500 border-4' : 'border-gray-300'
                      } ${
                        color === 'white' ? 'bg-white' :
                        color === 'black' ? 'bg-black' :
                        color === 'gray' ? 'bg-gray-400' :
                        color === 'blue' ? 'bg-blue-500' :
                        color === 'navy' ? 'bg-blue-900' :
                        color === 'red' ? 'bg-red-500' :
                        color === 'green' ? 'bg-green-500' :
                        color === 'pink' ? 'bg-pink-500' :
                        'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fit Analysis */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Fit Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Chest Fit</span>
                  <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Length</span>
                  <Badge className="bg-green-100 text-green-800">Perfect</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Shoulders</span>
                  <Badge className="bg-yellow-100 text-yellow-800">Good</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Overall</span>
                  <Badge className="bg-green-100 text-green-800">95% Match</Badge>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600 mb-2">Size Recommendation:</p>
                <p className="text-sm font-medium text-gray-900">
                  Based on your measurements, size {selectedSize} is perfect for you!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="gap-2">
              <Share2 className="w-4 h-4" />
              Share Look
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Save Image
            </Button>
            <Button className="col-span-2 gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <ShoppingCart className="w-4 h-4" />
              Add to Cart - ${selectedOutfit.price}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
