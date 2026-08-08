import { detectSections } from './sectionDetector';
import { analyzeKeywords } from './keywordAnalyzer';
import { extractSkills } from './skillsExtractor';
import { analyzeFormatting } from './formattingAnalyzer';
import { analyzeExperience } from './experienceAnalyzer';
import { checkGrammar } from './grammarChecker';
import { enhanceAnalysisWithGemini } from './geminiService';

export const analyzeResume = async (
  resumeText: string,
  jobDescription: string,
  jobTitle: string,
  experienceLevel: string
) => {
  const sectionsData = detectSections(resumeText);
  const keywordsData = analyzeKeywords(resumeText, jobDescription);
  const skillsData = extractSkills(resumeText, jobDescription);
  const formattingData = analyzeFormatting(resumeText);
  const experienceData = analyzeExperience(resumeText);
  const grammarData = checkGrammar(resumeText);

  // Calculate composite ATS score components
  const keywordScore = Math.round((keywordsData.matchPercentage / 100) * 25);
  const fmtScore = formattingData.score; // out of 20
  const skillsScore = Math.round((skillsData.matchPercentage / 100) * 20);
  const expScore = Math.min(experienceData.score, 15); // cap at 15
  const eduScore = sectionsData.sections.education ? 10 : 3;

  const sectionCount = Object.values(sectionsData.sections).filter(Boolean).length;
  const sectionScore = Math.min(Math.round((sectionCount / 6) * 5), 5);

  const readabilityScore = formattingData.riskLevel === 'low' ? 5 : formattingData.riskLevel === 'medium' ? 3 : 1;

  const atsScore = Math.min(Math.round(
    keywordScore + fmtScore + skillsScore + expScore + eduScore + sectionScore + readabilityScore
  ), 100);

  const jobMatch = Math.round((keywordsData.matchPercentage + skillsData.matchPercentage) / 2);
  const keywordMatchPct = keywordsData.matchPercentage;
  const formattingPct = Math.round((formattingData.score / 20) * 100);
  const resumeHealth = Math.round((atsScore * 0.4) + (grammarData.score * 0.3) + (formattingPct * 0.3));

  // Build strengths/weaknesses from analysis
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  if (keywordsData.matchPercentage >= 70) strengths.push('Strong keyword alignment with job description');
  else weaknesses.push('Resume is missing several important keywords from the job description');

  if (skillsData.matchPercentage >= 70) strengths.push('Good skills match with job requirements');
  else weaknesses.push('Skills section needs more alignment with job requirements');

  if (formattingData.riskLevel === 'low') strengths.push('Resume formatting is ATS-friendly');
  else weaknesses.push('Resume formatting may cause issues with ATS systems');

  if (grammarData.score >= 80) strengths.push('Writing quality is strong with few issues');
  else weaknesses.push('Several grammar or writing issues detected');

  if (sectionsData.sections.experience) strengths.push('Work experience section detected');
  if (sectionsData.sections.projects) strengths.push('Projects section present — great for demonstrating skills');
  if (sectionsData.sections.skills) strengths.push('Skills section is present');
  if (sectionsData.sections.education) strengths.push('Education section is present');

  if (!sectionsData.sections.summary && !sectionsData.sections.objective) {
    weaknesses.push('No professional summary or objective detected');
  }
  if (!sectionsData.sections.linkedin) weaknesses.push('LinkedIn profile URL not detected');
  if (!sectionsData.sections.github) weaknesses.push('GitHub profile URL not detected');

  if (experienceData.actionVerbCount < 3) weaknesses.push('Very few action verbs used in experience bullets');
  if (experienceData.metricsCount < 2) weaknesses.push('Lacking quantifiable metrics in experience descriptions');

  // Build quick recommendations
  const quickRecs: string[] = [];
  if (keywordsData.missingKeywords.length > 0) quickRecs.push(`Add ${Math.min(keywordsData.missingKeywords.length, 5)} missing keywords that genuinely match your skills`);
  if (!sectionsData.sections.summary) quickRecs.push('Add a professional summary tailored to the target role');
  if (experienceData.metricsCount < 2) quickRecs.push('Add measurable results and numbers to your experience bullets');
  if (formattingData.issues.length > 0) quickRecs.push('Fix formatting issues to improve ATS readability');
  if (grammarData.issues.length > 0) quickRecs.push('Review and fix grammar issues');

  // Build ATS breakdown
  const atsBreakdown: Record<string, any> = {
    keywordMatch: {
      score: keywordScore,
      max: 25,
      explanation: `${keywordsData.matchedKeywords.length} of ${keywordsData.matchedKeywords.length + keywordsData.missingKeywords.length} important keywords found`,
      suggestions: keywordsData.missingKeywords.length > 0
        ? [`Consider adding: ${keywordsData.missingKeywords.slice(0, 3).join(', ')} if you genuinely have these skills`]
        : []
    },
    formatting: {
      score: fmtScore,
      max: 20,
      explanation: `${formattingData.goodPoints.length} positive formatting aspects, ${formattingData.issues.length} issues found`,
      suggestions: formattingData.suggestions || []
    },
    skillsMatch: {
      score: skillsScore,
      max: 20,
      explanation: `${skillsData.matchedSkills.length} skills match with ${skillsData.missingSkills.length} skills missing`,
      suggestions: skillsData.missingSkills.length > 0
        ? [`Skills to add if applicable: ${skillsData.missingSkills.slice(0, 3).join(', ')}`]
        : []
    },
    experienceRelevance: {
      score: expScore,
      max: 15,
      explanation: `${experienceData.actionVerbCount} action verbs and ${experienceData.metricsCount} quantifiable metrics detected`,
      suggestions: experienceData.actionVerbCount < 3
        ? ['Start bullet points with strong action verbs like Developed, Implemented, Optimized']
        : []
    },
    education: {
      score: eduScore,
      max: 10,
      explanation: sectionsData.sections.education ? 'Education section detected' : 'No education section found',
      suggestions: !sectionsData.sections.education ? ['Add an education section with degree, institution, and dates'] : []
    },
    sectionCompleteness: {
      score: sectionScore,
      max: 5,
      explanation: `${sectionCount} of 6 recommended sections detected`,
      suggestions: sectionCount < 5 ? ['Consider adding missing sections: Skills, Projects, Certifications'] : []
    },
    atsReadability: {
      score: readabilityScore,
      max: 5,
      explanation: `ATS readability risk: ${formattingData.riskLevel}`,
      suggestions: formattingData.riskLevel !== 'low'
        ? ['Use simple formatting, avoid tables, columns, and graphics']
        : []
    }
  };

  // Build section checklist for frontend
  const sectionChecklist = [
    { name: 'Contact Information', found: sectionsData.sections.email || sectionsData.sections.phone, warning: false, description: sectionsData.sections.email && sectionsData.sections.phone ? undefined : 'Add email and phone number' },
    { name: 'Professional Summary', found: sectionsData.sections.summary || sectionsData.sections.objective, warning: !sectionsData.sections.summary && !sectionsData.sections.objective, description: 'Recommended for targeting specific roles' },
    { name: 'Education', found: sectionsData.sections.education, warning: false, description: !sectionsData.sections.education ? 'Add your educational background' : undefined },
    { name: 'Work Experience', found: sectionsData.sections.experience, warning: !sectionsData.sections.experience, description: !sectionsData.sections.experience ? 'Critical section for most roles' : undefined },
    { name: 'Skills', found: sectionsData.sections.skills, warning: false, description: !sectionsData.sections.skills ? 'Add a skills section' : undefined },
    { name: 'Projects', found: sectionsData.sections.projects, warning: false, description: !sectionsData.sections.projects ? 'Recommended for students/freshers' : undefined },
    { name: 'Certifications', found: sectionsData.sections.certifications, warning: false },
    { name: 'Achievements', found: sectionsData.sections.achievements, warning: false },
    { name: 'LinkedIn', found: sectionsData.sections.linkedin, warning: !sectionsData.sections.linkedin, description: 'Add your LinkedIn profile URL' },
    { name: 'GitHub', found: sectionsData.sections.github, warning: !sectionsData.sections.github, description: 'Recommended for tech roles' },
  ];

  // Build prioritized recommendations
  const recommendations: Array<{ priority: 'high' | 'medium' | 'low'; problem: string; whyItMatters: string; suggestedAction: string }> = [];

  if (keywordsData.missingKeywords.length > 3) {
    recommendations.push({
      priority: 'high',
      problem: `Missing ${keywordsData.missingKeywords.length} important keywords`,
      whyItMatters: 'ATS systems filter resumes based on keyword matches. Missing keywords significantly reduce your chances.',
      suggestedAction: `Add these keywords naturally if you have the skills: ${keywordsData.missingKeywords.slice(0, 5).join(', ')}`
    });
  }

  if (!sectionsData.sections.summary && !sectionsData.sections.objective) {
    recommendations.push({
      priority: 'high',
      problem: 'No professional summary or objective',
      whyItMatters: 'A targeted summary helps recruiters quickly understand your fit for the role.',
      suggestedAction: `Write a 2-3 sentence summary highlighting your relevant experience for ${jobTitle || 'the target role'}`
    });
  }

  if (experienceData.metricsCount < 2) {
    recommendations.push({
      priority: 'high',
      problem: 'Lacking quantifiable achievements',
      whyItMatters: 'Numbers and metrics make your accomplishments concrete and memorable.',
      suggestedAction: 'Add real metrics to your bullets: percentages, dollar amounts, user counts, time saved'
    });
  }

  if (skillsData.missingSkills.length > 0) {
    recommendations.push({
      priority: 'medium',
      problem: `${skillsData.missingSkills.length} required skills not listed`,
      whyItMatters: 'Skills matching is a primary filter in ATS scoring.',
      suggestedAction: `Add skills you genuinely have: ${skillsData.missingSkills.slice(0, 4).join(', ')}`
    });
  }

  if (formattingData.issues.length > 0) {
    recommendations.push({
      priority: 'medium',
      problem: 'ATS formatting issues detected',
      whyItMatters: 'Poor formatting can prevent ATS from parsing your resume correctly.',
      suggestedAction: formattingData.issues[0]
    });
  }

  if (!sectionsData.sections.github && !sectionsData.sections.portfolio) {
    recommendations.push({
      priority: 'medium',
      problem: 'No GitHub or portfolio link',
      whyItMatters: 'Links to your work help recruiters verify your skills.',
      suggestedAction: 'Add GitHub profile or portfolio URL to your contact section'
    });
  }

  if (experienceData.weakBullets.length > 0) {
    recommendations.push({
      priority: 'medium',
      problem: `${experienceData.weakBullets.length} weak experience bullet(s)`,
      whyItMatters: 'Strong action-oriented bullets improve readability and impression.',
      suggestedAction: experienceData.weakBullets[0]?.suggestion || 'Use action verbs and include specific results'
    });
  }

  if (grammarData.issues.length > 0) {
    recommendations.push({
      priority: 'low',
      problem: `${grammarData.issues.length} grammar/writing issue(s) found`,
      whyItMatters: 'Clean writing demonstrates professionalism and attention to detail.',
      suggestedAction: `Fix: ${grammarData.issues[0]?.suggestion || 'Review flagged issues'}`
    });
  }

  // Enhance with Gemini if available
  let aiEnhancements: any = null;
  try {
    aiEnhancements = await enhanceAnalysisWithGemini(resumeText, jobDescription);
  } catch (error) {
    console.warn('Gemini enhancement failed, continuing with rule-based results', error);
  }

  // Build final result matching frontend AnalysisResult interface
  const result = {
    atsScore,
    jobMatch,
    keywordMatch: keywordMatchPct,
    formatting: formattingPct,
    resumeHealth,
    overview: {
      summary: aiEnhancements?.summaryAnalysis ||
        `Your resume received an ATS score of ${atsScore}/100. ${strengths.length > 0 ? strengths[0] + '.' : ''} ${weaknesses.length > 0 ? 'Key area to improve: ' + weaknesses[0] + '.' : ''}`,
      strengths,
      weaknesses,
      recommendations: quickRecs
    },
    atsBreakdown,
    keywords: {
      matchPercentage: keywordMatchPct,
      matched: keywordsData.matchedKeywords,
      missing: keywordsData.missingKeywords
    },
    skills: {
      matchPercentage: skillsData.matchPercentage,
      technical: skillsData.technical,
      tools: skillsData.tools,
      soft: skillsData.softSkills || [],
      matched: skillsData.matchedSkills,
      missing: skillsData.missingSkills,
      required: skillsData.missingSkills || []
    },
    experience: {
      score: experienceData.score,
      actionVerbs: experienceData.actionVerbCount,
      quantifiableMetrics: experienceData.metricsCount,
      weakBullets: (experienceData.weakBullets || []).map((b: any) => ({
        original: b.text || b.original || '',
        suggestion: b.suggestion || ''
      })),
      recommendations: experienceData.suggestions || []
    },
    projects: {
      analysis: aiEnhancements?.projectAnalysis || 'Project analysis based on detected content.',
      technologies: skillsData.technical.slice(0, 10),
      suggestions: [
        'Include specific technologies used in each project',
        'Add measurable impact or user metrics',
        'Link to live demos or GitHub repositories when possible'
      ],
      hasLinks: resumeText.toLowerCase().includes('github.com/') || resumeText.toLowerCase().includes('http')
    },
    formattingDetails: {
      score: formattingData.score,
      riskLevel: formattingData.riskLevel,
      goodPoints: formattingData.goodPoints,
      issues: formattingData.issues,
      suggestions: formattingData.suggestions || []
    },
    grammar: {
      score: grammarData.score,
      issues: grammarData.issues.map((issue: any) => ({
        original: issue.text || issue.original || '',
        type: issue.type || 'grammar',
        suggestion: issue.suggestion || '',
        severity: issue.severity || 'low'
      })),
      summary: grammarData.issues.length === 0
        ? 'No significant grammar issues detected.'
        : `${grammarData.issues.length} issue(s) found that should be reviewed.`
    },
    recommendations,
    sections: sectionChecklist,
    extractedText: resumeText
  };

  return result;
};
