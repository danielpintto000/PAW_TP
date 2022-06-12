//Imports necessários
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRestServiceService } from '../../services/auth-rest-service.service';

//Ficheiros pertencentes ao componente register-employee
@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css'],
})

//Torna a classe RegisterEmployeeComponent acessível em todo o programa
export class RegisterEmployeeComponent implements OnInit {
  name: string;
  email: string;
  password: string;
  role: string;

  constructor(
    private router: Router,
    private authServive: AuthRestServiceService,
    private _location: Location
  ) {
    this.name = '';
    this.password = '';
    this.email = '';
    this.role = '';
  }

  ngOnInit(): void {}

  register(): void {
    this.authServive
      .register(this.name, this.email, this.password, 'EMPLOYEE')
      .subscribe((user: any) => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.router.navigate(['/']);
        } else {
          alert('Erro no login!');
        }
      });
  }

  //Redirecionar para login
  login() {
    this.router.navigate(['login']);
  }

  //Voltar ao URL anterior
  back() {
    this._location.back();
  }
}
