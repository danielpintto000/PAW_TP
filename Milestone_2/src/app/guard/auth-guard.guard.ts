//Imports necessários
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

//Marca uma classe como disponível para ser providenciada e injetada como dependência
@Injectable({
    providedIn: 'root'
})

//Torna a classe AuthGuardGuard acessível em todo o programa
export class AuthGuardGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean
        | UrlTree> | Promise<boolean | UrlTree> {
            if(localStorage.getItem('currentUser') ){
                return true;
            }

        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
        
        return false;
    }
}