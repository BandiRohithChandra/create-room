// Import the 100ms SDK
// const hmsSdk = require('@100mslive/server-sdk');

// // Initialize the 100ms client (check documentation for how the SDK is initialized)
// const hmsInstance = new hmsSdk.HMS({
//   apiKey: 'YOUR_100MS_API_KEY',  // Replace with your actual API Key
//   apiSecret: 'YOUR_100MS_API_SECRET'  // Replace with your actual API Secret
// });

// Import the database utility
const db = require('../utils/db');

// Create a room
const createRoom = (req, res) => {
    const roomName = req.body.roomName;
    if (!roomName) {
        return res.status(400).send({ error: 'Room name is required' });
    }

    // Create a room via the 100ms API
    hmsInstance.createRoom({ name: roomName })
        .then((room) => {
            // Store room in the database
            db.run(`INSERT INTO rooms (name, room_id) VALUES (?, ?)`, [roomName, room.id], function(err) {
                if (err) {
                    return res.status(500).send({ error: 'Failed to store room in database', details: err });
                }
                res.status(201).send({ message: 'Room created', room });
            });
        })
        .catch((error) => {
            res.status(500).send({ error: 'Failed to create room', details: error });
        });
};

// Generate token for a participant
const generateToken = (req, res) => {
    const roomId = req.body.roomId;
    const participantId = req.body.participantId;

    if (!roomId || !participantId) {
        return res.status(400).send({ error: 'Room ID and Participant ID are required' });
    }

    // Generate token via 100ms API
    hmsInstance.generateToken({ roomId, participantId })
        .then((token) => {
            res.status(200).send({ token });
        })
        .catch((error) => {
            res.status(500).send({ error: 'Failed to generate token', details: error });
        });
};

// List active rooms
const listActiveRooms = (req, res) => {
    db.all("SELECT * FROM rooms", [], (err, rows) => {
        if (err) {
            return res.status(500).send({ error: 'Failed to retrieve rooms', details: err });
        }
        res.status(200).send({ rooms: rows });
    });
};

module.exports = { createRoom, generateToken, listActiveRooms };
