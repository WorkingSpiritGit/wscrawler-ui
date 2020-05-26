import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VacatureService } from 'src/app/services/vacature.service';
import { VacatureDTO } from 'src/app/model/vacature-dto';
import { MatSnackBar, MatRadioChange, MatSlideToggleChange } from '@angular/material';
import { Vacaturestatus } from 'src/app/model/vacaturestatus.enum';
import { AuthenticatieService } from 'src/app/services/authenticatie.service';
import { Gebruiker } from 'src/app/model/gebruiker';
import { GebruikerService } from 'src/app/services/gebruiker.service';

@Component({
  selector: 'app-vacature',
  templateUrl: './vacature.component.html',
  styleUrls: ['./vacature.component.scss']
})
export class VacatureComponent implements OnInit {
  vacature: VacatureDTO = new VacatureDTO;
  gebruiker: Gebruiker = new Gebruiker;
  statusOpties: any[] = [
    { naam: "In afwachting", waarde: Vacaturestatus.AFWACHTING },
    { naam: "In behandeling", waarde: Vacaturestatus.ACTIEF },
    { naam: "Afgehandeld", waarde: Vacaturestatus.AFGEHANDELD }
  ];

  constructor(private activeRoute: ActivatedRoute, private vacatureService: VacatureService, private snackbar: MatSnackBar,
              private authenticatieService: AuthenticatieService, private gebruikerService: GebruikerService) { }

  ngOnInit() {
    const id = +this.activeRoute.snapshot.paramMap.get('id');
    this.haalVacatureOp(id);
    this.haalGebruikerOp();
  }

  haalVacatureOp(id: number): void {
    this.vacatureService.geefVacatureOpId(id).subscribe(vacature => {
      this.vacature = vacature;
      this.vacatureService.wijzigGezien(vacature.id, vacature).subscribe();
    });
  }

  haalGebruikerOp():void {
    let token = this.authenticatieService.haalTokenOp();
    this.gebruikerService.geefGebruikerOpId(token.gebruiker_id).subscribe(response => {
      this.gebruiker = response;
    });
  }

  naarWebsite(): void {
    window.open(this.vacature.url, "_blank");
  }

  wijzigStatus($event: MatRadioChange): void {
    this.vacatureService.wijzigStatus(this.vacature.id, this.gebruiker.id, this.vacature).subscribe(response => {
      this.openSnackbar("De status van de vacature is gewijzigd.", "Sluit", "correctmelding");
      this.ngOnInit();
    },
    (error) => {
      this.openSnackbar("Er is een fout opgetreden bij het wijzigen van de status.", "Sluit", "foutmelding");
    });
  }

  notitiesOpslaan(vacature: VacatureDTO): void {
    this.vacatureService.wijzigNotities(vacature.id, vacature).subscribe(response => {
      this.openSnackbar("De notities van de vacature zijn gewijzigd.", "Sluit", "correctmelding");
      this.ngOnInit();
    },
    (error) => {
      this.openSnackbar("Er is een fout opgetreden bij het wijzigen van de notities.", "Sluit", "foutmelding");
    });
  }

  wijzigArchief($event: MatSlideToggleChange, vacature: VacatureDTO): void {
    let toggle = $event.checked;
    this.vacatureService.wijzigArchief(vacature.id, vacature).subscribe(response => {
      if (toggle) {
        this.openSnackbar("De vacature is gearchiveerd.", "Sluit", "correctmelding");
      } else {
        this.openSnackbar("De vacature is uit het archief gehaald.", "Sluit", "correctmelding");
      }
      this.ngOnInit();
    },
    (error) => {
      this.openSnackbar("Er is een fout opgetreden bij het wijzigen van het vacature-archief.", "Sluit", "foutmelding");
    });
  }

  openSnackbar(melding: string, actie: string, cssOpmaak: string) {
    this.snackbar.open(melding, actie, {
      duration: 5000,
      panelClass: [cssOpmaak]
    });
  }
}
