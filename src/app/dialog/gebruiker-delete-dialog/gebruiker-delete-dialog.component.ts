import { Component, OnInit, Inject } from '@angular/core';
import { Gebruiker } from 'src/app/model/gebruiker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-gebruiker-delete-dialog',
  templateUrl: './gebruiker-delete-dialog.component.html',
  styleUrls: ['./gebruiker-delete-dialog.component.scss']
})
export class GebruikerDeleteDialogComponent implements OnInit {
  gebruiker: Gebruiker = new Gebruiker();

  constructor(private dialogRef: MatDialogRef<GebruikerDeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.gebruiker = data;
  }

  ngOnInit() {
  }

  sluit(): void {
    this.dialogRef.close();
  }

  verwijderen(): void {
    this.dialogRef.close(this.gebruiker);
  }
}
