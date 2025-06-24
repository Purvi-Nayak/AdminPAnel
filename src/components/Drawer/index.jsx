import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const DrawerMenu = ({ isOpen, toggleDrawer, menuItems, title = "Menu" }) => {
  const location = useLocation();

  return (
    <div className='overflow-y-hidden'>
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="pt-16">{/* Main content will be outside this component */}</div>
      </div>
      {/* Drawer */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white-pure transform transition-transform duration-300 ease-in-out z-20 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">{title}</h2>
          <nav className="space-y-2">
            {menuItems.map((item, index) =>
              item.onClick ? (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="flex items-center space-x-3 px-4 py-3 w-full text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </button>
              ) : (
                <Link
                  key={index}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors ${
                    location.pathname === item.path ? 'bg-blue-50 text-blue-600' : ''
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            )}
          </nav>
        </div>
      </div>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleDrawer}
        />
      )}
    </div>
  );
};

export default DrawerMenu;