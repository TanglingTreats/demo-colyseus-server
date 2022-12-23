"use strict";
/**
 * IMPORTANT:
 * ---------
 * Do not manually edit this file if you'd like to use Colyseus Arena
 *
 * If you're self-hosting (without Arena), you can manually instantiate a
 * Colyseus Server as documented here: 👉 https://docs.colyseus.io/server/api/#constructor-options
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const ws_transport_1 = require("@colyseus/ws-transport");
const colyseus_1 = require("colyseus");
const MyRoom_1 = require("./rooms/MyRoom");
const monitor_1 = require("@colyseus/monitor");
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
// Import arena config
//import { listen } from "@colyseus/arena";
//import arenaConfig from "./arena.config";
//listen(arenaConfig);
dotenv_1.default.config();
const port = Number(process.env.PORT) || 2568;
// Create and listen on 2568 (or PORT environment variable.)
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("It's time to kick ass and chew bubblegum!");
});
app.use("/colyseus", (0, monitor_1.monitor)());
app.use("/colyseus-dev", (0, monitor_1.monitor)());
const server = (0, http_1.createServer)(app);
const gameServer = new colyseus_1.Server({
    transport: new ws_transport_1.WebSocketTransport({ server })
});
gameServer.listen(port);
gameServer.define('my_room', MyRoom_1.MyRoom);
console.log(`Listening on ws://localhost:${port}`);
