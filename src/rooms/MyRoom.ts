import { Room, Client } from "colyseus";
import { MyRoomState, Player } from "./schema/MyRoomState";

export class MyRoom extends Room<MyRoomState> {

  onCreate(options: any) {
    this.setState(new MyRoomState());

    this.onMessage("setPlayerName", (client, data) => {
      console.log("setting player name");
      const player = this.state.players.get(client.sessionId);

      player.name = data.name;
    })

    this.onMessage("updateMovement", (client, data) => {
      const player = this.state.players.get(client.sessionId);
      player.x = data.x;
      player.y = data.y;
      player.z = data.z;
      player.rotX = data.rotX;
      player.rotY = data.rotY;
      player.rotZ = data.rotZ;
      player.rotW = data.rotW;
    });

    this.onMessage("updatePosition", (client, data) => {
      const player = this.state.players.get(client.sessionId);

      player.x = data.x;
      player.y = data.y;
      player.z = data.z;
    })

    this.onMessage("updateAnimState", (client, data) => {
      const player = this.state.players.get(client.sessionId);

      player.animX = data.x;
      player.animZ = data.z;
    })

    this.onMessage("updateRotation", (client, data) => {
      const player = this.state.players.get(client.sessionId);
      player.rotX = data.x;
      player.rotY = data.y;
      player.rotZ = data.z;
    });

  }

  onJoin(client: Client, options: any) {
    console.log(client.sessionId, "joined!");

    const player = new Player();
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

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");

    this.state.players.delete(client.sessionId);
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
