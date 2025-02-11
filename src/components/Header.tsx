import React, { useState, useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import CartDropdown from './CartDropdown';
import { useLocation } from 'react-router-dom';
import SearchDropdown from './SearchDropdown';
import AuthDropdown from './AuthDropdown';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { cartCount } = useCart();
  const cartRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const authRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (authRef.current && !authRef.current.contains(event.target as Node)) {
        setIsAuthOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Adjust this value based on your header height
      window.scrollTo({
        top: element.offsetTop - offset,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between">
            {/* Hamburger Menu */}
            <div 
              className="lg:hidden cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>

            {/* Logo */}
            <div className="text-2xl font-bold text-black">
              <a href="/" className="hover:text-gray-700">PHONE</a>
            </div>

            {/* Navigation Menu */}
            <div className={`lg:flex ${isMenuOpen ? 'block' : 'hidden'} absolute lg:relative top-16 lg:top-0 left-0 w-full lg:w-auto bg-white lg:bg-transparent`}>
              <ul className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-8 p-4 lg:p-0">
                <li>
                  <a href="/" className="text-black hover:text-gray-700 cursor-pointer">Home</a>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('latest')}
                    className="text-black hover:text-gray-700 cursor-pointer"
                  >
                    Products
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('phone-news')}
                    className="text-black hover:text-gray-700 cursor-pointer"
                  >
                    Blog
                  </button>
                </li>
                <li>
                  <button 
                    className="text-black hover:text-gray-700 cursor-pointer"
                    onClick={() => alert('Contact page coming soon')}
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-6">
              <div ref={authRef} className="relative">
                <button
                  onClick={() => setIsAuthOpen(!isAuthOpen)}
                  className="text-black hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                <AuthDropdown 
                  isOpen={isAuthOpen} 
                  onClose={() => setIsAuthOpen(false)} 
                />
              </div>
              <div ref={searchRef} className="relative">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="text-black hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                <SearchDropdown 
                  isOpen={isSearchOpen} 
                  onClose={() => setIsSearchOpen(false)} 
                />
              </div>
              <div ref={cartRef} className="relative">
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="text-black hover:text-gray-700 relative"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                </button>
                <CartDropdown isOpen={isCartOpen} />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;