
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { IProduct } from 'src/app/Shared_Interfaces/IProduct';
import { ActivatedRoute ,Router} from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.scss']
})

export class ShowProductComponent implements OnInit
{
   
    allProduct:IProduct[]; 
    errorMsg:string;
    buyingSuccess:boolean;
    flag:boolean;
    logFlag:boolean;
constructor(private productService:ProductService,private route: ActivatedRoute,private router: Router ,private cartService:CartService)
{  }
ngOnInit(): void
{
    
    this.getAllProduct();
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
 
getAllProduct()
{
 
  this.productService.getAllProducts().subscribe(
     ProductData=>
     {
        this.allProduct=ProductData;
        console.log(this.allProduct)
       
      },
     errorResponse=>
     {
       this.errorMsg=errorResponse;
     }
   )
}

BuyProduct(product:IProduct)
 {
    this.cartService.addProduct(product);
    this.productService.BuyProduct(product.id).subscribe
    (_=>
    {
      this.buyingSuccess=true;
    },
    error=>
    {
      this.errorMsg=error;
    });
    this.router.navigate(['/cart'])
 }
}
 
 