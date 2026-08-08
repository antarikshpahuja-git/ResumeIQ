import React, { useCallback } from 'react';
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
                className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors
                  ${isDragActive ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-slate-300 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500'}`}
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
                        <span className={`text-sm ${analysisProgress >= idx ? 'text-slate-900 dark:text-white font-medium' : 'text-slate-500'}`}>
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
