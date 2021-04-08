import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CartProduct } from 'src/app/model/Cart';
import { Order } from 'src/app/model/order';
import { OrderList } from 'src/app/model/order-list';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-accept-order',
  templateUrl: './accept-order.component.html',
  styleUrls: ['./accept-order.component.css']
})
export class AcceptOrderComponent implements OnInit {
  orderId:string = "";
  orderData!:OrderList;
  orders:Order[] = [];
  paymentId:string = ""
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  constructor(private orderService:OrderService, 
    private activatedRoute:ActivatedRoute, 
    private httpClient: HttpClient,) { }

  ngOnInit(): void {
    this.orderId = this.activatedRoute.snapshot.params['id'];
    this.getOrderDetails();
    this.orderService.getParticularOrder(this.orderId).subscribe((data) => {
      this.paymentId = data.orderId;
      console.log("payment",this.paymentId);
      this.getOrderItems();
    });
  }

  getOrderDetails(){
    this.orderService.getOrder(this.orderId).subscribe((data) => {
      this.orderData = data;
      console.log("orderdata.....",data);
      this.getImage();
    },error => console.log(error)
    )
    // this.orderData = {
    //   'mobileNumber':'123456789',
    //   'id':12345,
    //   'paymentId':'12345',
    //   'prescriptionImage':'https://tiimg.tistatic.com/fp/1/006/254/paracetamol-tablets-ip-803.jpg',
    //   'status':0,
    //   'totalPrice':100,
    //   'userId':'0',
    //   'username':'daranip'
    // };
  }

  getOrderItems(){
    this.orderService.getOrderItems(this.paymentId).subscribe((data) => {
      this.orders = data;
      console.log("items...",data);
      
    },error => console.log(error)
    )
  }

  changeStatus(status:number){
    this.orderData.status = status;
    this.orderService.changeOrderStatus(this.orderId,status).subscribe((data) => {
      console.log("status changed succesfully",data);
    },error => console.log(error)
    )
  }

  getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient
      .get('http://localhost:8080/prescription/' + this.orderData.id)
      .subscribe((res) => {
        this.retrieveResonse = res;
        this.base64Data = this.retrieveResonse.prescriptionImage;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      });
  }
}
