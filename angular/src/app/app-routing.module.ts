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
import { UserGuard } from './guard/user.guard';
import { AdminGuard } from './guard/admin.guard';
import { OrdergroupComponent } from './admin/ordergroup/ordergroup.component';
import { AcceptOrderComponent } from './admin/accept-order/accept-order.component';
import { UserOrdergroupComponent } from './user-ordergroup/user-ordergroup.component';
import { UserOrderitemsComponent } from './user-orderitems/user-orderitems.component';

const routes: Routes = [
  // ADMIN routes here
  {path:'admin', component:AdminComponent,canActivate:[AdminGuard]},
  {path:'addProduct', component:AddproductComponent,canActivate:[AdminGuard]},
  {path:'admin/orders', component:OrderlistComponent,canActivate:[AdminGuard]},
  {path:'admin/edit/:id', component:EditproductComponent,canActivate:[AdminGuard]},
  {path:'admin/ordergroup', component:OrdergroupComponent,canActivate:[AdminGuard]},
  {path:'admin/ordergroup/:id', component:AcceptOrderComponent,canActivate:[AdminGuard]},

  // USER routes here
  {path:'',redirectTo: 'login', pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'home',component:HomeComponent,canActivate:[UserGuard]},
  {path:'cart',component:CartComponent,canActivate:[UserGuard]},
  {path:'orders',component:UserOrderComponent,canActivate:[UserGuard]},
  {path:'profile',component:ProfileComponent,canActivate:[UserGuard]},
  {path:'prescription/:payFor',component:PrescriptionComponent,canActivate:[UserGuard]},
  {path:'product/:id',component:ProductpageComponent,canActivate:[UserGuard]},
  {path:'payment',redirectTo: '/home', pathMatch:'full'},
  {path:'payment/:payFor',component:PaymentComponent,canActivate:[UserGuard]},
  {path:'ordergroup',component:UserOrdergroupComponent,canActivate:[UserGuard]},
  {path:'ordergroup/:id',component:UserOrderitemsComponent,canActivate:[UserGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
