import { Router } from 'express';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { getDb, saveDatabase } from '../models/database';

const router = Router();
router.use(requireAuth);

router.get('/', (req: AuthRequest, res) => {
  try {
    const db = getDb();
    const result = db.exec(
      'SELECT id, resume_name, job_title, ats_score, job_match, created_at FROM analyses WHERE user_id = ? ORDER BY created_at DESC',
      [req.user?.id]
    );

    if (result.length === 0) {
      return res.json([]);
    }

    const columns = result[0].columns;
    const analyses = result[0].values.map((row: any[]) => {
      const obj: any = {};
      columns.forEach((col: string, i: number) => { obj[col] = row[i]; });
      return obj;
    });

    res.json(analyses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

router.get('/:id', (req: AuthRequest, res) => {
  try {
    const db = getDb();
    const result = db.exec('SELECT * FROM analyses WHERE id = ? AND user_id = ?', [req.params.id, req.user?.id]);

    if (result.length === 0 || result[0].values.length === 0) {
      return res.status(404).json({ error: 'Analysis not found' });
    }

    const columns = result[0].columns;
    const values = result[0].values[0];
    const analysis: any = {};
    columns.forEach((col: string, i: number) => { analysis[col] = values[i]; });

    // Parse the JSON string back to an object
    analysis.results = JSON.parse(analysis.results_json);
    delete analysis.results_json;

    res.json(analysis);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch analysis details' });
  }
});

router.delete('/:id', (req: AuthRequest, res) => {
  try {
    const db = getDb();
    // Check existence first
    const check = db.exec('SELECT id FROM analyses WHERE id = ? AND user_id = ?', [req.params.id, req.user?.id]);
    if (check.length === 0 || check[0].values.length === 0) {
      return res.status(404).json({ error: 'Analysis not found' });
    }

    db.run('DELETE FROM analyses WHERE id = ? AND user_id = ?', [req.params.id, req.user?.id]);
    saveDatabase();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete analysis' });
  }
});

export default router;
