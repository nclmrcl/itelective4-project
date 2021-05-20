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
    this.getUserProfile();
    this.getOrder();
    
  }

  dt: any[] = [];

  getUserProfile() {
    let pload = JSON.parse(atob(window.sessionStorage.getItem(btoa('payload'))));
    this.ds.sendApiRequest("accounts/" + pload.id, null).subscribe((data: { payload: any[]; }) => {
      this.dt = data.payload;
      console.log(this.dt)
    });
  }
  
  getOrder(){
    console.log(this.orders);
  }

  back(){
    this._modal.dismiss();
  }

}
