//Imports necessários
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import {Location} from '@angular/common';
import { UserService } from '../../services/user.service';

//Ficheiros pertencentes ao componente user-list
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})

//Torna a classe UserEditComponent acessível em todo o programa
export class UserListComponent implements OnInit {
  users!: User[];

  constructor(
    private rest: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.rest.getUsers().subscribe((data: User[]) => {
      //console.log(data);
      this.users = data;
    });
  }

  //Redirecionar para register-user
  createUser() {
    this.router.navigate(['/register-user']);
  }

  //Redirecionar para user-edit
  editUser(id: string) {
    this.router.navigate(['/user-edit/' + id]);
  }

  //Redirecionar para user-details
  view(id: string) {
    this.router.navigate(['/user-details/' + id]);
  }

  delete(id: string) {
    //console.log(id);
    this.rest.deleteUser(id).subscribe(
      (_) => {
        this.getUsers();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  logout() {
    this.router.navigate(['logout']);
  }

  //Voltar ao URL anterior
  back() {
    this._location.back();
  }
}
