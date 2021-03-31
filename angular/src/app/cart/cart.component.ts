import { Component, OnInit } from '@angular/core';
import { CartProduct } from '../model/Cart'
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems:CartProduct[] = [];
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.getCart();
  }
  private getCart(){
    this.cartService.getCartItems().subscribe(data => {
      this.cartItems = data;
    },error => console.log(error));   
  }

}
