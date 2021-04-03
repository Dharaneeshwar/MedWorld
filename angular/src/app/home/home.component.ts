import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../model/product';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  homeproducts: Product[] = [];
  loading: boolean = false;
  notLoading: boolean = false;
  showSplash!: boolean;
  constructor(
    private homeService: HomeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.loading = true;
    this.notLoading = false;
    this.showSplash = true;
  }
  ngAfterViewInit(){
    this.showSplash = true;
    setTimeout( ()=>{
          this.showSplash = false;
        }, 2000)
  }
  private getProducts() {
    this.homeService.getProducts().subscribe((data) => {
      this.homeproducts = data;
      this.loading = false;
    },error => {
      console.log(error);
      this.notLoading = true;
      this.loading = false;
    }
    );
    // this.homeproducts = [
    //   {
    //     'productId':'1',
    //     'productName':'Paracetamol',
    //     'description':'A tablet to cure headache and fever',
    //     'price':'10',
    //     'quantity':'50',
    //     'imageUrl':'https://tiimg.tistatic.com/fp/1/006/254/paracetamol-tablets-ip-803.jpg'
    //   },{
    //     'productId':'2',
    //     'productName':'Paracetamol',
    //     'description':'A tablet to cure headache and fever',
    //     'price':'10',
    //     'quantity':'50',
    //     'imageUrl':'https://tiimg.tistatic.com/fp/1/006/254/paracetamol-tablets-ip-803.jpg'
    //   },{
    //     'productId':'3',
    //     'productName':'Paracetamol',
    //     'description':'A tablet to cure headache and fever',
    //     'price':'10',
    //     'quantity':'50',
    //     'imageUrl':'https://tiimg.tistatic.com/fp/1/006/254/paracetamol-tablets-ip-803.jpg'
    //   }
    // ]
  }

  addToCart(id: string, quantity: number) {
    this.homeService.addToCart(id, quantity).subscribe(
      (data) => {
        console.log('Added Successfully');
        this.loading = false;
      },
      (error) => console.log(error)
    );
  }
  goToProduct(id: string) {
    this.router.navigateByUrl(`/product/${id}`);
  }
}
