import { Component, OnInit } from '@angular/core';
import { CartProduct } from '../model/Cart'
import { CartService } from '../services/cart.service';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems:CartProduct[] = [];
  constructor(private cartService:CartService, private homeService:HomeService) { }

  ngOnInit(): void {
    this.getCart();
  }
  private getCart(){
    this.cartService.getCartItems().subscribe(data => {
      this.cartItems = data;
      console.log(data);
    },error => console.log(error));   
  }

  removeCart(id:string){
    console.log('id ',id);
    this.homeService.removeFromCart(id).subscribe(data => {
      this.cartItems = this.cartItems.filter(((temp) => temp.productId != id));
      console.log("successful",id);
      
    },error => {
      console.log(error);
      this.cartItems.filter(((temp) => temp.productId != id));
    })
  }

}
