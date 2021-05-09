import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  constructor(private router: Router, private ds: DataService) { }

  ngOnInit() {
  }

  acc_no: any;
  acc_street: any;
  acc_barangay: any;
  acc_city: any = 'Olongapo City';
  acc_province: any = 'Zambales';

  nextForm() {
    this.ds.acc_info.acc_no = this.acc_no;
    this.ds.acc_info.acc_street = this.acc_street;
    this.ds.acc_info.acc_barangay = this.acc_barangay;
    this.ds.acc_info.acc_city = this.acc_city;
    this.ds.acc_info.acc_province = this.acc_province;
    this.router.navigate(['/register/birthday']);
  }
  
  prevForm() {
    this.router.navigate(['/register/']);
  }
}
