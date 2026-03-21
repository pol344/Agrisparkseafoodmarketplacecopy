import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { CartItem, Order } from '../types';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface CartProps {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  onClose: () => void;
  onOrderPlaced: (order: Order) => void;
}

export default function Cart({ cart, setCart, onClose, onOrderPlaced }: CartProps) {
  const [deliveryOption, setDeliveryOption] = useState<'pickup' | 'delivery'>('delivery');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const updateQuantity = (productId: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.product.id === productId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (productId: string) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const serviceFee = deliveryOption === 'pickup' ? 0 : 30; // No service fee for farm pick-up
  const commission = 10; // Flat ₱10 commission per order
  const total = subtotal + serviceFee + commission;

  const handleCheckout = () => {
    // Validate delivery address and phone number if delivery option is selected
    if (deliveryOption === 'delivery' && !deliveryAddress.trim()) {
      toast.error('Please enter your delivery address');
      return;
    }

    if (deliveryOption === 'delivery' && !phoneNumber.trim()) {
      toast.error('Please enter your contact number');
      return;
    }

    const order: Order = {
      id: `order-${Date.now()}`,
      items: [...cart],
      total: total,
      serviceFee: serviceFee,
      deliveryOption: deliveryOption,
      deliveryAddress: deliveryOption === 'delivery' ? deliveryAddress : undefined,
      phoneNumber: deliveryOption === 'delivery' ? phoneNumber : undefined,
      status: 'delivered', // Set to delivered so users can rate it immediately for demo purposes
      createdAt: new Date(),
      hasReview: false,
    };
    
    onOrderPlaced(order);
    
    toast.success('Order placed successfully! 🎉', {
      description: deliveryOption === 'delivery' 
        ? 'Your fresh seafood will be delivered soon.' 
        : 'Pick up your order at the farm.'
    });
    setCart([]);
    setDeliveryAddress('');
    setPhoneNumber('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 p-3">
      <div className="bg-white/95 backdrop-blur w-full h-full overflow-y-auto rounded-xl shadow-xl">
        <Card className="rounded-none border-0 h-full flex flex-col bg-transparent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 pt-3 px-4 sticky top-0 bg-white/95 backdrop-blur z-10 border-b">
            <CardTitle className="text-[#00796b]">Your Cart ({cart.length})</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 hover:bg-gray-100">
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto px-4 py-4">
            {cart.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>Your cart is empty</p>
                <p className="text-sm mt-2">Add some fresh seafood to get started!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map(item => (
                  <div key={item.product.id} className="flex gap-3 bg-[#e8f5e8] rounded-lg p-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm line-clamp-1 mb-0.5">{item.product.name}</h4>
                      <p className="text-xs text-gray-600 mb-2">₱{item.product.price}/kg</p>
                      <div className="flex items-center gap-1.5">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 border-[#00796b] text-[#00796b]"
                          onClick={() => updateQuantity(item.product.id, -1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm w-10 text-center">{item.quantity} kg</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 border-[#00796b] text-[#00796b]"
                          onClick={() => updateQuantity(item.product.id, 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 ml-auto text-red-600 hover:bg-red-50"
                          onClick={() => removeItem(item.product.id)}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm text-[#00796b]">₱{item.product.price * item.quantity}</p>
                    </div>
                  </div>
                ))}

                <Separator />

                {/* Delivery Options */}
                <div className="space-y-2">
                  <h4 className="text-sm text-[#00796b]">Delivery Option</h4>
                  <RadioGroup value={deliveryOption} onValueChange={(value: 'pickup' | 'delivery') => setDeliveryOption(value)}>
                    <div className="flex items-center space-x-2 bg-[#e8f5e8] rounded-lg p-2.5">
                      <RadioGroupItem value="delivery" id="delivery" className="border-[#00796b] text-[#00796b]" />
                      <Label htmlFor="delivery" className="flex-1 cursor-pointer">
                        <div>
                          <p className="text-sm">Home Delivery</p>
                          <p className="text-xs text-gray-600">Fast delivery to your doorstep</p>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 bg-[#e8f5e8] rounded-lg p-2.5">
                      <RadioGroupItem value="pickup" id="pickup" className="border-[#00796b] text-[#00796b]" />
                      <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                        <div>
                          <p className="text-sm">Farm Pick-up</p>
                          <p className="text-xs text-gray-600">Collect from the farm</p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Delivery Address - Only show for home delivery */}
                {deliveryOption === 'delivery' && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-sm text-[#00796b]">
                        Delivery Address *
                      </Label>
                      <Textarea
                        id="address"
                        placeholder="Enter your complete delivery address (Street, Barangay, City, Pampanga)"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="bg-[#f1f8e9] border-[#00796b]/20 min-h-[80px] resize-none"
                      />
                      <p className="text-xs text-gray-500">Please provide a detailed address for accurate delivery</p>
                    </div>
                  </>
                )}

                {/* Contact Number - Only show for home delivery */}
                {deliveryOption === 'delivery' && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm text-[#00796b]">
                        Contact Number *
                      </Label>
                      <Input
                        id="phone"
                        placeholder="Enter your contact number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="bg-[#f1f8e9] border-[#00796b]/20"
                      />
                      <p className="text-xs text-gray-500">Please provide a contact number for delivery confirmation</p>
                    </div>
                  </>
                )}

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2 bg-[#f1f8e9] p-3 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₱{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Service Fee</span>
                    <span className={deliveryOption === 'pickup' ? 'text-green-600' : ''}>
                      {deliveryOption === 'pickup' ? 'FREE' : `₱${serviceFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Platform Fee</span>
                    <span>₱{commission.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span className="text-xl text-[#00796b]">₱{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          {cart.length > 0 && (
            <CardFooter className="border-t pt-3 pb-3 px-4 sticky bottom-0 bg-white/95 backdrop-blur">
              <Button
                className="w-full bg-[#00796b] hover:bg-[#004d40] active:bg-[#004d40] h-12"
                onClick={handleCheckout}
              >
                Place Order - ₱{total.toFixed(2)}
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}