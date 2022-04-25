import { Component, OnInit } from '@angular/core';
import { CartService } from '../Services/cart.service';
import { ActivatedRoute ,Router} from '@angular/router';
import { IProduct } from '../Shared_Interfaces/IProduct';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
 itemCart:IProduct[]=[];
 total:number = 0;
  constructor(private cartService:CartService,private route: ActivatedRoute,private router: Router ) 
  {
    this.getCartItem();
   }
  ngOnInit(): void 
  {
  }
  getCartItem()
  {
    this.itemCart=this.cartService.getAllItems();
    this.total = this.itemCart.reduce(function(acc, val)
    {
        return acc + (val.price * val.quantity);
    }, 0);
  }
  incrementQuantity(prodId:number,qnt:number)
  {
     for(let i=0; i<this.itemCart.length;i++)
      {
       if(this.itemCart[i].id === prodId)
       {
         if(qnt!= 5)
         this.itemCart[i].quantity=qnt+ 1;
       }
  }
    this. getCartItem()
  }
  decreaseQuantity(prodId:number, qnt:number)
  {
    for(let i=0; i<this.itemCart.length;i++)
    {
       if(this.itemCart[i].id=== prodId)
       {
         if(qnt != 1)
         this.itemCart[i].quantity=qnt- 1;
       }
   }
  this. getCartItem()
  }
  
 /////////////////////////
 removeall()
 {
  this.itemCart = [];
  this.total = 0;
  this.cartNumber = 0;
  }
  singleDelete(id:number)
  {
    console.log(this.itemCart);
     if(this.itemCart)
     {
      this.itemCart = this.cartService.getAllItems();;
       for(let i=0; i<this.itemCart.length; i++)
          {
             if(this.itemCart[i].id=== id)
             {
              this.itemCart.splice(i, 1);
                this. getCartItem()
                this.cartNumberFunc();
              }
           }
     }
   }
  
  cartNumber:number = 0;
  cartNumberFunc()
  {
      var cartValue =this.cartService.getAllItems();
       this.cartNumber = cartValue.length;
  }
}
