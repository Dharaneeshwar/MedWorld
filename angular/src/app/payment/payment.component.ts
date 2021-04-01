import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute) { }
  
  payingAmount !: number; // in INR
  orderType !: string; // cart/prod - (1)
  paymentType !: string; // cod/paid (assign based on button). there should be a button for placing the order directly
  prodId !: string // if single product
  ngOnInit(): void {
    let payfor = this.activatedRoute.snapshot.params['payFor'];    
    if (payfor.charAt(0) == 'c'){
      this.orderType = 'cart';
    } else {
      this.orderType = 'prod';
      this.prodId = payfor.slice(2);
    }
  }

  placeOrder(){
    console.log("Place Order");
  }

}
