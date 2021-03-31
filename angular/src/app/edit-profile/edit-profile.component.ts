import { Component, OnInit } from '@angular/core';

import { UserDetails } from 'src/app/model/Profile';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {


  // user : UserDetails = new UserDetails();
  constructor() { }

  ngOnInit(): void {
  }

}
