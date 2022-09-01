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

  form = new FormGroup({
    firstPlayer: new FormControl('Jaime Lannister'),
    firstColor: new FormControl('#f54242'),
    secondPlayer: new FormControl('Daenerys Targaryen'),
    secondColor: new FormControl('#b042f5')
  });
  constructor(public dialogRef: MatDialogRef<PlayersDialogComponent>,) { }

  ngOnInit(): void {
  }

  colorSelected(value: string) {
    if(this.colors1.includes(value)) {
      this.form.controls.firstColor.setValue(value);
    } else {
      this.form.controls.secondColor.setValue(value);
    }
  }

  onConfirm() {
    let form = new PlayersForm();
    form.firstPlayer = this.form.controls.firstPlayer.value!;
    form.firstColor = this.form.controls.firstColor.value!;
    form.secondPlayer = this.form.controls.secondPlayer.value!;
    form.secondColor = this.form.controls.secondColor.value!;
    this.dialogRef.close(form);
  }

}
