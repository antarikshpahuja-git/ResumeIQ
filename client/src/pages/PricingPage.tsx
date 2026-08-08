import React from 'react';
import { useAppStore } from '../stores/appStore';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Check, X, Star } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const { navigateTo, user } = useAppStore();

  return (
    <div className="min-h-screen pt-20 pb-32 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Choose the plan that best fits your needs. Upgrade anytime to unlock AI-powered features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <Card padding="lg" hoverLift={false} className="border-2 border-transparent">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Basic</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6">Perfect for quick checks.</p>
            <div className="mb-8">
              <span className="text-5xl font-extrabold text-slate-900 dark:text-white">$0</span>
              <span className="text-slate-500">/ forever</span>
            </div>
            
            <ul className="space-y-4 mb-8">
              {[
                { text: '5 resume analyses per month', included: true },
                { text: 'Basic ATS formatting check', included: true },
                { text: 'Keyword matching', included: true },
                { text: 'Rule-based scoring', included: true },
                { text: 'AI-powered recommendations', included: false },
                { text: 'Unlimited analyses', included: false },
                { text: 'Export to PDF', included: false },
              ].map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  {feature.included ? (
                    <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                  ) : (
                    <X className="w-5 h-5 text-slate-300 dark:text-slate-600 mr-3 flex-shrink-0" />
                  )}
                  <span className={`${feature.included ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 dark:text-slate-500'}`}>
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
            
            <Button 
              variant="outline" 
              fullWidth 
              size="lg"
              onClick={() => navigateTo(user ? 'analyzer' : 'signup')}
            >
              Get Started for Free
            </Button>
          </Card>

          {/* Pro Plan */}
          <Card padding="lg" hoverLift={false} gradientBorder className="relative border-0">
            <div className="absolute top-0 right-0 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl uppercase tracking-wider">
              Most Popular
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 flex items-center">
              Pro <Star className="w-5 h-5 text-amber-400 ml-2 fill-current" />
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6">For serious job seekers.</p>
            <div className="mb-8">
              <span className="text-5xl font-extrabold text-slate-900 dark:text-white">$9</span>
              <span className="text-slate-500">/ month</span>
            </div>
            
            <ul className="space-y-4 mb-8">
              {[
                { text: 'Unlimited resume analyses', included: true },
                { text: 'Advanced ATS simulation', included: true },
                { text: 'Deep keyword & skills analysis', included: true },
                { text: 'AI-powered rewriting recommendations', included: true },
                { text: 'Export beautiful PDF reports', included: true },
                { text: 'Cover letter analyzer', included: true },
                { text: 'Priority email support', included: true },
              ].map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
            
            <Button 
              variant="primary" 
              fullWidth 
              size="lg"
              onClick={() => navigateTo(user ? 'analyzer' : 'signup')}
            >
              Upgrade to Pro
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
