//Imports necessários
import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

//Ficheiros pertencentes ao componente user-edit
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})

//Torna a classe UserEditComponent acessível em todo o programa
export class UserEditComponent implements OnInit {
  @Input() user: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rest: UserService,
    private _location: Location
  ) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    var idTemp = this.route.snapshot.params['id'];
    this.rest.getUser(idTemp).subscribe((data: User) => {
      console.log(data);
      this.user = data;
    });
  }

  edit(): void {
    this.rest.editUser(this.user).subscribe(
      (_) => {
        this.navigateToUsers();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //Redirecionar para user-list
  navigateToUsers(): void {
    this.router.navigate(['/user-list/']);
  }

  //Voltar ao URL anterior
  back() {
    this._location.back();
  }
}
