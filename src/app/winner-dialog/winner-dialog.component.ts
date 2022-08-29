import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-winner-dialog',
  templateUrl: './winner-dialog.component.html',
  styleUrls: ['./winner-dialog.component.scss']
})
export class WinnerDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<WinnerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {winner: string, color: string, tie: boolean}) { }

  ngOnInit(): void {
  }

}
