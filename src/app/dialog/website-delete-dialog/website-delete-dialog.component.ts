import { Component, OnInit, Inject } from '@angular/core';
import { Website } from 'src/app/model/website';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-website-delete-dialog',
  templateUrl: './website-delete-dialog.component.html',
  styleUrls: ['./website-delete-dialog.component.scss']
})
export class WebsiteDeleteDialogComponent implements OnInit {
  website: Website = new Website();

  constructor(private dialogRef: MatDialogRef<WebsiteDeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.website = data;
  }

  ngOnInit() {
  }

  sluit(): void {
    this.dialogRef.close();
  }

  verwijderen(): void {
    this.dialogRef.close(this.website);
  }
}
