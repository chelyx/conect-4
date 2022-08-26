export class Player {
  color: string;
  name: string;
  wins: number
  constructor(name:string, color: string){
    this.name = name;
    this.color = color;
    this.wins = 0;
  }
}
