import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { HomeService } from '../services/home.service';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homeproducts: Product[] = [];
  loading: boolean = false;
  notLoading:boolean = false

  constructor(private productService: ProductService, private homeService:HomeService) {}

  ngOnInit(): void {
    this.getProducts();
    this.loading = true;
    this.notLoading = false;
  }

  private getProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.homeproducts = data;
      this.loading = true;
    },error => {
      console.log(error);
      this.notLoading = true;
      this.loading = false;
    }
    );
  }

  addToCart(id:string){
    this.homeService.addToCart(id).subscribe(data =>{
      console.log("Added Successfully");
      this.loading = false;
    },error => console.log(error)
    )
  }
}
