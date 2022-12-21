"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyRoom = void 0;
const colyseus_1 = require("colyseus");
const MyRoomState_1 = require("./schema/MyRoomState");
class MyRoom extends colyseus_1.Room {
    onCreate(options) {
        this.setState(new MyRoomState_1.MyRoomState());
        this.onMessage("setPlayerName", (client, data) => {
            const player = this.state.players.get(client.sessionId);
            player.name = data.name;
        });
        this.onMessage("updatePosition", (client, data) => {
            const player = this.state.players.get(client.sessionId);
            player.x = data.x;
            player.y = data.y;
            player.z = data.z;
            player.rotX = data.rotX;
            player.rotY = data.rotY;
            player.rotZ = data.rotZ;
            player.rotW = data.rotW;
        });
        this.onMessage("updateAnimState", (client, data) => {
            const player = this.state.players.get(client.sessionId);
            player.animX = data.x;
            player.animZ = data.z;
        });
        this.onMessage("updateRotation", (client, data) => {
            const player = this.state.players.get(client.sessionId);
            player.rotX = data.x;
            player.rotY = data.y;
            player.rotZ = data.z;
        });
    }
    onJoin(client, options) {
        console.log(client.sessionId, "joined!");
        const player = new MyRoomState_1.Player();
        const FLOOR_SIZE = 4;
        player.x = -(FLOOR_SIZE / 2) + (Math.random() * FLOOR_SIZE);
        player.y = 1.24;
        player.z = -(FLOOR_SIZE / 2) + (Math.random() * FLOOR_SIZE);
        player.rotX = 0;
        player.rotY = 0;
        player.rotZ = 0;
        player.rotW = 1;
        player.animX = 0;
        player.animZ = 0;
        this.state.players.set(client.sessionId, player);
    }
    onLeave(client, consented) {
        console.log(client.sessionId, "left!");
        this.state.players.delete(client.sessionId);
    }
    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }
}
exports.MyRoom = MyRoom;
