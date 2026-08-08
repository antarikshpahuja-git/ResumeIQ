export const demoResumeText = `Alex Johnson
Software Developer
Email: alex.johnson@example.com | Phone: 555-010-9999 | LinkedIn: linkedin.com/in/alexj | GitHub: github.com/alexj

PROFESSIONAL SUMMARY
Results-driven software developer with 4 years of experience building scalable web applications. Proficient in React, Node.js, and cloud technologies. Passionate about creating clean, maintainable code and delivering excellent user experiences.

WORK EXPERIENCE
Tech Solutions Inc. - Frontend Developer (2020 - Present)
• Developed responsive web applications using React and TypeScript, increasing user engagement by 25%.
• Collaborated with backend teams to integrate REST APIs, serving 50,000+ daily requests.
• Reduced page load time by 40% through code optimization and lazy loading.
• Participated in agile ceremonies and sprint planning.
• Mentored 2 junior developers on React best practices.

CodeCraft Startup - Full Stack Intern (2019 - 2020)
• Built a customer dashboard using React and Node.js for a SaaS product.
• Wrote unit tests achieving 85% code coverage.
• Worked on a project to migrate legacy jQuery code to React.

PROJECTS
E-Commerce Platform | React, Node.js, MongoDB, Stripe
• Built a full-stack e-commerce platform with product management, cart, and payment processing.
• Integrated Stripe payment gateway handling $10,000+ in test transactions.
• GitHub: github.com/alexj/ecommerce-platform

Task Manager App | React, Express, PostgreSQL
• Developed a collaborative task management application with real-time updates.
• Implemented drag-and-drop functionality and user authentication.

EDUCATION
Bachelor of Science in Computer Science
University of Technology (2016 - 2020)
GPA: 3.7/4.0

SKILLS
Technical Skills: JavaScript, TypeScript, React, Node.js, Express, HTML, CSS, SQL, Git, AWS
Tools: VS Code, GitHub, Jira, Figma
Soft Skills: Teamwork, Problem Solving, Communication, Leadership

CERTIFICATIONS
AWS Cloud Practitioner (2022)
`;

export const demoJobDescription = `We are looking for a Software Developer to join our team. 
Responsibilities:
- Build modern user interfaces using React and TypeScript.
- Develop backend services using Node.js and Express.
- Work with relational databases like PostgreSQL.
- Deploy applications to AWS using Docker containers.
- Implement CI/CD pipelines for automated deployment.
- Write unit and integration tests.
Requirements:
- 3+ years of experience in full-stack development.
- Strong knowledge of JavaScript, TypeScript, React, and Node.js.
- Experience with Git, Docker, and CI/CD pipelines.
- Familiarity with cloud services (AWS preferred).
- Good communication and teamwork skills.
- Experience with Agile/Scrum methodologies.
Preferred:
- Experience with GraphQL.
- Knowledge of microservices architecture.
- Contributions to open-source projects.`;

export const demoAnalysisResults = {
  atsScore: 82,
  jobMatch: 78,
  keywordMatch: 76,
  formatting: 90,
  resumeHealth: 84,
  overview: {
    summary: 'Your resume received an ATS score of 82/100. Strong keyword alignment with the job description and good technical skills coverage. Key areas to improve: adding Docker and CI/CD experience, and including more quantifiable metrics in your bullet points.',
    strengths: [
      'Strong keyword alignment with job description',
      'Good skills match with job requirements',
      'Resume formatting is ATS-friendly',
      'Writing quality is strong with few issues',
      'Work experience section detected',
      'Projects section present — great for demonstrating skills',
      'Skills section is present',
      'Education section is present'
    ],
    weaknesses: [
      'Missing Docker and CI/CD — key requirements from the job description',
      'No GraphQL or microservices experience mentioned',
      'LinkedIn profile URL could be more prominent',
      'Some experience bullets could use stronger action verbs'
    ],
    recommendations: [
      'Add Docker and CI/CD keywords if you genuinely have this experience',
      'Add measurable results to more experience bullets',
      'Consider adding a professional summary tailored for this specific role',
      'Fix minor formatting issues for better ATS readability'
    ]
  },
  atsBreakdown: {
    keywordMatch: {
      score: 19,
      max: 25,
      explanation: '7 of 10 important keywords found in resume',
      suggestions: ['Consider adding Docker, CI/CD, and GraphQL if you have experience with these']
    },
    formatting: {
      score: 18,
      max: 20,
      explanation: '6 positive formatting aspects, 1 minor issue found',
      suggestions: ['Ensure consistent date formatting throughout']
    },
    skillsMatch: {
      score: 16,
      max: 20,
      explanation: '9 skills match with 3 skills missing from job requirements',
      suggestions: ['Skills to add if applicable: Docker, CI/CD, PostgreSQL']
    },
    experienceRelevance: {
      score: 12,
      max: 15,
      explanation: '5 action verbs and 4 quantifiable metrics detected',
      suggestions: ['Add specific numbers and outcomes to remaining bullet points']
    },
    education: {
      score: 10,
      max: 10,
      explanation: 'Education section detected with degree and GPA',
      suggestions: []
    },
    sectionCompleteness: {
      score: 5,
      max: 5,
      explanation: '8 of 6 recommended sections detected',
      suggestions: []
    },
    atsReadability: {
      score: 5,
      max: 5,
      explanation: 'ATS readability risk: low',
      suggestions: []
    }
  },
  keywords: {
    matchPercentage: 76,
    matched: ['React', 'TypeScript', 'Node.js', 'Express', 'AWS', 'Git', 'JavaScript', 'PostgreSQL', 'Agile'],
    missing: ['Docker', 'CI/CD', 'GraphQL', 'microservices']
  },
  skills: {
    matchPercentage: 84,
    technical: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'HTML', 'CSS', 'SQL', 'MongoDB'],
    tools: ['Git', 'VS Code', 'GitHub', 'Jira', 'Figma', 'Stripe'],
    soft: ['Teamwork', 'Problem Solving', 'Communication', 'Leadership'],
    matched: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'AWS', 'Git', 'Communication', 'Teamwork'],
    missing: ['Docker', 'CI/CD', 'GraphQL'],
    required: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Docker', 'CI/CD', 'Git', 'AWS']
  },
  experience: {
    score: 75,
    actionVerbs: 8,
    quantifiableMetrics: 5,
    weakBullets: [
      {
        original: 'Participated in agile ceremonies and sprint planning.',
        suggestion: 'Led sprint planning sessions for a 6-person team, improving sprint completion rate by 15% over 3 months.'
      },
      {
        original: 'Worked on a project to migrate legacy jQuery code to React.',
        suggestion: 'Migrated 15,000+ lines of legacy jQuery to React, reducing bundle size by 30% and improving maintainability.'
      }
    ],
    recommendations: [
      'Start bullet points with strong action verbs like Architected, Spearheaded, Optimized',
      'Add specific metrics to remaining bullets — numbers, percentages, dollar amounts',
      'Quantify the impact of REST API integrations',
      'Highlight specific AWS services used (EC2, S3, Lambda, etc.)'
    ]
  },
  projects: {
    analysis: 'Two projects detected with good technical variety. The E-Commerce Platform shows full-stack capability with payment integration. Consider adding user metrics and performance benchmarks.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Express', 'PostgreSQL'],
    suggestions: [
      'Add live demo links where available',
      'Include specific performance metrics or user counts',
      'Mention your individual contribution in team projects',
      'Highlight technologies that match the job description'
    ],
    hasLinks: true
  },
  formattingDetails: {
    score: 18,
    riskLevel: 'low' as const,
    goodPoints: [
      'Clean section headings detected',
      'Consistent bullet point formatting',
      'No complex tables or columns',
      'Appropriate resume length',
      'Contact information clearly visible',
      'Professional email address'
    ],
    issues: [
      'Date formatting could be more consistent (2020 - Present vs 2019 - 2020)'
    ],
    suggestions: [
      'Standardize all dates to the same format (e.g., Jan 2020 - Present)'
    ]
  },
  grammar: {
    score: 91,
    issues: [
      {
        original: 'Participated in agile ceremonies and sprint planning.',
        type: 'weak_verb',
        suggestion: 'Use a stronger action verb like "Facilitated" or "Led"',
        severity: 'medium' as const
      },
      {
        original: 'Worked on a project to migrate legacy jQuery code to React.',
        type: 'vague_language',
        suggestion: 'Be more specific: "Architected and executed the migration of..."',
        severity: 'medium' as const
      }
    ],
    summary: '2 writing quality issues found. Overall tone is professional and clear.'
  },
  recommendations: [
    {
      priority: 'high' as const,
      problem: 'Missing Docker and CI/CD experience',
      whyItMatters: 'The job description explicitly requires Docker and CI/CD pipeline experience. These are frequently filtered by ATS.',
      suggestedAction: 'Add Docker and CI/CD to your skills section and experience bullets if you genuinely have this experience.'
    },
    {
      priority: 'high' as const,
      problem: 'Some experience bullets lack quantifiable metrics',
      whyItMatters: 'Numbers and metrics make your accomplishments concrete, memorable, and verifiable.',
      suggestedAction: 'Add real metrics to the 2 weak bullets identified in the Experience tab.'
    },
    {
      priority: 'medium' as const,
      problem: 'No GraphQL or microservices experience listed',
      whyItMatters: 'These are listed as preferred qualifications and could differentiate your application.',
      suggestedAction: 'If you have any GraphQL or microservices experience, add it to relevant project or experience bullets.'
    },
    {
      priority: 'medium' as const,
      problem: 'Professional summary could be more targeted',
      whyItMatters: 'A tailored summary helps recruiters quickly see your fit for this specific role.',
      suggestedAction: 'Rewrite summary to mention full-stack development, React/Node.js expertise, and cloud deployment experience.'
    },
    {
      priority: 'low' as const,
      problem: 'Minor formatting inconsistency in dates',
      whyItMatters: 'Consistent formatting shows attention to detail and improves readability.',
      suggestedAction: 'Standardize all dates to "Month Year - Month Year" format.'
    },
    {
      priority: 'low' as const,
      problem: '2 weak action verbs detected',
      whyItMatters: 'Strong action verbs create a more impactful impression.',
      suggestedAction: 'Replace "Participated" and "Worked on" with stronger alternatives like "Led" and "Architected".'
    }
  ],
  sections: [
    { name: 'Contact Information', found: true, warning: false },
    { name: 'Professional Summary', found: true, warning: false },
    { name: 'Education', found: true, warning: false },
    { name: 'Work Experience', found: true, warning: false },
    { name: 'Skills', found: true, warning: false },
    { name: 'Projects', found: true, warning: false },
    { name: 'Certifications', found: true, warning: false },
    { name: 'Achievements', found: false, warning: false, description: 'Consider adding notable achievements' },
    { name: 'LinkedIn', found: true, warning: false },
    { name: 'GitHub', found: true, warning: false }
  ],
  extractedText: `Alex Johnson\nSoftware Developer\nEmail: alex.johnson@example.com | Phone: 555-010-9999 | LinkedIn: linkedin.com/in/alexj | GitHub: github.com/alexj\n\nPROFESSIONAL SUMMARY\nResults-driven software developer with 4 years of experience...\n\n[Full resume text displayed here]`
};
