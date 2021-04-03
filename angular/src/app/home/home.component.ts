import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../model/product';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{
  allproducts: Product[] = [];
  homeproducts: Product[] = [];
  loading: boolean = false;
  notLoading: boolean = false;
  searchKey: string="";

  constructor(
    private homeService: HomeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.loading = true;
    this.notLoading = false;
  }

  private getProducts() {
    this.homeService.getProducts().subscribe((data) => {
      this.homeproducts = data;
      this.allproducts = data;
      this.loading = false;
    },error => {
      console.log(error);
      this.notLoading = true;
      this.loading = false;
    }
    );
    // this.loading = false;
    // this.allproducts = [
    //   {
    //     'productId':'1',
    //     'productName':'Paracetamol',
    //     'description':'A tablet to cure headache and fever',
    //     'price':'50',
    //     'quantity':'50',
    //     'imageUrl':'https://tiimg.tistatic.com/fp/1/006/254/paracetamol-tablets-ip-803.jpg'
    //   },{
    //     'productId':'2',
    //     'productName':'cetrizin',
    //     'description':'A tablet to cure fever',
    //     'price':'10',
    //     'quantity':'50',
    //     'imageUrl':'https://tiimg.tistatic.com/fp/1/006/254/paracetamol-tablets-ip-803.jpg'
    //   },{
    //     'productId':'3',
    //     'productName':'amoxy',
    //     'description':'A tablet to cure headache',
    //     'price':'20',
    //     'quantity':'50',
    //     'imageUrl':'https://tiimg.tistatic.com/fp/1/006/254/paracetamol-tablets-ip-803.jpg'
    //   }
    // ]
    this.homeproducts = this.allproducts;
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

  filterProducts(){
    this.homeproducts = this.allproducts.filter((data) => {
      return data.productName.toUpperCase().indexOf(this.searchKey.toUpperCase()) > -1 || data.description.toUpperCase().indexOf(this.searchKey.toUpperCase()) > -1 ;
    })
  }

  choseSortCondition(sortCondition:string){
    if (sortCondition == "plh"){
      this.homeproducts = this.homeproducts.sort((i,j) => {
        return (i.price>j.price)? 1 : -1
      })
    } else if (sortCondition == "phl") {
      this.homeproducts = this.homeproducts.sort((i,j) => {
        return (i.price<j.price)? 1 : -1
      })
    }
  }
}
