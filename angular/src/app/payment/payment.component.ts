import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { HomeService } from '../services/home.service';
import { PaymentService } from '../services/payment.service';
import { ICustomWindow, WindowRefService } from './window-ref.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  private _window: ICustomWindow;
  public rzp: any;
  paymentId: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private zone: NgZone,
    private winRef: WindowRefService,
    private cartService: CartService,
    private homeService: HomeService,
    private paymentServices: PaymentService,
    private router: Router
  ) {
    this._window = this.winRef.nativeWindow;
  }
  quantity: number = 1;
  payingAmount: number = -1; // in INR
  orderType!: string; // cart/prod - (1)
  prodId: string = 'null'; // if single product

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.quantity = params['quantity'];
    });
    let payfor = this.activatedRoute.snapshot.params['payFor'];
    if (payfor.charAt(0) == 'c') {
      this.orderType = 'cart';
      this.cartService.getTotal().subscribe((data) => {
        this.payingAmount = data ? data : 1;
        console.log('data ', data);
      });
    } else {
      this.orderType = 'prod';
      this.prodId = payfor.slice(2);
      this.homeService.getProduct(this.prodId).subscribe(
        (data) => {
          console.log('data....', data, this.quantity);

          this.payingAmount = +data.price * this.quantity;
          console.log('Pay......', this.payingAmount);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  placeOrderPay() {
    this.options.amount = this.payingAmount * 100;
    this.initPay();
  }

  public options: any = {
    key: 'rzp_test_a077YCXUMKCSsT', // add razorpay key here
    description: 'Test Payment',
    image: 'https://images.app.goo.gl/JbgS3sKAqQy7pvKY6',
    amount: 100, // razorpay takes amount in paisa
    currency: 'INR',
    notes: {
      address: 'Razorpay Corporate Office',
    },
    theme: {
      color: '#3880FF',
    },
    handler: this.paymentHandler.bind(this),
    modal: {
      ondismiss: () => {
        this.zone.run(() => {});
      },
    },
  };

  initPay(): void {
    this.rzp = new this.winRef.nativeWindow['Razorpay'](this.options);
    this.rzp.open();
  }

  paymentHandler(res: any) {
    this.zone.run(() => {
      this.paymentId = res.razorpay_payment_id;
      console.log(res.razorpay_payment_id);
      this.updateOrders();
    });
  }
  updateOrders() {
    var obj!: any;
    if (this.orderType == 'cart') {
      obj = {
        orderType: this.orderType,
        paymentType: 'paid',
        totalPayAmt: this.payingAmount,
        razorPay: this.paymentId,
        orderId: localStorage.getItem('current_order'),
      };
      this.paymentServices.placeCartProducts(obj).subscribe(
        (data) => {
          if (data) {
            localStorage.removeItem('current_order');
            this.router.navigateByUrl('/home');
          }
        },
        (error) => console.log(error)
      );
    } else {
      obj = {
        orderType: this.orderType,
        prodId: this.prodId,
        paymentType: 'paid',
        totalPayAmt: this.payingAmount,
        razorPay: this.paymentId,
        orderId: localStorage.getItem('current_order'),
      };
      this.paymentServices.placeSingleProduct(obj).subscribe(
        (data) => {
          console.log(data);
          if (data) {
            localStorage.removeItem('current_order');
            this.router.navigateByUrl('/home');
          }
        },
        (error) => console.log(error)
      );
    }
  }

  placeOrderCOD() {
    var obj!: any;
    console.log('orderid.... ', localStorage.getItem('current_order'));
    console.log('prodid.... ', this.prodId);
    if (this.orderType == 'cart') {
      obj = {
        orderType: this.orderType,
        paymentType: 'COD',
        totalPayAmt: this.payingAmount,
        orderId: localStorage.getItem('current_order'),
      };
      this.paymentServices.placeCartProducts(obj).subscribe(
        (data) => {
          if (data) {
            localStorage.removeItem('current_order');
            this.router.navigateByUrl('/home');
          }
        },
        (error) => console.log(error)
      );
    } else {
      obj = {
        orderType: this.orderType,
        prodId: this.prodId,
        paymentType: 'COD',
        totalPayAmt: this.payingAmount,
        orderId: localStorage.getItem('current_order'),
      };
      this.paymentServices.placeSingleProduct(obj).subscribe(
        (data) => {
          if (data) {
            localStorage.removeItem('current_order');
            this.router.navigateByUrl('/home');
          }
        },
        (error) => console.log(error)
      );
    }
  }
}
