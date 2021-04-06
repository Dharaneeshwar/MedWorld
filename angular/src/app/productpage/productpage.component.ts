import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/product';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.css'],
})
export class ProductpageComponent implements OnInit {
  id!: string;
  product: Product = new Product();
  quantity: number = 1;
  inCart: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private homeService: HomeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.homeService.getProduct(this.id).subscribe(
      (data) => {
        this.product = data;
      },
      (error) => console.log(error)
    );
    this.homeService.getCartInfo(this.id).subscribe(data => {
      this.quantity = data.quantity == 0? 1: data.quantity;
      this.inCart = data.presentInCart;
      console.log(data);
      
    },error => {
      console.log(error);
      this.quantity = 1;
    })  
    
    this.product = {
      productId: '1',
      productName: 'Paracetamol',
      description: 'A tablet to cure headache and fever',
      price: '10',
      quantity: '50',
      imageUrl:
        'https://tiimg.tistatic.com/fp/1/006/254/paracetamol-tablets-ip-803.jpg',
    };
  }

  addToCart(id: string,source:string) {
    console.log(id, this.quantity);
    if (source == "btn"){
      this.inCart = ! this.inCart;
    }
    if (this.inCart) {
      this.homeService.addToCart(id, this.quantity).subscribe(
        (data) => {
          console.log('Added Sucessfully');
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  removeFromCart(id:string){
    this.inCart = ! this.inCart;
    console.log('id ',id);
    this.homeService.removeFromCart(id).subscribe(data => {
      console.log("successful",id);
    },error => {
      console.log(error);
    })
  }

  goToPrescription() {
    // this.router.navigateByUrl('/prescription/p-' + this.product.productId);
    this.router.navigate(['prescription','p-'+this.product.productId],{ queryParams: {'quantity':this.quantity}});
  }
}
