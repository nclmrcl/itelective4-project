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

  ionViewDidEnter() {
    //Set first tab as default selected segment
    this.type = "pendingOrders";
    this.myOrders();
  }

  dt: any[] = [];
  pending: any;
  tbd: any;
  delivered: any;
  cancelled: any;

  myOrders() {
    let pload = JSON.parse(atob(window.sessionStorage.getItem(btoa('payload'))));

    this.ds.sendApiRequest("order/" + pload.id, null).subscribe((data: { payload: any[]; }) => {
      this.dt = data.payload;
      console.log(this.dt)
      
      this.pending = this.dt.filter(t=>t.order_status == 1);
      console.log('Pending:', this.pending);

      this.tbd = this.dt.filter(t=>t.order_status == 2);
      console.log('TBD:', this.pending);

      this.delivered = this.dt.filter(t=>t.order_status == 3);
      console.log('Delivered:', this.pending);

      this.cancelled = this.dt.filter(t=>t.order_status == 0);
      console.log('Cancelled:', this.pending);
    });

  }
}
