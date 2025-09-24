const express = require('express');
const { spawn } = require('child_process'); // Import the 'spawn' function
const app = express();

const PORT = process.env.PORT || 3000;

// This route keeps Render's health check happy
app.get('/', (req, res) => {
  res.status(200).send('Automation service manager is running.');
});

// Function to start your automation script as a child process
function runAutomationScript() {
  console.log('Spawning automation script as a child process...');
  
  // Command to run: 'node', Argument: 'index.js'
  // This is like typing 'node index.js' in the terminal.
  const child = spawn('node', ['index.js'], {
    // This option pipes the child's logs to the parent's logs
    stdio: 'inherit' 
  });

  // Listen for when the child process closes
  child.on('close', (code) => {
    console.log(`Automation script exited with code ${code}. Restarting in 1 minute...`);
    // Restart the script after a delay (e.g., 1 minute)
    setTimeout(runAutomationScript, 60 * 1000); 
  });

  child.on('error', (error) => {
    console.error('Failed to start automation script:', error);
  });
}

// Start the web server
app.listen(PORT, () => {
  console.log(`Manager server listening on port ${PORT}`);
  // Once the server is running, start the automation for the first time
  runAutomationScript();
});
