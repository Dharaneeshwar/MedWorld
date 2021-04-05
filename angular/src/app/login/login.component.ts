import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../model/login';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  login: Login = new Login();
  showSplash!: boolean;

  constructor(private loginService:LoginService,private router:Router) {}

  ngAfterViewInit(){
    setTimeout( ()=>{
          this.showSplash = false;
        }, 2000)
  }

  ngOnInit(): void {
    this.showSplash = true;
    if (localStorage.getItem("token") !== null) {
      this.loginService.getUserStatus().subscribe(
        (data) => {
          console.log(data);
          
          if (data.status){
            if (data.isAdmin){
              console.log("inside isadmin");
              this.goToAdmin();
            } else {
              this.goToHome();
            }
          } else {
            localStorage.removeItem('token');
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  showError:boolean = false;
  showLoading:boolean = false;

  onsubmit() {
    console.log("submitted");
    this.showLoading = true;
    this.showError = false;
    this.loginService.login(this.login).subscribe(
      (data) => {
        console.log(data);
        if (data.status){
          localStorage.setItem('token',data.token);
          if (data.isAdmin){
            this.goToAdmin();
          } else{
          this.goToHome();
          }
        } else {
          this.showError = true;
          this.showLoading = false;
        }
      },
      (error) => {
        console.log(error);
        this.showError = true;
        this.showLoading = false;
      }
    );
    
  }
  private goToHome(){
    this.router.navigateByUrl('/home');
  }

  private goToAdmin(){
    console.log("inside gotoadmin");
    
    this.router.navigateByUrl('/admin');
  }

}
