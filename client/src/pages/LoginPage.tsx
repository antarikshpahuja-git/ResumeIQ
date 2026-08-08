import React from 'react';
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
