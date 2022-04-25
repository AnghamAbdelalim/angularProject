import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../Services/login.service';
import { IResetPassword } from '../Shared_Interfaces/IResetPassword';
import { ConfirmPasswordValidator } from '../Validation/ConfirmPassword.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public resetPasswordForm: FormGroup;
  public showSuccess: boolean;
  public showError: boolean;
  public errorMessage: string;
  private _token: string;
  private _email: string;
  constructor(private LoginServices:LoginService,private route:ActivatedRoute,private router:Router) { }
  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl('',[Validators.required])
    });
    //this.resetPasswordForm.get('confirm').setValidators([Validators.required,
     // this._passConfValidator.validateConfirmPassword(this.resetPasswordForm.get('password'))]);
    
      this._token = this.route.snapshot.queryParams['token'];
      this._email = this.route.snapshot.queryParams['email'];
      console.log(this._email );
  }

 validateControl = (controlName: string) => {
  return this.resetPasswordForm.controls[controlName].invalid && this.resetPasswordForm.controls[controlName].touched
}
hasError = (controlName: string, errorName: string) => {
  return this.resetPasswordForm.controls[controlName].hasError(errorName)
}
 resetPassword = (resetPasswordFormValue) => {
  this.showError = this.showSuccess = false;
  const resetPass = { ... resetPasswordFormValue };
  const resetPassDto: IResetPassword = {
    password: resetPass.password,
    confirmPassword: resetPass.confirm,
    token: this._token,
    email: this._email
  }
  this.LoginServices.resetPassword(resetPassDto)
  .subscribe(_ => {
    this.showSuccess = true;
  },
  error => {
    this.showError = true;
    this.errorMessage = error;
  })
}
 handleBadRequest = (error: HttpErrorResponse): string =>
 {
  if(this.router.url === '/Account/register' || 
     this.router.url.startsWith('/Account/resetpassword')) {
    let message = '';
    const values = Object.values(error.error.errors);
    values.map((m) =>
     {
       message += m + '<br>';
     })
    return message.slice(0, -4);
  }
  else{
    return error.error ? error.error : error.message;
  }
}
}
