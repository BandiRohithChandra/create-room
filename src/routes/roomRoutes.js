const express = require('express');
const router = express.Router();
const { createRoom, generateToken, listActiveRooms } = require('../controllers/roomController');

// Routes for creating a room, generating token, and listing rooms
router.post('/create-room', createRoom);
router.post('/generate-token', generateToken);
router.get('/active-rooms', listActiveRooms);

module.exports = router;
