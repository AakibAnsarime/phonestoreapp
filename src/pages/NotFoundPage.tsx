import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-4xl font-extrabold text-gray-900">
            🚧 Under Development 🚧
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            We're working hard to bring you something amazing!
          </p>
          <p className="mt-2 text-gray-500">
            This page is still under construction.
          </p>
        </div>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
