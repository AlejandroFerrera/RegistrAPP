import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl: string = 'https://registrapp.onrender.com/api/login';
  private loginSuccess: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  private setSession(context: User) {
    try {
      const token = context.token;
      const idAlumno = context.idAlumno;

      localStorage.setItem('token', token);
      localStorage.setItem('idAlumno', idAlumno.toString());
      this.loginSuccess.next(true);
    } catch (error) {
      this.loginSuccess.next(false);
    }
  }

  login(email: string, password: string) {
    return this.http
      .post<User>(this.loginUrl, { email, password })
      .pipe(tap((response: User) => this.setSession(response)));
  }

  getToken(): string {
    return localStorage.getItem('token')!;
  }

  isLogedIn() {
    return this.loginSuccess.value;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('idAlumno');
    this.loginSuccess.next(false);
  }
}
