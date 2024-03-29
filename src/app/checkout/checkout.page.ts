import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  constructor(private ds:DataService,  private toastCtrl: ToastController, private router: Router, route:ActivatedRoute) {route.params.subscribe(val => {
    this.getCart();
  });}
  ngOnInit() {
    this.getUserProfile();
    this.getCart();
    
  }

  dt: any[] = [];

  getUserProfile() {
    let pload = JSON.parse(atob(window.sessionStorage.getItem(btoa('payload'))));
    this.ds.sendApiRequest("accounts/" + pload.id, null).subscribe((data: { payload: any[]; }) => {
      this.dt = data.payload;
      console.log(this.dt)
    });
  }

  
  toClearCart: any = {};

  clearCart() {
    let pload = JSON.parse(atob(window.sessionStorage.getItem(btoa('payload'))));
    this.toClearCart.cart_status = 0;
    this.ds.sendApiRequest("clearCart/" + pload.id, this.toClearCart).subscribe((data: { payload: any[]; }) => {
    });
  }

  cart: any = [];
  cart_qty: any = "";

  getCart() {
    let pload = JSON.parse(atob(window.sessionStorage.getItem(btoa('payload'))));
    this.ds.sendApiRequest("cart/" + pload.id, null).subscribe((data: { payload: any[]; }) => {
      this.cart = data.payload;
      console.log(this.cart)
      if(this.cart != ''){
        this.getTotal()
      }else{
        this.presentToast("Your cart doesn't have any product/s yet");
      }
    }, er => {
        this.presentToast("Your cart doesn't have products yet");
      });
  
  }

  async presentToast(messageError) {
    const toast = await this.toastCtrl.create({
        duration: 1200,
        color: 'dark',
        message: messageError,
        position: 'bottom',
        cssClass: 'my-custom-class'
      });
    toast.present();
  }

  back(){
    this.router.navigate(['/cart']);
    
  }

  order_info: any = {};
  prod_id: any = [];
  item_quantity: any = [];
  order_total_product: any = [];
  order_total: any;
  
  getTotal(){
    this.order_info = {};
    this.prod_id = [];
    this.item_quantity = [];
    this.order_total_product = [];
    
    let pload = JSON.parse(atob(window.sessionStorage.getItem(btoa('payload'))));
    if(this.cart != ''){
      console.log(this.cart);
      for(var i = 0; i < this.cart.length; i++) {
        this.item_quantity.push(this.cart[i].cart_quantity);
        this.prod_id.push(this.cart[i].product_id);
        this.order_total_product.push(this.cart[i].cart_quantity * this.cart[i].product_price);
      }

      this.order_total_product = this.order_total_product.reduce((acc, cur) => acc + Number(cur), 0)

      this.order_info.item_quantity = this.item_quantity;
      this.order_info.product_id = this.prod_id;
      this.order_info.order_shipping = 100;
      this.order_info.order_total = this.order_total_product;
      this.order_info.order_grandtotal = 100 + Number(this.order_total_product);
      this.order_info.acc_id = pload.id;

      console.log(this.order_info)
      console.log(this.cart)
      
    }else{
      this.presentToast("Your cart doesn't have any product/s yet");
    }
  }

  checkOut(){
    this.ds.sendApiRequest("placeOrder/", this.order_info).subscribe((data: { payload: any[]; }) => {

      this.cart = data.payload;
      console.log(this.cart);
      this.clearCart();
      this.presentToast("Purchased");
      this.router.navigate(['/myorders']);
    });
  }


}
