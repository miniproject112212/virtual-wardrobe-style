
import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Palette, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DesignUploaderProps {
  onDesignUpload: (design: string) => void;
}

export const DesignUploader: React.FC<DesignUploaderProps> = ({ onDesignUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedDesign, setUploadedDesign] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedDesign(result);
        onDesignUpload(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Custom 3D Shirt Designer
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Upload your design and see it come to life on our 3D shirt models. Rotate, customize, and perfect your creation!
        </p>
      </div>

      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-center justify-center">
            <Palette className="w-6 h-6 text-blue-600" />
            Upload Your Design
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!uploadedDesign ? (
            <div
              className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="space-y-4">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Upload className="w-10 h-10 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Drag and drop your design here
                  </h3>
                  <p className="text-gray-600 mb-4">
                    PNG, JPG, or SVG files work best
                  </p>
                  <Button onClick={openFileDialog} className="gap-2">
                    <ImageIcon className="w-4 h-4" />
                    Choose Design
                  </Button>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <img
                  src={uploadedDesign}
                  alt="Uploaded design"
                  className="w-32 h-32 object-contain mx-auto rounded-lg shadow-lg bg-white p-2"
                />
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5 text-green-500" />
                    <span className="text-green-700 font-medium">Design uploaded successfully!</span>
                  </div>
                  <p className="text-gray-600">
                    Now select a shirt model to see your design in 3D
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setUploadedDesign(null)}
                    className="gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Different Design
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
