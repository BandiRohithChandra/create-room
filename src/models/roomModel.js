const db = require('../utils/db');

// Insert Room
const insertRoom = (name, description) => {
    const sql = 'INSERT INTO rooms (name, description) VALUES (?, ?)';
    db.run(sql, [name, description], function(err) {
        if (err) {
            console.error('Error inserting room:', err.message);
        } else {
            console.log(`Room added with ID: ${this.lastID}`);
        }
    });
};

// Get all Rooms
const getRooms = (callback) => {
    const sql = 'SELECT * FROM rooms';
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Error fetching rooms:', err.message);
        } else {
            callback(rows);
        }
    });
};

// Update Room
const updateRoom = (id, name, description) => {
    const sql = 'UPDATE rooms SET name = ?, description = ? WHERE id = ?';
    db.run(sql, [name, description, id], function(err) {
        if (err) {
            console.error('Error updating room:', err.message);
        } else {
            console.log(`Room updated with ID: ${id}`);
        }
    });
};

// Delete Room
const deleteRoom = (id) => {
    const sql = 'DELETE FROM rooms WHERE id = ?';
    db.run(sql, [id], function(err) {
        if (err) {
            console.error('Error deleting room:', err.message);
        } else {
            console.log(`Room deleted with ID: ${id}`);
        }
    });
};

module.exports = { insertRoom, getRooms, updateRoom, deleteRoom };
