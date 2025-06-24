import React from 'react';
import { Link } from 'react-router-dom';
import{IMAGES} from '../../assets/index';
import CustomButton from '../../shared/custombutton';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-lg text-center">
        <div className="mb-8">
          <img 
            src={IMAGES.NotFoundPages} 
            alt="404 Page Not Found" 
            className="w-full max-w-md mx-auto"
          />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <Link to="/">
          <CustomButton
            label="Back to Home"
            className="px-6 py-3"
          />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;