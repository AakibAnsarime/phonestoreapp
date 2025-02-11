import React, { useState } from 'react';

interface AuthDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthDropdown: React.FC<AuthDropdownProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add authentication logic here
    console.log('Form submitted:', formData);
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50">
      <div className="p-4">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black">
          ✕
        </button>
        <div className="flex justify-between mb-4">
          <button
            className={`px-4 py-2 ${isLogin ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 ${!isLogin ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          {!isLogin && (
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        
        {isLogin && (
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-gray-600 hover:text-black">
              Forgot Password?
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthDropdown;
