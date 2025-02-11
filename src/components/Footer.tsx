import type { FC } from 'react';
import { Link } from 'react-router-dom';

const Footer: FC = () => {
  return (
    <footer className="bg-black opacity-80 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Extras Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">EXTRAS</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/brands" className="hover:text-gray-300">Brands</Link>
              <Link to="/gift-certificates" className="hover:text-gray-300">Gift Certificates</Link>
              <Link to="/affiliate" className="hover:text-gray-300">Affiliate</Link>
              <Link to="/specials" className="hover:text-gray-300">Specials</Link>
            </div>
          </div>

          {/* Information Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">INFORMATION</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/about" className="hover:text-gray-300">About Us</Link>
              <Link to="/privacy" className="hover:text-gray-300">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-gray-300">Terms & Conditions</Link>
              <Link to="/contact" className="hover:text-gray-300">Contact Us</Link>
            </div>
          </div>

          {/* My Account Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">MY ACCOUNT</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/account" className="hover:text-gray-300">My Account</Link>
              <Link to="/orders" className="hover:text-gray-300">Order History</Link>
              <Link to="/wishlist" className="hover:text-gray-300">Wish List</Link>
              <Link to="/newsletter" className="hover:text-gray-300">Newsletter</Link>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">CONTACT US</h3>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <span className="mr-2">📍</span>
                <p>42 Dream House, Dreammy street, 7131 Dreamville, USA</p>
              </div>
              <div className="flex items-center">
                <span className="mr-2">📧</span>
                <p>company@gmail.com</p>
              </div>
              <div className="flex items-center">
                <span className="mr-2">📞</span>
                <p>456-456-4512</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p>&copy; {new Date().getFullYear()} Phone Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
