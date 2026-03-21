import { Fish, ShoppingCart, Store, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { mockFarms } from '../data/mockFarms';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingPageProps {
  onShowSignIn: () => void;
  onShowSignUp: () => void;
}

export default function LandingPage({ onShowSignIn, onShowSignUp }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="max-w-md mx-auto p-4 pb-6">
        {/* Header Card */}
        <Card className="mb-6 bg-white/95 backdrop-blur shadow-md">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Fish className="w-8 h-8 text-[#00796b]" />
              <h1 className="text-[#00796b]">AgriSpark</h1>
            </div>
            <p className="mb-2">Fresh seafood direct from Pampanga aquafarmers.</p>
            <p className="text-sm text-gray-600">Fair prices. Fresh harvest. Delivered fast.</p>
          </CardContent>
        </Card>

        {/* Auth Buttons */}
        <div className="flex gap-3 mb-6">
          <Button 
            onClick={onShowSignIn}
            className="flex-1 bg-[#00796b] hover:bg-[#004d40] active:bg-[#004d40] h-12"
          >
            Sign In
          </Button>
          <Button 
            onClick={onShowSignUp}
            className="flex-1 bg-white/95 hover:bg-white text-[#00796b] border-2 border-[#00796b] h-12"
          >
            Create Account
          </Button>
        </div>

        {/* Aquafarmers Near You */}
        <h3 className="text-[#00796b] mb-4">Aquafarmers Near You</h3>
        <div className="space-y-3 mb-6">
          {mockFarms.map(farm => (
            <Card 
              key={farm.id}
              className="bg-white/95 backdrop-blur shadow-md active:scale-98 transition-transform cursor-pointer"
              onClick={onShowSignIn}
            >
              <CardContent className="p-0">
                <ImageWithFallback
                  src={farm.heroImage} 
                  alt={farm.name}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <div className="p-3">
                  <h4 className="mb-1">{farm.name}</h4>
                  <div className="flex items-center gap-2 text-sm mb-1">
                    <div className="flex items-center gap-1 text-[#ff9800]">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{farm.rating}</span>
                    </div>
                    <span className="text-gray-600">|</span>
                    <span className="text-gray-600">{farm.harvestInfo}</span>
                    <span className="text-gray-600">|</span>
                    <span className="text-gray-600">₱{farm.deliveryFee} delivery</span>
                  </div>
                  <p className="text-sm text-gray-600">{farm.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info */}
        <Card className="bg-white/95 backdrop-blur shadow-md">
          <CardContent className="p-4">
            <h4 className="text-[#00796b] mb-2">💼 How AgriSpark Works</h4>
            <p className="text-sm text-gray-600 mb-1">• Fair marketplace: ₱10 per order</p>
            <p className="text-sm text-gray-600 mb-1">• Service fee: ₱30 (FREE for farm pick-up)</p>
            <p className="text-sm text-gray-600">• Direct from farm to your table</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}