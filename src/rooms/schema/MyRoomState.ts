import { MapSchema, Schema, type } from "@colyseus/schema";

export class Player extends Schema {
  @type("string") name: string;
  @type("number") x: number;
  @type("number") y: number;
  @type("number") z: number;
  @type("number") rotX: number;
  @type("number") rotY: number;
  @type("number") rotZ: number;
  @type("number") rotW: number;
  @type("number") animX: number;
  @type("number") animZ: number;
}

export class MyRoomState extends Schema {

  @type({ map: Player }) players = new MapSchema<Player>();

}
