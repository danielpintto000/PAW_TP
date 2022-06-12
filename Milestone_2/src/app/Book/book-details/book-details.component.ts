//Imports necessários
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { Location } from '@angular/common';

//Ficheiros pertencentes ao componente book-details
@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})

//Tornar a classe BookDetailsComponent acessível em todo o programa
export class BookDetailsComponent implements OnInit {
  @Input() book!: Book;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rest: BookService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    var idTemp = this.route.snapshot.params['id'];

    this.rest.getBook(idTemp).subscribe((data: Book) => {
      this.book = data;
    });
  }

  //Redireciona para book-list
  navigateToBooks(): void {
    this.router.navigate(['/book-list']);
  }

  //Voltar ao URL anterior
  back() {
    this._location.back();
  }
}
