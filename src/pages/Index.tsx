
import React, { useState } from 'react';
import { Camera, User, Shirt, Heart, Share2, ShoppingBag, Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UploadSection } from '@/components/UploadSection';
import { ClothingCollection } from '@/components/ClothingCollection';
import { VirtualFittingRoom } from '@/components/VirtualFittingRoom';
import { FavoriteOutfits } from '@/components/FavoriteOutfits';
import { UserProfile } from '@/components/UserProfile';

const Index = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [selectedOutfit, setSelectedOutfit] = useState<any>(null);
  const [favoriteOutfits, setFavoriteOutfits] = useState<any[]>([]);

  const handlePhotoUpload = (photo: string) => {
    setUserPhoto(photo);
    setActiveTab('wardrobe');
  };

  const handleOutfitSelect = (outfit: any) => {
    setSelectedOutfit(outfit);
    setActiveTab('fitting');
  };

  const handleSaveFavorite = (outfit: any) => {
    setFavoriteOutfits(prev => [...prev, { ...outfit, id: Date.now() }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Shirt className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  VirtualWear
                </h1>
                <p className="text-sm text-gray-600">Your Digital Wardrobe</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button size="sm" className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <ShoppingBag className="w-4 h-4" />
                Shop
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-white/60 backdrop-blur-sm">
            <TabsTrigger value="upload" className="gap-2">
              <Camera className="w-4 h-4" />
              Upload
            </TabsTrigger>
            <TabsTrigger value="wardrobe" className="gap-2">
              <Shirt className="w-4 h-4" />
              Wardrobe
            </TabsTrigger>
            <TabsTrigger value="fitting" className="gap-2">
              <User className="w-4 h-4" />
              Fitting Room
            </TabsTrigger>
            <TabsTrigger value="favorites" className="gap-2">
              <Heart className="w-4 h-4" />
              Favorites
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <UploadSection onPhotoUpload={handlePhotoUpload} />
          </TabsContent>

          <TabsContent value="wardrobe" className="space-y-6">
            <ClothingCollection 
              onOutfitSelect={handleOutfitSelect}
              userPhoto={userPhoto}
            />
          </TabsContent>

          <TabsContent value="fitting" className="space-y-6">
            <VirtualFittingRoom 
              userPhoto={userPhoto}
              selectedOutfit={selectedOutfit}
              onSaveFavorite={handleSaveFavorite}
            />
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <FavoriteOutfits favorites={favoriteOutfits} />
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <UserProfile />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">VirtualWear - Revolutionizing Digital Fashion</p>
            <p className="text-sm">Your privacy is protected. Photos are processed securely and never shared.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
