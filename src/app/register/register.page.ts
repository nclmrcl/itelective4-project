import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private ds:DataService, private router:Router) { }

  ngOnInit() {
  }

  acc_fname: any;
  acc_lname: any;
  acc_mname: any;
  acc_birthdate: any;
  acc_no: any;
  acc_street: any;
  acc_barangay: any;
  acc_city: any = 'Olongapo City';
  acc_province: any = 'Zambales';
  acc_gender: any;
  acc_email: any;
  acc_mobile: any;
  acc_username: any;
  acc_password: any;
  acc_info: any = {};

  register() {
    this.acc_info.acc_fname = this.acc_fname;
    this.acc_info.acc_lname = this.acc_lname;
    this.acc_info.acc_mname = this.acc_mname;
    this.acc_info.acc_birthdate = this.acc_birthdate;
    this.acc_info.acc_no = this.acc_no;
    this.acc_info.acc_street = this.acc_street;
    this.acc_info.acc_barangay = this.acc_barangay;
    this.acc_info.acc_city = this.acc_city;
    this.acc_info.acc_province = this.acc_province;
    this.acc_info.acc_gender = this.acc_gender;
    this.acc_info.acc_email = this.acc_email;
    this.acc_info.acc_mobile = this.acc_mobile;
    this.acc_info.acc_username = this.acc_username;
    this.acc_info.acc_password = this.acc_password;

    console.log(this.acc_info);
    
    this.ds.sendApiRequest("register/", this.acc_info).subscribe((data: { payload: any[]; }) => {
      this.router.navigate['/login'];
    });
  }
}
