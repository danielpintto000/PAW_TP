//Imports necessários
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

//Marca uma classe como disponível para ser providenciada e injetada como dependência
@Injectable()

//Tornar a classe AuthInterceptorInterceptor acessível em todo o programa
export class AuthInterceptorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser = JSON.parse(localStorage.getItem('currentUser') || "{}");

    if (currentUser && currentUser.token) {
      request = request.clone({
          setHeaders: { 
              "x-access-token": `${currentUser.token}`
          }
      });
  }
    
    return next.handle(request);
  }
  
}
