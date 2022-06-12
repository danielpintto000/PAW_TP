//Imports necessários
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Book } from '../models/book';
import { Points } from '../models/points';

const endpointEmployees = 'http://localhost:3000/employees/';
const endpointAdmins = 'http://localhost:3000/admins/';
const endpointUsers = 'http://localhost:3000/users/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

export interface iUserService {
  getUsers():Observable<User[]>;
  getUser(id: string): Observable<User>;
  createUser(book: User): Observable<User>;
  editUser(user: User): Observable<User>;
  deleteUser(id: string): Observable<User>;
}

//Marca uma classe como disponível para ser providenciada e injetada como dependência
@Injectable({
  providedIn: 'root',
})

//Torna a classe UserService acessível em todo o programa
export class UserService implements iUserService{
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(endpointUsers);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(endpointUsers + 'show/' + id);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(endpointUsers+'create', JSON.stringify(user), httpOptions);
  }

  editUser(user: User): Observable<User> {
    return this.http.put<User>(endpointUsers+'edit/' + user._id, JSON.stringify(user), httpOptions);
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(endpointUsers+'delete/' + id, httpOptions);
  }

  getBook(Userid: string): Observable<Book[]> {
    return this.http.get<Book[]>(endpointUsers+ 'showbooks/' + Userid);
  }

  deleteBooks(bookId: string): Observable<Book> {
    return this.http.delete<Book>(endpointUsers+ 'deletebook/' + bookId, httpOptions);
  }

  getPoints(id:string): Observable<Points> {
    return this.http.get<Points>(endpointUsers + 'show/' + id);
  }

  deletePoints(_id: string): Observable<Points> {
    return this.http.delete<Points>(endpointUsers+ 'deletepoints/' + _id, httpOptions);
  }

}

//Marca uma classe como disponível para ser providenciada e injetada como dependência
@Injectable({
  providedIn: 'root',
})
export class EmployeeService{
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(endpointEmployees );
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(endpointEmployees + 'show/' + id);
  }

  createUser(employee: User): Observable<User> {
    return this.http.post<User>(endpointEmployees+'create', JSON.stringify(employee), httpOptions);
  }

  editUser(employee: User): Observable<User> {
    return this.http.put<User>(endpointEmployees+'edit/' + employee._id, JSON.stringify(employee), httpOptions);
  }

  deleteUser(id:string): Observable<User> {
    return this.http.delete<User>(endpointEmployees + 'delete/' + id, httpOptions);
  }
}

//Marca uma classe como disponível para ser providenciada e injetada como dependência
@Injectable({
  providedIn: 'root',
})

//Torna a classe AdminService acessível em todo o programa
export class AdminService implements iUserService{
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(endpointAdmins);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(endpointAdmins + 'show/' + id);
  }

  createUser(admin: User): Observable<User> {
    return this.http.post<User>(endpointAdmins+'create', JSON.stringify(admin), httpOptions);
  }

  editUser(admin: User): Observable<User> {
    return this.http.put<User>(endpointAdmins+'edit/' + admin._id, JSON.stringify(admin), httpOptions);
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(endpointAdmins+'delete/' + id, httpOptions);
  }
}
