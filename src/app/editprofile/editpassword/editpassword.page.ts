import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ToastController} from '@ionic/angular';

@Component({
  selector: 'app-editpassword',
  templateUrl: './editpassword.page.html',
  styleUrls: ['./editpassword.page.scss'],
})
export class EditpasswordPage implements OnInit {

  registrationForm: FormGroup;
  isSubmitted = false;

  constructor(public formBuilder: FormBuilder, private ds: DataService, private router: Router, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      acc_password: ['', [Validators.required, Validators.minLength(8)]],
      acc_confirmpassword: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  get errorControl() {
    return this.registrationForm.controls;
  }

  acc_password: any;
  acc_confirmpassword: any;
  acc_credentails: any = {};


  submitForm() {
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    }
    if (this.acc_password != this.acc_confirmpassword) {
      this.errorToast("Passwords do not match.");
    }
    else {
      console.log(this.registrationForm.value)
      console.log(this.registrationForm.value)
      let pload = JSON.parse(atob(window.sessionStorage.getItem(btoa('payload'))));
      this.ds.sendApiRequest("updatePassword/" + pload.id, this.registrationForm.value).subscribe((data: { payload: any[]; }) => {
        this.router.navigate(['/profile']);
        this.successToast("Password Updated Successfully.");
      }, (err: any) => {
        this.errorToast("Password was not updated.");
      });
    }
  }

  async errorToast(messageError) {
    const toast = await this.toastCtrl.create({
        duration: 1000,
        color: 'danger',
        message: messageError,
        position: 'bottom',
        cssClass: 'my-custom-class'
      });
    toast.present();
  }

  async successToast(messageError) {
    const toast = await this.toastCtrl.create({
        duration: 1000,
        color: 'primary',
        message: messageError,
        position: 'bottom',
        cssClass: 'my-custom-class'
      });
    toast.present();
  }

}
