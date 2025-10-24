
import React from 'react';
import Header from './components/Header';
import Introduction from './components/Introduction';
import InteractiveDemo from './components/InteractiveDemo';
import Checklist from './components/Checklist';
import RisksAndMitigations from './components/RisksAndMitigations';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-vsm-bg font-sans">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        <Introduction />
        <InteractiveDemo />
        <Checklist />
        <RisksAndMitigations />
      </main>
      <Footer />
    </div>
  );
};

export default App;
