const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Set up the SQLite database
const dbPath = path.resolve(__dirname, 'database.db'); // Use file-based SQLite
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Initialize SQLite database schema
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS rooms (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, room_id TEXT)");
});

module.exports = db;
