//Imports necessários
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Book } from '../models/book';
import jwt_decode from 'jwt-decode';

const endpoint = "http://localhost:3000/books/"

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

//Marca uma classe como disponível para ser providenciada e injetada como dependência
@Injectable({
  providedIn: 'root'
})

//Torna a classe BookService acessível em todo o programa
export class BookService {
  constructor(private http: HttpClient) { }

  public cartItemList : any =[]
  public bookList = new BehaviorSubject<any>([]);

  //Obter um livro (book)
  getBook(id:string): Observable<Book> {
    return this.http.get<Book>(endpoint+'show/'+id);
  }

  //Obter todos os livros (boooks)
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(endpoint );
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(endpoint + 'create', JSON.stringify(book),httpOptions);
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post<any>(endpoint + 'file_upload', formData);
  }

  uploadFileTest(file: File): Observable<any> {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post<any>(endpoint + 'file_upload_test', formData);
  }

  editBook(book:Book):Observable<Book> {
    return this.http.put<Book>(endpoint + 'edit/'+book._id, JSON.stringify(book), httpOptions);
  }

  //Apagar informações de um livro (book)
  deleteBook(id:string):Observable<Book> {
    return this.http.delete<Book>(endpoint + 'delete/'+id, httpOptions);
  }

  addBook(bookId: string, token: string, url: string) {
    let decoded = this.getDecodedAccessToken(token);
    var book: Book = new Book();
    book._id = bookId;
    //book.userId = <string>decoded.id;
    book.file = url;
    //console.log(book);
    return this.http.post<any>(
      endpoint + 'addBook',
      JSON.stringify(book),
      httpOptions
    );
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  addToCart (book: Book){
    this.cartItemList.push(book);
    this.cartItemList.next(this.cartItemList);
    console.log(this.cartItemList)
  }

  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }

  removeCartItem(book: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(book.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.bookList.next(this.cartItemList);
  }
  
  removeAllCart(){
    this.cartItemList = []
    this.bookList.next(this.cartItemList);
  }

}
