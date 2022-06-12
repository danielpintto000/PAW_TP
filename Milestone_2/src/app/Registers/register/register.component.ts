//Imports necessários
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRestServiceService } from '../../services/auth-rest-service.service';

//Ficheiros pertencentes ao componente register
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

//Torna a classe BookAddComponent acessível em todo o programa
export class RegisterComponent implements OnInit {
  name: string;
  email: string;
  password: string;
  role: string;
  address: string;

  constructor(
    private router: Router,
    private authServive: AuthRestServiceService,
    private _register: Location
  ) {
    this.name = '';
    this.password = '';
    this.email = '';
    this.role= '';
    this.address='';
  }

  ngOnInit(): void {}

  register(): void {
    this.authServive
      .register(this.name, this.email, this.password, this.role)
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
    this._register.back();
  }
}
