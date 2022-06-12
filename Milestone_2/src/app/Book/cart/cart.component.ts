import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { PointsService } from 'src/app/services/points.service';
import { UserService } from 'src/app/services/user.service';
import { Points } from 'src/app/models/points';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public books : any = [];
  points!:Points;
  public grandTotal !: number;
  constructor(private rest: UserService, private cartService : BookService) { }

  ngOnInit(): void {
    this.cartService.getBooks()
    .subscribe((res: any)=>{
      this.books = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }

  getPoints(id:string){
    this.rest.getPoints(id).subscribe((data:Points) =>{
      //console.log(data);
      this.points = data;
    })
  }

  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }

}