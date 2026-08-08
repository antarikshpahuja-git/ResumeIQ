export const detectSections = (text: string) => {
  const sections = {
    name: false,
    email: false,
    phone: false,
    linkedin: false,
    github: false,
    portfolio: false,
    summary: false,
    objective: false,
    education: false,
    experience: false,
    internships: false,
    projects: false,
    skills: false,
    certifications: false,
    achievements: false,
    extracurricular: false,
    languages: false
  };

  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  
  if (lines.length > 0) {
    sections.name = true; // Assume first prominent text is name
  }

  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/i;
  const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
  
  const detectedEmail = text.match(emailRegex)?.[0] || null;
  const detectedPhone = text.match(phoneRegex)?.[0] || null;
  
  sections.email = !!detectedEmail;
  sections.phone = !!detectedPhone;
  sections.linkedin = /linkedin\.com\/in/i.test(text);
  sections.github = /github\.com/i.test(text);
  sections.portfolio = /(portfolio|website)/i.test(text) && /https?:\/\//i.test(text);

  const lowerText = text.toLowerCase();
  
  sections.summary = /\b(summary|profile|professional summary)\b/.test(lowerText);
  sections.objective = /\b(objective|career objective)\b/.test(lowerText);
  sections.education = /\b(education|academic background|qualifications)\b/.test(lowerText);
  sections.experience = /\b(experience|work experience|employment|professional experience)\b/.test(lowerText);
  sections.internships = /\b(internship|internships)\b/.test(lowerText);
  sections.projects = /\b(projects|academic projects|personal projects)\b/.test(lowerText);
  sections.skills = /\b(skills|technical skills|core competencies)\b/.test(lowerText);
  sections.certifications = /\b(certifications|certificates)\b/.test(lowerText);
  sections.achievements = /\b(achievements|awards|honors)\b/.test(lowerText);
  sections.extracurricular = /\b(extracurricular|activities|leadership)\b/.test(lowerText);
  sections.languages = /\b(languages)\b/.test(lowerText);

  let isEmailProfessional = true;
  const contactIssues: string[] = [];
  if (detectedEmail) {
    if (detectedEmail.includes('cool') || detectedEmail.includes('player') || detectedEmail.includes('123')) {
      isEmailProfessional = false;
      contactIssues.push('Email address might not look professional.');
    }
  }
  if (!detectedPhone) {
    contactIssues.push('No phone number detected.');
  }

  return {
    sections,
    detectedEmail,
    detectedPhone,
    isEmailProfessional,
    contactIssues
  };
};
