import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Signup } from '../model/signup';
import { SignupService } from '../services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signup:Signup = new Signup();

  constructor(private signupServices:SignupService,private router:Router) { }

  ngOnInit(): void {
  }
  showLoading:boolean = false;
  onsubmit(){
    console.log(this.signup);
    
    this.showLoading = false;
    this.signupServices.register(this.signup).subscribe((data) => {
      console.log(data);
      if (data){
        this.goToLogin();
      } else {
        this.showLoading = false;
      }
    }, (error) => {
      console.log(error);
      this.showLoading = false;
    })
  }
  private goToLogin(){
    this.router.navigateByUrl('/login');
  }
}
