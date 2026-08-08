export const analyzeFormatting = (resumeText: string) => {
  let score = 20;
  const issues: string[] = [];
  const goodPoints: string[] = [];
  const suggestions: string[] = [];
  
  if (resumeText.includes('|') && (resumeText.match(/\|/g) || []).length > 5) {
    score -= 5;
    issues.push('Possible use of tables or columns detected via pipe characters.');
    suggestions.push('Avoid using tables or multi-column layouts as ATS cannot parse them reliably.');
  } else {
    goodPoints.push('No complex tables or column layouts detected.');
  }

  const specialChars = (resumeText.match(/[^\w\s.,\-()/:@]/g) || []).length;
  if (specialChars > 30) {
    score -= 3;
    issues.push('Excessive special characters or complex graphics detected.');
    suggestions.push('Stick to standard bullet points instead of custom symbols.');
  }

  const bulletCount = (resumeText.match(/•|\*|-/g) || []).length;
  if (bulletCount < 5) {
    score -= 5;
    issues.push('Low use of bullet points detected.');
    suggestions.push('Use more bullet points in your experience section to improve readability.');
  } else {
    goodPoints.push('Good use of bullet points for readability.');
  }

  const length = resumeText.length;
  if (length < 1000) {
    score -= 2;
    issues.push('Resume seems too short.');
  } else if (length > 6000) {
    score -= 4;
    issues.push('Resume might be longer than 2 pages.');
    suggestions.push('Keep your resume concise, ideally 1-2 pages.');
  } else {
    goodPoints.push('Resume length is optimal.');
  }

  score = Math.max(0, score);
  const riskLevel = score >= 16 ? 'low' : score >= 10 ? 'medium' : 'high';

  return {
    score,
    riskLevel,
    goodPoints,
    issues,
    suggestions
  };
};
