import { useState } from 'react';
import { ShoppingCart, Search, MapPin, Fish, Home, User, Star, Package, Store } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Product, CartItem, Order, Review } from '../types';
import { mockProducts } from '../data/mockProducts';
import Cart from './Cart';
import Orders from './Orders';
import { AquafarmersNearYou } from './AquafarmersNearYou';

interface BuyerDashboardProps {
  onSignOut: () => void;
}

export default function BuyerDashboard({ onSignOut }: BuyerDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'farms' | 'orders'>('home');
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const handleOrderPlaced = (order: Order) => {
    setOrders(prevOrders => [order, ...prevOrders]);
  };

  const handleSubmitReview = (orderId: string, review: Omit<Review, 'id' | 'createdAt'>) => {
    const newReview: Review = {
      ...review,
      id: `review-${Date.now()}`,
      createdAt: new Date(),
    };
    
    setReviews(prevReviews => [...prevReviews, newReview]);
    
    // Mark order as reviewed
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, hasReview: true } : order
      )
    );
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10">
        <div className="bg-white/95 backdrop-blur shadow-md max-w-md mx-auto m-3 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Fish className="w-6 h-6 text-[#00796b]" />
              <h1 className="text-[#00796b]">AgriSpark</h1>
            </div>
            <button
              className="relative p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setShowCart(true)}
            >
              <ShoppingCart className="w-6 h-6 text-[#00796b]" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-[#ff9800] text-white rounded-full w-5 h-5 flex items-center justify-center p-0 text-xs">
                  {cartItemCount}
                </Badge>
              )}
            </button>
          </div>

          {/* Search Bar - Only show on home view */}
          {currentView === 'home' && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search seafood..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#f1f8e9] border-none"
              />
            </div>
          )}
        </div>
      </header>

      {/* Category Tabs - Only show on home view */}
      {currentView === 'home' && (
        <div className="max-w-md mx-auto px-3 mb-4">
          <Tabs value={categoryFilter} onValueChange={setCategoryFilter} className="w-full">
            <TabsList className="w-full justify-start bg-white/95 backdrop-blur rounded-lg p-1">
              <TabsTrigger value="all" className="flex-1 data-[state=active]:bg-[#00796b] data-[state=active]:text-white">
                All
              </TabsTrigger>
              <TabsTrigger value="Fish" className="flex-1 data-[state=active]:bg-[#00796b] data-[state=active]:text-white">
                Fish
              </TabsTrigger>
              <TabsTrigger value="Shellfish" className="flex-1 data-[state=active]:bg-[#00796b] data-[state=active]:text-white">
                Shellfish
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-md mx-auto px-3 pb-4">
        {currentView === 'home' ? (
          /* Products Grid */
          <div className="space-y-3">
            {filteredProducts.map(product => (
              <Card key={product.id} className="overflow-hidden active:scale-98 transition-transform bg-white/95 backdrop-blur shadow-md">
                <CardContent className="p-0">
                  <div className="flex gap-3 p-3">
                    <div className="w-24 h-24 overflow-hidden bg-gray-100 rounded-lg shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm mb-1 line-clamp-1">{product.name}</h4>
                      <div className="flex items-center gap-1 mb-1">
                        <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                        <span className="text-xs text-gray-600 line-clamp-1">{product.farmName}</span>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-2 mb-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[#00796b]">₱{product.price}</span>
                          <span className="text-xs text-gray-500">/kg</span>
                        </div>
                        <Button
                          size="sm"
                          className="bg-[#00796b] hover:bg-[#004d40] h-7 text-xs px-3"
                          onClick={() => addToCart(product)}
                        >
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredProducts.length === 0 && (
              <div className="text-center py-12 col-span-2">
                <p className="text-sm text-gray-500">No products found</p>
              </div>
            )}
          </div>
        ) : currentView === 'farms' ? (
          /* Aquafarmers Near You View */
          <AquafarmersNearYou />
        ) : (
          /* Orders View */
          <Orders orders={orders} onSubmitReview={handleSubmitReview} />
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-20">
        <div className="max-w-md mx-auto m-3">
          <div className="bg-white/95 backdrop-blur shadow-lg rounded-xl">
            <div className="grid grid-cols-4 h-16">
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
                className={`flex flex-col items-center justify-center gap-1 ${
                  currentView === 'farms' ? 'text-[#00796b]' : 'text-gray-600'
                }`}
                onClick={() => setCurrentView('farms')}
              >
                <Store className="w-5 h-5" />
                <span className="text-xs">Farms</span>
              </button>
              <button 
                className={`flex flex-col items-center justify-center gap-1 relative ${
                  currentView === 'orders' ? 'text-[#00796b]' : 'text-gray-600'
                }`}
                onClick={() => setCurrentView('orders')}
              >
                <Package className="w-5 h-5" />
                <span className="text-xs">Orders</span>
                {orders.filter(o => o.status === 'delivered' && !o.hasReview).length > 0 && (
                  <Badge className="absolute top-2 right-1/2 translate-x-3 bg-red-500 text-white rounded-full w-2 h-2 flex items-center justify-center p-0" />
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

      {/* Cart Drawer */}
      {showCart && (
        <Cart
          cart={cart}
          setCart={setCart}
          onClose={() => setShowCart(false)}
          onOrderPlaced={handleOrderPlaced}
        />
      )}
    </div>
  );
}