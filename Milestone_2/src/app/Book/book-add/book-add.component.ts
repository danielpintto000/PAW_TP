//Imports necessários
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';

//Ficheiros pertencentes ao componente book-add
@Component ({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css'],
})

//Torna a classe BookAddComponent acessível em todo o programa
export class BookAddComponent implements OnInit {
  @Input() book!: Book;
  url!: string | ArrayBuffer | null;
  file: any;
  fileName = '';
  message = '';
  books!: Book[];

  constructor(
    private router: Router,
    private rest: BookService,
    private _location: Location,
    private _book: BookService
  ) {
    this.book = new Book();
  }

  ngOnInit(): void {
    this._book.getBooks().subscribe((data: Book[]) => {
      //console.log(data);
      this.books = data;
    });
  }

  add(): void {
    //debugger;
    this.rest.createBook(this.book).subscribe((data: Book) => {
      console.log('Book added');
      this.navigateToBooks();
    });
  }

  //Redirecionar para book-list
  navigateToBooks(): void {
    this.router.navigate(['/book-list/']);
  }
  
  //Voltar ao URL anterior
  back() {
    this._location.back();
  }

  readUrl(booki: any) {
    if (booki.target.files && booki.target.files[0]) {
      this.file = booki.target.files[0];
      var reader = new FileReader();

      reader.onload = (booki: ProgressEvent) => {
        this.url = (<FileReader>booki.target).result;
      };

      reader.readAsDataURL(booki.target.files[0]);
    }
  }

  onFileSelected(book:any) {
    const file: File = book.target.files[0];

    //console.log(file);

    if (file) {
      this.fileName = file.name;
      
      this.rest.uploadFile(file).subscribe((result:any) => {
        //console.log(result);
        this.fileName = '';
        this.message = result.message;
      });
    }
  }
}
