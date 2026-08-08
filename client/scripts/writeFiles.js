import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.join(__dirname, 'src', 'pages');
if (!fs.existsSync(pagesDir)) fs.mkdirSync(pagesDir, { recursive: true });

const files = {
  'src/pages/HomePage.tsx': `import React from 'react';
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
                  <img src={\`https://i.pravatar.cc/100?img=\${i+10}\`} alt="User" />
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
`,
  'src/pages/AnalyzerPage.tsx': `import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAppStore } from '../stores/appStore';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { UploadCloud, FileText, X, Rocket, CheckCircle2, Loader2 } from 'lucide-react';

export const AnalyzerPage: React.FC = () => {
  const { 
    uploadedFile, setUploadedFile, 
    jobDescription, setJobDescription,
    jobTitle, setJobTitle,
    experienceLevel, setExperienceLevel,
    isAnalyzing, setIsAnalyzing,
    analysisProgress, setAnalysisProgress,
    navigateTo, setAnalysisResult
  } = useAppStore();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        setUploadedFile({
          name: file.name,
          size: file.size,
          type: file.type || file.name.split('.').pop() || 'unknown',
          text: (e.target?.result as string) || 'Sample extracted text...'
        });
      };
      
      // Real app would upload to server to extract text
      if (file.type === 'text/plain') {
        reader.readAsText(file);
      } else {
        // Mock extraction for demo
        setTimeout(() => {
          setUploadedFile({
            name: file.name,
            size: file.size,
            type: file.type || file.name.split('.').pop() || 'unknown',
            text: 'This is mocked extracted text from the resume. In a real app, this would be parsed on the backend.'
          });
        }, 1000);
      }
    }
  }, [setUploadedFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false
  });

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate analysis stages
    const stages = [
      { progress: 1, delay: 800 },  // Reading resume
      { progress: 2, delay: 1200 }, // Extracting sections
      { progress: 3, delay: 1500 }, // Analyzing keywords
      { progress: 4, delay: 1000 }, // Comparing job description
      { progress: 5, delay: 1000 }, // Checking ATS formatting
      { progress: 6, delay: 800 },  // Generating recommendations
    ];

    for (const stage of stages) {
      await new Promise(resolve => setTimeout(resolve, stage.delay));
      setAnalysisProgress(stage.progress);
    }

    // Generate mock result
    const mockResult = {
      atsScore: 78,
      jobMatch: 65,
      keywordMatch: 72,
      formatting: 85,
      resumeHealth: 80,
      overview: {
        summary: "Your resume is well-formatted and has a solid structure, but it lacks specific keywords related to the job description.",
        strengths: ["Clear section headings", "Good use of action verbs", "Clean formatting"],
        weaknesses: ["Missing key technical skills", "Summary is too generic"],
        recommendations: ["Add more quantifiable metrics to your experience", "Include React and TypeScript in your skills section"]
      },
      atsBreakdown: {
        keywordMatch: { score: 18, max: 25, explanation: "Good match, but missing some key terms.", suggestions: ["Add specific technologies mentioned in JD"] },
        formatting: { score: 17, max: 20, explanation: "Standard format, easily readable by ATS.", suggestions: [] },
        skillsMatch: { score: 15, max: 20, explanation: "Most required skills present.", suggestions: ["Add missing soft skills"] },
        experienceRelevance: { score: 12, max: 15, explanation: "Experience aligns well with requirements.", suggestions: [] },
        education: { score: 10, max: 10, explanation: "Education matches requirements.", suggestions: [] },
        sectionCompleteness: { score: 5, max: 5, explanation: "All standard sections found.", suggestions: [] },
        atsReadability: { score: 4, max: 5, explanation: "Font and layout are standard.", suggestions: [] }
      },
      keywords: {
        matchPercentage: 72,
        matched: ["JavaScript", "Frontend", "UI", "Git", "API", "Agile"],
        missing: ["React", "TypeScript", "Redux", "Jest", "CI/CD"]
      },
      skills: {
        matchPercentage: 68,
        technical: ["JavaScript", "HTML", "CSS", "REST"],
        tools: ["Git", "Webpack", "VS Code"],
        soft: ["Teamwork", "Agile", "Communication"],
        matched: ["JavaScript", "HTML", "CSS", "Git", "Agile"],
        missing: ["React", "TypeScript", "Redux"],
        required: ["JavaScript", "React", "TypeScript", "HTML", "CSS", "Git", "Redux", "Agile"]
      },
      experience: {
        score: 82,
        actionVerbs: 14,
        quantifiableMetrics: 3,
        weakBullets: [
          { original: "Worked on frontend features", suggestion: "Developed 5 new frontend features using React, improving user engagement by 20%" },
          { original: "Helped team with bugs", suggestion: "Resolved 30+ critical bugs during the Q3 release cycle" }
        ],
        recommendations: ["Quantify more achievements", "Start every bullet point with a strong action verb"]
      },
      projects: {
        analysis: "Good project descriptions, but lacking links to live demos.",
        technologies: ["JavaScript", "Node.js", "Express"],
        suggestions: ["Add links to GitHub repositories", "Specify your exact role in team projects"],
        hasLinks: false
      },
      formattingDetails: {
        score: 85,
        riskLevel: 'low' as const,
        goodPoints: ["Standard fonts used", "Clear section headers", "Appropriate margins"],
        issues: ["Complex table found which might confuse some ATS"],
        suggestions: ["Remove tables and use standard text formatting"]
      },
      grammar: {
        score: 95,
        issues: [
          { original: "Expierence", type: "Spelling", suggestion: "Experience", severity: 'high' as const }
        ],
        summary: "Excellent writing with only minor issues found."
      },
      recommendations: [
        { priority: 'high' as const, problem: "Missing critical keyword: 'React'", whyItMatters: "The job heavily relies on React. Not having it might auto-reject your application.", suggestedAction: "Add 'React' to your skills section and mention it in relevant project/experience bullets." },
        { priority: 'medium' as const, problem: "Low quantifiable metrics", whyItMatters: "Numbers provide concrete proof of your impact.", suggestedAction: "Add metrics like % improvement, $ saved, or # of users to at least 3 bullet points." }
      ],
      sections: [
        { name: "Contact Information", found: true },
        { name: "Professional Summary", found: true },
        { name: "Work Experience", found: true },
        { name: "Education", found: true },
        { name: "Skills", found: true },
        { name: "Projects", found: false, warning: true, description: "Consider adding a projects section for technical roles" }
      ],
      extractedText: "Mock extracted text from the resume..."
    };

    setAnalysisResult(mockResult);
    setIsAnalyzing(false);
    navigateTo('dashboard');
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadedFile(null);
  };

  const stages = [
    "Reading resume",
    "Extracting sections",
    "Analyzing keywords",
    "Comparing job description",
    "Checking ATS formatting",
    "Generating recommendations"
  ];

  return (
    <div className="min-h-screen pt-10 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Analyze Your Resume</h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">Upload your resume and the target job description to get started.</p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Step 1: Resume Upload */}
          <Card padding="lg">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400 mr-3 text-sm">1</span>
              Upload Resume
            </h2>
            
            {!uploadedFile ? (
              <div 
                {...getRootProps()} 
                className={\`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors
                  \${isDragActive ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-slate-300 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500'}\`}
              >
                <input {...getInputProps()} />
                <UploadCloud className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
                  {isDragActive ? "Drop your resume here" : "Drag & drop your resume here"}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
                  or click to browse files
                </p>
                <p className="text-xs text-slate-400 mt-4">
                  Supported formats: PDF, DOCX, TXT (Max 10MB)
                </p>
              </div>
            ) : (
              <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mr-4">
                    <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-900 dark:text-white truncate max-w-xs">{uploadedFile.name}</h4>
                    <p className="text-xs text-slate-500">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • {uploadedFile.type}</p>
                  </div>
                </div>
                <button 
                  onClick={removeFile}
                  className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </Card>

          {/* Step 2: Job Description */}
          <Card padding="lg">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400 mr-3 text-sm">2</span>
              Target Job Description
            </h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="jobTitle" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Target Job Title (Optional)
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Senior Frontend Developer"
                  className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow border"
                />
              </div>
              
              <div>
                <label htmlFor="jobDescription" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Paste Job Description
                </label>
                <textarea
                  id="jobDescription"
                  rows={6}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the full job description here to get a tailored analysis..."
                  className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow border resize-y"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-slate-500">{jobDescription.length} characters</span>
                  {jobDescription.length < 50 && jobDescription.length > 0 && (
                    <span className="text-xs text-amber-500">Add more details for a better analysis</span>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Your Experience Level
                </label>
                <select
                  id="experience"
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none border"
                >
                  <option value="">Select level...</option>
                  <option value="student">Student / Internship</option>
                  <option value="fresher">Fresher (0 years)</option>
                  <option value="junior">Junior (1-3 years)</option>
                  <option value="mid">Mid-Level (3-5 years)</option>
                  <option value="senior">Senior (5+ years)</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Action Area */}
          <div className="text-center pt-4">
            {isAnalyzing ? (
              <Card padding="lg" className="max-w-md mx-auto">
                <div className="flex flex-col items-center">
                  <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-6">Analyzing your resume...</h3>
                  
                  <div className="w-full space-y-3 text-left">
                    {stages.map((stage, idx) => (
                      <div key={idx} className="flex items-center">
                        {analysisProgress > idx ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                        ) : analysisProgress === idx ? (
                          <Loader2 className="w-5 h-5 text-indigo-500 animate-spin mr-3 flex-shrink-0" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-700 mr-3 flex-shrink-0" />
                        )}
                        <span className={\`text-sm \${analysisProgress >= idx ? 'text-slate-900 dark:text-white font-medium' : 'text-slate-500'}\`}>
                          {stage}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ) : (
              <Button 
                size="lg" 
                onClick={handleAnalyze} 
                disabled={!uploadedFile}
                icon={<Rocket className="w-5 h-5" />}
                className="w-full sm:w-auto sm:px-12 py-4 text-lg"
              >
                Analyze My Resume
              </Button>
            )}
          </div>
        </div>
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
