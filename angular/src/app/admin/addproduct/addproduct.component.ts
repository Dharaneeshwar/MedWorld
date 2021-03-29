import { Component, OnInit, NgModule } from '@angular/core';
import { Product } from 'src/app/model/product';
import { FormsModule } from '@angular/forms'
import { ProductService } from 'src/app/services/product.service';
import { error } from '@angular/compiler/src/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  product:Product = new Product();

  constructor(private productService:ProductService, private router:Router) {
   }

  ngOnInit(): void {
  }

  saveProduct(){
    this.productService.addProduct(this.product).subscribe(data =>{
      console.log(data);
    },error => console.log(error));
    this.goToAdminHome();
  }

  goToAdminHome(){
    this.router.navigate(['/admin'])
  }

  onsubmit(){
    console.log(this.product);
    this.saveProduct();  
  }

}
