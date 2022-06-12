//Imports necessários
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; //NÃO USAMOS
import { Points } from '../models/points';
import jwt_decode from 'jwt-decode';

const endpoint = 'http://localhost:3000/users/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

//Marca uma classe como disponível para ser providenciada e injetada como dependência
@Injectable({
  providedIn: 'root',
})

//Torna a classe PointsService acessível em todo o programa
export class PointsService {
  constructor(private http: HttpClient) {}

  addPoints(bookId: string, token: string, url: string) {
    let decoded = this.getDecodedAccessToken(token);
    var points: Points = new Points();
    points.bookId = bookId;
    points.userId = <string>decoded.id;
    //console.log(points);
    return this.http.post<any>(
      endpoint + 'addPoints',
      JSON.stringify(points),
      httpOptions
    );
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
