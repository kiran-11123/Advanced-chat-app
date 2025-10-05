"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8081 });
let allSockets = {};
wss.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("message", (message) => {
        console.log(`Received message: ${message}`);
    });
});
