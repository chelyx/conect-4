export class Position {
  value: string;
  index: number;
  class: string;
  constructor(index: number){
    this.index =index;
    this.value = 'void';
    this.class = 'f'+index;
  }
}
