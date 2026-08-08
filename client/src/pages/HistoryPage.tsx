import React from 'react';
import { useAppStore } from '../stores/appStore';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Trash2, ExternalLink, Lock } from 'lucide-react';

export const HistoryPage: React.FC = () => {
  const { user, navigateTo } = useAppStore();

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-900">
        <Lock className="w-16 h-16 text-slate-300 dark:text-slate-600 mb-6" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Authentication Required</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8 text-center max-w-md">
          Please log in or sign up to view your past resume analyses.
        </p>
        <div className="flex space-x-4">
          <Button variant="outline" onClick={() => navigateTo('login')}>Log In</Button>
          <Button variant="primary" onClick={() => navigateTo('signup')}>Sign Up</Button>
        </div>
      </div>
    );
  }

  // Mock data
  const history = [
    { id: '1', resumeName: 'john_doe_resume_v2.pdf', jobTitle: 'Senior Frontend Developer', atsScore: 85, jobMatch: 78, createdAt: '2026-08-01T10:00:00Z' },
    { id: '2', resumeName: 'john_doe_resume_v1.pdf', jobTitle: 'React Developer', atsScore: 65, jobMatch: 52, createdAt: '2026-07-28T14:30:00Z' },
    { id: '3', resumeName: 'john_doe_resume_tech.pdf', jobTitle: 'Full Stack Engineer', atsScore: 72, jobMatch: 60, createdAt: '2026-07-15T09:15:00Z' },
  ];

  return (
    <div className="min-h-screen pt-10 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Analysis History</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Review your past resume analyses.</p>
          </div>
          <Button onClick={() => navigateTo('analyzer')}>New Analysis</Button>
        </div>

        <Card padding="none" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                  <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Resume</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Target Role</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">ATS Score</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Date</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900">
                {history.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{item.resumeName}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600 dark:text-slate-400">{item.jobTitle}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          item.atsScore >= 80 ? 'bg-emerald-500' : 
                          item.atsScore >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                        }`} />
                        <span className="text-sm font-medium text-slate-900 dark:text-white">{item.atsScore}/100</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};
