import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { IRegister } from '../Shared_Interfaces/IRegister';
import { ConfirmPasswordValidator } from '../Validation/ConfirmPassword.validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  data = false;       
  massage:string=""; 
  registerForm:any;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(private fb:FormBuilder ,private LoginServices:LoginService,private active:ActivatedRoute , private router:Router) { }

  ngOnInit(){
  
    this.registerForm =this.fb.group({
    UserName :['',[Validators.required]],
    Email :['',[Validators.required,Validators.pattern(this.emailPattern)]],
    Password:['',[Validators.required,Validators.minLength(6)]],
    confirmPassword:['',[Validators.required]] },{validators:[ConfirmPasswordValidator]});
  
  }
  
  onFormSubmit(x:any)    
  {    
    const user = this.registerForm.value;    
    this.Createemployee(user);  
    this.router.navigate(['/Login']);
      
  }    
  Createemployee(register:IRegister)    
  {    
  this.LoginServices.CreateUser(register).subscribe(    
    ()=>    
    {    
      this.data = true;    
      this.massage = 'Data saved Successfully';  
      console.log ("Data saved Successfully") ;
      this.registerForm.reset();    
    });    
  } 
 
  get UserName ()
  {
    return this.registerForm.get('UserName');
  }
  
  get Password ()
  {
    return this.registerForm.get('Password');
  }

 
  get confirmPassword ()
  {
    return this.registerForm.get('confirmPassword');
  } 
  get Email ()
  {
    return this.registerForm.get('Email');
  } 
}

