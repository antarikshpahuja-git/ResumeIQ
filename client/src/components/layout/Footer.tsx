import React from 'react';
import { Sparkles, Github, Twitter, Linkedin } from 'lucide-react';
import { useAppStore } from '../../stores/appStore';

export const Footer: React.FC = () => {
  const { navigateTo } = useAppStore();

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex justify-center items-center md:justify-start mb-6 md:mb-0">
            <Sparkles className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
            <span className="font-bold text-xl text-slate-900 dark:text-white">
              ResumeAI
            </span>
          </div>
          
          <div className="flex space-x-6 mb-6 md:mb-0">
            <button onClick={() => navigateTo('home')} className="text-slate-500 hover:text-slate-900 dark:hover:text-white text-sm">
              Home
            </button>
            <button onClick={() => navigateTo('analyzer')} className="text-slate-500 hover:text-slate-900 dark:hover:text-white text-sm">
              Analyzer
            </button>
            <button onClick={() => navigateTo('pricing')} className="text-slate-500 hover:text-slate-900 dark:hover:text-white text-sm">
              Pricing
            </button>
          </div>

          <div className="flex space-x-6">
            <a href="#" className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300">
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6" />
            </a>
            <a href="#" className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-base text-slate-400 xl:text-center">
            &copy; 2026 ResumeAI, Inc. All rights reserved.
          </p>
          <p className="text-sm text-slate-400 mt-4 md:mt-0">
            Your resume data is processed securely and never shared.
          </p>
        </div>
      </div>
    </footer>
  );
};
