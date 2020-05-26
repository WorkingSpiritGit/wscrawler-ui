import {Injectable} from '@angular/core';
import {JwtResponse} from "./authenticatie.service";
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";
import {GebruikersRol} from "../model/gebruikers-rol.enum";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private autorisatieToken: JwtResponse;

  constructor(private jwtHelperService: JwtHelperService) {
  }

  public setAutoristatieToken(autorisatieToken: JwtResponse): void {

    this.autorisatieToken = autorisatieToken;
  }

  public getAutorisatieToken(): JwtResponse {

    return this.autorisatieToken;
  }

  public getBearerToken(): string {

    return isNotNullOrUndefined(this.autorisatieToken) ? this.autorisatieToken.access_token : null;
  }

  public isIngelogd(): boolean {

    return isNotNullOrUndefined(this.autorisatieToken);
  }

  public resetToken(): void {
    this.autorisatieToken = null;
  }

}
