export const checkGrammar = (resumeText: string) => {
  let score = 100;
  const issues: { text: string; type: string; suggestion: string; severity: string }[] = [];

  if (/\s{2,}/.test(resumeText)) {
    issues.push({
      text: 'Multiple spaces detected.',
      type: 'Formatting',
      suggestion: 'Remove extra spaces between words.',
      severity: 'low'
    });
    score -= 5;
  }

  const weakWords = ['helped', 'worked', 'did', 'responsible for'];
  weakWords.forEach(word => {
    if (resumeText.toLowerCase().includes(word)) {
      issues.push({
        text: `Found weak phrase: "${word}"`,
        type: 'Word Choice',
        suggestion: 'Replace with a stronger action verb (e.g., spearheaded, managed, developed).',
        severity: 'medium'
      });
      score -= 5;
    }
  });

  if (/\b(am|is|are|was|were|being|been|be)\b\s+\w+ed\b/i.test(resumeText)) {
    issues.push({
      text: 'Passive voice detected.',
      type: 'Grammar',
      suggestion: 'Rewrite sentences in active voice for stronger impact.',
      severity: 'medium'
    });
    score -= 10;
  }

  score = Math.max(0, score);

  return {
    score,
    issues
  };
};
