import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';
import { ToastController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private ds: DataService, private user: UserService, private router: Router, private toastCtrl: ToastController) { }

  passwordType: string = 'password';
  passwordIcon: string = 'eye';

  ngOnInit() {
  }
  
  dt: any = {};

  acc_password: any;
  acc_username: any;
  acc_info: any = {};

  login() {
    
    this.acc_info.acc_password = this.acc_password;
    this.acc_info.acc_username = this.acc_username;

    if(this.acc_info.acc_password == null || this.acc_info.acc_username ==null){
      this.presentToast('Invalid Username/Password!','');
      return;
    }

    this.ds.sendApiRequest("login/", this.acc_info).subscribe((data: { payload: any[]; }) => {
      this.dt = data.payload;
      window.sessionStorage.setItem(btoa('payload'), this.dt);
      this.user.setLogin();
      
      let pload = JSON.parse(atob(this.dt));
      
      this.welcomeToast("Welcome, " + pload.fname + " " + pload.lname + "!");
      this.router.navigate(['/products']);
    }, er => {
      this.presentToast('Invalid Username/Password!', 'The Username/Password you entered is incorrect');
    });
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordIcon === 'eye' ? 'eye-off' : 'eye';
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

  async welcomeToast(messageSuccess) {
    const toast = await this.toastCtrl.create({
        duration: 1000,
        color: 'dark',
        message: messageSuccess,
        position: 'bottom',
        cssClass: 'toast',
      });
    toast.present();
  }

  
}
