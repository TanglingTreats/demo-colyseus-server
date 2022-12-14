/**
 * IMPORTANT: 
 * ---------
 * Do not manually edit this file if you'd like to use Colyseus Arena
 * 
 * If you're self-hosting (without Arena), you can manually instantiate a
 * Colyseus Server as documented here: 👉 https://docs.colyseus.io/server/api/#constructor-options 
 */

import dotenv from "dotenv";
import { WebSocketTransport } from "@colyseus/ws-transport";
import { Server } from "colyseus";
import { MyRoom } from "./rooms/MyRoom";

import { monitor } from "@colyseus/monitor";

import { createServer } from "http";
import express from "express";

// Import arena config
//import { listen } from "@colyseus/arena";
//import arenaConfig from "./arena.config";

//listen(arenaConfig);

dotenv.config();

const port = Number(process.env.PORT) || 2567;
console.log(process.env);

// Create and listen on 2567 (or PORT environment variable.)
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("It's time to kick ass and chew bubblegum!");
});

app.use("/colyseus", monitor());
app.use("/colyseus-dev", monitor());

const server = createServer(app);

const gameServer = new Server({
  transport: new WebSocketTransport({ server })
});

gameServer.listen(port);
gameServer.define('my_room', MyRoom);
console.log(`Listening on ws://localhost:${port}`);


