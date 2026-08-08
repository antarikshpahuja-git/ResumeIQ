import React, { useEffect } from 'react';
import { useAppStore } from './stores/appStore';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { AnalyzerPage } from './pages/AnalyzerPage';
import { DashboardPage } from './pages/DashboardPage';
import { HistoryPage } from './pages/HistoryPage';
import { PricingPage } from './pages/PricingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { AnimatePresence, motion } from 'framer-motion';

const App: React.FC = () => {
  const { currentPage, isDarkMode } = useAppStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'analyzer': return <AnalyzerPage />;
      case 'dashboard': return <DashboardPage />;
      case 'history': return <HistoryPage />;
      case 'pricing': return <PricingPage />;
      case 'login': return <LoginPage />;
      case 'signup': return <SignupPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
      <Header />
      <main className="flex-grow flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-grow flex flex-col"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default App;
