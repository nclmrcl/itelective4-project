import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  constructor(private ds: DataService, private router: Router, private user: UserService) { }

  ngOnInit() {
    this.getCart();
  }

  private subs: Subscription;
  message: any;

  cart_qty: any = "";
  dt: any[] = [];
  cart_info: any = {};

  getCart() {
    let pload = JSON.parse(atob(window.sessionStorage.getItem(btoa('payload'))));
    this.ds.sendApiRequest("cart/" + pload.id, null).subscribe((data: { payload: any[]; }) => {
      this.dt = data.payload;
      this.cart_qty = this.dt[0].cart_quantity;
      console.log(this.dt)
    });
  }

  addQuantity(id, qty) {
    this.cart_info.cart_quantity = qty + 1;
    this.ds.sendApiRequest("addQuantity/" + id, this.cart_info).subscribe((data: { payload: any[]; }) => {
      this.dt = data.payload;
      console.log(this.dt)
      this.getCart();
    });
  }

  subtractQuantity(id, qty) {
    if(qty >= 1) {
      this.cart_info.cart_quantity = qty - 1;
      this.ds.sendApiRequest("subtractQuantity/" + id, this.cart_info).subscribe((data: { payload: any[]; }) => {
        this.dt = data.payload;
        console.log(this.dt)
        this.getCart();
      });
    }
  }

  toDeleteCart: any = {};
  deleteProduct(id) {
    this.toDeleteCart.cart_status = 0;
    this.ds.sendApiRequest("archiveCart/" + id, this.toDeleteCart).subscribe((data: { payload: any[]; }) => {
      this.dt = data.payload;
      console.log(this.dt)
      this.getCart();
    });
  }

  order_info: any = {};
  prod_id: any = [];
  item_quantity: any = [];
  order_total_product: any = [];
  order_total: any;
  checkOut(){
    this.order_info = {};
    this.prod_id = [];
    this.item_quantity = [];
    this.order_total_product = [];
    
    let pload = JSON.parse(atob(window.sessionStorage.getItem(btoa('payload'))));

    for(var i = 0; i < this.dt.length; i++) {
      this.item_quantity.push(this.dt[i].cart_quantity);
      this.prod_id.push(this.dt[i].product_id);
      this.order_total_product.push(this.dt[i].cart_quantity * this.dt[i].product_price);
    }

    this.order_total_product = this.order_total_product.reduce((acc, cur) => acc + Number(cur), 0)

    this.order_info.item_quantity = this.item_quantity;
    this.order_info.product_id = this.prod_id;
    this.order_info.order_shipping = 100;
    this.order_info.order_total = this.order_total_product;
    this.order_info.order_grandtotal = 100 + Number(this.order_total_product);
    this.order_info.acc_id = pload.id;

    this.ds.sendApiRequest("placeOrder/", this.order_info).subscribe((data: { payload: any[]; }) => {
      this.dt = data.payload;
      this.clearCart();
      this.router.navigate(['/myorders']);
    });
  }

  toClearCart: any = {};

  clearCart() {
    let pload = JSON.parse(atob(window.sessionStorage.getItem(btoa('payload'))));
    this.toClearCart.cart_status = 0;
    this.ds.sendApiRequest("clearCart/" + pload.id, this.toClearCart).subscribe((data: { payload: any[]; }) => {
    });
  }
}
