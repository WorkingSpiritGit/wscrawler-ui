import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { GebruikersRol } from "../model/gebruikers-rol.enum";
import { isNotNullOrUndefined } from "codelyzer/util/isNotNullOrUndefined";
import { TokenService } from "./token.service";
import { isNullOrUndefined } from "util";

@Injectable({
  providedIn: 'root'
})
export class AuthenticatieService {

  private apiUrl: string;
  private amClientAuthorization: string;
  private jwtToken: JwtToken;
  public redirectUrl: string;

  constructor(private http: HttpClient, private tokenService: TokenService, private jwtHelperService: JwtHelperService) {

    this.apiUrl = environment.apiUrl;
    this.amClientAuthorization = ''.concat(environment.amaClientId, ':', environment.amaClientSecret);
  }

  public login(gebruikersnaam: string, wachtwoord: string): Observable<JwtResponse> {
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', gebruikersnaam)
      .set('password', wachtwoord);

    const httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Basic ' + btoa(this.amClientAuthorization));

    return this.http.post<JwtResponse>(this.apiUrl + '/oauth/token',
      body.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(this.amClientAuthorization)
        }
      }
    );
  }

  public isGeautoriseerd(gebruikersRol: GebruikersRol): boolean {
   
        
    if (!this.tokenService.isIngelogd() ) {
      return false;
    }
  

    if (isNullOrUndefined(this.jwtToken)) {
      this.jwtToken = this.jwtHelperService.decodeToken(this.tokenService.getBearerToken());
    }

    return !isNullOrUndefined(this.jwtToken)
      && !isNullOrUndefined(this.jwtToken.authorities)
      && !isNullOrUndefined(this.jwtToken.authorities.find(value => value === gebruikersRol.toString()));
  }

  public routePerRol(): string {
    if (isNullOrUndefined(this.jwtToken)) {
      this.jwtToken = this.jwtHelperService.decodeToken(this.tokenService.getBearerToken());
    }

    let rol = this.jwtToken.authorities[0];

    switch (rol) {
      case 'ADMIN': {
        return '/admin';
      }
      case 'ACCOUNTMANAGER': {
        return '/accountmanager';
      }
    }
  }

  public krijgRol(): string {
    if (isNotNullOrUndefined(this.jwtToken)) {
      this.jwtToken = this.jwtHelperService.decodeToken(this.tokenService.getBearerToken());
    }

    let rol = this.jwtToken.authorities[0];

    switch (rol) {
      case 'ADMIN': {
        return "admin";
      }
      case 'ACCOUNTMANAGER': {
        return "accountmanager";
      }

    }
  }

  public haalTokenOp(): JwtToken {
    return this.jwtToken;
  }

  public logout(): string {
    this.jwtToken = null;
    this.tokenService.resetToken();
    return '/inloggen';
  }
}

export interface JwtResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  jti: string;
  scope: string;
}

export interface JwtToken {
  authorities: string[];
  client_id: string;
  exp: number;
  jti: string;
  scope: string[];
  user_name: string;
  voornaam: string;
  tussenvoegsel: string;
  achternaam: string;
  displaynaam: string;
  gebruiker_id: number;
}
