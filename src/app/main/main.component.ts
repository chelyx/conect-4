import { Component, OnInit } from '@angular/core';
import { Player } from '../models/player.model';
import { Tile } from '../models/tile.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  player1: Player;
  player2: Player;
  currentPlayer = '';
  winner = '';
  matrix: Tile[][] = [];

  constructor() { }

  ngOnInit(): void {
    this.player1 = new Player('Rojo','#f5554a');
    this.player2 = new Player('Amarillo','#ffe084');
    this.currentPlayer = this.player1.name;
    this.generateEmptyMatrix();
  }

  chooseTile(tile: Tile){
    let x = tile.x;
    let y = tile.y;
    this.matrix[y][x].value = this.currentPlayer === this.player1.name ? this.player1 : this.player2;
    this.connects4(x,y);
  }

  togglePlayer(){
    if(this.currentPlayer === this.player1.name){
      this.currentPlayer = this.player2.name;
    } else {
      this.currentPlayer = this.player1.name;
    }
  }

  connects4(x: number, y: number){
    let diagonal = this.search4diagonal(x, y);
    console.log('match diagonal', diagonal);

    let horizontal = this.search4horizontal(y);
    console.log('match horizontal',horizontal);

    let vertical = this.search4vertical(x);
    console.log('match vertical',vertical);

    if(horizontal || vertical || diagonal){
      this.winner = this.currentPlayer;
      this.resetBoard();
    } else {
      this.togglePlayer();
    }
  }

  search4horizontal(y: number) {
    let connects = false;
    for(let j = 0; j < 4; j++){
      let posX = j;
      if(this.matrix[y][j].value && this.matrix[y][j].value.name === this.currentPlayer && !connects) {
        connects = this.matrix[y][posX+1].value?.name === this.currentPlayer &&
                    this.matrix[y][posX+2].value?.name === this.currentPlayer &&
                    this.matrix[y][posX+3].value?.name === this.currentPlayer
      }
    }
    return connects;
  }

  search4vertical(x: number) {
    let connects;
    for(let i = 0; i < 3; i++){
      let posY = i;
      if(this.matrix[i][x].value && this.matrix[i][x].value.name === this.currentPlayer && !connects) {
        // si este es RED los proximos 3 tambien para que connecte
        connects = this.matrix[posY+1][x].value?.name === this.currentPlayer &&
                       this.matrix[posY+2][x].value?.name === this.currentPlayer &&
                       this.matrix[posY+3][x].value?.name === this.currentPlayer
      }
    }
    return connects;
  }

  search4diagonal(x: number, y: number){
    let connects;
    for(let i = 0; i < 3; i++){
      let posY = i;
      for(let j = 0; j < 4; j++){
        let posX = j;
        if(this.matrix[i][j].value && this.matrix[i][j].value.name === this.currentPlayer && !connects){
          console.log(i, j);
          connects = this.matrix[posY+1][posX+1].value?.name === this.currentPlayer &&
          this.matrix[posY+2][posX+2].value?.name === this.currentPlayer &&
          this.matrix[posY+3][posX+3].value?.name === this.currentPlayer
        }
      }
    }
    return connects;
  }

  generateEmptyMatrix(){
    this.matrix = [];
    for (let i = 0; i < 6; i++){ // filas = y
      let row: Tile[] = [];
      for(let j = 0; j < 7; j++){ // columnas = x
        let tile = new Tile(j,i);
        row.push(tile);
      }
      this.matrix.push(row);
    }
    console.log(this.matrix);
  }

  resetBoard(){
    this.generateEmptyMatrix();
    this.winner === this.player1.name ? this.player1.wins++ : this.player2.wins++;
    this.currentPlayer = this.player1.name;
  }

}
