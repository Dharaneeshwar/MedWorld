import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  products:Product[] = [];
  constructor(private productService:ProductService) { }
 
  ngOnInit(): void {
    this.getProducts();
    this.products = [
      {
        "productId": "1",
        "imageUrl": "https://raisingchildren.net.au/__data/assets/image/0024/49344/medicines-that-can-poison.jpg",
        "description":"abcd",
        "price":"20",
        "productName":"Paracetamol",
        "quantity":"2"
      },
      {
        "productId": "2",
        "imageUrl": "https://raisingchildren.net.au/__data/assets/image/0024/49344/medicines-that-can-poison.jpg",
        "description":"abcd",
        "price":"20",
        "productName":"Paracetamol",
        "quantity":"5"
      }
    ];
  }

  private getProducts(){
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    },error => console.log(error)
    );  
  }

}
