//Imports necessários
import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { Book } from '../../models/book';
//import { Points } from '../../models/points';
import { UserService } from '../../services/user.service';

//Ficheiros pertencentes ao componente user-details
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})

//Torna a classe BookAddComponent acessível em todo o programa
export class UserDetailsComponent implements OnInit {
  @Input() user!: User;
  books!: Book[];
  //points!: Points[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rest: UserService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    var idTemp = this.route.snapshot.params['id'];
    this.rest.getUser(idTemp).subscribe((data: User) => {
      this.user = data;
    });
    this.getBook();
    //this.getPoints();
  }

  /*getPoints(): void {
    this.rest.getPoints(this.user._id).subscribe((data: Points[]) => {
      this.points = data;
    })
  }*/

  //Redirecionar para user-list
  navigateToUsers(): void {
    this.router.navigate(['/user-list']);
  }

  getBook(): void {
    this.rest.getBook(this.user._id).subscribe((data: Book[]) => {
      this.books = data;
    })
  }

  //Voltar ao URL anterior
  back() {
    this._location.back();
  }
}
