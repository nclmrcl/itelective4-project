import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { ToastController} from '@ionic/angular';

@Component({
  selector: 'app-productdescription',
  templateUrl: './productdescription.page.html',
  styleUrls: ['./productdescription.page.scss'],
})
export class ProductdescriptionPage implements OnInit {

  cardContent: any = [
    {
      itemName: 'Gardenia Classic White Bread',
      itemWeight: '400G',
      itemDesc: 'Taste the latest from Gardenia! Your freshly baked white bread filled with delicious spreads and perfectly sealed to lock in its freshness.',
      itemPrice: 47.50
    }
  ];

  constructor(private ds: DataService, private router: Router, private toastCtrl: ToastController, route:ActivatedRoute) {route.params.subscribe(val => {
    this.productDetails();
  });}
  ngOnInit() {
    this.productDetails();
  }

  dt: any[] = [];

  productDetails() {
    this.ds.sendApiRequest("productDesc/" + this.ds.productId, null).subscribe((data: { payload: any[]; }) => {
      this.dt = data.payload;
      console.log(this.dt)
    });
  }

  cartContent: any = {};

  addToCart(id) {
    let pload = JSON.parse(atob(window.sessionStorage.getItem(btoa('payload'))));
    console.log(this.dt);
    this.cartContent.acc_id = pload.id;
    this.cartContent.product_id = id;
    
    console.log(this.cartContent)
    this.ds.sendApiRequest("addToCart/", this.cartContent).subscribe((data: { payload: any[]; }) => {
      this.successToast( this.dt[0].product_name + " successfully added to your cart");
    });
  }

  async successToast(messageSuccess) {
    const toast = await this.toastCtrl.create({
        duration: 1000,
        color: 'dark',
        message: messageSuccess,
        position: 'bottom',
        cssClass: 'my-custom-class',
      });
    toast.present();
  }
}
