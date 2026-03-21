import { useState } from 'react';
import { Package, Star, MapPin, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Order } from '../types';
import RatingFeedback from './RatingFeedback';

interface OrdersProps {
  orders: Order[];
  onSubmitReview: (orderId: string, review: any) => void;
}

export default function Orders({ orders, onSubmitReview }: OrdersProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleReviewSubmit = (review: any) => {
    if (selectedOrder) {
      onSubmitReview(selectedOrder.id, review);
      setSelectedOrder(null);
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'confirmed':
        return 'bg-blue-500';
      case 'delivered':
        return 'bg-green-600';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'confirmed':
        return 'Confirmed';
      case 'delivered':
        return 'Delivered';
      default:
        return status;
    }
  };

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <Package className="w-16 h-16 text-gray-300 mb-3" />
        <h3 className="text-gray-600 mb-1">No orders yet</h3>
        <p className="text-sm text-gray-500 text-center">
          Your order history will appear here
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3 pb-4">
        {orders.map((order) => {
          const orderDate = new Date(order.createdAt);
          const formattedDate = orderDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          });
          const formattedTime = orderDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
          });

          return (
            <Card key={order.id} className="overflow-hidden bg-white/95 backdrop-blur shadow-md">
              <CardContent className="p-4 space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Order #{order.id.substring(0, 8)}</span>
                      <Badge className={`${getStatusColor(order.status)} text-white px-2 py-0.5 text-xs`}>
                        {getStatusText(order.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{formattedDate} at {formattedTime}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[#00796b]">₱{order.total.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">{order.items.length} item(s)</p>
                  </div>
                </div>

                {/* Items Preview */}
                <div className="space-y-2">
                  {order.items.slice(0, 2).map((item) => (
                    <div key={item.product.id} className="flex gap-2 items-center">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm line-clamp-1">{item.product.name}</p>
                        <p className="text-xs text-gray-600">{item.quantity}kg × ₱{item.product.price}</p>
                      </div>
                      <span className="text-sm text-gray-700">₱{(item.quantity * item.product.price).toFixed(2)}</span>
                    </div>
                  ))}
                  {order.items.length > 2 && (
                    <p className="text-xs text-gray-500 pl-14">
                      +{order.items.length - 2} more item(s)
                    </p>
                  )}
                </div>

                {/* Delivery Info */}
                <div className="space-y-1 pt-1">
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <MapPin className="w-3 h-3" />
                    <span>
                      {order.deliveryOption === 'delivery' ? 'Home Delivery' : 'Farm Pick-up'}
                    </span>
                  </div>
                  {order.deliveryAddress && (
                    <div className="pl-4 text-xs text-gray-600 bg-[#e8f5e8] p-2 rounded">
                      <p className="line-clamp-2">{order.deliveryAddress}</p>
                    </div>
                  )}
                </div>

                {/* Rate Order Button */}
                {order.status === 'delivered' && !order.hasReview && (
                  <Button
                    variant="outline"
                    className="w-full border-[#00796b] text-[#00796b] hover:bg-[#e8f5e8]"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Rate & Review Order
                  </Button>
                )}

                {order.hasReview && (
                  <div className="text-center py-2 bg-[#e8f5e8] rounded-lg">
                    <p className="text-xs text-[#00796b]">✓ You've reviewed this order</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Rating Dialog */}
      {selectedOrder && (
        <RatingFeedback
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onSubmitReview={handleReviewSubmit}
        />
      )}
    </>
  );
}