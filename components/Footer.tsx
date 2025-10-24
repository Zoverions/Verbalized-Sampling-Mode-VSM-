
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-vsm-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-vsm-text-secondary">
        <p>&copy; {new Date().getFullYear()} VSM Explorer. All rights reserved.</p>
        <p className="text-xs mt-1">
          A conceptual demonstration of advanced AI transparency features.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
