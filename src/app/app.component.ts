import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import {ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private user: UserService, private router: Router, private toastCtrl:ToastController,) {}

  logout() {
    window.sessionStorage.clear();
    this.user.setLogout();
    this.router.navigate(['/']);
    this.presentToast('Successfully Logged Out');
  }

  async presentToast(messageSuccess) {
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
