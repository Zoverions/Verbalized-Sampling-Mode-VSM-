
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 bg-vsm-bg/80 backdrop-blur-lg z-10 border-b border-vsm-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-vsm-primary tracking-tight">
          Verbalized Sampling Mode (VSM) Explorer
        </h1>
        <p className="text-vsm-text-secondary mt-1">
          An interactive guide to improving AI transparency by surfacing internal deliberative diversity.
        </p>
      </div>
    </header>
  );
};

export default Header;
