import React from 'react';
import { useAppStore } from '../stores/appStore';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ArrowRight, CheckCircle, Upload, Search, Zap, FileText, BarChart, Shield, Star, Briefcase } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigateTo } = useAppStore();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 z-[-1]" />
        
        {/* Animated shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob dark:bg-purple-900"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000 dark:bg-indigo-900"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000 dark:bg-rose-900"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            <span className="block text-slate-900 dark:text-white mb-2">Make Your Resume</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              ATS-Ready and Job-Ready
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-slate-600 dark:text-slate-300 mx-auto mb-10">
            Upload your resume, compare it with any job description, and get an AI-powered analysis with actionable improvements.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button size="lg" onClick={() => navigateTo('analyzer')} icon={<Zap className="w-5 h-5" />}>
              Analyze My Resume
            </Button>
            <Button size="lg" variant="secondary" onClick={() => navigateTo('analyzer')} icon={<Search className="w-5 h-5" />}>
              Try Demo
            </Button>
          </div>
          
          <div className="mt-16 flex items-center justify-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex -space-x-2 mr-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-900 flex items-center justify-center overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                </div>
              ))}
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-amber-400 mr-1 fill-current" />
              <Star className="w-4 h-4 text-amber-400 mr-1 fill-current" />
              <Star className="w-4 h-4 text-amber-400 mr-1 fill-current" />
              <Star className="w-4 h-4 text-amber-400 mr-1 fill-current" />
              <Star className="w-4 h-4 text-amber-400 mr-1 fill-current" />
            </div>
            <span className="ml-2">10,000+ Resumes Analyzed</span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">How It Works</h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">Three simple steps to your dream job</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 -translate-y-1/2 z-0" />
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mb-6 shadow-lg transform transition hover:scale-110">
                <Upload className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">1. Upload</h3>
              <p className="text-slate-600 dark:text-slate-400">Upload your PDF, DOCX, or TXT resume securely to our platform.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-2xl bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mb-6 shadow-lg transform transition hover:scale-110">
                <Search className="w-10 h-10 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">2. Analyze</h3>
              <p className="text-slate-600 dark:text-slate-400">AI analyzes your resume against ATS standards and your target job description.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mb-6 shadow-lg transform transition hover:scale-110">
                <BarChart className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">3. Improve</h3>
              <p className="text-slate-600 dark:text-slate-400">Get detailed scores, missing keywords, and personalized recommendations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Comprehensive Analysis</h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">Everything you need to perfect your resume</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <BarChart className="text-indigo-500" />, title: 'ATS Score Analysis', desc: 'Find out exactly how an Applicant Tracking System sees your resume.' },
              { icon: <CheckCircle className="text-emerald-500" />, title: 'Keyword Matching', desc: 'Identify critical keywords missing from your resume compared to the job description.' },
              { icon: <Briefcase className="text-amber-500" />, title: 'Skills Analysis', desc: 'Detailed breakdown of technical, soft, and tool-based skills.' },
              { icon: <FileText className="text-purple-500" />, title: 'Formatting Check', desc: 'Ensure your layout, fonts, and sections are ATS-friendly.' },
              { icon: <Zap className="text-rose-500" />, title: 'AI Recommendations', desc: 'Actionable advice to improve weak bullet points and descriptions.' },
              { icon: <Shield className="text-blue-500" />, title: 'Privacy First', desc: 'Your data is encrypted and deleted securely. Never shared with third parties.' }
            ].map((feature, i) => (
              <Card key={i} hoverLift className="bg-white dark:bg-slate-800">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600 dark:bg-indigo-900"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to land more interviews?</h2>
          <p className="text-xl text-indigo-100 mb-10">
            Join thousands of job seekers who have optimized their resumes and landed their dream jobs.
          </p>
          <Button size="lg" variant="secondary" onClick={() => navigateTo('analyzer')} icon={<ArrowRight className="w-5 h-5" />}>
            Analyze My Resume Now
          </Button>
        </div>
      </section>
    </div>
  );
};
