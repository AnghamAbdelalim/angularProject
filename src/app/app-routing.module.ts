import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {CartComponent} from 'src/app/cart/cart.component'
import { ShowProductComponent } from './show-product/show-product.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


const routes: Routes = [
  {path: '', redirectTo:"/home",pathMatch:'full'},
  {path: 'home', component:HomeComponent},
  {path: 'Register', component:RegisterComponent},
  {path: 'Login', component:LoginComponent},
  {path: 'products', component:ShowProductComponent},
   {path:'cart',component:CartComponent},
   {path:'forget',component:ForgetPasswordComponent},
   { path: 'resetpassword', component:ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
