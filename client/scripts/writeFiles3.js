import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = {
  'src/pages/LoginPage.tsx': `import React from 'react';
import { useAppStore } from '../stores/appStore';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const LoginPage: React.FC = () => {
  const { navigateTo, setUser } = useAppStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    setUser({ id: '1', name: 'Demo User', email: 'demo@example.com' }, 'mock-token');
    navigateTo('dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-900">
      <div className="w-full max-w-md">
        <Card padding="lg">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome back</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Sign in to your account to continue</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
              <input 
                type="email" 
                required 
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white" 
                placeholder="you@example.com" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
              <input 
                type="password" 
                required 
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white" 
                placeholder="••••••••" 
              />
            </div>
            <div className="flex justify-between items-center text-sm mb-4">
              <label className="flex items-center text-slate-600 dark:text-slate-400">
                <input type="checkbox" className="mr-2 rounded text-indigo-500" /> Remember me
              </label>
              <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">Forgot password?</a>
            </div>
            <Button fullWidth type="submit">Sign In</Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
            Don't have an account?{' '}
            <button onClick={() => navigateTo('signup')} className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
              Sign up
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
`,
  'src/pages/SignupPage.tsx': `import React from 'react';
import { useAppStore } from '../stores/appStore';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const SignupPage: React.FC = () => {
  const { navigateTo, setUser } = useAppStore();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ id: '1', name: 'Demo User', email: 'demo@example.com' }, 'mock-token');
    navigateTo('analyzer');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-900">
      <div className="w-full max-w-md">
        <Card padding="lg">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Create an account</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Start optimizing your resume today</p>
          </div>
          
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
              <input 
                type="text" 
                required 
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white" 
                placeholder="John Doe" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
              <input 
                type="email" 
                required 
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white" 
                placeholder="you@example.com" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
              <input 
                type="password" 
                required 
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white" 
                placeholder="••••••••" 
              />
            </div>
            <Button fullWidth type="submit">Create Account</Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{' '}
            <button onClick={() => navigateTo('login')} className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
              Sign in
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
`,
  'src/App.tsx': `import React, { useEffect } from 'react';
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
`,
  'src/main.tsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
`,
  'index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✨</text></svg>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="ResumeAI - AI Resume Analyzer & ATS Checker" />
    <title>ResumeAI - AI Resume Analyzer & ATS Checker</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`
};

for (const [filepath, content] of Object.entries(files)) {
  const fullPath = path.join(__dirname, '..', filepath);
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Created:', fullPath);
}
