import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Zoekterm } from '../model/zoekterm';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZoektermService {
  private api: string = (environment.apiUrl + "/zoekterm");

  constructor(private http: HttpClient) { }

  zoektermOpslaan(zoekterm: Zoekterm): Observable<any> {
    return this.http.post<Zoekterm>(`${this.api}/`, zoekterm);
  }

  geefAlleZoektermen(): Observable<Zoekterm[]> {
    return this.http.get<Zoekterm[]>(`${this.api}/`);
  }

  geefZoektermOpId(id: number): Observable<Zoekterm> {
    return this.http.get<Zoekterm>(`${this.api}/` + id);
  }

  wijzigZoekterm(id: number, zoekterm: Zoekterm): Observable<any> {
    return this.http.put<Zoekterm>(`${this.api}/` + id, zoekterm);
  }

  verwijderZoekterm(id: number): Observable<any> {
    return this.http.delete(`${this.api}/` + id);
  }
}
