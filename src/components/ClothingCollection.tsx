
import React, { useState } from 'react';
import { Search, Filter, Grid, List, Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ClothingCollectionProps {
  onOutfitSelect: (outfit: any) => void;
  userPhoto: string | null;
}

const clothingData = {
  tshirts: [
    {
      id: 1,
      name: "Classic White Tee",
      category: "casual",
      color: "white",
      price: 29.99,
      image: "/placeholder.svg",
      colors: ["white", "black", "gray", "navy"],
      sizes: ["XS", "S", "M", "L", "XL"],
      rating: 4.5,
      description: "Premium cotton basic tee with perfect fit"
    },
    {
      id: 2,
      name: "Vintage Graphic Tee",
      category: "graphic",
      color: "black",
      price: 34.99,
      image: "/placeholder.svg",
      colors: ["black", "white", "gray"],
      sizes: ["S", "M", "L", "XL"],
      rating: 4.3,
      description: "Retro-inspired design with soft cotton blend"
    },
    {
      id: 3,
      name: "Striped Long Sleeve",
      category: "casual",
      color: "navy",
      price: 39.99,
      image: "/placeholder.svg",
      colors: ["navy", "red", "green"],
      sizes: ["XS", "S", "M", "L"],
      rating: 4.4,
      description: "Classic stripes with modern fit"
    },
    {
      id: 4,
      name: "Premium V-Neck",
      category: "casual",
      color: "gray",
      price: 32.99,
      image: "/placeholder.svg",
      colors: ["gray", "white", "black", "blue"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      rating: 4.6,
      description: "Soft v-neck with elegant drape"
    }
  ],
  shirts: [
    {
      id: 5,
      name: "Oxford Button Down",
      category: "formal",
      color: "blue",
      price: 79.99,
      image: "/placeholder.svg",
      colors: ["blue", "white", "pink", "gray"],
      sizes: ["14.5", "15", "15.5", "16", "16.5", "17"],
      rating: 4.7,
      description: "Classic oxford weave with button-down collar"
    },
    {
      id: 6,
      name: "Casual Flannel",
      category: "casual",
      color: "red",
      price: 59.99,
      image: "/placeholder.svg",
      colors: ["red", "blue", "green", "gray"],
      sizes: ["S", "M", "L", "XL"],
      rating: 4.4,
      description: "Cozy flannel perfect for layering"
    },
    {
      id: 7,
      name: "Dress Shirt",
      category: "formal",
      color: "white",
      price: 89.99,
      image: "/placeholder.svg",
      colors: ["white", "blue", "gray"],
      sizes: ["14.5", "15", "15.5", "16", "16.5"],
      rating: 4.8,
      description: "Crisp formal shirt for professional occasions"
    },
    {
      id: 8,
      name: "Chambray Shirt",
      category: "casual",
      color: "blue",
      price: 64.99,
      image: "/placeholder.svg",
      colors: ["blue", "gray", "white"],
      sizes: ["S", "M", "L", "XL"],
      rating: 4.5,
      description: "Lightweight chambray with casual elegance"
    }
  ]
};

export const ClothingCollection: React.FC<ClothingCollectionProps> = ({ 
  onOutfitSelect, 
  userPhoto 
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const allClothing = [...clothingData.tshirts, ...clothingData.shirts];

  const filteredClothing = allClothing.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesColor = selectedColor === 'all' || item.color === selectedColor;
    return matchesSearch && matchesCategory && matchesColor;
  });

  const sortedClothing = [...filteredClothing].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleTryOn = (item: any) => {
    onOutfitSelect({
      ...item,
      type: item.id <= 4 ? 'tshirt' : 'shirt'
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Your Virtual Wardrobe</h2>
        <p className="text-lg text-gray-600">Discover and try on premium clothing</p>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search clothing..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Categories</option>
                <option value="casual">Casual</option>
                <option value="formal">Formal</option>
                <option value="graphic">Graphic</option>
              </select>
              
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Colors</option>
                <option value="white">White</option>
                <option value="black">Black</option>
                <option value="blue">Blue</option>
                <option value="gray">Gray</option>
                <option value="red">Red</option>
                <option value="navy">Navy</option>
                <option value="green">Green</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
                <option value="rating">Sort by Rating</option>
              </select>
            </div>

            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clothing Grid/List */}
      <div className="space-y-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/60 backdrop-blur-sm">
            <TabsTrigger value="all">All Items ({sortedClothing.length})</TabsTrigger>
            <TabsTrigger value="tshirts">T-Shirts ({clothingData.tshirts.length})</TabsTrigger>
            <TabsTrigger value="shirts">Shirts ({clothingData.shirts.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {sortedClothing.map((item) => (
                <ClothingCard
                  key={item.id}
                  item={item}
                  viewMode={viewMode}
                  onTryOn={handleTryOn}
                  userPhoto={userPhoto}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tshirts" className="mt-6">
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {clothingData.tshirts
                .filter(item => {
                  const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
                  const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
                  const matchesColor = selectedColor === 'all' || item.color === selectedColor;
                  return matchesSearch && matchesCategory && matchesColor;
                })
                .map((item) => (
                  <ClothingCard
                    key={item.id}
                    item={item}
                    viewMode={viewMode}
                    onTryOn={handleTryOn}
                    userPhoto={userPhoto}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="shirts" className="mt-6">
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {clothingData.shirts
                .filter(item => {
                  const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
                  const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
                  const matchesColor = selectedColor === 'all' || item.color === selectedColor;
                  return matchesSearch && matchesCategory && matchesColor;
                })
                .map((item) => (
                  <ClothingCard
                    key={item.id}
                    item={item}
                    viewMode={viewMode}
                    onTryOn={handleTryOn}
                    userPhoto={userPhoto}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface ClothingCardProps {
  item: any;
  viewMode: 'grid' | 'list';
  onTryOn: (item: any) => void;
  userPhoto: string | null;
}

const ClothingCard: React.FC<ClothingCardProps> = ({ item, viewMode, onTryOn, userPhoto }) => {
  return (
    <Card className={`group hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden ${
      viewMode === 'list' ? 'flex flex-row' : ''
    }`}>
      <div className={`${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'} bg-gray-100 overflow-hidden`}>
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className={`${viewMode === 'list' ? 'flex-1' : ''} p-4 space-y-3`}>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {item.name}
            </h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-500">
            <Heart className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{item.rating}</span>
          </div>
          <Badge variant="secondary" className="capitalize">
            {item.category}
          </Badge>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-600">Colors:</span>
          {item.colors.slice(0, 4).map((color: string) => (
            <div
              key={color}
              className={`w-4 h-4 rounded-full border-2 border-gray-300 ${
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

        <div className="flex items-center justify-between pt-2">
          <span className="text-xl font-bold text-gray-900">${item.price}</span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onTryOn(item)}
              disabled={!userPhoto}
              className="gap-2"
            >
              <Search className="w-4 h-4" />
              Try On
            </Button>
            <Button size="sm" className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
