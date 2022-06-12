//Imports necessários
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { User } from './models/user';
import { UserService } from './services/user.service';

//Ficheiros pertencentes ao componente app
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

//Torna a classe BookEditComponent acessível em todo o programa
export class AppComponent {
  title = 'Milestone_2';
  userId!: String;
  userName!: String;
  admin!:boolean;
  user!:boolean;
  adminOrEmployee!:boolean;

  constructor(
    private router: Router,
    private rest: UserService
  ) {}

  setUserName(): void {
    let token;
    if (localStorage.getItem('currentUser') != null) {
      token = localStorage.getItem('currentUser')!.substring(0);
      let decoded = this.getDecodedAccessToken(token);

      this.userId = decoded.id;
      this.getUser(decoded.id);
    } else {
      this.userName = '';
    }
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  getUser(id: string) {
    this.rest.getUser(id).subscribe((data: User) => {
      //console.log(data);
      this.userName = data.name;
      
      if(data.role == "ADMIN"){
        this.admin = true;
      } if(data.role == "ADMIN" || data.role == "EMPLOYEE")  {
        this.adminOrEmployee = true;
      } if(data.role == "USER"){
          this.user = true;
      }
    
    });
  }

  //Redirecionar para book-list
  navigateToBooks(): void {
    this.router.navigate(['/book-list']);
  }

  //Redirecionar para user-list
  navigateToUsers(): void {
    this.router.navigate(['/user-list']);
  }

  //Redirecionar para employee-list
  navigateToEmployees(): void {
    this.router.navigate(['/employee-list/']);
  }

  //Redirecionar para cart
  navigateToShoppingCart(): void {
    this.router.navigate(['/cart']);
  }

  //Redirecionar para login
  login() {
    this.router.navigate(['login']);
  }

  logout() {
    this.admin=false;
    this.adminOrEmployee=false;
    this.user = false;
    this.userName = "";
    this.router.navigate(['logout']);
  }

  //Redirecionar para register
  register(): void {
    this.router.navigate(['/register']);
  }

  //Redirecionar para points
  points(): void {
    this.router.navigate(['/points']);
  }

  //Redirecionar para books
  books(): void {
    this.router.navigate(['/books']);
  }
}
