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
  id!: number;
  product: Product = new Product();
  constructor(private activatedRoute: ActivatedRoute,private homeService:HomeService, private router:Router) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.product = {
      productId: '1',
      productName: 'Paracetamol',
      description: 'A tablet to cure headache and fever',
      price: '10',
      quantity: '50',
      imageUrl: 'https://tiimg.tistatic.com/fp/1/006/254/paracetamol-tablets-ip-803.jpg',
    };
  }

  addToCart(id:string){
    this.homeService.addToCart(id).subscribe(data => {
      console.log("Added Sucessfully");
    },error => {
      console.log(error);
    })
  }

  goToPayment(id:string){
    this.router.navigateByUrl('/payment/p-'+id)
  }
}
