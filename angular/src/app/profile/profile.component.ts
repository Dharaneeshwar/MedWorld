import { Component, OnInit } from '@angular/core';
import { UserDetails, PurchaseHistory } from '../model/Profile';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // userdetails !: UserDetails;
  user : UserDetails = new UserDetails();
  purchasehistory !: Array<PurchaseHistory>;
  constructor() { }

  ngOnInit(): void {
    // this.userdetails = new  UserDetails();
    // this.userdetails.name='daranip'; 
    // this.userdetails.location='Uranus'; 
    // this.userdetails.username='daranip'; 
    // this.userdetails.imglink ='https://www.daranip.com/headshot.jpg';
    // this.userdetails.address = 'No:4,Raghavan street, Perambur chennai-600611'; 
    // this.userdetails.mailid ='daranip@gmail.com'; 
    // this.userdetails.status ='working'; 
    // this.userdetails.number='9953688239';

  //  ---------------------------Delete these, just for display----------------------------------------

    this.purchasehistory = new Array<PurchaseHistory>(); 
    const purchasehistory1 = new PurchaseHistory(); 
    purchasehistory1.itemname = 'Pracetamol'; 
    purchasehistory1.itemid = '12h832a93j02x930'; 
    purchasehistory1.date = '16/03/2001'; 
    purchasehistory1.time = '12:00PM';
    purchasehistory1.result = 'Success';  
    purchasehistory1.classname='success';
    this.purchasehistory.push(purchasehistory1);


    const purchasehistory2 = new PurchaseHistory(); 
    purchasehistory2.itemname = 'Kokooooo'; 
    purchasehistory2.itemid = '1d2h32a93j02x930'; 
    purchasehistory2.date = '30/02/2001'; 
    purchasehistory2.time = '02:00PM';
    purchasehistory2.result = 'Rejected'; 
    purchasehistory2.classname='danger'; 
    
    this.purchasehistory.push(purchasehistory1);
    this.purchasehistory.push(purchasehistory2);

    
    const purchasehistory3 = new PurchaseHistory(); 
    purchasehistory3.itemname = 'cvaxin'; 
    purchasehistory3.itemid = '1d2h9ifopfaslks'; 
    purchasehistory3.date = '30/02/2001'; 
    purchasehistory3.time = '02:00PM';
    purchasehistory3.result = 'Cancelled'; 
    purchasehistory3.classname='dark'; 

    this.purchasehistory.push(purchasehistory3);
    
    this.purchasehistory.push(purchasehistory1);
    this.purchasehistory.push(purchasehistory1);
    
    this.purchasehistory.push(purchasehistory2);
    
    this.purchasehistory.push(purchasehistory1);
    this.purchasehistory.push(purchasehistory1);



  }

}
