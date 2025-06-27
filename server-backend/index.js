const express = require('express');
const cors = require('cors')
const http = require('http');
const sensorRouter = require('./routes/sensors');
const { initWebSocket } = require('./websocket/server');
const connectToMongoDB = require('./db/mongo');
require('dotenv').config();

//Creating express app instance
const app = express();
const PORT = 4000;

//connect to MongoDB
connectToMongoDB();

//adding cors middleware for react connectivity and json handler
app.use(cors());
app.use(express.json());
app.use('/routes/sensors', sensorRouter);

//create http server
const server = http.createServer(app);

//connects websocket server to http server
initWebSocket(server);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});