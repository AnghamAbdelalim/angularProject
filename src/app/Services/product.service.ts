import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from 'src/app/Shared_Interfaces/IProduct';
import { Observable,throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http'; 
@Injectable({
  providedIn: 'root'
})
export class ProductService
 {
  constructor(private http:HttpClient) { }
  url='http://localhost:9772/api/Product';

  getAllProducts():Observable<IProduct[]>
  {
      return this.http.get<IProduct[]>(this.url).pipe(catchError((err)=>
        {

          return throwError(err.message ||"Internal Server error contact site adminstarator");
        }));
  }

  BuyProduct(id:number)
  {
    return this.http.get<number>(this.url+'/getbyId'+id).pipe(catchError(
       (err) => 
       {
        return throwError(err.message ||"Error getting travellers data.");
       }));
  }
   
  }
