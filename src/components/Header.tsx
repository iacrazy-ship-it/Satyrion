import React from 'react';
import { MapPin } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-saturo-primary to-saturo-secondary sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 md:w-16 md:h-16 overflow-hidden rounded-full shadow-md bg-white p-1">
                <img 
                  src="/images/Satyrion logo.png" 
                  alt="Logo Satyrion" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-serif font-bold text-white">
                SATYRION
              </h1>
              <p className="text-sm text-saturo-accent hidden sm:block font-sans">
                Parco Archeologico di Saturo
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2 text-white">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Leporano, Italia</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;