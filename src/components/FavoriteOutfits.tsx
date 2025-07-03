
import React from 'react';
import { Heart, Share2, ShoppingCart, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface FavoriteOutfitsProps {
  favorites: any[];
}

export const FavoriteOutfits: React.FC<FavoriteOutfitsProps> = ({ favorites }) => {
  if (favorites.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-10 h-10 text-gray-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Favorite Outfits Yet</h3>
                <p className="text-gray-600">
                  Start trying on clothes and save your favorite looks to see them here
                </p>
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
        <h2 className="text-3xl font-bold text-gray-900">Your Favorite Outfits</h2>
        <p className="text-lg text-gray-600">
          {favorites.length} saved look{favorites.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Favorites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((outfit) => (
          <Card 
            key={outfit.id} 
            className="group hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden"
          >
            <div className="aspect-square bg-gradient-to-b from-gray-100 to-gray-200 relative overflow-hidden">
              <img
                src={outfit.image}
                alt={outfit.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                  <Button size="sm" variant="secondary" className="flex-1 gap-2">
                    <Eye className="w-4 h-4" />
                    Try On
                  </Button>
                  <Button size="sm" variant="secondary" className="gap-2">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* Favorite Heart */}
              <div className="absolute top-4 right-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="bg-white/80 backdrop-blur-sm hover:bg-white/90 text-red-500"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </Button>
              </div>
            </div>
            
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{outfit.name}</h3>
                  <p className="text-sm text-gray-600">{outfit.description}</p>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-500">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="capitalize">
                  {outfit.category}
                </Badge>
                <Badge variant="outline">
                  Size {outfit.size || 'M'}
                </Badge>
                <div 
                  className={`w-4 h-4 rounded-full border-2 border-gray-300 ${
                    outfit.color === 'white' ? 'bg-white' :
                    outfit.color === 'black' ? 'bg-black' :
                    outfit.color === 'gray' ? 'bg-gray-400' :
                    outfit.color === 'blue' ? 'bg-blue-500' :
                    outfit.color === 'navy' ? 'bg-blue-900' :
                    outfit.color === 'red' ? 'bg-red-500' :
                    outfit.color === 'green' ? 'bg-green-500' :
                    'bg-gray-300'
                  }`}
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-lg font-bold text-gray-900">${outfit.price}</span>
                <div className="flex gap-2">
                  <Button size="sm" className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    <ShoppingCart className="w-4 h-4" />
                    Buy Now
                  </Button>
                </div>
              </div>

              {outfit.savedAt && (
                <div className="text-xs text-gray-500 pt-2 border-t">
                  Saved on {new Date(outfit.savedAt).toLocaleDateString()}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Outfit Collections */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Create Outfit Collections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-blue-400 transition-colors cursor-pointer">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                  <Heart className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-medium text-gray-900">Work Outfits</h4>
                <p className="text-sm text-gray-600">Professional looks for the office</p>
              </div>
            </div>
            
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-blue-400 transition-colors cursor-pointer">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-medium text-gray-900">Casual Wear</h4>
                <p className="text-sm text-gray-600">Comfortable everyday styles</p>
              </div>
            </div>
            
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-blue-400 transition-colors cursor-pointer">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                  <Heart className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-medium text-gray-900">Special Events</h4>
                <p className="text-sm text-gray-600">Outfits for special occasions</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
