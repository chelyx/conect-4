import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Player } from '../models/player.model';
import { Tile } from '../models/tile.model';
import { WinnerDialogComponent } from '../winner-dialog/winner-dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  firstPlayer: Player;
  player1: Player;
  player2: Player;
  currentPlayer: Player;
  matrix: Tile[][] = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.player1 = new Player('Rojo','#f5554a');
    this.player2 = new Player('Amarillo','#ffe084');
    this.currentPlayer = this.player1;
    this.firstPlayer = this.player1;
    this.generateEmptyMatrix();
  }

  chooseColumn(x: number){
    let i = 5;
    let found = -1;
    while(found < 0) {
      if(!this.matrix[i][x].value) {
        found = i;
      }
      i--;
    }
    this.chooseTile(x,found);
  }

  chooseTile(x: number, y: number){
    this.matrix[y][x].value = this.currentPlayer;
    this.connects4(x,y);
  }

  togglePlayer(){
    if(this.currentPlayer.name === this.player1.name){
      this.currentPlayer = this.player2;
    } else {
      this.currentPlayer = this.player1;
    }
  }

  connects4(x: number, y: number){
    let wins = this.search4diagonal() ||
              this.search4diagonal2() ||
              this.search4horizontal(y) ||
              this.search4vertical(x);
    console.log('match',wins);

    if(wins){
      this.openDialog();
    } else {
      this.togglePlayer();
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(WinnerDialogComponent, {
      width: '250',
      height: '200px',
      data: {winner: this.currentPlayer.name, color: this.currentPlayer.color}
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log('The dialog was closed');
      this.resetBoard();
    });
  }

  search4horizontal(y: number) {
    let connects = false;
    for(let j = 0; j < 4; j++){
      let posX = j;
      if(this.matrix[y][j].value && this.matrix[y][j].value.name === this.currentPlayer.name && !connects) {
        connects = this.matrix[y][posX+1].value?.name === this.currentPlayer.name &&
                    this.matrix[y][posX+2].value?.name === this.currentPlayer.name &&
                    this.matrix[y][posX+3].value?.name === this.currentPlayer.name
      }
    }
    return connects;
  }

  search4vertical(x: number) {
    let connects;
    for(let i = 0; i < 3; i++){
      let posY = i;
      if(this.matrix[i][x].value && this.matrix[i][x].value.name === this.currentPlayer.name && !connects) {
        // si este es RED los proximos 3 tambien para que connecte
        connects = this.matrix[posY+1][x].value?.name === this.currentPlayer.name &&
                       this.matrix[posY+2][x].value?.name === this.currentPlayer.name &&
                       this.matrix[posY+3][x].value?.name === this.currentPlayer.name
      }
    }
    return connects;
  }

  search4diagonal(){
    let connects;
    for(let i = 0; i < 3; i++){
      let posY = i;
      for(let j = 0; j < 4; j++){
        let posX = j;
        if(this.matrix[i][j].value && this.matrix[i][j].value.name === this.currentPlayer.name && !connects){
          console.log(i, j);
          connects = this.matrix[posY+1][posX+1].value?.name === this.currentPlayer.name &&
          this.matrix[posY+2][posX+2].value?.name === this.currentPlayer.name &&
          this.matrix[posY+3][posX+3].value?.name === this.currentPlayer.name
        }
      }
    }
    return connects;
  }

  search4diagonal2(){
    let connects;
    for(let i = 0; i < 3; i++){
      let posY = i;
      for(let j = 3; j < 7; j++){
        let posX = j;
        if(this.matrix[i][j].value && this.matrix[i][j].value.name === this.currentPlayer.name && !connects){
          connects = this.matrix[posY+1][posX-1].value?.name === this.currentPlayer.name &&
          this.matrix[posY+2][posX-2].value?.name === this.currentPlayer.name &&
          this.matrix[posY+3][posX-3].value?.name === this.currentPlayer.name
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
    this.currentPlayer.name === this.player1.name ? this.player1.wins++ : this.player2.wins++;
    this.currentPlayer = this.firstPlayer.name === this.player1.name ? this.player2 : this.player1;
    this.firstPlayer = this.currentPlayer;
  }

}
