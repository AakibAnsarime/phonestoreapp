import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  category: string;
}

const LatestProducts: React.FC = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const cardVariants = {
    offscreen: {
      y: -50,
      opacity: 0,
      transition: {
        ease: [0.25, 0.1, 0.25, 1],
        duration: 0.8
      }
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        ease: [0.25, 0.1, 0.25, 1],
        duration: 0.8
      }
    },
    exit: {
      y: -50,
      opacity: 0,
      transition: {
        ease: [0.25, 0.1, 0.25, 1],
        duration: 0.8
      }
    }
  };

  useEffect(() => {
    fetch('/data/latestProducts.json')

      .then(response => response.json())
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  // Update the auto-scroll effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoScroll && products.length > 0) {
      interval = setInterval(() => {
        if (sliderRef.current) {
          const nextIndex = (currentIndex + 1) % products.length;
          setCurrentIndex(nextIndex);
          
          // Smoother scroll transition
          sliderRef.current.style.scrollBehavior = 'smooth';
          sliderRef.current.style.transition = 'all 2s cubic-bezier(0.4, 0, 0.2, 1)';
          
          sliderRef.current.scrollTo({
            left: nextIndex * 280,
            behavior: 'smooth'
          });
        }
      }, 7000); // Increased to 7 seconds for better viewing time
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [autoScroll, currentIndex, products.length]);

  // Add smooth scroll styles
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.scrollBehavior = 'smooth';
      sliderRef.current.style.transition = 'all 2s cubic-bezier(0.4, 0, 0.2, 1)';
    }
  }, []);

  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    if (sliderRef.current) {
      setStartX(e.pageX - sliderRef.current.offsetLeft);
      setScrollLeft(sliderRef.current.scrollLeft);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    if (sliderRef.current) {
      const x = e.pageX - sliderRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      sliderRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseEnter = () => {
    setAutoScroll(false);
  };

  const handleMouseLeave = () => {
    setAutoScroll(true);
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <section className="section py-8" id="latest">
      <div className="container mx-auto px-4">
        <div className="h-14 text-center mb-8 bg-gray-100 py-3">
          <div className="flex items-center justify-center space-x-3">
            <span className="w-3 h-3 bg-black"></span>
            <h1 className="text-xl">Latest Products</h1>
          </div>
        </div>

        <div 
          ref={sliderRef}
          className="flex overflow-x-auto gap-6 pb-4 cursor-grab select-none scrollbar-hide"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            transition: 'all 2s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseEnter={handleMouseEnter}
          onMouseOut={handleMouseLeave}
        >
          {products.map((product, index) => (
            <motion.div 
              key={product.id} 
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              exit="exit"
              viewport={{ 
                once: false, 
                amount: 0.5,
                margin: "100px 0px 0px 0px"
              }}
              transition={{ delay: index * 0.1 }}
              className="flex-none w-[280px] product bg-white rounded-lg shadow-md p-4 relative group"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="relative h-[200px]">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center">
                  <div className="flex items-center justify-center gap-3">
                    <button className="p-2 bg-red-500 shadow hover:bg-red-600 transform hover:scale-110 transition-all">
                      👁️
                    </button>
                    <button className="p-2 bg-red-500 shadow hover:bg-red-600 transform hover:scale-110 transition-all">
                      ❤️
                    </button>
                    <button className="p-2 bg-red-500 shadow hover:bg-red-600 transform hover:scale-110 transition-all">
                      🔄
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <div className="flex justify-center my-2">
                  {renderStars(product.rating)}
                </div>
                <div className="text-xl font-bold">${product.price}</div>
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="mt-2 w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors"
                >
                  Add To Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Add navigation dots */}
        <div className="flex justify-center gap-2 mt-8">
          {products.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-opacity
                ${index === currentIndex ? 'bg-black' : 'bg-gray-300'}`}
              onClick={() => {
                setCurrentIndex(index);
                if (sliderRef.current) {
                  sliderRef.current.scrollTo({
                    left: index * 280,
                    behavior: 'smooth'
                  });
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestProducts;
