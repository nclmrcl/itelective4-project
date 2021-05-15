import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registrationForm: FormGroup;
  isSubmitted = false;

  constructor(private ds:DataService, private router:Router, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      acc_lname: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z \-\']+')]],
      acc_fname: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z \-\']+')]]
    })
  }

  get errorControl() {
    return this.registrationForm.controls;
  }

  acc_fname: any;
  acc_lname: any;
  acc_mname: any = '';

  nextForm() {
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.registrationForm.value)
      this.ds.acc_info.acc_fname = this.acc_fname;
      this.ds.acc_info.acc_lname = this.acc_lname;
      this.ds.acc_info.acc_mname = this.acc_mname;
      this.router.navigate(['/register/address']);
    }
  }

  prevForm() {
    this.router.navigate(['/']);
  }

  // acc_fname: any;
  // acc_lname: any;
  // acc_mname: any;

  // nextForm() {
  //   this.ds.acc_info.acc_fname = this.acc_fname;
  //   this.ds.acc_info.acc_lname = this.acc_lname;
  //   this.ds.acc_info.acc_mname = this.acc_mname;
  //   this.router.navigate(['/register/address']);
  // }
}
