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

  dt: any[] = [];

  getCart() {
    let pload = JSON.parse(atob(window.sessionStorage.getItem(btoa('payload'))));
    this.ds.sendApiRequest("cart/" + pload.id, null).subscribe((data: { payload: any[]; }) => {
      this.dt = data.payload;
      console.log(this.dt)
    });
  }
}
