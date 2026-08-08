const stopWords = new Set(['the', 'and', 'a', 'to', 'of', 'in', 'i', 'is', 'that', 'it', 'on', 'you', 'this', 'for', 'but', 'with', 'are', 'have', 'be', 'at', 'or', 'as', 'was', 'so', 'if', 'out', 'not', 'we', 'my', 'can']);

export const analyzeKeywords = (resumeText: string, jobDescription: string) => {
  if (!jobDescription) {
    return { matchedKeywords: [], missingKeywords: [], matchPercentage: 0, totalKeywords: 0 };
  }

  const cleanJD = jobDescription.toLowerCase().replace(/[^\w\s]/g, '');
  const cleanResume = resumeText.toLowerCase();
  
  const words = cleanJD.split(/\s+/).filter(w => w.length > 2 && !stopWords.has(w));
  
  const wordFrequency: Record<string, number> = {};
  words.forEach(w => { wordFrequency[w] = (wordFrequency[w] || 0) + 1; });
  
  const jdKeywords = Object.keys(wordFrequency)
    .sort((a, b) => wordFrequency[b] - wordFrequency[a])
    .slice(0, 20);

  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  jdKeywords.forEach(kw => {
    if (cleanResume.includes(kw)) {
      matchedKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  });

  const totalKeywords = jdKeywords.length;
  const matchPercentage = totalKeywords > 0 ? Math.round((matchedKeywords.length / totalKeywords) * 100) : 0;

  return {
    matchedKeywords,
    missingKeywords,
    matchPercentage,
    totalKeywords
  };
};
