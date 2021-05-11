import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  registrationForm: FormGroup;
  isSubmitted = false;

  constructor(private router: Router, private ds: DataService, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      acc_no: ['', [Validators.required]],
      acc_street: ['', [Validators.required]],
      acc_barangay: ['', [Validators.required]]
    })
  }

  get errorControl() {
    return this.registrationForm.controls;
  }

  acc_no: any;
  acc_street: any;
  acc_barangay: any;
  acc_city: any = 'Olongapo City';
  acc_province: any = 'Zambales';

  nextForm() {
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.registrationForm.value)
      this.ds.acc_info.acc_no = this.acc_no;
      this.ds.acc_info.acc_street = this.acc_street;
      this.ds.acc_info.acc_barangay = this.acc_barangay;
      this.ds.acc_info.acc_city = this.acc_city;
      this.ds.acc_info.acc_province = this.acc_province;
      this.router.navigate(['/register/birthday']);
    }
  }

  // acc_no: any;
  // acc_street: any;
  // acc_barangay: any;
  // acc_city: any = 'Olongapo City';
  // acc_province: any = 'Zambales';

  // nextForm() {
  //   this.ds.acc_info.acc_no = this.acc_no;
  //   this.ds.acc_info.acc_street = this.acc_street;
  //   this.ds.acc_info.acc_barangay = this.acc_barangay;
  //   this.ds.acc_info.acc_city = this.acc_city;
  //   this.ds.acc_info.acc_province = this.acc_province;
  //   this.router.navigate(['/register/birthday']);
  // }
  
  prevForm() {
    this.router.navigate(['/register/']);
  }
}
