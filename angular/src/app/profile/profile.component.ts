import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetails } from '../model/Profile';
import { ProfileService } from '../services/profile.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // userdetails !: UserDetails;
  user : UserDetails = new UserDetails();
  edit:boolean = false;

  constructor(private profileService:ProfileService, private router: Router) { }

  ngOnInit(): void { 
    this.getProfile();
    // this.user.name='Dharaneeshwar'; 
    // this.user.location='Uranus'; 
    // this.user.username='daranip'; 
    // this.user.imglink ='https://www.daranip.com/headshot.jpg';
    // this.user.address = 'No:4,Raghavan street, Perambur chennai-600611'; 
    // this.user.emailid ='daranip@gmail.com'; 
    // this.user.status =true; 
    // this.user.phoneNumber='9953688239';
  }
  onsubmit(){
    this.updateProfile();
  }

  updateProfile(){
    this.profileService.updateUserInfo(this.user).subscribe(data =>{
      console.log("SucessFull");
      this.router.navigateByUrl('/home');
    },error => console.log(error)
    )
  }

  private getProfile(){
    this.profileService.getUserInfo().subscribe(data =>{
      this.user = data;
    },error => console.log(error)
    )
  }

  toggleEdit(){
    this.edit = ! this.edit;
  }
}