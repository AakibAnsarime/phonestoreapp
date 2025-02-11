import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Collection: React.FC = () => {
  const cardVariants = {
    offscreen: {
      y: -50,
      opacity: 0,
      transition: {
        ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier easing
        duration: 0.8 // Increased duration
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

  return (
    <section id="collection" className="section py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* First Card */}
          <motion.div 
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            exit="exit"
            viewport={{ 
              once: false, 
              amount: 0.5,  // Increased sensitivity
              margin: "100px 0px 0px 0px" // Only add margin at top
            }}
            className="flex items-center bg-gray-50 rounded-lg overflow-hidden shadow-md"
          >
            <div className="w-[70%] p-8 px-6">
              <div className="space-y-4">
                <span className="text-gray-600">New Colors Introduced</span>
                <h1 className="text-3xl font-bold">HEADPHONES</h1>
                <Link to="/shop" className="inline-block text-black hover:text-gray-700">
                  SHOP NOW
                </Link>
              </div>
            </div>
            <div className="w-[30%] py-6 pr-6">
              <div className="h-[180px] flex items-center justify-center">
                <img 
                  src="/images/collection_02.png" 
                  alt="Headphones" 
                  className="w-[85%] h-auto object-contain"
                />
              </div>
            </div>
          </motion.div>

          {/* Second Card */}
          <motion.div 
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            exit="exit"
            viewport={{ 
              once: false, 
              amount: 0.5,
              margin: "100px 0px 0px 0px"
            }}
            transition={{ delay: 0.1 }}
            className="flex items-center bg-gray-50 rounded-lg overflow-hidden shadow-md"
          >
            <div className="w-[70%] p-8 px-6">
              <div className="space-y-4">
                <span className="text-gray-600">Phone Device Presets</span>
                <h1 className="text-3xl font-bold">SMARTPHONES</h1>
                <Link to="/shop" className="inline-block text-black hover:text-gray-700">
                  SHOP NOW
                </Link>
              </div>
            </div>
            <div className="w-[30%] py-6 pr-6">
              <div className="h-[180px] flex items-center justify-center">
                <img 
                  src="/images/collection_01.png" 
                  alt="Smartphones" 
                  className="w-[85%] h-auto object-contain"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Collection;
