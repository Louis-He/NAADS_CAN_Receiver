const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins for dev
        methods: ["GET", "POST"]
    }
});

const PORT = 3000;
const EXECUTABLE_PATH = path.resolve(__dirname, '../../build/NAADS_alert_receiver');

console.log(`Target executable: ${EXECUTABLE_PATH}`);

let receiverProcess = null;

function startReceiver() {
    if (receiverProcess) {
        receiverProcess.kill();
    }

    console.log('Starting NAADS receiver...');
    receiverProcess = spawn(EXECUTABLE_PATH);

    receiverProcess.stdout.on('data', (data) => {
        const lines = data.toString().split('\n');
        lines.forEach(line => {
            line = line.trim();
            if (!line) return;

            // Try to parse as JSON
            if (line.startsWith('{')) {
                try {
                    const alert = JSON.parse(line);
                    console.log('Received alert:', alert.headline);
                    io.emit('alert', alert);
                } catch (e) {
                    console.log('Non-JSON output (ignored):', line);
                }
            } else {
                console.log('System output:', line);
            }
        });
    });

    receiverProcess.stderr.on('data', (data) => {
        console.error(`Receiver Error: ${data}`);
    });

    receiverProcess.on('close', (code) => {
        console.log(`Receiver process exited with code ${code}`);
        // Optional: Restart on crash
        setTimeout(startReceiver, 5000);
    });
}

io.on('connection', (socket) => {
    console.log('Client connected');

    // Send a test alert on connection for debugging UI
    // socket.emit('alert', {
    //   sender: "System",
    //   headline: "Connected to NAADS Receiver",
    //   description: "Waiting for alerts...",
    //   severity: "Info",
    //   sent: new Date().toISOString(),
    //   areaDesc: []
    // });
});

startReceiver();

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
