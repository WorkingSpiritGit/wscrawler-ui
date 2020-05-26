import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gebruiker } from '../model/gebruiker';
import { WachtwoordDTO } from '../model/wachtwoord-dto';

@Injectable({
  providedIn: 'root'
})
export class GebruikerService {
  private api: string = (environment.apiUrl + "/gebruiker");

  constructor(private http: HttpClient) { }

  geefAlleGebruikers(): Observable<Gebruiker[]> {
    return this.http.get<Gebruiker[]>(`${this.api}/`);
  }

  gebruikerOpslaan(gebruiker: Gebruiker): Observable<any> {
    return this.http.post<Gebruiker>(`${this.api}/`, gebruiker);
  }

  geefGebruikerOpId(id: number): Observable<Gebruiker> {
    return this.http.get<Gebruiker>(`${this.api}/` + id);
  }

  wijzigGebruiker(id: number, gebruiker: Gebruiker): Observable<any> {
    return this.http.put<Gebruiker>(`${this.api}/` + id, gebruiker);
  }

  verwijderGebruiker(id: number): Observable<any> {
    return this.http.delete(`${this.api}/` + id);
  }

  wijzigWachtwoord(id: number, wachtwoordDTO: WachtwoordDTO): Observable<any> {
    return this.http.put<WachtwoordDTO>(`${this.api}/` + id + '/wachtwoord', wachtwoordDTO);
  }
}
