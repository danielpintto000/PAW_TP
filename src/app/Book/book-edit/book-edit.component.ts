//Imports necessários
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { Location } from '@angular/common';

//Ficheiros pertencentes ao componente book-edit
@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})

//Torna a classe BookEditComponent acessível em todo o programa
export class BookEditComponent implements OnInit {

  @Input() book!: Book;
  url!: string | ArrayBuffer | null;
  file: any;
  fileName = '';
  message = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rest: BookService,
    private _location: Location
  ) {
    this.book = new Book();
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    var idTemp = this.route.snapshot.params['id'];
    this.rest.getBook(idTemp).subscribe((data: Book) => {
      //console.log(data);
      this.book = data;
    });
  }

  edit(): void {
    this.rest.editBook(this.book).subscribe(
      (_: any) => {
        this.navigateToBooks();
      },
      (err: any) => {
        console.log(err);
      }
    );
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

  //Redirecionar para book-list
  navigateToBooks(): void {
    this.router.navigate(['/book-list/']);
  }

  //Voltar ao URL anterior
  back() {
    this._location.back();
  }
}
