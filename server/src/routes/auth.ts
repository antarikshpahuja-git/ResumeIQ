import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDb, saveDatabase } from '../models/database';
import { config } from '../config';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  try {
    const db = getDb();
    const hash = await bcrypt.hash(password, 10);
    
    // Check if email already exists
    const existing = db.exec('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0 && existing[0].values.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    db.run('INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)', [email, hash, name || '']);
    saveDatabase();

    // Get the newly created user's ID
    const result = db.exec('SELECT last_insert_rowid() as id');
    const userId = result[0].values[0][0] as number;

    const token = jwt.sign({ id: userId, email }, config.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: userId, name, email } });
  } catch (err: any) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const db = getDb();
    const result = db.exec('SELECT * FROM users WHERE email = ?', [email]);
    
    if (result.length === 0 || result[0].values.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const columns = result[0].columns;
    const values = result[0].values[0];
    const user: any = {};
    columns.forEach((col: string, i: number) => { user[col] = values[i]; });

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, config.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

router.get('/me', requireAuth, (req: AuthRequest, res) => {
  try {
    const db = getDb();
    const result = db.exec('SELECT id, name, email, created_at FROM users WHERE id = ?', [req.user?.id]);
    
    if (result.length === 0 || result[0].values.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const columns = result[0].columns;
    const values = result[0].values[0];
    const user: any = {};
    columns.forEach((col: string, i: number) => { user[col] = values[i]; });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

export default router;
