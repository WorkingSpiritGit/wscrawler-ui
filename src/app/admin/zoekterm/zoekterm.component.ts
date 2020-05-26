import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { Zoekterm } from 'src/app/model/zoekterm';
import { ZoektermService } from 'src/app/services/zoekterm.service';
import { ZoektermDeleteDialogComponent } from 'src/app/dialog/zoekterm-delete-dialog/zoekterm-delete-dialog.component';

@Component({
  selector: 'app-zoekterm',
  templateUrl: './zoekterm.component.html',
  styleUrls: ['./zoekterm.component.scss']
})
export class ZoektermComponent implements OnInit {
  zoekterm: Zoekterm = new Zoekterm();
  displayedColumns: string[] = ['naam', 'bewerk', 'verwijder'];
  zoektermTabel = new MatTableDataSource();
  wijzigen: boolean = false;

  constructor(private zoektermService: ZoektermService, private snackbar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.haalZoektermenOp();
  }

  haalZoektermenOp(): void {
    this.zoektermService.geefAlleZoektermen().subscribe(zoektermenLijst => {
      this.zoektermTabel.data = zoektermenLijst;
    })
  }

  zoektermOpslaan(zoekterm: Zoekterm): void {
    this.zoektermService.zoektermOpslaan(zoekterm).subscribe(response => {
      this.openSnackbar("De zoekterm is opgeslagen.", "Sluit", "correctmelding");
      this.zoekterm = new Zoekterm();
      this.haalZoektermenOp();
    },
    (error) => {
      this.openSnackbar("Er is een fout opgetreden bij het opslaan van de zoekterm.", "Sluit", "foutmelding");
    });
  }

  laadWijzigmenu(id: number): void {
    this.zoektermService.geefZoektermOpId(id).subscribe(zoekterm => {
      this.zoekterm = zoekterm;
      this.wijzigen = true;
    });
  }

  zoektermWijzigen(zoekterm: Zoekterm): void {
    this.zoektermService.wijzigZoekterm(zoekterm.id, zoekterm).subscribe(response => {
      this.openSnackbar("De zoekterm is gewijzigd.", "Sluit", "correctmelding");
      this.zoekterm = new Zoekterm();
      this.wijzigen = false;
      this.haalZoektermenOp();
    },
    (error) => {
      this.openSnackbar("Er is een fout opgetreden bij het wijzigen van de zoekterm.", "Sluit", "foutmelding");
    });
  }

  annuleerWijziging(): void {
    this.zoekterm = new Zoekterm();
    this.wijzigen = false;
  }

  openDialog(zoekterm: Zoekterm): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = zoekterm;

    const dialogRef = this.dialog.open(ZoektermDeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(teVerwijderenZoekterm => {
      this.zoektermService.verwijderZoekterm(teVerwijderenZoekterm.id).subscribe(response => {
        this.openSnackbar("De zoekterm is verwijderd.", "Sluit", "correctmelding");
        this.haalZoektermenOp();
      },
      (error) => {
        this.openSnackbar("Het verwijderen van de zoekterm is mislukt.", "Sluit", "foutmelding");
      });
    });
  }

  openSnackbar(melding: string, actie: string, cssOpmaak: string) {
    this.snackbar.open(melding, actie, {
      duration: 5000,
      panelClass: [cssOpmaak]
    });
  }
}
