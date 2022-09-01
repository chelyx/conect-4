import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PlayersForm } from '../models/players-form.model';

@Component({
  selector: 'app-players-dialog',
  templateUrl: './players-dialog.component.html',
  styleUrls: ['./players-dialog.component.scss']
})
export class PlayersDialogComponent implements OnInit {
  colors1 = [
    '#f54242',
    '#f58d42',
    '#eff542',
  ]
  colors2 = [
    '#b0f542',
    '#b042f5',
    '#f542e0',
  ]
  color1Selected = '#f54242';
  color2Selected = '#b0f542';

  form = new FormGroup({
    firstPlayer: new FormControl('Jaime Lannister'),
    secondPlayer: new FormControl('Daenerys Targaryen')
  });
  constructor(public dialogRef: MatDialogRef<PlayersDialogComponent>,) { }

  ngOnInit(): void {
  }

  colorSelected(value: string) {
    if(this.colors1.includes(value)) {
      this.color1Selected = value;
    } else {
      this.color2Selected = value;
    }
  }

  onConfirm() {
    let form = new PlayersForm();
    form.firstPlayer = this.form.controls.firstPlayer.value!;
    form.firstColor = this.color1Selected;
    form.secondPlayer = this.form.controls.secondPlayer.value!;
    form.secondColor = this.color2Selected;
    this.dialogRef.close(form);
  }

}
