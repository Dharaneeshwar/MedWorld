import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private productService: ProductService, private homeService:HomeService,private router:Router) {}

  ngOnInit(): void {
    this.getProducts();
    this.loading = false;
    this.notLoading = false;
  }

  private getProducts() {
    // this.productService.getProducts().subscribe((data) => {
    //   this.homeproducts = data;
    //   this.loading = true;
    // },error => {
    //   console.log(error);
    //   this.notLoading = true;
    //   this.loading = false;
    // }
    // );
    this.homeproducts = [
      {
        'productId':'1',
        'productName':'Paracetamol',
        'description':'A tablet to cure headache and fever',
        'price':'10',
        'quantity':'50',
        'imageUrl':'https://tiimg.tistatic.com/fp/1/006/254/paracetamol-tablets-ip-803.jpg'
      },{
        'productId':'2',
        'productName':'Paracetamol',
        'description':'A tablet to cure headache and fever',
        'price':'10',
        'quantity':'50',
        'imageUrl':'https://tiimg.tistatic.com/fp/1/006/254/paracetamol-tablets-ip-803.jpg'
      },{
        'productId':'3',
        'productName':'Paracetamol',
        'description':'A tablet to cure headache and fever',
        'price':'10',
        'quantity':'50',
        'imageUrl':'https://tiimg.tistatic.com/fp/1/006/254/paracetamol-tablets-ip-803.jpg'
      }
    ]
  }

  addToCart(id:string,quantity:number){
    this.homeService.addToCart(id,quantity).subscribe(data =>{
      console.log("Added Successfully");
      this.loading = false;
    },error => console.log(error)
    )
  }
  goToProduct(id:string){
    this.router.navigateByUrl(`/product/${id}`)
  }
}
