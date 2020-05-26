import { Component, OnInit, Inject } from '@angular/core';
import { VacatureDTO } from 'src/app/model/vacature-dto';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-vacature-delete-dialog',
  templateUrl: './vacature-delete-dialog.component.html',
  styleUrls: ['./vacature-delete-dialog.component.scss']
})
export class VacatureDeleteDialogComponent implements OnInit {
  vacature: VacatureDTO = new VacatureDTO;

  constructor(private dialogRef: MatDialogRef<VacatureDeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.vacature = data;
  }

  ngOnInit() {
  }

  sluit(): void {
    this.dialogRef.close();
  }

  verwijderen(): void {
    this.dialogRef.close(this.vacature);
  }
}
