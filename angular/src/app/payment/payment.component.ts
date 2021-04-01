import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICustomWindow, WindowRefService } from './window-ref.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {


  private _window: ICustomWindow;
  public rzp: any;
  constructor(private activatedRoute: ActivatedRoute,
    private zone: NgZone,
    private winRef: WindowRefService
  ) {
    this._window = this.winRef.nativeWindow;
  }

  payingAmount!: number; // in INR
  orderType!: string; // cart/prod - (1)
  paymentType!: string; // cod/paid (assign based on button). there should be a button for placing the order directly
  prodId!: string // if single product
  ngOnInit(): void {
    let payfor = this.activatedRoute.snapshot.params['payFor'];
    if (payfor.charAt(0) == 'c') {
      this.orderType = 'cart';
    } else {
      this.orderType = 'prod';
      this.prodId = payfor.slice(2);
    }
  }

  placeOrder() {
    console.log("Placing Order");
    this.initPay();
    console.log("Placed Order");
  }

  public options: any = {
    key: 'rzp_test_a077YCXUMKCSsT', // add razorpay key here
    name: 'The Swag Coder',
    description: 'Shopping',
    amount: 100, // razorpay takes amount in paisa
    prefill: {
      name: 'The Swag Coder',
      email: '', // add your email id
    },
    notes: {},
    theme: {
      color: '#3880FF'
    },
    handler: this.paymentHandler.bind(this),
    modal: {
      ondismiss: (() => {
        this.zone.run(() => {
          // add current page routing if payment fails
        })
      })
    }
  };

  initPay(): void {
    this.rzp = new this.winRef.nativeWindow['Razorpay'](this.options);
    this.rzp.open();
  }

  paymentHandler(res: any) {
    this.zone.run(() => {
      // add API call here
    });
  }


}
