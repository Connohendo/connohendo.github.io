const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Store messages in memory (replace with DB in production)
const messages = [];

// Contact form endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'All fields are required: name, email, message',
    });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a valid email address',
    });
  }

  // Store the message
  const newMessage = {
    id: messages.length + 1,
    name,
    email,
    message,
    timestamp: new Date().toISOString(),
  };
  messages.push(newMessage);

  console.log(`[${newMessage.timestamp}] New message from ${name} <${email}>`);

  res.status(200).json({
    success: true,
    message: 'Message received successfully. I will get back to you soon!',
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`\n  ╔══════════════════════════════════════╗`);
  console.log(`  ║  Server running on port ${PORT}          ║`);
  console.log(`  ║  http://localhost:${PORT}               ║`);
  console.log(`  ╚══════════════════════════════════════╝\n`);
});
