import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-editname',
  templateUrl: './editname.page.html',
  styleUrls: ['./editname.page.scss'],
})
export class EditnamePage implements OnInit {

  registrationForm: FormGroup;
  isSubmitted = false;

  constructor(public formBuilder: FormBuilder, private ds: DataService, private router: Router) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      acc_lname: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z \-\']+')]],
      acc_fname: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z \-\']+')]],
      acc_mname: ['', [Validators.minLength(2), Validators.pattern('^[a-zA-Z \-\']+')]]
    })
  }

  get errorControl() {
    return this.registrationForm.controls;
  }

  acc_fname: any;
  acc_lname: any;
  acc_mname: any = '';
  acc_fullname: any = {};

  submitForm() {
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.registrationForm.value)
      let pload = JSON.parse(atob(window.sessionStorage.getItem(btoa('payload'))));
      this.ds.sendApiRequest("updateProfile/" + pload.id, this.registrationForm.value).subscribe((data: { payload: any[]; }) => {
        this.router.navigate(['/profile']);
      }, (err: any) => {
  
      });
    }
  }

}
