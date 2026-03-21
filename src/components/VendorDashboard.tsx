import { useState } from 'react';
import { Fish, Store, TrendingUp, ShoppingBag, User, Home, ShoppingCart, Plus, MapPin, X, Pencil, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { mockProducts } from '../data/mockProducts';
import { Product, VendorProduct } from '../types';
import { toast } from 'sonner@2.0.3';

interface VendorDashboardProps {
  onSignOut: () => void;
}

export default function VendorDashboard({ onSignOut }: VendorDashboardProps) {
  const [currentView, setCurrentView] = useState<'home' | 'inventory'>('home');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [resalePrice, setResalePrice] = useState('');
  const [targetMarket, setTargetMarket] = useState('');
  const [vendorInventory, setVendorInventory] = useState<VendorProduct[]>([]);

  const partneredFarms = [
    'San Fernando Aquafarm',
    'Magalang Prawn Farm',
    'Candaba Swamp Fishery',
    'Apalit Fish Farm'
  ];

  const availableMarkets = [
    'Angeles City Public Market',
    'San Fernando Wet Market',
    'Mabalacat City Market',
    'Mexico Public Market',
    'Guagua Town Market',
    'Arayat Public Market',
    'Magalang Town Market',
    'Masantol Fish Market'
  ];

  const handleAddProduct = (product: Product) => {
    setSelectedProduct(product);
    setResalePrice(Math.round(product.price * 1.15).toString()); // Default 15% markup
    setTargetMarket('');
    setShowAddDialog(true);
  };

  const handleConfirmAdd = () => {
    if (!selectedProduct || !targetMarket) {
      toast.error('Please select a market location');
      return;
    }

    const priceNum = parseFloat(resalePrice);
    if (isNaN(priceNum) || priceNum <= selectedProduct.price) {
      toast.error('Resale price must be higher than farm price');
      return;
    }

    const newVendorProduct: VendorProduct = {
      id: `vendor-${Date.now()}`,
      product: selectedProduct,
      farmPrice: selectedProduct.price,
      resalePrice: priceNum,
      targetMarket: targetMarket,
      addedAt: new Date(),
    };

    setVendorInventory(prev => [...prev, newVendorProduct]);
    setShowAddDialog(false);
    setSelectedProduct(null);
    setResalePrice('');
    setTargetMarket('');
    
    toast.success('Product added to inventory! 🎉', {
      description: `${selectedProduct.name} at ${targetMarket}`
    });
  };

  const handleRemoveProduct = (id: string) => {
    setVendorInventory(prev => prev.filter(item => item.id !== id));
    toast.success('Product removed from inventory');
  };

  const calculateProfit = (vendorProduct: VendorProduct) => {
    return vendorProduct.resalePrice - vendorProduct.farmPrice;
  };

  const calculateProfitMargin = (vendorProduct: VendorProduct) => {
    return ((calculateProfit(vendorProduct) / vendorProduct.farmPrice) * 100).toFixed(1);
  };

  const totalPotentialRevenue = vendorInventory.reduce((sum, item) => sum + item.resalePrice, 0);
  const totalPotentialProfit = vendorInventory.reduce((sum, item) => sum + calculateProfit(item), 0);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10">
        <div className="bg-white/95 backdrop-blur shadow-md max-w-md mx-auto m-3 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Store className="w-6 h-6 text-[#00796b]" />
              <div>
                <h1 className="text-[#00796b]">AgriSpark</h1>
                <p className="text-xs text-gray-600">Vendor Dashboard</p>
              </div>
            </div>
            {currentView === 'home' && (
              <Badge className="bg-[#00796b] text-white">
                {vendorInventory.length} Products
              </Badge>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-3 pb-4">
        {currentView === 'home' ? (
          <>
            {/* Welcome Section */}
            <Card className="mb-4 bg-white/95 backdrop-blur shadow-md">
              <CardContent className="p-4 text-center">
                <h3 className="text-[#00796b] mb-1">Welcome, Local Vendor! 👋</h3>
                <p className="text-sm text-gray-600">
                  Manage your reselling business
                </p>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <Card className="mb-4 bg-white/95 backdrop-blur shadow-md">
              <CardContent className="p-4 bg-[#e8f5e8]">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Inventory</p>
                    <p className="text-xl text-[#00796b]">{vendorInventory.length}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Revenue</p>
                    <p className="text-lg text-[#00796b]">₱{totalPotentialRevenue.toFixed(0)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Profit</p>
                    <p className="text-lg text-green-600">₱{totalPotentialProfit.toFixed(0)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Partnered Farms */}
            <div className="mb-4">
              <h4 className="mb-3 text-[#00796b]">Partnered Aquafarms</h4>
              <div className="space-y-2">
                {partneredFarms.map((farm, index) => (
                  <Card key={index} className="bg-white/95 backdrop-blur shadow-md">
                    <CardContent className="p-3 bg-[#e8f5e8]">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#00796b] rounded-full shrink-0">
                          <Fish className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-sm line-clamp-1">{farm}</h5>
                          <p className="text-xs text-gray-600">Active Partnership</p>
                        </div>
                        <Badge variant="secondary" className="bg-[#a5d6a7] text-[#00796b] text-xs shrink-0">
                          Active
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Available Products from Farms */}
            <div className="mb-4">
              <h4 className="mb-3 text-[#00796b]">Available Products to Resell</h4>
              <div className="grid grid-cols-2 gap-3">
                {mockProducts.slice(0, 6).map(product => (
                  <Card key={product.id} className="overflow-hidden bg-white/95 backdrop-blur shadow-md">
                    <div className="aspect-square overflow-hidden bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-2 bg-[#e8f5e8]">
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <h5 className="text-sm line-clamp-1">{product.name}</h5>
                        <Badge variant="secondary" className="text-xs shrink-0 bg-[#00796b] text-white">{product.category}</Badge>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-1 mb-2">{product.farmName}</p>
                      <div className="space-y-1 text-xs mb-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Farm Price:</span>
                          <span>₱{product.price}/kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Suggested:</span>
                          <span className="text-[#00796b]">₱{Math.round(product.price * 1.15)}/kg</span>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full bg-[#00796b] hover:bg-[#004d40] h-7 text-xs"
                        onClick={() => handleAddProduct(product)}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add to Sell
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Info Card */}
            <Card className="bg-white/95 backdrop-blur shadow-md">
              <CardContent className="p-4 bg-[#f1f8e9]">
                <h5 className="text-sm mb-2 text-[#00796b]">How Vendor Partnership Works</h5>
                <div className="space-y-1 text-xs">
                  <p>✓ Browse products from partnered aquafarms</p>
                  <p>✓ Add products to your reselling inventory</p>
                  <p>✓ Choose which market to sell at</p>
                  <p>✓ Set your own markup prices (10-20% recommended)</p>
                  <p>✓ Collect products directly from farms</p>
                  <p>✓ Manage your own customer sales</p>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          /* Inventory View */
          <>
            <div className="mb-4">
              <h4 className="mb-3 text-[#00796b]">My Inventory ({vendorInventory.length} Products)</h4>
              
              {vendorInventory.length === 0 ? (
                <Card className="bg-white/95 backdrop-blur shadow-md">
                  <CardContent className="p-8 text-center">
                    <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 mb-2">No products in inventory</p>
                    <p className="text-sm text-gray-500 mb-4">Add products from the home tab to start selling</p>
                    <Button 
                      onClick={() => setCurrentView('home')}
                      className="bg-[#00796b] hover:bg-[#004d40]"
                    >
                      Browse Products
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {vendorInventory.map(item => (
                    <Card key={item.id} className="bg-white/95 backdrop-blur shadow-md">
                      <CardContent className="p-0">
                        <div className="flex gap-3 p-3">
                          <div className="w-20 h-20 overflow-hidden bg-gray-100 rounded-lg shrink-0">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h5 className="text-sm line-clamp-1">{item.product.name}</h5>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-red-600 hover:bg-red-50 shrink-0"
                                onClick={() => handleRemoveProduct(item.id)}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                            <div className="flex items-center gap-1 mb-2">
                              <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                              <span className="text-xs text-gray-600 line-clamp-1">{item.targetMarket}</span>
                            </div>
                            <div className="bg-[#e8f5e8] rounded p-2 space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-600">Farm Price:</span>
                                <span>₱{item.farmPrice.toFixed(2)}/kg</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-600">Your Price:</span>
                                <span className="text-[#00796b]">₱{item.resalePrice.toFixed(2)}/kg</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-600">Profit:</span>
                                <span className="text-green-600">
                                  ₱{calculateProfit(item).toFixed(2)} ({calculateProfitMargin(item)}%)
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Add Product Dialog */}
      {showAddDialog && selectedProduct && (
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="max-w-[90%] rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-[#00796b]">Add Product to Inventory</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Product Info */}
              <div className="flex gap-3 bg-[#e8f5e8] p-3 rounded-lg">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <h5 className="text-sm mb-1">{selectedProduct.name}</h5>
                  <p className="text-xs text-gray-600 mb-1">{selectedProduct.farmName}</p>
                  <p className="text-xs text-[#00796b]">Farm Price: ₱{selectedProduct.price}/kg</p>
                </div>
              </div>

              {/* Market Selection */}
              <div className="space-y-2">
                <Label htmlFor="market">Select Market Location *</Label>
                <Select value={targetMarket} onValueChange={setTargetMarket}>
                  <SelectTrigger id="market" className="bg-[#f1f8e9] border-[#00796b]/20">
                    <SelectValue placeholder="Choose where to sell..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableMarkets.map(market => (
                      <SelectItem key={market} value={market}>
                        {market}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Resale Price */}
              <div className="space-y-2">
                <Label htmlFor="price">Your Resale Price (₱/kg) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min={selectedProduct.price}
                  value={resalePrice}
                  onChange={(e) => setResalePrice(e.target.value)}
                  className="bg-[#f1f8e9] border-[#00796b]/20"
                  placeholder="Enter your selling price"
                />
                {resalePrice && parseFloat(resalePrice) > selectedProduct.price && (
                  <div className="bg-green-50 border border-green-200 rounded p-2 text-xs">
                    <p className="text-green-700">
                      Profit: ₱{(parseFloat(resalePrice) - selectedProduct.price).toFixed(2)}/kg 
                      ({(((parseFloat(resalePrice) - selectedProduct.price) / selectedProduct.price) * 100).toFixed(1)}% margin)
                    </p>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => setShowAddDialog(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmAdd}
                className="flex-1 bg-[#00796b] hover:bg-[#004d40]"
              >
                Add to Inventory
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-20">
        <div className="max-w-md mx-auto m-3">
          <div className="bg-white/95 backdrop-blur shadow-lg rounded-xl">
            <div className="grid grid-cols-3 h-16">
              <button 
                className={`flex flex-col items-center justify-center gap-1 ${
                  currentView === 'home' ? 'text-[#00796b]' : 'text-gray-600'
                }`}
                onClick={() => setCurrentView('home')}
              >
                <Home className="w-5 h-5" />
                <span className="text-xs">Home</span>
              </button>
              <button 
                className={`flex flex-col items-center justify-center gap-1 relative ${
                  currentView === 'inventory' ? 'text-[#00796b]' : 'text-gray-600'
                }`}
                onClick={() => setCurrentView('inventory')}
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="text-xs">Inventory</span>
                {vendorInventory.length > 0 && (
                  <Badge className="absolute top-2 right-1/4 bg-[#ff9800] text-white rounded-full w-5 h-5 flex items-center justify-center p-0 text-xs">
                    {vendorInventory.length}
                  </Badge>
                )}
              </button>
              <button 
                className="flex flex-col items-center justify-center gap-1 text-gray-600"
                onClick={onSignOut}
              >
                <User className="w-5 h-5" />
                <span className="text-xs">Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
