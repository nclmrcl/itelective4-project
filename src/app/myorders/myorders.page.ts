import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { NavController } from '@ionic/angular';
import{FullorderdetailsPage} from '../fullorderdetails/fullorderdetails.page'
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.page.html',
  styleUrls: ['./myorders.page.scss'],
})
export class MyordersPage {

  type:string;

  constructor(private ds: DataService, private router: Router, public navCtrl: NavController, private _modal: ModalController,) { }

  ionViewDidEnter() {
    //Set first tab as default selected segment
    this.type = "pendingOrders";
    this.myOrders();
  }

  dt: any[] = [];
  pending: any;
  completed: any;

  myOrders() {
    let pload = JSON.parse(atob(window.sessionStorage.getItem(btoa('payload'))));

    this.ds.sendApiRequest("order/" + pload.id, null).subscribe((data: { payload: any[]; }) => {
      this.dt = data.payload;
      console.log(this.dt)
      
      this.pending = this.dt.filter(t=>t.order_status == 1 || t.order_status == 2);
      console.log('Pending:', this.pending);

      this.completed = this.dt.filter(t=>t.order_status == 3 || t.order_status == 0);
      console.log('Completed:', this.completed);
    });

  }


async viewFullDetails(event, data){
    //console.log(data)
    // this.navCtrl.push(FullorderdetailsPageModule,{
    //   item:data
    //   });
    const modal = await this._modal.create({
      component: FullorderdetailsPage,
      componentProps: { orders: data }
      });
    
    await modal.present();
  }
}




