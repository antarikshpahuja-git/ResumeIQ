const dictionaries = {
  technical: ['javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'ruby', 'php', 'swift', 'go', 'rust', 'html', 'css', 'sql', 'nosql', 'react', 'angular', 'vue', 'node.js', 'express', 'django', 'flask', 'spring', 'mongodb', 'postgresql', 'mysql'],
  tools: ['git', 'github', 'gitlab', 'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'jira', 'trello', 'slack', 'figma', 'postman', 'jenkins', 'ci/cd', 'webpack', 'linux', 'bash'],
  soft: ['leadership', 'communication', 'teamwork', 'problem solving', 'agile', 'scrum', 'time management', 'adaptability', 'critical thinking']
};

export const extractSkills = (resumeText: string, jobDescription: string) => {
  const lowerResume = resumeText.toLowerCase();
  const lowerJD = jobDescription ? jobDescription.toLowerCase() : '';

  const foundTechnical = dictionaries.technical.filter(s => lowerResume.includes(s));
  const foundTools = dictionaries.tools.filter(s => lowerResume.includes(s));
  const foundSoft = dictionaries.soft.filter(s => lowerResume.includes(s));

  const jdSkills = [
    ...dictionaries.technical.filter(s => lowerJD.includes(s)),
    ...dictionaries.tools.filter(s => lowerJD.includes(s)),
    ...dictionaries.soft.filter(s => lowerJD.includes(s))
  ];

  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  if (jdSkills.length > 0) {
    jdSkills.forEach(s => {
      if (lowerResume.includes(s)) matchedSkills.push(s);
      else missingSkills.push(s);
    });
  }

  const matchPercentage = jdSkills.length > 0 ? Math.round((matchedSkills.length / jdSkills.length) * 100) : 100;

  return {
    technical: foundTechnical,
    tools: foundTools,
    softSkills: foundSoft,
    matchedSkills,
    missingSkills,
    matchPercentage
  };
};
