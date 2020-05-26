import { Component, OnInit } from '@angular/core';
import { WebsiteService } from 'src/app/services/website.service';
import { MatTableDataSource, MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { Website } from 'src/app/model/website';
import { WebsiteDeleteDialogComponent } from 'src/app/dialog/website-delete-dialog/website-delete-dialog.component';

@Component({
  selector: 'app-websites',
  templateUrl: './websites.component.html',
  styleUrls: ['./websites.component.scss']
})
export class WebsitesComponent implements OnInit {
  website: Website = new Website();
  displayedColumns: string[] = ['naam', 'url', 'filter', 'elementid', 'bewerk', 'verwijder'];
  dataSource = new MatTableDataSource();
  wijzigen: boolean = false;

  constructor(private websiteService: WebsiteService, private snackbar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.haalWebsitesOp();
  }

  haalWebsitesOp(): void {
    this.websiteService.geefAlleWebsites().subscribe(websiteLijst => {
      this.dataSource.data = websiteLijst;
    });
  }

  websiteOpslaan(website: Website): void {
    this.websiteService.websiteOpslaan(website).subscribe(response => {
      this.openSnackbar("De website is opgeslagen.", "Sluit", "correctmelding");
      this.website = new Website();
      this.haalWebsitesOp();
    },
    (error) => {
      this.openSnackbar("Er is een fout opgetreden bij het opslaan van de website.", "Sluit", "foutmelding");
    });
  }

  laadWijzigmenu(id: number): void {
    this.websiteService.geefWebsiteOpId(id).subscribe(website => {
      this.website = website;
      this.wijzigen = true;
    });
  }

  websiteWijzigen(website: Website): void {
    this.websiteService.wijzigWebsite(website.id, website).subscribe(response => {
      this.openSnackbar("De website is gewijzigd.", "Sluit", "correctmelding");
      this.website = new Website();
      this.wijzigen = false;
      this.haalWebsitesOp();
    },
    (error) => {
      this.openSnackbar("Er is een fout opgetreden bij het wijzigen van de website.", "Sluit", "foutmelding");
    });
  }

  annuleerWijziging(): void {
    this.website = new Website();
    this.wijzigen = false;
  }

  openDialog(website: Website): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = website;

    const dialogRef = this.dialog.open(WebsiteDeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(teVerwijderenWebsite => {
      this.websiteService.verwijderWebsite(teVerwijderenWebsite.id).subscribe(response => {
        this.openSnackbar("De website is verwijderd.", "Sluit", "correctmelding");
        this.haalWebsitesOp();
      },
      (error) => {
        this.openSnackbar("Het verwijderen van de website is mislukt.", "Sluit", "foutmelding");
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
