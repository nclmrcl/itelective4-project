import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  cart_qty: any = "";
  dt: any[] = [];

  getCart() {
    let pload = JSON.parse(atob(window.sessionStorage.getItem(btoa('payload'))));
    this.ds.sendApiRequest("cart/" + pload.id, null).subscribe((data: { payload: any[]; }) => {
      this.dt = data.payload;
      this.cart_qty = this.dt[0].cart_quantity;
      console.log(this.dt)
    });
  }

  addQuantity(id, qty) {
    console.log(id)
    this.ds.sendApiRequest("addQuantity/", null).subscribe((data: { payload: any[]; }) => {
      this.dt = data.payload;
      console.log(this.dt)
    });
  }

  subtractQuantity(id, qty) {

  }

  deleteProduct(id, qty) {

  }
}
