import { Component, OnInit, Inject } from '@angular/core';
import { Zoekterm } from 'src/app/model/zoekterm';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-zoekterm-delete-dialog',
  templateUrl: './zoekterm-delete-dialog.component.html',
  styleUrls: ['./zoekterm-delete-dialog.component.scss']
})
export class ZoektermDeleteDialogComponent implements OnInit {
  zoekterm: Zoekterm = new Zoekterm();

  constructor(private dialogRef: MatDialogRef<ZoektermDeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.zoekterm = data;
  }

  ngOnInit() {
  }

  sluit(): void {
    this.dialogRef.close();
  }

  verwijderen(): void {
    this.dialogRef.close(this.zoekterm);
  }
}
