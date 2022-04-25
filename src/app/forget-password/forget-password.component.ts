import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../Services/login.service';
import {IforgetPassword}from '../Shared_Interfaces/IforgetPassword'
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  forgetPasswordForm:any;
   successMessage: string;
   errorMessage: string;
  showSuccess: boolean;
  showError: boolean;
  url:any;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(private fb:FormBuilder,private LoginServices:LoginService,private route:ActivatedRoute,private router: Router) { }

  ngOnInit(): void 
  {
    this.forgetPasswordForm=this.fb.group({
      email :['',[Validators.required,Validators.pattern(this.emailPattern)]]})
  }
   validateControl = (controlName: string) => {
    return this.forgetPasswordForm.controls[controlName].invalid && this.forgetPasswordForm.controls[controlName].touched
  }
  onSubmit(x:any)
  {
  }
    public hasError = (controlName: string, errorName: string) => {
      return this.forgetPasswordForm.controls[controlName].hasError(errorName)
    }
    forgetPassword = (forgetPasswordFormValue) =>
    {
        this.showError = this.showSuccess = false;
        const forgetPass = { ...forgetPasswordFormValue };
        const forgetPassDto: IforgetPassword = 
        {
          email: forgetPass.email,
          ClientURI:"http://localhost:4200/account/reset"
        }
       this.LoginServices.forgotPassword(forgetPassDto).subscribe(()=>
        {
          this.showSuccess=true;
           this.successMessage = 'The link has been sent, please check your email to reset your password.'
        },
        err => {
        this.showError = true;
         this.errorMessage = err;
      })
    }
  }
