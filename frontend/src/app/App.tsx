import React, { useState, useEffect } from 'react';
import { LandingPage } from '../pages/LandingPage';
import { InteractiveStudioPage } from '../pages/InteractiveStudioPage';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'studio'>('landing');

  // Handle URL hash changes (e.g. #studio)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#studio') {
        setCurrentView('studio');
      } else if (window.location.hash === '#landing' || window.location.hash === '') {
        setCurrentView('landing');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToStudio = () => {
    window.location.hash = 'studio';
    setCurrentView('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToLanding = () => {
    window.location.hash = '';
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen">
      {currentView === 'landing' ? (
        <LandingPage onLaunchStudio={navigateToStudio} />
      ) : (
        <InteractiveStudioPage onNavigateHome={navigateToLanding} />
      )}
    </div>
  );
};

export default App;
