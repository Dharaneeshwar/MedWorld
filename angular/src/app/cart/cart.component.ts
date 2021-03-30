import { Component, OnInit } from '@angular/core';
import { CartProduct } from '../model/Cart'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  product !: Array<CartProduct>;
  constructor() { }

  ngOnInit(): void {
    this.product=new Array<CartProduct>();

    const product1=new CartProduct();
    product1.name='Paracetamol';
    product1.price=100;
    product1.quantity=2;


    const product2=new CartProduct();
    product2.name='Jumbojet';
    product2.price=10000;
    product2.quantity=12;

    const product3=new CartProduct();
    product3.name='Enjami';
    product3.price=1;
    product3.quantity=22;


    this.product.push(product1);
    this.product.push(product2);
    this.product.push(product3);
  }

}
