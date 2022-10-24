import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RegisterAssistanceService {
  assistanceURL = 'https://registrapp.onrender.com/api/asistencia/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  register(idAlumno: string, idSeccion: string, estaPresente: boolean = true) {
    this.http.post<any>(
      this.assistanceURL,
      { estaPresente, idSeccion, idAlumno },
      this.httpOptions
    );
  }
}
