import { useState } from 'react';
import { Star, X } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Order, Review } from '../types';
import { toast } from 'sonner@2.0.3';

interface RatingFeedbackProps {
  order: Order;
  onClose: () => void;
  onSubmitReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
}

export default function RatingFeedback({ order, onClose, onSubmitReview }: RatingFeedbackProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [query, setQuery] = useState('');

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    if (feedback.trim() === '') {
      toast.error('Please write your feedback');
      return;
    }

    const review = {
      orderId: order.id,
      rating,
      feedback: feedback.trim(),
      query: query.trim() || undefined,
    };

    onSubmitReview(review);
    toast.success('Thank you for your feedback! 🌟', {
      description: 'Your review helps us improve our service.'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 p-3 flex items-end">
      <div className="bg-white/95 backdrop-blur w-full max-h-[90vh] overflow-y-auto rounded-t-2xl shadow-xl animate-slide-up">
        <Card className="rounded-none border-0 bg-transparent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 pt-4 px-4 border-b">
            <CardTitle className="text-[#00796b]">Rate Your Order</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 hover:bg-gray-100">
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>

          <CardContent className="px-4 py-4 space-y-5">
            {/* Order Summary */}
            <div className="bg-[#e8f5e8] p-3 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Order ID</span>
                <span className="text-sm">#{order.id.substring(0, 8)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Items</span>
                <span className="text-sm">{order.items.length} item(s)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total</span>
                <span className="text-sm text-[#00796b]">₱{order.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Star Rating */}
            <div className="space-y-2">
              <Label className="text-[#00796b]">How was your experience?</Label>
              <div className="flex justify-center gap-2 py-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform active:scale-95"
                  >
                    <Star
                      className={`w-10 h-10 transition-colors ${
                        star <= (hoveredRating || rating)
                          ? 'fill-[#ffa500] text-[#ffa500]'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-center text-sm text-gray-600">
                  {rating === 1 && 'Poor'}
                  {rating === 2 && 'Fair'}
                  {rating === 3 && 'Good'}
                  {rating === 4 && 'Very Good'}
                  {rating === 5 && 'Excellent'}
                </p>
              )}
            </div>

            {/* Feedback */}
            <div className="space-y-2">
              <Label htmlFor="feedback" className="text-[#00796b]">
                Share your feedback <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="feedback"
                placeholder="Tell us about your experience with the seafood quality, delivery, and overall service..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-24 bg-[#f1f8e9] border-gray-300 resize-none"
              />
            </div>

            {/* Query/Concern */}
            <div className="space-y-2">
              <Label htmlFor="query" className="text-[#00796b]">
                Any questions or concerns? (Optional)
              </Label>
              <Textarea
                id="query"
                placeholder="Let us know if you have any questions about your order or need assistance..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="min-h-20 bg-[#f1f8e9] border-gray-300 resize-none"
              />
            </div>
          </CardContent>

          <CardFooter className="border-t pt-3 pb-4 px-4 sticky bottom-0 bg-white/95 backdrop-blur">
            <Button
              className="w-full bg-[#00796b] hover:bg-[#004d40] active:bg-[#004d40] h-12"
              onClick={handleSubmit}
            >
              Submit Review
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
