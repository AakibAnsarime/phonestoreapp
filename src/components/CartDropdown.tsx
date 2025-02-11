import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

interface CartDropdownProps {
  isOpen: boolean;
}

const CartDropdown: React.FC<CartDropdownProps> = ({ isOpen }) => {
  const { cartItems, removeFromCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50">
      <div className="p-3">
        <h3 className="text-base font-semibold mb-2">Shopping Cart</h3>
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-sm">Your cart is empty</p>
        ) : (
          <>
            <div className="max-h-64 overflow-y-auto">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-2 py-2 border-b">
                  <img src={item.image} alt={item.name} className="w-8 h-8 object-contain" />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-medium truncate">{item.name}</h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-600">
                        {item.quantity} × ${item.price}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 text-xs px-1"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-2 border-t">
              <div className="flex justify-between mb-2 text-sm">
                <span className="font-semibold">Total:</span>
                <span className="font-semibold">
                  ${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                </span>
              </div>
              <Link 
                to="/checkout" 
                className="w-full bg-black text-white py-1.5 rounded text-sm hover:bg-gray-800 transition-colors text-center block"
              >
                Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDropdown;
