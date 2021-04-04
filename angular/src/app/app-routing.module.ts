import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproductComponent } from './admin/addproduct/addproduct.component';
import { AdminComponent } from './admin/admin.component';
import { EditproductComponent } from './admin/editproduct/editproduct.component';
import { OrderlistComponent } from './admin/orderlist/orderlist.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductpageComponent } from './productpage/productpage.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { UserOrderComponent } from './user-order/user-order.component';
import { PaymentComponent } from './payment/payment.component';
import { PrescriptionComponent } from './prescription/prescription.component';

const routes: Routes = [
  // ADMIN routes here
  {path:'admin', component:AdminComponent},
  {path:'addProduct', component:AddproductComponent},
  {path:'admin/orders', component:OrderlistComponent},
  {path:'admin/edit/:id', component:EditproductComponent},

  // USER routes here
  {path:'',redirectTo: 'login', pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'home',component:HomeComponent},
  {path:'cart',component:CartComponent},
  {path:'orders',component:UserOrderComponent},
  {path:'profile',component:ProfileComponent},
  {path:'prescription/:payFor',component:PrescriptionComponent},
  {path:'product/:id',component:ProductpageComponent},
  {path:'payment',redirectTo: '/home', pathMatch:'full'},
  {path:'payment/:payFor',component:PaymentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
