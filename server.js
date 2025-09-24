const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// This route keeps Render's health check happy.
app.get('/', (req, res) => {
  res.status(200).send('Automation service wrapper is active.');
});

app.listen(PORT, () => {
  console.log(`Wrapper server listening on port ${PORT}`);
  
  // This line executes your main automation script,
  // assuming its name is index.js.
  console.log('Starting automation script...');
  require('./index.js'); 
});
