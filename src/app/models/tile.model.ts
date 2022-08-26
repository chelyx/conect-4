import { Player } from "./player.model";

export class Tile {
  x: number;
  y: number;
  value: Player;
  constructor(x: number,y:number){
    this.x = x;
    this.y = y;
  }
}
