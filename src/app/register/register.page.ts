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

  nextForm() {
    this.ds.acc_info.acc_fname = this.acc_fname;
    this.ds.acc_info.acc_lname = this.acc_lname;
    this.ds.acc_info.acc_mname = this.acc_mname;
    this.router.navigate(['/register/address']);
  }
}
