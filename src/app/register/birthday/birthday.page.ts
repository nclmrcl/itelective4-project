import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-birthday',
  templateUrl: './birthday.page.html',
  styleUrls: ['./birthday.page.scss'],
})
export class BirthdayPage implements OnInit {

  constructor(private router: Router, private ds: DataService) { }

  ngOnInit() {
  }

  acc_birthdate: any;
  acc_gender: any;

  nextForm() {
    this.ds.acc_info.acc_birthdate = this.acc_birthdate;
    this.ds.acc_info.acc_gender = this.acc_gender;
    this.router.navigate(['/register/contact']);
  }
  
  prevForm() {
    this.router.navigate(['/register/address']);
  }
}
