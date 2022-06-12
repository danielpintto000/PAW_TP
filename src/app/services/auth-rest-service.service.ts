//Imports necessários
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const endpoint = 'http://localhost:3000/auth/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

//Marca uma classe como disponível para ser providenciada e injetada como dependência
@Injectable({
  providedIn: 'root',
})

//Torna a classe AuthRestServiceService acessível em todo o programa
export class AuthRestServiceService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthRestModelResponse> {
    return this.http.post<AuthRestModelResponse>(
      endpoint + 'login',
      new LoginModel(email, password)
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  register(
    name: string,
    email: string,
    password: string,
    role: string
  ): Observable<AuthRestModelResponse> {
    //Escolher o tipo de registo
    if (role === 'ADMIN') {
      return this.http.post<any>(
        'http://localhost:3000/auth/register-admin',
        new RegisterModel(name, email, password, role)
      );
    } else if (role === 'EMPLOYEE') {
      return this.http.post<any>(
        'http://localhost:3000/auth/register-employee',
        new RegisterModel(name, email, password, role)
      );
    } else {
      return this.http.post<any>(
        'http://localhost:3000/auth/register-user',
        new RegisterModel(name, email, password, role)
      );
    }
  }
}
export interface AuthRestModelResponse {}

export class LoginModel {
  constructor(public email: string, public password: string) {}
}

export class RegisterModel {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public role: string
  ) {}
}
