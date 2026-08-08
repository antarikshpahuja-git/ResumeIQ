const actionVerbs = ['achieved', 'improved', 'developed', 'managed', 'created', 'led', 'designed', 'increased', 'reduced', 'implemented', 'orchestrated', 'spearheaded', 'resolved', 'delivered'];

export const analyzeExperience = (resumeText: string) => {
  let score = 15;
  const lines = resumeText.split('\n');
  const bulletLines = lines.filter(l => /^[•\*\-]/.test(l.trim()));
  
  let actionVerbCount = 0;
  let metricsCount = 0;
  const weakBullets: { text: string; suggestion: string }[] = [];
  const suggestions: string[] = [];

  bulletLines.forEach(line => {
    const text = line.toLowerCase();
    
    const hasActionVerb = actionVerbs.some(verb => text.includes(verb));
    if (hasActionVerb) actionVerbCount++;
    
    const hasMetric = /\d+%|\$\d+|\d+x|\d+ \w+/i.test(text);
    if (hasMetric) metricsCount++;
    
    if (!hasActionVerb || !hasMetric) {
      if (weakBullets.length < 5) {
        weakBullets.push({
          text: line.trim().substring(0, 50) + '...',
          suggestion: 'Start with a strong action verb and include quantifiable results.'
        });
      }
    }
  });

  if (actionVerbCount < bulletLines.length * 0.5) {
    score -= 5;
    suggestions.push('Use more action verbs to start your bullet points.');
  }
  if (metricsCount < 3) {
    score -= 5;
    suggestions.push('Add more numbers and metrics to quantify your achievements.');
  }

  score = Math.max(0, score);

  return {
    score,
    actionVerbCount,
    metricsCount,
    weakBullets,
    totalBullets: bulletLines.length,
    suggestions
  };
};
