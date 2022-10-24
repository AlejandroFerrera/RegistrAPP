import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RegisterAssistanceService {
  private assistanceURL = 'https://registrapp.onrender.com/api/asistencia/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  register(idAlumno: number, idSeccion: number, estaPresente: boolean) {
    return this.http.post<any>(
      this.assistanceURL,
      {
        esta_presente: estaPresente,
        id_seccion: idSeccion,
        id_alumno: idAlumno,
      },
      this.httpOptions
    );
  }
}
