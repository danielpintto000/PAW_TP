//Imports necessários
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import jwt_decode from 'jwt-decode';
import { PointsService } from '../../services/points.service';
import { Points } from '../../models/points';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Location } from '@angular/common';

//Ficheiros pertencentes ao componente book-list
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})

//Torna a classe BooklistComponent acessível em todo o programa
export class BookListComponent implements OnInit {
  books!: Book[];
  adminOrEmployee!: boolean;
  user!: boolean;
  userId!: String;

  constructor(
    private rest: BookService,
    private rest2: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.adminOrEmployee = false;
    this.user = false;
    this.getBooks();
  }

  getBooks() {
    this.rest.getBooks().subscribe((data: Book[]) => {
      //console.log(data);
      this.books = data;
    });
  }

  //Redirecionar para book-add
  createBook() {
    this.router.navigate(['book-add']);
  }

  //Redirecionar para bood-edit
  editBook(id: string) {
    this.router.navigate(['/book-edit/' + id]);
  }

  //Redirecionar para book-details
  view(id: string) {
    this.router.navigate(['/book-details/' + id]);
  }

  //Apagar informação referente a um livro (book)
  delete(id: string) {
    //console.log(id);
    this.rest.deleteBook(id).subscribe(
      (_: any) => {
        this.getBooks();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  
  //Terminar sessão e redirecionar para a logout
  logout() {
    this.adminOrEmployee=false;
    this.user = false;
    
    this.router.navigate(['logout']);
  }

  /*buy(id: string) {
    this.router.navigate(['/cart/' + id]);
  }*/

  addToCart(id: string) {
    this.router.navigate(['/cart/' + id]);
  }

  setRoleTemp(): void {
    let token;
    if (localStorage.getItem('currentUser') != null) {
      token = localStorage.getItem('currentUser')!.substring(0);
      let decoded = this.getDecodedAccessToken(token);

      this.userId = decoded.id;
      this.getUser(decoded.id);
    } 
  }

  getUser(id: string) {
    this.rest2.getUser(id).subscribe((data: User) => {
      //console.log(data);      
      if(data.role == "ADMIN"){
        this.adminOrEmployee = true;
      }
      if(data.role == "USER"){
        this.user = true;
      }
    });
  }
  
  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

  //Voltar ao URL anterior
  back() {
    this._location.back();
  }
}
