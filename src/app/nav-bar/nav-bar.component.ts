import { Component, OnInit } from '@angular/core';
import { AuthenticatieService } from '../services/authenticatie.service';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit { 
  ingelogd: boolean = false;

  constructor(private authenticatieservice:AuthenticatieService, private router:Router,
              private tokenService:TokenService) { }

  ngOnInit() {
  }

  public logout(): void {
    const redirect = this.authenticatieservice.logout();
    this.ingelogd = this.tokenService.isIngelogd();
    this.router.navigateByUrl(redirect);
  }

  naarHome(): void {
    this.router.navigateByUrl(this.authenticatieservice.krijgRol() + "/nieuw");
  }

  navigeerNaar(url: string): void {
    this.router.navigateByUrl(this.authenticatieservice.krijgRol() + "/" + url);
  }
}
