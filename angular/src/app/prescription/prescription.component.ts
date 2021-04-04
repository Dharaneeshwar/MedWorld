import { query } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartProduct } from '../model/Cart';
import { Product } from '../model/product';
import { CartService } from '../services/cart.service';
import { HomeService } from '../services/home.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css'],
})
export class PrescriptionComponent implements OnInit {
  payfor: string = '';
  orderType!: string; // cart/prod - (1)
  prodId: string = 'null'; // if single product

  editAddress: boolean = false;

  // Fill Page with info
  cartItems: CartProduct[] = [];
  singleProduct:Product = new Product();
  // Image upload
  filename: string = 'null';
  selectedFile!: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string = '';
  quantity:number = 1;
  // Top Table 
  userName:string = ""; 
  payingAmount!: number; // in INR
  mobileNumber:string = "";
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private homeService: HomeService,
    private httpClient: HttpClient,
    private cartService:CartService,
    private orderService:OrderService
  ) {}

  ngOnInit(): void {
    this.payfor = this.activatedRoute.snapshot.params['payFor'];
    this.activatedRoute.queryParams.subscribe(params => {
      this.quantity = params['quantity'];
  });
    if (this.payfor.charAt(0) == 'c') {
      this.orderType = 'cart';
    } else {
      this.orderType = 'prod';
      this.prodId = this.payfor.slice(2);
      this.payingAmount = 50;
    }
    this.getProducts();
    this.initOrder();
  }
  
  initOrder(){
    this.orderService.initOrders({'orderType':this.orderType,'prodId':this.prodId}).subscribe(data => {
      this.userName = data.userName;
      this.payingAmount = data.totalAmount;
      this.mobileNumber = data.mobileNumber; 
      localStorage.setItem('current_order',data.orderId.toString());
    })
  }

  getProducts() {
    if (this.orderType == 'cart'){
      this.cartService.getCartItems().subscribe(data => {
        console.log(data);
        this.cartItems = data;
      })
    } else {
      this.homeService.getProduct(this.prodId).subscribe((data) => {
        this.singleProduct = data;
      })
    }
  }

  // toggleAddressEdit() {
  //   this.editAddress = !this.editAddress;
  // }

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    console.log("file changed");
    this.filename = this.selectedFile.name;
  }

  goToPayment(goTo: string) {
    const uploadImageData = new FormData();
    uploadImageData.append(
      localStorage.getItem('current_order')+"",
      this.selectedFile,
      this.selectedFile.name
    );


    this.httpClient.post('http://localhost:8080/prescription/upload', uploadImageData, {
        observe: 'response',
      }).subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
          this.router.navigateByUrl(`payment/${this.payfor}`);
        } else {
          this.message = 'Image not uploaded successfully';
        }
      });
      this.router.navigate(['payment',this.payfor],{ queryParams: {'quantity':this.quantity}});

  }

  // getImage() {
  //   //Make a call to Sprinf Boot to get the Image Bytes.
  //   this.httpClient
  //     .get('http://localhost:8080/prescription/get/' + this.filename)
  //     .subscribe((res) => {
  //       this.retrieveResonse = res;
  //       this.base64Data = this.retrieveResonse.picByte;
  //       this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
  //     });
  // }
}
