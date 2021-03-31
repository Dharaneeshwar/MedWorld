import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {

  id:string = "";
  product:Product = new Product();
  constructor(private productService:ProductService,private activatedRoute:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.productService.getProductById(this.id).subscribe(data => {
      this.product = data;
    },error => console.log(error)
    );
  }

  saveProduct(){
    this.productService.saveProductById(this.id,this.product).subscribe(data =>{
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
