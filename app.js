const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');

const app = express();

// Set up SQLite database
const db = new sqlite3.Database(path.join(__dirname, 'database.db'));

// Create a table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password TEXT)`);

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files (e.g., HTML, CSS)
app.use(express.static('public'));

// Endpoint to handle form submissions
app.post('/addUser', (req, res) => {
  const { name, password } = req.body;

  // Insert data into the 'users' table
  db.run('INSERT INTO users (name, password) VALUES (?, ?)', [name, password], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Return the newly inserted user ID
    res.json({ userId: this.lastID });
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
