import React from 'react';
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
    overview, atsBreakdown, keywords, skills: skillsData, experience: experienceData, 
    projects: projectsData, formattingDetails: formattingData, grammar: grammarData, 
    recommendations, sections, extractedText
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
      label: 'Skills',
      icon: <Zap className="w-4 h-4" />,
      content: (
        <div className="space-y-8">
          <Card padding="lg">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Skills Analysis</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Skills extracted from your resume, categorized and compared with the job description.
                </p>
              </div>
              <div className="mt-4 md:mt-0 w-32">
                <CircularGauge value={skillsData?.matchPercentage ?? 0} size="sm" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Technical Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {(skillsData?.technical ?? []).map((s: string, i: number) => (
                    <Badge key={i} variant="neutral">{s}</Badge>
                  ))}
                  {(skillsData?.technical ?? []).length === 0 && <span className="text-sm text-slate-500">None detected</span>}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Tools</h4>
                <div className="flex flex-wrap gap-2">
                  {(skillsData?.tools ?? []).map((s: string, i: number) => (
                    <Badge key={i} variant="neutral">{s}</Badge>
                  ))}
                  {(skillsData?.tools ?? []).length === 0 && <span className="text-sm text-slate-500">None detected</span>}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Soft Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {(skillsData?.soft ?? []).map((s: string, i: number) => (
                    <Badge key={i} variant="neutral">{s}</Badge>
                  ))}
                  {(skillsData?.soft ?? []).length === 0 && <span className="text-sm text-slate-500">None detected</span>}
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider mb-3 text-emerald-700 dark:text-emerald-400">Matched Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {(skillsData?.matched ?? []).map((s: string, i: number) => (
                    <Badge key={i} variant="matched" icon={<CheckCircle2 className="w-3 h-3" />}>{s}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider mb-3 text-rose-700 dark:text-rose-400">Missing Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {(skillsData?.missing ?? []).map((s: string, i: number) => (
                    <Badge key={i} variant="missing" icon={<XCircle className="w-3 h-3" />}>{s}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )
    },
    {
      label: 'Experience',
      icon: <BookOpen className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <Card padding="lg">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Experience Analysis</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Quality analysis of your work experience bullet points.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-indigo-600">{experienceData?.actionVerbs ?? 0}</div>
                <div className="text-xs text-indigo-700 dark:text-indigo-300 mt-1">Action Verbs</div>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-emerald-600">{experienceData?.quantifiableMetrics ?? 0}</div>
                <div className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">Metrics Found</div>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-amber-600">{experienceData?.weakBullets?.length ?? 0}</div>
                <div className="text-xs text-amber-700 dark:text-amber-300 mt-1">Bullet Points</div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-purple-600">{experienceData?.score ?? 0}</div>
                <div className="text-xs text-purple-700 dark:text-purple-300 mt-1">Score /100</div>
              </div>
            </div>

            {(experienceData?.weakBullets ?? []).length > 0 && (
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-4">Bullets to Improve</h4>
                <div className="space-y-4">
                  {experienceData.weakBullets.map((b: any, i: number) => (
                    <div key={i} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-start mb-2">
                        <XCircle className="w-4 h-4 text-rose-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <span className="text-xs font-bold text-rose-600 uppercase">Weak</span>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{b.original}</p>
                        </div>
                      </div>
                      <div className="flex items-start mt-3 ml-6">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <span className="text-xs font-bold text-emerald-600 uppercase">Suggestion</span>
                          <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">{b.suggestion}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(experienceData?.recommendations ?? []).length > 0 && (
              <div className="mt-6">
                <h4 className="font-bold text-slate-900 dark:text-white mb-3">Tips</h4>
                <ul className="space-y-2">
                  {experienceData.recommendations.map((s: string, i: number) => (
                    <li key={i} className="flex items-start text-sm text-slate-600 dark:text-slate-400">
                      <ChevronRight className="w-4 h-4 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        </div>
      )
    },
    {
      label: 'Projects',
      icon: <FileText className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <Card padding="lg">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Project Analysis</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Projects are especially important for students and early-career professionals.
            </p>
            {(projectsData?.technologies ?? []).length > 0 ? (
              <div className="space-y-4">
                {[{ name: 'Project Overview', technologies: projectsData.technologies, feedback: projectsData.analysis }].map((p: any, i: number) => (
                  <div key={i} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-slate-900 dark:text-white">{p.name || `Project ${i + 1}`}</h4>
                    {p.technologies && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {p.technologies.map((t: string, j: number) => (
                          <Badge key={j} variant="neutral">{t}</Badge>
                        ))}
                      </div>
                    )}
                    {p.feedback && <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{p.feedback}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No project details detected. Consider adding a Projects section with technologies used and impact.</p>
              </div>
            )}
            {(projectsData?.suggestions ?? []).length > 0 && (
              <div className="mt-6">
                <h4 className="font-bold text-slate-900 dark:text-white mb-3">Improvement Tips</h4>
                <ul className="space-y-2">
                  {projectsData.suggestions.map((s: string, i: number) => (
                    <li key={i} className="flex items-start text-sm text-slate-600 dark:text-slate-400">
                      <ChevronRight className="w-4 h-4 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        </div>
      )
    },
    {
      label: 'Formatting',
      icon: <Layout className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <Card padding="lg">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">ATS Formatting Check</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Poor formatting can prevent ATS systems from reading your resume correctly.
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className={`text-lg font-bold px-4 py-2 rounded-xl ${
                  formattingData?.riskLevel === 'low' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                  formattingData?.riskLevel === 'medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                  'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
                }`}>
                  {formattingData?.riskLevel === 'low' ? '🟢' : formattingData?.riskLevel === 'medium' ? '🟡' : '🔴'} {formattingData?.riskLevel?.toUpperCase()} Risk
                </div>
              </div>
            </div>

            <ProgressBar value={(formattingData?.score ?? 0) / 20 * 100} label="Formatting Score" sublabel={`${formattingData?.score ?? 0} / 20`} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div>
                <h4 className="font-bold text-emerald-700 dark:text-emerald-400 mb-3 flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2" /> Good
                </h4>
                <ul className="space-y-2">
                  {(formattingData?.goodPoints ?? []).map((p: string, i: number) => (
                    <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex items-start">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-rose-700 dark:text-rose-400 mb-3 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2" /> Issues
                </h4>
                <ul className="space-y-2">
                  {(formattingData?.issues ?? []).map((p: string, i: number) => (
                    <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex items-start">
                      <AlertTriangle className="w-3 h-3 text-amber-500 mt-1 mr-2 flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>
      )
    },
    {
      label: 'Grammar',
      icon: <BookOpen className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <Card padding="lg">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Writing Quality</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Grammar, spelling, and writing style analysis.
                </p>
              </div>
              <div className="mt-4 md:mt-0 w-32">
                <CircularGauge value={grammarData?.score ?? 0} size="sm" />
              </div>
            </div>

            {(grammarData?.issues ?? []).length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left py-3 px-2 font-bold text-slate-700 dark:text-slate-300">Issue</th>
                      <th className="text-left py-3 px-2 font-bold text-slate-700 dark:text-slate-300">Type</th>
                      <th className="text-left py-3 px-2 font-bold text-slate-700 dark:text-slate-300">Suggestion</th>
                      <th className="text-left py-3 px-2 font-bold text-slate-700 dark:text-slate-300">Severity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grammarData.issues.map((issue: any, i: number) => (
                      <tr key={i} className="border-b border-slate-100 dark:border-slate-800">
                        <td className="py-3 px-2 text-slate-600 dark:text-slate-400">{issue.original}</td>
                        <td className="py-3 px-2">
                          <Badge variant="neutral">{issue.type}</Badge>
                        </td>
                        <td className="py-3 px-2 text-slate-700 dark:text-slate-300">{issue.suggestion}</td>
                        <td className="py-3 px-2">
                          <Badge variant={issue.severity === 'high' ? 'missing' : issue.severity === 'medium' ? 'warning' : 'neutral'}>
                            {issue.severity}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <p className="text-slate-600 dark:text-slate-400">No significant grammar issues detected. Great writing quality!</p>
              </div>
            )}
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
                <div key={idx} className={`border-l-4 ${borderColors[rec.priority]} ${bgColors[rec.priority]} p-5 rounded-r-xl`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-slate-900 dark:text-white">{rec.problem}</h4>
                    <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${textColors[rec.priority]} bg-white dark:bg-slate-800`}>
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
