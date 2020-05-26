import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { VacatureDTO} from '../model/vacature-dto';
import { HttpClient } from '@angular/common/http';
import { SorteerDTO } from '../model/sorteer-dto';

@Injectable({
  providedIn: 'root'
})
export class VacatureService {
  private api: string = (environment.apiUrl + "/vacature");

  constructor(private http: HttpClient) { }

  geefAlleVacatures(sorteerDTO:SorteerDTO): Observable<any> {
    return this.http.post<VacatureDTO[]>(`${this.api}/`, sorteerDTO);
  }

  geefAantalVacatures(sorteerDTO: SorteerDTO): Observable<any> {
    return this.http.post<number>(`${this.api}/zoekopdracht`, sorteerDTO);
  }

  geefAantalNieuweVacatures(sorteerDTO:SorteerDTO): Observable<any> {
    return this.http.post<number>(`${this.api}/datum` , sorteerDTO);
  }

  geefAlleNieuweVacatures(sorteerDTO: SorteerDTO): Observable<any> {
    return this.http.post<VacatureDTO[]>(`${this.api}/nieuweVacatures`, sorteerDTO);
  }

  geefVacaturesInBehandeling(sorteerDTO: SorteerDTO): Observable<any> {
    return this.http.post<VacatureDTO>(`${this.api}/actief`, sorteerDTO);
  }

  geefAantalVacaturesInBehandeling(sorteerDTO: SorteerDTO): Observable<any> {
    return this.http.post<number>(`${this.api}/aantalActief`, sorteerDTO);
  }

  geefGearchiveerdeVacatures(sorteerDTO: SorteerDTO): Observable<any> {
    return this.http.post<VacatureDTO>(`${this.api}/archief`, sorteerDTO);
  }

  geefAantalGearchiveerdeVacatures(sorteerDTO: SorteerDTO): Observable<any> {
    return this.http.post<number>(`${this.api}/aantalArchief`, sorteerDTO);
  }

  verwijderVacature(id: number, vacature: VacatureDTO): Observable<any> {
    return this.http.put<VacatureDTO>(`${this.api}/` + id + '/verwijder', vacature);
  }

  geefVacatureOpId(id: number): Observable<VacatureDTO> {
    return this.http.get<VacatureDTO>(`${this.api}/` + id);
  }

  wijzigGezien(id: number, vacature: VacatureDTO): Observable<any> {
    return this.http.put<VacatureDTO>(`${this.api}/` + id + '/gezien', vacature);
  }

  wijzigStatus(vacature_id: number, gebruiker_id: number, vacature: VacatureDTO): Observable<any> {
    return this.http.put<VacatureDTO>(`${this.api}/` + vacature_id + '/' + gebruiker_id + '/status', vacature);
  }

  wijzigNotities(id: number, vacature: VacatureDTO): Observable<any> {
    return this.http.put<VacatureDTO>(`${this.api}/` + id + '/notities', vacature);
  }

  wijzigArchief(id: number, vacature: VacatureDTO): Observable<any> {
    return this.http.put<VacatureDTO>(`${this.api}/` + id + '/archief', vacature);
  }
}
