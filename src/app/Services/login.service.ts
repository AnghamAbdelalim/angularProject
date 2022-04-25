import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';  
import {HttpHeaders} from '@angular/common/http';  
import { from, Observable } from 'rxjs';
import{IRegister} from 'src/app/Shared_Interfaces/IRegister'
import { IforgetPassword } from '../Shared_Interfaces/IforgetPassword';
import { IResetPassword } from '../Shared_Interfaces/IResetPassword';
import { stringify } from '@angular/compiler/src/util';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  UrlReg :string; 
  UrlLog :string;
  token : string='';  
  header : any;  
  envUrl:string;
  constructor(private http : HttpClient)
   {
     
    this.UrlReg='http://localhost:9772/api/Account';
    
    const headerSettings: {[name: string]: string | string[]; } = {};  
    this.header = new HttpHeaders(headerSettings);  
    }
    Login(model : any)
    { 
     var reqHeader = new HttpHeaders({ 
       'Content-Type': 'application/x-www-form-urlencoded','No-Auth':'True' })
  
     
     return this.http.post(this.UrlLog,model,{ headers: reqHeader});  
   
    }   
     CreateUser(register:IRegister)  
     { 
      
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this.http.post<IRegister[]>(this.UrlReg+'/register/',register, httpOptions )  
     }  
      forgotPassword(body:IforgetPassword)
      {
        console.log(body);
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post(this.UrlReg+'/forgot/',body,httpOptions);
      }
       resetPassword(body: IResetPassword)
       {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post(this.UrlReg+'/reset/',body,httpOptions);
       }
}
