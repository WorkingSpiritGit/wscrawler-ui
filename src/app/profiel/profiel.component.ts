import { Component, OnInit } from '@angular/core';
import { AuthenticatieService } from '../services/authenticatie.service';
import { Gebruiker } from '../model/gebruiker';
import { GebruikerService } from '../services/gebruiker.service';
import { MatSnackBar } from '@angular/material';
import { WachtwoordDTO } from '../model/wachtwoord-dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profiel',
  templateUrl: './profiel.component.html',
  styleUrls: ['./profiel.component.scss']
})
export class ProfielComponent implements OnInit {
  gebruiker: Gebruiker = new Gebruiker;
  wachtwoordDTO: WachtwoordDTO = new WachtwoordDTO;
  wijzigForm: FormGroup;
  wijzigen: boolean[] = [false, false, false, false, false];
  infoZichtbaar: boolean = true;

  constructor(private authenticatieService: AuthenticatieService, private gebruikerService: GebruikerService,
              private snackbar: MatSnackBar, private fb: FormBuilder) {
                this.wijzigForm = this.fb.group({
                  huidigPassword: ['', Validators.required],
                  nieuwPassword: ['', Validators.required]
                });
  }

  ngOnInit() {
    this.haalGebruikerOp();
  }

  haalGebruikerOp(): void {
    let token = this.authenticatieService.haalTokenOp();
    this.gebruikerService.geefGebruikerOpId(token.gebruiker_id).subscribe(opgehaaldeGebruiker => {
      this.gebruiker = opgehaaldeGebruiker;
    });
  }

  gebruikerOpslaan(gebruiker: Gebruiker, index: number): void {
    this.gebruikerService.wijzigGebruiker(gebruiker.id, gebruiker).subscribe(response => {
      this.openSnackbar("Uw gegevens zijn gewijzigd.", "Sluit", "correctmelding");
      this.haalGebruikerOp();
      this.wijzigen[index] = !this.wijzigen[index];
    },
    (error) => {
      this.openSnackbar("Er is een fout opgetreden bij het wijzigen van uw gegevens.", "Sluit", "foutmelding");
    });
  }

  wijzigWachtwoord(index: number): void {

    const val = this.wijzigForm.value;

    if (val.huidigPassword && val.nieuwPassword) {
      this.wachtwoordDTO.huidigWachtwoord = val.huidigPassword;
      this.wachtwoordDTO.nieuwWachtwoord = val.nieuwPassword;

      this.gebruikerService.wijzigWachtwoord(this.gebruiker.id, this.wachtwoordDTO).subscribe(response => {
        this.openSnackbar("Uw wachtwoord is gewijzigd.", "Sluit", "correctmelding");
        this.wijzigForm.reset();
        this.wijzigen[index] = !this.wijzigen[index];
      },
      (error) => {
        this.openSnackbar("Er is een fout opgetreden bij het wijzigen van uw wachtwoord.", "Sluit", "foutmelding");
      });
    }
  }

  annuleren(index: number): void {
    this.wijzigen[index] = !this.wijzigen[index];
    this.haalGebruikerOp();
  }

  openSnackbar(melding: string, actie: string, cssOpmaak: string) {
    this.snackbar.open(melding, actie, {
      duration: 5000,
      panelClass: [cssOpmaak]
    });
  }
}
