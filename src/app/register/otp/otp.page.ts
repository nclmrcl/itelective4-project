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
  }

  acc_otp: any;
  acc_email: any;
  acc_otp_info: any = {};

  nextForm() {
    this.acc_otp_info.acc_email = this.ds.acc_info.acc_email;
    this.acc_otp_info.acc_otp = this.acc_otp;
    this.ds.sendApiRequest("verifyEmail/", this.acc_otp_info).subscribe((data: { payload: any[]; }) => {
      this.router.navigate(['/']);
    }, (err: any) => {

    });
    
  }
  
  prevForm() {
    this.router.navigate(['/register/register']);
  }

}
