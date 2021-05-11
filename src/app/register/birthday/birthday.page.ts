import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-birthday',
  templateUrl: './birthday.page.html',
  styleUrls: ['./birthday.page.scss'],
})
export class BirthdayPage implements OnInit {

  registrationForm: FormGroup;
  isSubmitted = false;

  constructor(private router: Router, private ds: DataService, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      acc_gender: ['', [Validators.required]]
    })
  }

  get errorControl() {
    return this.registrationForm.controls;
  }

  acc_birthdate: any;
  acc_gender: any;

  nextForm() {
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.registrationForm.value)
      this.ds.acc_info.acc_birthdate = this.acc_birthdate;
      this.ds.acc_info.acc_gender = this.acc_gender;
      this.router.navigate(['/register/contact']);
    }
  }

  // acc_birthdate: any;
  // acc_gender: any;

  // nextForm() {
  //   this.ds.acc_info.acc_birthdate = this.acc_birthdate;
  //   this.ds.acc_info.acc_gender = this.acc_gender;
  //   this.router.navigate(['/register/contact']);
  // }
  
  prevForm() {
    this.router.navigate(['/register/address']);
  }
}
