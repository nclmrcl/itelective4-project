import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fullorderdetails',
  templateUrl: './fullorderdetails.page.html',
  styleUrls: ['./fullorderdetails.page.scss'],
})
export class FullorderdetailsPage implements OnInit {

  @Input() orders = [];

  constructor(private ds:DataService, private _modal: ModalController, private router: Router) { }

  ngOnInit() {
    this.getOrder();
    this.getOrderItems();
  }

  dt: any[] = [];
  
  getOrder(){
    this.dt.push(this.orders);
    console.log(this.dt[0]);
  }

  order_item: any[] = [];
  getOrderItems() {
    this.ds.sendApiRequest("order_items/" + this.dt[0].order_id, null).subscribe((data: { payload: any[]; }) => {
      this.order_item = data.payload;
      console.log('Order Item:', this.order_item)
    });
  }

  orderStatus: any = {};
  cancelOrder() {
    this.orderStatus.order_status = 0;
    this.ds.sendApiRequest("cancelOrder/" + this.dt[0].order_id, this.orderStatus).subscribe((data: { payload: any[]; }) => {
      this.order_item = data.payload;
      this.router.navigate(['/myorders']);
    });
  }
  back(){
    this._modal.dismiss();
  }

}
