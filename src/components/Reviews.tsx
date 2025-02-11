import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Review {
  id: number;
  name: string;
  comment: string;
  photo: string;
  rating: number;
}

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoSwitch, setAutoSwitch] = useState(true);

  useEffect(() => {
    fetch('/data/reviews.json')

      .then(response => response.json())
      .then(data => {
        setReviews(data.reviews);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load reviews');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoSwitch && reviews.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
      }, 5000); // Switch every 5 seconds
    }
    return () => clearInterval(interval);
  }, [autoSwitch, reviews.length]);

  if (loading) return (
    <div className="py-20 text-center text-white">
      <div className="container mx-auto px-4">Loading reviews...</div>
    </div>
  );

  if (error) return (
    <div className="py-20 text-center text-red-500">
      <div className="container mx-auto px-4">{error}</div>
    </div>
  );

  const currentReview = reviews[currentIndex];

  return (
    <section 
      className="py-20 bg-cover bg-center relative overflow-hidden min-h-[500px]" 
      id="reviews"
      style={{ backgroundImage: 'url("/images/review-bg.jpg")' }}
      onMouseEnter={() => setAutoSwitch(false)}
      onMouseLeave={() => setAutoSwitch(true)}
    >
      <div className="absolute inset-0 bg-black opacity-80"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold mb-12 text-white text-center">
          What Our Customers Say
        </h2>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 mb-6 rounded-full overflow-hidden border-2 border-white">
                <img 
                  src={currentReview.photo}
                  alt={currentReview.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-white text-lg mb-6 italic leading-relaxed">
                "{currentReview.comment}"
              </p>
              <h3 className="font-semibold text-white text-xl">
                {currentReview.name}
              </h3>
              <div className="text-yellow-400 mt-2">
                {'★'.repeat(currentReview.rating)}
                {'☆'.repeat(5 - currentReview.rating)}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300
                ${index === currentIndex ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/75'}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
