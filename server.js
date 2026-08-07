const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from workspace root
app.use(express.static(path.join(__dirname)));

// Initialize SQLite DB
const dbFile = path.join(__dirname, 'auth.db');
const db = new sqlite3.Database(dbFile, (err) => {
  if (err) {
    console.error('Failed to open database', err);
    process.exit(1);
  }
  console.log('Connected to SQLite DB:', dbFile);
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  db.run(`
CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    room TEXT,
    checkin TEXT,
    checkout TEXT,
    guests INTEGER,
    amount REAL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);
});

// Register endpoint (for creating test users)
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Missing fields' });
    const hash = await bcrypt.hash(password, 10);
    db.run('INSERT INTO users (email, password_hash) VALUES (?, ?)', [email, hash], function(err) {
      if (err) {
        if (err.code === 'SQLITE_CONSTRAINT') return res.status(409).json({ success: false, message: 'User exists' });
        return res.status(500).json({ success: false, message: 'DB error' });
      }
      res.json({ success: true, id: this.lastID });
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ success: false, message: 'Missing credentials' });
  db.get('SELECT id, email, password_hash FROM users WHERE email = ?', [email], async (err, row) => {
    if (err) return res.status(500).json({ success: false, message: 'DB error' });
    if (!row) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, row.password_hash);
    if (!match) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    // For demo, we don't create sessions — return success
    res.json({ success: true, message: 'Login successful' });
  });
});
// Save booking endpoint
app.post('/save-booking', (req, res) => {
  const { name, email, room, checkin, checkout, guests, amount } = req.body;
  db.run(
  `INSERT INTO bookings
  (name, email, room, checkin, checkout, guests, amount)
  VALUES (?, ?, ?, ?, ?, ?, ?)`,
  [name, email, room, checkin, checkout, guests, amount],
  function(err) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "DB error"
      });
    }

    res.json({
      success: true,
      id: this.lastID
    });
  }
);
});
app.listen(PORT, () => {
  
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log('Open login page at: http://localhost:' + PORT + '/login%20page.html');
});
