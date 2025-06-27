const { WebSocketServer } = require('ws');
const Sensor = require('../models/schema');
const MAX_MESSAGES = 100;
const messages = [];

//create websocket server and connect it to http server
function initWebSocket(server) {
    //create websocket server and attach it to existing http server
    const wss = new WebSocketServer({
        server,
        path: '/ws'
    });

    //Listen for new client connections
    ws = wss.on('connection', (ws) => {
        console.log("Client connected");

        //Listen for messages from this client
        ws.on('message', async (data) => {
            sensorData = parseSensorData(data);
            if(sensorData != null) {
                addMessage(sensorData);
                broadcast(wss, JSON.stringify(sensorData));
                console.log('Message received');
                try {
                    const entry = new Sensor(sensorData);
                    await entry.save();
                    console.log("Successfully saved data to MongoDB");
                } catch(error) {
                    console.error("Failed to save data to MongoDB", error);
                }
            } else {
                console.log("Received invalid sensor data");
            }
        });

        //Listen for client disconnect
        ws.on('close', () => {
            console.log("Client disconnected")
        });
    });
}

function parseSensorData(data) {
    try {
        //Convert JSON data to usable object
        parsed = JSON.parse(data);

        //check if data is valid
        if('temperature' in parsed &&
            'humidity' in parsed &&
            typeof parsed.temperature === 'number' &&
            typeof parsed.humidity === 'number') {
                return parsed
            }
        else {
            return null;
        }
    } catch(error) {
        return null;
    }
}

//Send message to all clients
function broadcast(wss, msg) {
    for (const client of wss.clients) {
       if(client.readyState === client.OPEN) {
        client.send(msg);
       }
    }
}

function addMessage(msg) {
    messages.push(msg);
    if(messages.length > MAX_MESSAGES) {
        messages.shift();
    }
}

function getMessages() {
    return messages;
}

module.exports = { initWebSocket, getMessages };