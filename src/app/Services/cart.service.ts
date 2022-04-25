import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject,Subscriber,Subject,Observable} from 'rxjs';
import { IProduct } from '../Shared_Interfaces/IProduct';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpclient:HttpClient) { }
  public cartSubject = new Subject<any>();
  Products :IProduct[]=[];
  CartState = this.cartSubject.asObservable();
  addProduct(product:IProduct) 
  {
    this.Products.push(product)
  }
  getAllItems():IProduct[]
  {
    return this.Products;
  }
  display():number
   {
    return this.Products.length;
   }
   removeProduct(id:number)
    {
      this.Products=this.Products.slice(id,1)
   }

}
