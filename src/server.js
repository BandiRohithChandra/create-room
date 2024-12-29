const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const roomRoutes = require('./routes/roomRoutes'); // Ensure this path is correct

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use routes
app.use('/api', roomRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
