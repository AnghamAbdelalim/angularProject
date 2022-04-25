import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../Services/cart.service';
import { IProduct } from '../Shared_Interfaces/IProduct';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit
 {
   flag:boolean;
   logFlag:boolean;
  constructor(private cartService:CartService,public translate: TranslateService)
   {
    this.translate.addLangs(['en','ar'])
    this.translate.setDefaultLang('en');
    const browserLang=translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|ar/)? browserLang :'en');
   }
 ngOnInit(): void 
{
 if(localStorage.getItem("flag")!=null && localStorage.getItem("flag")=="true"&&localStorage.getItem("logged")=="true") 
   {
     this.flag=true;
   }
   if(localStorage.getItem("logged")!=null&&localStorage.getItem("logged")=="true")
   {
     this.logFlag=true;
   }
   else if(localStorage.getItem("logged")!=null&&localStorage.getItem("logged")=="false")
   {
     this.logFlag=false;
   }
   else
   {
     this.flag=false;
   }
}
LogOut()
{
 localStorage.setItem("logged","false");
 this.logFlag=true;
}
}