import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-editcontactinfo',
  templateUrl: './editcontactinfo.page.html',
  styleUrls: ['./editcontactinfo.page.scss'],
})
export class EditcontactinfoPage implements OnInit {

  registrationForm: FormGroup;
  isSubmitted = false;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      acc_mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(11), Validators.minLength(11)]],
      acc_email: ['', [Validators.required]]
    })
  }

  get errorControl() {
    return this.registrationForm.controls;
  }

  acc_email: any;
  acc_mobile: any;
  acc_contact: any = {};

  submitForm() {
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.registrationForm.value)
    }
  }

}
