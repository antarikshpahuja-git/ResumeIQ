import React from 'react';
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
