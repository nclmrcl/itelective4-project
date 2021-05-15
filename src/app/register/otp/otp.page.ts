import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {

  constructor(private router: Router, private ds: DataService) { }

  ngOnInit() {
    this.getUserOtp();
  }

  acc_otp: any;
  acc_email: any;
  acc_otp_info: any = {};

  dt: any = {};

  getUserOtp() {
    this.acc_otp_info.acc_email = window.sessionStorage.getItem('email');
    this.ds.sendApiRequest("getOTP/", this.acc_otp_info).subscribe((data: { payload: any[]; }) => {
      this.dt = data.payload;
      this.sendUserOTP();
    }, (err: any) => {

    });
  }

  sendUserOTP() {
    this.acc_otp_info.acc_email = window.sessionStorage.getItem('email');
    this.acc_otp_info.acc_otp = this.dt[0].acc_otp;
    this.ds.sendApiRequest("sendOTP/", this.acc_otp_info).subscribe((data: { payload: any[]; }) => {
    }, (err: any) => {
    });
  }

  nextForm() {
    if(this.dt[0].acc_otp == this.acc_otp) {
      this.router.navigate(['/']);
    } else {
      
    }
    
  }
  
  prevForm() {
    this.router.navigate(['/register/register']);
  }

}
