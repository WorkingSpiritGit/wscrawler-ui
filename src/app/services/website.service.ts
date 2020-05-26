import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Website } from '../model/website';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsiteService {
  private api: string = (environment.apiUrl + "/website");

  constructor(private http: HttpClient) { }

  websiteOpslaan(website: Website): Observable<any> {
    return this.http.post<Website>(`${this.api}/`, website)
  }

  geefAlleWebsites(): Observable<Website[]> {
    return this.http.get<Website[]>(`${this.api}/`);
  }

  geefWebsiteOpId(id: number): Observable<Website> {
    return this.http.get<Website>(`${this.api}/` + id);
  }

  wijzigWebsite(id: number, website: Website): Observable<any> {
    return this.http.put<Website>(`${this.api}/` + id, website);
  }

  verwijderWebsite(id: number): Observable<any> {
    return this.http.delete(`${this.api}/` + id);
  }
}
