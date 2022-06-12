//Imports necessários
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { AuthRestServiceService } from '../services/auth-rest-service.service';

//Ficheiros pertencentes ao componente login
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

//Torna a classe BookAddComponent acessível em todo o programa
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  returnUrl!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authServive: AuthRestServiceService,
    private _location: Location
  ) {
    this.password = '';
    this.email = '';
  }

  ngOnInit(): void {
    //this.authServive.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(): void {
    this.authServive.logout();
    this.authServive.login(this.email, this.password).subscribe((user: any) => {
      if (user && user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigateByUrl(this.returnUrl);
      } else {
        alert('Erro no login!');
      }
    });
  }

  register() {
    this.router.navigate(['register']);
  }

  //Voltar ao URL anterior
  back() {
    this._location.back();
  }

  /*register(): void{
    this.authServive.register(this.email, this.password).subscribe((user : any)=>{
      if (user && user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/location-list']);
      } else {
        alert('Erro no login!');
      }
    })
  }*/
}
