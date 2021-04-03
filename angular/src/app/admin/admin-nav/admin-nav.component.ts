import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {
  isAddProductVisible:boolean = false;

  constructor(private route: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    if (this.route.url == "/admin"){
      this.isAddProductVisible = true;
    }
  }
  logout(): void {
    console.log('Logout');

    this.loginService.logout().subscribe(
      (data) => {
        console.log(data);
      },
      (error) => console.log(error)
    );
    localStorage.removeItem('token');
    this.goToLogin();
  }
  goToLogin() {
    this.route.navigateByUrl('/login');
  }
}
