import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  products: Product[] = [];
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => console.log(error)
    );
  }

  editProduct(id: string) {
    this.router.navigateByUrl('admin/edit/' + id);
  }
  deleteProduct(id: string) {
    if (confirm('Do you want to delete for sure?')) {
      this.products = this.products.filter(obj => obj.productId !== id);
      this.productService.deleteProductById(id).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => console.log(error)
      );
      this.router.navigateByUrl('/admin');
    } else {
      console.log('Not delete');
    }
  }
}
