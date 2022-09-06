import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Player } from '../models/player.model';
import { PlayersForm } from '../models/players-form.model';
import { Tile } from '../models/tile.model';
import { PlayersDialogComponent } from '../players-dialog/players-dialog.component';
import { WinnerDialogComponent } from '../winner-dialog/winner-dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition('void => first', [
        style({backgroundColor: '{{back_color}}'}),
        animate('500ms ease-in', style({ transform: 'translateY(450px)',
          backgroundColor: '{{back_color}}'}))
      ]),
      transition('first => second', [
        style({backgroundColor: '{{back_color}}'}),
        animate('500ms ease-in', style({ transform: 'translateY(360px)' }))
      ]),
      transition('second => third', [
        style({backgroundColor: '{{back_color}}'}),
        animate('500ms ease-in', style({ transform: 'translateY(270px)' }))
      ]),
      transition('third => four', [
        style({backgroundColor: '{{back_color}}'}),
        animate('500ms ease-in', style({ transform: 'translateY(180px)' }))
      ]),
      transition('four => five', [
        style({backgroundColor: '{{back_color}}'}),
        animate('500ms ease-in', style({ transform: 'translateY(90px)' }))
      ])
    ])
  ]
})
export class MainComponent implements OnInit {
  firstPlayer: Player;
  player1: Player;
  player2: Player;
  currentPlayer: Player;
  matrix: Tile[][] = [];
  countTile = 0;
  playersLoaded = false;
  visible: Boolean = false;
  positions = ['void','void','void','void','void','void','void'];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initPlayers();
    this.generateEmptyMatrix();
  }

  initPlayers() {
    const dialogRef = this.dialog.open(PlayersDialogComponent);
    dialogRef.afterClosed().subscribe((res: PlayersForm)=> {
      console.log(res);
      this.player1 = new Player(res.firstPlayer,res.firstColor);
      this.player2 = new Player(res.secondPlayer,res.secondColor);
      this.currentPlayer = this.player1;
      this.firstPlayer = this.player1;
      this.playersLoaded = true;
    });
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
    this.positions[x] = this.togglePosition(this.positions[x]);
    setTimeout(() => {
      this.matrix[y][x].value = this.currentPlayer;
    this.countTile++;
    if(this.countTile === 42) {
      this.openDialog(true);
    } else {
      this.connects4(x,y);
    }
    }, 500);

  }

  togglePosition(posX: string) {
    console.log(posX);
    let ret = '';
    switch(posX) {
      case 'void': ret = 'first'; break;
      case 'first': ret = 'second'; break;
      case 'second': ret = 'third'; break;
      case 'third': ret = 'four'; break;
      case 'four': ret= 'five'; break;
    }
    return ret;
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
      this.openDialog(false);
    } else {
      this.togglePlayer();
    }
  }

  openDialog(tie: boolean) {
    const dialogRef = this.dialog.open(WinnerDialogComponent, {
      width: '250',
      height: '200px',
      data: {winner: this.currentPlayer.name, color: this.currentPlayer.color, tie: tie}
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
  }

  resetBoard($event?: any){
    this.countTile = 0;
    this.generateEmptyMatrix();
    this.currentPlayer = this.firstPlayer.name === this.player1.name ? this.player2 : this.player1;
    this.firstPlayer = this.currentPlayer;
    if(!$event){
      this.currentPlayer.name === this.player1.name ? this.player1.wins++ : this.player2.wins++;
    }
  }

}
