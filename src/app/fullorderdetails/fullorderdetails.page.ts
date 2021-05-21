import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-fullorderdetails',
  templateUrl: './fullorderdetails.page.html',
  styleUrls: ['./fullorderdetails.page.scss'],
})
export class FullorderdetailsPage implements OnInit {

  @Input() orders = [];

  constructor(private ds:DataService, private _modal: ModalController) { }

  ngOnInit() {
    // this.getUserProfile();
    this.getOrder();
    this.getOrderItems();
  }

  dt: any[] = [];

  // getUserProfile() {
  //   let pload = JSON.parse(atob(window.sessionStorage.getItem(btoa('payload'))));
  //   this.ds.sendApiRequest("accounts/" + pload.id, null).subscribe((data: { payload: any[]; }) => {
  //     this.dt = data.payload;
  //     //console.log(this.dt)
  //   });
  // }
  
  getOrder(){
    this.dt.push(this.orders);
    console.log(this.dt[0]);
  }

  order_item: any[] = [];
  getOrderItems() {
    this.ds.sendApiRequest("order_item/" + this.dt[0].order_id, null).subscribe((data: { payload: any[]; }) => {
      this.order_item = data.payload;
      console.log('Order Item:', this.order_item)
    });
  }

  back(){
    this._modal.dismiss();
  }

}
