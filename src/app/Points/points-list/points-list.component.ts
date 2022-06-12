//Imports necessários
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { UserService } from '../../services/user.service';
import { Points } from '../../models/points';
import { User } from '../../models/user';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';

//Ficheiros pertencentes ao componente points-list
@Component({
  selector: 'app-points-list',
  templateUrl: './points-list.component.html',
  styleUrls: ['./points-list.component.css'],
})

//Torna a classe BookAddComponent acessível em todo o programa
export class PointsListComponent implements OnInit {
  points!:Points;
  userId!:string;
  userName!:string;
  bookName!:string;
  books!: Book[];

  constructor(
    private rest: UserService,
    private rest2: BookService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    let token = localStorage.getItem("currentUser")!.substring(0);
    let decoded =  this.getDecodedAccessToken(token);
    this.userId= decoded.id;
    this.getUser(decoded.id);
    this.getPoints(decoded.id);
  }

  getPoints(id:string){
    this.rest.getPoints(id).subscribe((data:Points) =>{
      //console.log(data);
      this.points = data;
    })
  }

  getUser(id:string){
    this.rest.getUser(id).subscribe((data:User) =>{
      //console.log(data);
      this.userName = data.name
    })
  }

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

  delete(id: string) {
    //console.log(id);
    this.rest.deletePoints(id).subscribe(
      (_: any) => {
        this.getPoints(this.userId);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
