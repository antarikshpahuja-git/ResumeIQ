import React from 'react';
import { Sparkles, Sun, Moon, Menu, X } from 'lucide-react';
import { useAppStore } from '../../stores/appStore';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const { currentPage, navigateTo, isDarkMode, toggleDarkMode, user, logout } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { name: 'Home', page: 'home' as const },
    { name: 'Analyzer', page: 'analyzer' as const },
    { name: 'History', page: 'history' as const, requiresAuth: true },
    { name: 'Pricing', page: 'pricing' as const },
  ];

  const handleNav = (page: any) => {
    navigateTo(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => handleNav('home')}>
            <Sparkles className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
            <span className="font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              ResumeAI
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.filter(l => !l.requiresAuth || user).map((link) => (
              <button
                key={link.name}
                onClick={() => handleNav(link.page)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === link.page
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {user.name}
                </span>
                <Button variant="outline" size="sm" onClick={logout}>
                  Log out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" onClick={() => handleNav('login')}>
                  Log in
                </Button>
                <Button variant="primary" size="sm" onClick={() => handleNav('signup')}>
                  Sign up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleDarkMode}
              className="p-2 mr-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white p-2"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.filter(l => !l.requiresAuth || user).map((link) => (
              <button
                key={link.name}
                onClick={() => handleNav(link.page)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentPage === link.page
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-400'
                    : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                {link.name}
              </button>
            ))}
            
            {!user && (
              <div className="pt-4 flex flex-col space-y-2 px-3">
                <Button variant="outline" fullWidth onClick={() => handleNav('login')}>
                  Log in
                </Button>
                <Button variant="primary" fullWidth onClick={() => handleNav('signup')}>
                  Sign up
                </Button>
              </div>
            )}
            {user && (
              <div className="pt-4 px-3">
                <Button variant="outline" fullWidth onClick={() => { logout(); setMobileMenuOpen(false); }}>
                  Log out
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
