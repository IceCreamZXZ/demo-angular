import { Injectable } from '@angular/core';
import { Angestellter } from "./angestellter";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AngestellteService {

  constructor(private http: HttpClient) { }

  public getAngestellte(): Observable<Angestellter[]> {
    return this.http.get<Angestellter[]>(`http://localhost:8080/angestellter/findAll`);
  }

  public addAngestellter(angestellter: Angestellter): Observable<Angestellter> {
    return this.http.post<Angestellter>(`http://localhost:8080/angestellter/addAngestellter`, angestellter);
  }

  public findAngestellterByVorname(vorname: string): Observable<Angestellter> {
    return this.http.get<Angestellter>(`http://localhost:8080/angestellter/findAll/${vorname}`);
  }

  public deleteAngestellter(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/angestellter/deleteAngestellter/${id}`);
  }

}
