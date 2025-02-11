import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CheckoutPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [includeShipping, setIncludeShipping] = useState(false);
  const shippingCost = 7;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + (includeShipping ? shippingCost : 0);

  return (
    <section className="pb-8 pt-24">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cartItems.map(item => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img className="h-16 w-16 object-contain" src={item.image} alt={item.name} />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${item.price}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          className="w-20 px-2 py-1 border rounded"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mt-6 space-y-4 md:space-y-0">
              <div className="continue-shopping">
                <Link to="/" className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors">
                  Continue Shopping
                </Link>
              </div>
              <div className="shipping-check flex items-center space-x-2">
                <input 
                  type="checkbox"
                  checked={includeShipping}
                  onChange={(e) => setIncludeShipping(e.target.checked)}
                  className="form-checkbox h-4 w-4 text-black rounded border-gray-300"
                />
                <span className="text-gray-700">Shipping (+${shippingCost})</span>
              </div>
            </div>

            <div className="mt-8 border-t pt-8">
              <div className="max-w-md ml-auto">
                <h3 className="text-xl font-bold mb-4">Cart Totals</h3>
                <ul className="space-y-2 mb-4">
                  <li className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-bold">${subtotal.toFixed(2)}</span>
                  </li>
                  {includeShipping && (
                    <li className="flex justify-between">
                      <span>Shipping:</span>
                      <span className="font-bold">${shippingCost.toFixed(2)}</span>
                    </li>
                  )}
                  <li className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </li>
                </ul>
                <button 
                  className="block w-full bg-black text-white text-center px-6 py-3 rounded hover:bg-gray-800 transition-colors"
                  onClick={() => alert('Checkout functionality to be implemented')}
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
