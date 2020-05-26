import { Component, OnInit } from '@angular/core';
import { Gebruiker } from 'src/app/model/gebruiker';
import { MatTableDataSource, MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { GebruikerService } from 'src/app/services/gebruiker.service';
import { GebruikersRol } from 'src/app/model/gebruikers-rol.enum';
import { GebruikerDeleteDialogComponent } from 'src/app/dialog/gebruiker-delete-dialog/gebruiker-delete-dialog.component';

@Component({
  selector: 'app-gebruikers',
  templateUrl: './gebruikers.component.html',
  styleUrls: ['./gebruikers.component.scss']
})
export class GebruikersComponent implements OnInit {
  gebruiker: Gebruiker = new Gebruiker();
  displayedColumns: string[] = ['naam', 'username', 'email', 'rol', 'bewerk', 'verwijder'];
  dataSource = new MatTableDataSource();
  wijzigen: boolean = false;
  rollen: any[] = [
    {value: GebruikersRol.ADMIN, naam: "Admin"},
    {value: GebruikersRol.ACCOUNTMANAGER, naam: "Accountmanager"}
  ];

  constructor(private gebruikerService: GebruikerService, private snackbar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.haalGebruikersOp();
  }

  haalGebruikersOp(): void {
    this.gebruikerService.geefAlleGebruikers().subscribe(gebruikerslijst => {
      this.dataSource.data = gebruikerslijst;
    });
  }

  gebruikerOpslaan(gebruiker: Gebruiker): void {
    this.gebruikerService.gebruikerOpslaan(gebruiker).subscribe(response => {
      this.openSnackbar("De gebruiker is aangemaakt.", "Sluit", "correctmelding");
      this.gebruiker = new Gebruiker();
      this.haalGebruikersOp();
    },
    (error) => {
      this.openSnackbar("Er is een fout opgetreden bij het opslaan van de gebruiker.", "Sluit", "foutmelding");
    });
  }

  laadWijzigmenu(id: number): void {
    this.gebruikerService.geefGebruikerOpId(id).subscribe(teWijzigenGebruiker => {
      this.gebruiker = teWijzigenGebruiker;
      this.wijzigen = true;
    });
  }

  gebruikerWijzigen(gebruiker: Gebruiker): void {
    this.gebruikerService.wijzigGebruiker(gebruiker.id, gebruiker).subscribe(response => {
      this.openSnackbar("De gebruiker is gewijzigd.", "Sluit", "correctmelding");
      this.gebruiker = new Gebruiker();
      this.wijzigen = false;
      this.haalGebruikersOp();
    },
    (error) => {
      this.openSnackbar("Er is een fout opgetreden bij het wijzigen van de gebruiker.", "Sluit", "foutmelding");
    });
  }

  annuleerWijziging(): void {
    this.gebruiker = new Gebruiker();
    this.wijzigen = false;
  }

  openDialog(gebruiker: Gebruiker): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = gebruiker;

    const dialogRef = this.dialog.open(GebruikerDeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(teVerwijderenGebruiker => {
      this.gebruikerService.verwijderGebruiker(teVerwijderenGebruiker.id).subscribe(response => {
        this.openSnackbar("De gebruiker is verwijderd.", "Sluit", "correctmelding");
        this.haalGebruikersOp();
      },
      (error) => {
        this.openSnackbar("Het verwijderen van de gebruiker is mislukt.", "Sluit", "foutmelding");
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
