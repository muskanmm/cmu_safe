const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');

const app = express();
const PORT = 5000;

app.use(cors()); // Allow CORS for communication with React frontend
app.use(express.json());

// Endpoint to handle Python subprocess
app.post('/run-python', (req, res) => {
    const { scriptName, args } = req.body;  // Get script name and args from request body
    const pythonProcess = spawn('python3', [scriptName, ...args]);

    let output = '';

    pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            res.status(500).send(`Python process exited with code ${code}`);
        } else {
            res.send(output);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
