import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-editaddress',
  templateUrl: './editaddress.page.html',
  styleUrls: ['./editaddress.page.scss'],
})
export class EditaddressPage implements OnInit {

  registrationForm: FormGroup;
  isSubmitted = false;

  constructor(public formBuilder: FormBuilder) { }

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
    }
  }

}
