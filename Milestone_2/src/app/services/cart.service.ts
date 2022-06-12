//Imports necessários
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

//Marca uma classe como disponível para ser providenciada e injetada como dependência
@Injectable({
  providedIn: 'root'
})

//Torna a classe CartService acessível em todo o programa
export class CartService {

  public cartItemList : any =[]
  public bookList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor() { }

  getBooks(){
    return this.bookList.asObservable();
  }

  setBook(book : any){
    this.cartItemList.push(...book);
    this.bookList.next(book);
  }

  addtoCart(book : any){
    this.cartItemList.push(book);
    this.bookList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList)
  }

  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }
  
  delete(book: any){
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
