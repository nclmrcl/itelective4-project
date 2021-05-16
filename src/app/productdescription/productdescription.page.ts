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

  constructor(private ds: DataService, private router: Router, private toastCtrl: ToastController, route:ActivatedRoute) {route.params.subscribe(val => {
    this.productDetails();
    this.getCart();
    console.log("Hello")
  });}

  ngOnInit() {
    this.productDetails();
    this.getCart();
  }

  dt: any[] = [];
  cart_content: any = {};

  productDetails() {
    this.ds.sendApiRequest("productDesc/" + this.ds.productId, null).subscribe((data: { payload: any[]; }) => {
      this.dt = data.payload;
      console.log(this.dt)
    });
  }

  cartContent: any = {};

  getCart() {
    let pload = JSON.parse(atob(window.sessionStorage.getItem(btoa('payload'))));
    this.ds.sendApiRequest("cart/" + pload.id, null).subscribe((data: { payload: any[]; }) => {
      this.cart_content = data.payload;
    }, er => {
    
    });
  }

  addToCart(id) {

    let pload = JSON.parse(atob(window.sessionStorage.getItem(btoa('payload'))));
    console.log(this.dt);
    this.cartContent.acc_id = pload.id;
    this.cartContent.product_id = id;
    console.log(this.cart_content.length)
    this.getCart();
    if(this.cart_content.length == 0){
      this.ds.sendApiRequest("addToCart/", this.cartContent).subscribe((data: { payload: any[]; }) => {
        this.successToast( this.dt[0].product_name + " successfully added to your cart");
        this.getCart();
  
      });
      console.log(this.cart_content.length)
    }else{
      for(var i = 0; i < this.cart_content.length; i++) {
        
        console.log(this.cart_content[i].product_id, id)
        if(this.cart_content[i].product_id == id) {
          this.presentToast( this.dt[0].product_name + " is already in the cart", '');
        } else {
          this.ds.sendApiRequest("addToCart/", this.cartContent).subscribe((data: { payload: any[]; }) => {
            this.successToast( this.dt[0].product_name + " successfully added to your cart");
          });
        }
        break;
      }
    }
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

  
  async presentToast(messageError, headerError) {
    const toast = await this.toastCtrl.create({
        duration: 800,
        color: 'danger',
        message: messageError,
        position: 'bottom',
        cssClass: 'my-custom-class'
      });
    toast.present();
  }
}
