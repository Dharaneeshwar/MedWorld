import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../model/product';
import { UserOrder } from '../model/UserOrder';
import { HomeService } from '../services/home.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allproducts: Product[] = [];
  homeproducts: Product[] = [];
  recentBuys: Product[] = [];
  loading: boolean = false;
  notLoading: boolean = false;
  searchKey: string = '';
  showRecentTitle: boolean = true;

  constructor(
    private homeService: HomeService,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.checkUser();
    this.getProducts();
    this.getRecentBuys();
    this.loading = true;
    this.notLoading = false;
  }

  private getRecentBuys() {
    this.homeService.getRecentBuys().subscribe(
      (data) => {
        this.recentBuys = data;
        if (this.recentBuys.length == 0) {
          this.showRecentTitle = false;
        }
      },
      (error) => {
        console.log(error);
        if (this.recentBuys.length == 0) {
          this.showRecentTitle = false;
        }
      }
    );
  }
  private getProducts() {
    this.homeService.getProducts().subscribe(
      (data) => {
        this.homeproducts = data;
        this.allproducts = data;
        this.loading = false;
      },
      (error) => {
        console.log(error);
        localStorage.removeItem('token');
        this.router.navigateByUrl('login');
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

  filterProducts() {
    this.homeproducts = this.allproducts.filter((data) => {
      return (
        data.productName.toUpperCase().indexOf(this.searchKey.toUpperCase()) >
          -1 ||
        data.description.toUpperCase().indexOf(this.searchKey.toUpperCase()) >
          -1
      );
    });
  }

  choseSortCondition(sortCondition: string) {
    if (sortCondition == 'plh') {
      this.homeproducts = this.homeproducts.sort((i, j) => {
        return parseInt(i.price) > parseInt(j.price) ? 1 : -1;
      });
    } else if (sortCondition == 'phl') {
      this.homeproducts = this.homeproducts.sort((i, j) => {
        return parseInt(i.price) < parseInt(j.price) ? 1 : -1;
      });
    }
  }
  checkUser() {
    if (localStorage.getItem('token') !== null) {
      this.loginService.getUserStatus().subscribe(
        (data) => {
          console.log(data);

          if (data.status) {
          } else {
            localStorage.removeItem('token');
            this.router.navigateByUrl('login');
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
