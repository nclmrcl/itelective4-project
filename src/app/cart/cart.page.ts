import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';
import { ToastController } from '@ionic/angular';
import { IonContent } from '@ionic/angular';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent;


  constructor(private ds: DataService, private router: Router, private user: UserService,  private toastCtrl: ToastController, route:ActivatedRoute) {route.params.subscribe(val => {
    this.getCart();
  });}

  ngOnInit() {
    this.getCart();
    
  }

  ScrollToTop() {
    this.content.scrollToTop(1200);
  }

  private subs: Subscription;
  message: any;

  cart_qty: any = "";
  dt:any = [];
  cart_info: any = {};

  sendMessage(): void {
    this.ds.sendUpdate('Message from Sender Component to Receiver Component!');
  }

  getCart() {
    let pload = JSON.parse(atob(window.sessionStorage.getItem(btoa('payload'))));
    this.ds.sendApiRequest("cart/" + pload.id, null).subscribe((data: { payload: any[]; }) => {
      this.dt = data.payload;
      console.log(this.dt)
      console.log(this.cart_qty)
      if(this.dt != ''){
      this.cart_qty = this.dt[0].cart_quantity;
      }
      // else{
      //   this.presentToast("Your cart doesn't have any product/s yet");
      // }
    }, er => {
        // this.presentToast("Your cart doesn't have products yet");
      });
  }

  addQuantity(id, qty) {
    this.cart_info.cart_quantity = qty + 1;
    this.ds.sendApiRequest("addQuantity/" + id, this.cart_info).subscribe((data: { payload: any[]; }) => {
      this.dt = data.payload;
      this.sendMessage();
      this.getCart();
      console.log(this.dt)
    });
  }

  subtractQuantity(id, qty) {
    if(qty > 1) {
      this.cart_info.cart_quantity = qty - 1;
      this.ds.sendApiRequest("subtractQuantity/" + id, this.cart_info).subscribe((data: { payload: any[]; }) => {
        this.dt = data.payload;
        this.sendMessage();
        this.getCart();
        console.log(this.dt)
      });
    }
  }

  toDeleteCart: any = {};
  deleteProduct(id) {
    this.toDeleteCart.cart_status = 0;
    this.ds.sendApiRequest("archiveCart/" + id, this.toDeleteCart).subscribe((data: { payload: any[]; }) => {
      this.dt = data.payload;
      console.log(this.dt)
      this.sendMessage();
      this.getCart();
    });
  }

  checkOut(){
    if(this.dt != ''){
      console.log(this.dt)
        this.router.navigate(['/checkout']);
    }
    // else{
    //   this.presentToast("Your cart doesn't have any product/s yet");
    // }
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
}
