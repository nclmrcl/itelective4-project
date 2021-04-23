import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private ds: DataService, private user: UserService, private router: Router) { }

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

    this.ds.sendApiRequest("login/", this.acc_info).subscribe((data: { payload: any[]; }) => {
      this.dt = data.payload;
      window.sessionStorage.setItem(btoa('payload'), this.dt);
      this.user.setLogin();
      this.router.navigate(['/products']);
    });
  }
  hideShowPassword() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordIcon === 'eye' ? 'eye-off' : 'eye';
  }
}
