import { Fish, ShoppingCart, Store, User } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface RoleSelectionProps {
  username: string;
  onSelectRole: (role: 'buyer' | 'seller' | 'vendor') => void;
  onSignOut: () => void;
}

export default function RoleSelection({ username, onSelectRole, onSignOut }: RoleSelectionProps) {
  return (
    <div className="min-h-screen">
      <div className="max-w-md mx-auto p-4 pb-6">
        {/* Header */}
        <Card className="mb-6 bg-white/95 backdrop-blur shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Fish className="w-8 h-8 text-[#00796b]" />
                <h1 className="text-[#00796b]">AgriSpark</h1>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onSignOut}
                className="text-gray-600"
              >
                Sign Out
              </Button>
            </div>
            <div className="flex items-center gap-2 bg-[#e8f5e8] p-3 rounded-lg">
              <User className="w-5 h-5 text-[#00796b]" />
              <div>
                <p className="text-sm text-gray-600">Welcome back,</p>
                <p className="text-[#00796b]">{username}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Role Selection */}
        <Card className="bg-white/95 backdrop-blur shadow-md">
          <CardContent className="p-4">
            <h3 className="text-[#00796b] mb-3">Select Your Role</h3>
            <div className="space-y-3">
              <button 
                onClick={() => onSelectRole('buyer')}
                className="w-full flex items-center gap-3 p-4 bg-[#e8f5e8] rounded-lg active:scale-98 transition-transform hover:bg-[#d5f0d5]"
              >
                <div className="p-3 bg-[#00796b] rounded-full">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h4>Buyer</h4>
                  <p className="text-sm text-gray-600">Order fresh seafood with delivery</p>
                </div>
              </button>

              <button 
                onClick={() => onSelectRole('seller')}
                className="w-full flex items-center gap-3 p-4 bg-[#e8f5e8] rounded-lg active:scale-98 transition-transform hover:bg-[#d5f0d5]"
              >
                <div className="p-3 bg-[#00796b] rounded-full">
                  <Fish className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h4>Aquafarmer</h4>
                  <p className="text-sm text-gray-600">Sell your harvest and manage inventory</p>
                </div>
              </button>

              <button 
                onClick={() => onSelectRole('vendor')}
                className="w-full flex items-center gap-3 p-4 bg-[#e8f5e8] rounded-lg active:scale-98 transition-transform hover:bg-[#d5f0d5]"
              >
                <div className="p-3 bg-[#00796b] rounded-full">
                  <Store className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h4>Vendor/Reseller</h4>
                  <p className="text-sm text-gray-600">Resell products from partnered farms</p>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 bg-white/95 backdrop-blur shadow-md">
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