import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css'],
})
export class UserNavComponent implements OnInit {
  isNavButtonVisible: boolean = true;
  isCartVisible: boolean = true;
  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    if (this.router.url == '/login' || this.router.url == '/signup') {
      this.isNavButtonVisible = false;
      this.isCartVisible = false;
    }
    if (this.router.url == '/cart') {
      this.isCartVisible = false;
    }
  }

  logout(): void {
    console.log('Logout');

    // this.loginService.logout().subscribe(
    //   (data) => {
    //     console.log(data);
    //   },
    //   (error) => console.log(error)
    // );
    
    localStorage.removeItem('token');
    this.goToLogin();
  }
  goToLogin() {
    this.router.navigateByUrl('/login');
  }
}
