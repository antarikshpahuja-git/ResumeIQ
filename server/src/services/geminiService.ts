import { config } from '../config';

export const enhanceAnalysisWithGemini = async (resumeText: string, jobDescription: string) => {
  if (!config.GEMINI_API_KEY) {
    return null;
  }

  try {
    // Dynamic import to handle optional dependency
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
You are an expert ATS and technical recruiter. Analyze the following resume against the job description (if provided).
Return a JSON object with these keys:
- "grammar": detailed analysis of tone and writing style.
- "experienceSuggestions": array of 2-3 specific suggestions to improve the experience bullet points.
- "projectAnalysis": review of the project section and how it stands out.
- "summaryAnalysis": review of the summary or objective.
- "personalizedRecommendations": array of 3 top actionable tips to get hired for this role.

Job Description:
${jobDescription || 'N/A (Provide general feedback)'}

Resume Text:
${resumeText.substring(0, 10000)} // Truncating to avoid token limits

Return strictly valid JSON only. Do not include markdown blocks like \`\`\`json.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    return JSON.parse(text);
  } catch (error) {
    console.error('Gemini AI Service Error:', error);
    return null;
  }
};
