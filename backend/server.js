// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Enable CORS for the frontend
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});

