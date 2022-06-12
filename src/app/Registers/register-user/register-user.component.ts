//Imports necessários
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRestServiceService } from '../../services/auth-rest-service.service';
import { PointsService } from 'src/app/services/points.service';

//Ficheiros pertencentes ao componente register-user
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})

//Torna a classe BookAddComponent acessível em todo o programa
export class RegisterUserComponent implements OnInit {
  name: string;
  email: string;
  password: string;
  role: string;
  address: string;

  constructor(
    private router: Router,
    private authServive: AuthRestServiceService,
    private pointsService: PointsService,
    private _location: Location
  ) {
    this.name = '';
    this.password = '';
    this.email = '';
    this.role = '';
    this.address='';
  }

  ngOnInit(): void {}

  register(): void {
    this.authServive
      .register(this.name, this.email, this.password, 'USER')
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
