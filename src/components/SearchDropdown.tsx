import React, { useState, useEffect } from 'react';

interface SearchDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/data/latestProducts.json')

      .then(response => response.json())
      .then(data => setProducts(data.products));
  }, []);

  useEffect(() => {
    const results = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50" onClick={onClose}>
      <div className="p-4" onClick={(e) => e.stopPropagation()}>
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            autoFocus
          />
        </div>
        
        <div className="mt-4 max-h-96 overflow-y-auto">
          {searchTerm && filteredProducts.map(product => (
            <div key={product.id} className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
              <img src={product.image} alt={product.name} className="w-12 h-12 object-contain" />
              <div>
                <h4 className="text-sm font-medium">{product.name}</h4>
                <span className="text-sm text-gray-600">${product.price}</span>
              </div>
            </div>
          ))}
          {searchTerm && filteredProducts.length === 0 && (
            <p className="text-gray-500 text-center py-4">No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchDropdown;
