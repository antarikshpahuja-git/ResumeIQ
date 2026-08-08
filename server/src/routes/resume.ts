import { Router } from 'express';
import { upload } from '../middleware/upload';
import { authenticate, AuthRequest } from '../middleware/auth';
import { parseResume } from '../services/parser';
import { analyzeResume } from '../services/analyzer';
import { demoAnalysisResults, demoResumeText, demoJobDescription } from '../services/demoData';
import { getDb, saveDatabase } from '../models/database';

const router = Router();

router.post('/upload', upload.single('resume'), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const parsed = await parseResume(req.file.buffer, req.file.mimetype);
    res.json({ 
      text: parsed.text, 
      format: parsed.format, 
      pageCount: parsed.pageCount,
      filename: req.file.originalname 
    });
  } catch (err) {
    next(err);
  }
});

router.post('/analyze', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { resumeText, jobDescription, jobTitle, experienceLevel, filename } = req.body;
    
    if (!resumeText) return res.status(400).json({ error: 'Resume text is required' });

    const results = await analyzeResume(resumeText, jobDescription, jobTitle, experienceLevel);

    if (req.user) {
      try {
        const db = getDb();
        db.run(
          `INSERT INTO analyses (user_id, resume_name, resume_text, job_title, job_description, results_json, ats_score, job_match) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            req.user.id,
            filename || 'Untitled Resume',
            resumeText,
            jobTitle || '',
            jobDescription || '',
            JSON.stringify(results),
            results.atsScore,
            results.jobMatch
          ]
        );
        saveDatabase();
      } catch (dbErr) {
        console.error('Failed to save analysis to history:', dbErr);
        // Don't fail the request just because history save failed
      }
    }

    res.json(results);
  } catch (err) {
    next(err);
  }
});

router.get('/demo', (req, res) => {
  res.json({
    resumeText: demoResumeText,
    jobDescription: demoJobDescription,
    results: demoAnalysisResults
  });
});

router.delete('/data', (req, res) => {
  // Clear any session specific data if managed via cookies/session storage
  res.json({ message: 'Session data cleared' });
});

export default router;
