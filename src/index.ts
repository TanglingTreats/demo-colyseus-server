/**
 * IMPORTANT: 
 * ---------
 * Do not manually edit this file if you'd like to use Colyseus Arena
 * 
 * If you're self-hosting (without Arena), you can manually instantiate a
 * Colyseus Server as documented here: 👉 https://docs.colyseus.io/server/api/#constructor-options 
 */
import { listen } from "@colyseus/arena";
import { WebSocketTransport } from "@colyseus/ws-transport";
import { Server } from "colyseus";
import { createServer } from "http";
import express from "express";

// Import arena config
import arenaConfig from "./arena.config";


const port = Number(process.env.port) || 2567;

// Create and listen on 2567 (or PORT environment variable.)
const app = express();
app.use(express.json());

const server = createServer(app);

const gameServer = new Server({
  transport: new WebSocketTransport({ server })
});

gameServer.listen(port);
console.log(`Listening on ws://localhost:${port}`);


//listen(arenaConfig);
