import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { ToastController} from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  constructor(private router: Router, private ds: DataService, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.getUserProfile();

  }

  category(cat: string) {
    this.ds.SharedData = cat;
    this.router.navigate(['/catproducts']);
  }

  dt: any[] = [];
  getUserProfile() {
    let pload = JSON.parse(atob(window.sessionStorage.getItem(btoa('payload'))));
    this.ds.sendApiRequest("accounts/" + pload.id, null).subscribe((data: { payload: any[]; }) => {
      this.dt = data.payload;
      this.welcomeToast("Welcome, " + this.dt[0].acc_fname + " " + this.dt[0].acc_lname + "!");
      console.log(this.dt)
    });
  }

  async welcomeToast(messageSuccess) {
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
