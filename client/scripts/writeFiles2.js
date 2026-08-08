import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = {
  'src/pages/DashboardPage.tsx': `import React from 'react';
import { useAppStore } from '../stores/appStore';
import { Card } from '../components/ui/Card';
import { CircularGauge } from '../components/ui/CircularGauge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Tabs } from '../components/ui/Tabs';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { 
  Download, RefreshCw, Trash2, ChevronRight, CheckCircle2, 
  XCircle, AlertTriangle, FileText, Layout, Award, Zap, BookOpen 
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { analysisResult, navigateTo, setAnalysisResult, setUploadedFile, activeTab, setActiveTab } = useAppStore();

  if (!analysisResult) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">No analysis found</h2>
          <Button onClick={() => navigateTo('analyzer')}>Go to Analyzer</Button>
        </div>
      </div>
    );
  }

  const {
    atsScore, jobMatch, keywordMatch, formatting, resumeHealth,
    overview, atsBreakdown, keywords, skills, experience, projects, formattingDetails, grammar, recommendations, sections, extractedText
  } = analysisResult;

  const handleReset = () => {
    setAnalysisResult(null);
    setUploadedFile(null);
    navigateTo('analyzer');
  };

  const tabs = [
    {
      label: 'Overview',
      icon: <Layout className="w-4 h-4" />,
      content: (
        <div className="space-y-8">
          <Card padding="lg">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Summary</h3>
            <p className="text-slate-600 dark:text-slate-300">{overview.summary}</p>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card padding="lg" className="border-t-4 border-t-emerald-500">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2" /> Strengths
              </h3>
              <ul className="space-y-3">
                {overview.strengths.map((s, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-slate-600 dark:text-slate-300">{s}</span>
                  </li>
                ))}
              </ul>
            </Card>
            
            <Card padding="lg" className="border-t-4 border-t-rose-500">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 text-rose-500 mr-2" /> Weaknesses
              </h3>
              <ul className="space-y-3">
                {overview.weaknesses.map((w, i) => (
                  <li key={i} className="flex items-start">
                    <XCircle className="w-4 h-4 text-rose-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-slate-600 dark:text-slate-300">{w}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
          
          <Card padding="lg" className="bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-900/50">
            <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-300 mb-4 flex items-center">
              <Zap className="w-5 h-5 text-indigo-500 mr-2" /> Quick Recommendations
            </h3>
            <ul className="space-y-3">
              {overview.recommendations.map((r, i) => (
                <li key={i} className="flex items-start">
                  <ChevronRight className="w-4 h-4 text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-indigo-800 dark:text-indigo-200">{r}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )
    },
    {
      label: 'ATS Score',
      icon: <Award className="w-4 h-4" />,
      content: (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Overall ATS Compatibility</h3>
              <p className="text-slate-600 dark:text-slate-400 max-w-md">
                This score indicates how well an Applicant Tracking System can parse and rank your resume for this specific job description.
              </p>
            </div>
            <div className="flex-shrink-0">
              <CircularGauge value={atsScore} size="lg" label="ATS Score" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(atsBreakdown).map(([key, data]) => (
              <Card key={key} padding="md">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-slate-900 dark:text-white capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </h4>
                  <span className="text-sm font-medium text-slate-500">
                    {data.score} / {data.max} pts
                  </span>
                </div>
                <ProgressBar value={(data.score / data.max) * 100} showValue={false} />
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{data.explanation}</p>
                {data.suggestions.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {data.suggestions.map((s, i) => (
                      <li key={i} className="text-xs text-indigo-600 dark:text-indigo-400 flex items-start">
                        <ChevronRight className="w-3 h-3 mt-0.5 mr-1 flex-shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            ))}
          </div>
        </div>
      )
    },
    {
      label: 'Keywords',
      icon: <FileText className="w-4 h-4" />,
      content: (
        <div className="space-y-8">
          <Card padding="lg">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Keyword Match</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Keywords are critical for passing ATS filters. Add these naturally to your experience and skills sections.
                </p>
              </div>
              <div className="mt-4 md:mt-0 w-32">
                <CircularGauge value={keywords.matchPercentage} size="sm" />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                  Matched Keywords ({keywords.matched.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {keywords.matched.map((k, i) => (
                    <Badge key={i} variant="matched" icon={<CheckCircle2 className="w-3 h-3" />}>{k}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>Missing Keywords ({keywords.missing.length})</span>
                  <span className="text-xs font-normal text-slate-500 normal-case bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                    Only add if you genuinely have these skills
                  </span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {keywords.missing.map((k, i) => (
                    <Badge key={i} variant="missing" icon={<XCircle className="w-3 h-3" />}>{k}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )
    },
    {
      label: 'Recommendations',
      icon: <Zap className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Action Plan</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Focus on high-priority items first to get the most improvement in your ATS score.
          </p>
          
          <div className="space-y-4">
            {recommendations.map((rec, idx) => {
              const borderColors = {
                high: 'border-l-rose-500 dark:border-l-rose-500',
                medium: 'border-l-amber-500 dark:border-l-amber-500',
                low: 'border-l-blue-500 dark:border-l-blue-500'
              };
              
              const bgColors = {
                high: 'bg-rose-50 dark:bg-rose-900/10',
                medium: 'bg-amber-50 dark:bg-amber-900/10',
                low: 'bg-blue-50 dark:bg-blue-900/10'
              };
              
              const textColors = {
                high: 'text-rose-700 dark:text-rose-400',
                medium: 'text-amber-700 dark:text-amber-400',
                low: 'text-blue-700 dark:text-blue-400'
              };

              return (
                <div key={idx} className={\`border-l-4 \${borderColors[rec.priority]} \${bgColors[rec.priority]} p-5 rounded-r-xl\`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-slate-900 dark:text-white">{rec.problem}</h4>
                    <span className={\`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded \${textColors[rec.priority]} bg-white dark:bg-slate-800\`}>
                      {rec.priority} Priority
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3"><strong>Why it matters:</strong> {rec.whyItMatters}</p>
                  <div className="bg-white dark:bg-slate-800 p-3 rounded border border-slate-200 dark:border-slate-700">
                    <p className="text-sm font-medium text-slate-900 dark:text-white flex items-start">
                      <Zap className="w-4 h-4 text-indigo-500 mr-2 flex-shrink-0 mt-0.5" />
                      {rec.suggestedAction}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen pt-8 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Analysis Results</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Review your scores and implement the recommended changes.
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <Button variant="outline" size="sm" icon={<Download className="w-4 h-4" />}>
              Export PDF
            </Button>
            <Button variant="primary" size="sm" onClick={handleReset} icon={<RefreshCw className="w-4 h-4" />}>
              Analyze Another
            </Button>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card padding="sm" className="flex flex-col items-center justify-center text-center p-4">
            <CircularGauge value={atsScore} size="sm" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-2">ATS Score</span>
          </Card>
          <Card padding="sm" className="flex flex-col items-center justify-center text-center p-4">
            <CircularGauge value={jobMatch} size="sm" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-2">Job Match</span>
          </Card>
          <Card padding="sm" className="flex flex-col items-center justify-center text-center p-4">
            <CircularGauge value={keywordMatch} size="sm" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-2">Keyword Match</span>
          </Card>
          <Card padding="sm" className="flex flex-col items-center justify-center text-center p-4">
            <CircularGauge value={formatting} size="sm" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-2">Formatting</span>
          </Card>
          <Card padding="sm" className="flex flex-col items-center justify-center text-center p-4">
            <CircularGauge value={resumeHealth} size="sm" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-2">Resume Health</span>
          </Card>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:w-2/3">
            <Card padding="none" className="overflow-hidden">
              <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:w-1/3 space-y-6">
            <Card padding="md">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                <Layout className="w-5 h-5 mr-2 text-indigo-500" />
                Section Detection
              </h3>
              <ul className="space-y-3">
                {sections.map((section, idx) => (
                  <li key={idx} className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{section.name}</span>
                      {section.found ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : section.warning ? (
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-500" />
                      )}
                    </div>
                    {section.description && (
                      <span className="text-xs text-slate-500 mt-1">{section.description}</span>
                    )}
                  </li>
                ))}
              </ul>
            </Card>

            <Card padding="md">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-indigo-500" />
                Resume Preview
              </h3>
              <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg h-64 overflow-y-auto text-xs font-mono text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                {extractedText}
              </div>
            </Card>
            
            <Card padding="md" className="bg-rose-50 dark:bg-rose-900/10 border-rose-100 dark:border-rose-900/30">
              <h3 className="font-bold text-rose-900 dark:text-rose-300 mb-2">Privacy Area</h3>
              <p className="text-sm text-rose-700 dark:text-rose-400 mb-4">
                We store your data temporarily for analysis. You can delete it manually here.
              </p>
              <Button variant="danger" size="sm" icon={<Trash2 className="w-4 h-4" />}>
                Delete My Data
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
`,
  'src/pages/PricingPage.tsx': `import React from 'react';
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
                  <span className={\`\${feature.included ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 dark:text-slate-500'}\`}>
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
`,
  'src/pages/HistoryPage.tsx': `import React from 'react';
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
                        <div className={\`w-2 h-2 rounded-full mr-2 \${
                          item.atsScore >= 80 ? 'bg-emerald-500' : 
                          item.atsScore >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                        }\`} />
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
`
};

for (const [filepath, content] of Object.entries(files)) {
  const fullPath = path.join(__dirname, '..', filepath);
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Created:', fullPath);
}
