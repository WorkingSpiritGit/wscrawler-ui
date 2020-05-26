import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticatieService, JwtResponse } from 'src/app/services/authenticatie.service';
import { TokenService } from 'src/app/services/token.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-inlog',
  templateUrl: './inlog.component.html',
  styleUrls: ['./inlog.component.scss']
})
export class InlogComponent implements OnInit {
    loginform: FormGroup;
  
    constructor(private formbuilder: FormBuilder, private authenticatieService: AuthenticatieService,
                private tokenService: TokenService, private router: Router, private snackbar: MatSnackBar) {
  
      this.loginform = this.formbuilder.group({
        gebruikersnaam: ['', Validators.required],
        wachtwoord: ['', Validators.required]
      });
    }
  
    ngOnInit() {
    }
  
    public login(): void {
  
      const val = this.loginform.value;
  
      if (val.gebruikersnaam && val.wachtwoord) {
        this.authenticatieService.login(val.gebruikersnaam, val.wachtwoord).subscribe((token: JwtResponse) => {
          this.tokenService.setAutoristatieToken(token);
  
          const redirect = this.authenticatieService.redirectUrl ? this.router.parseUrl(this.authenticatieService.redirectUrl) : this.authenticatieService.routePerRol();
          this.router.navigateByUrl(redirect);
        },
        (error) => {
          console.log(error);
          this.openSnackbar("Het emailadres of wachtwoord is onjuist.", "Sluit", "foutmelding");
        });
      }
    }

    openSnackbar(melding: string, actie: string, cssOpmaak: string) {
      this.snackbar.open(melding, actie, {
        // duration: 5000,
        panelClass: [cssOpmaak]
      });
    }
  }