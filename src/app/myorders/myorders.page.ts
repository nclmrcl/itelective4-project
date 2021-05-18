import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.page.html',
  styleUrls: ['./myorders.page.scss'],
})
export class MyordersPage {

  type:string;

  constructor(private ds: DataService, private router: Router) { }

  ionViewWillEnter() {
    //Set first tab as default selected segment
    this.type = "pendingOrders";
    this.myOrders();
  }

  dt: any[] = [];

  myOrders() {
    let pload = JSON.parse(atob(window.sessionStorage.getItem(btoa('payload'))));

    this.ds.sendApiRequest("order/" + pload.id, null).subscribe((data: { payload: any[]; }) => {
      this.dt = data.payload;
      console.log(this.dt)
    });
  }
}
