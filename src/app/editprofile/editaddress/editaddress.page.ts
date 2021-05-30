import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ToastController} from '@ionic/angular';

@Component({
  selector: 'app-editaddress',
  templateUrl: './editaddress.page.html',
  styleUrls: ['./editaddress.page.scss'],
})
export class EditaddressPage implements OnInit {

  registrationForm: FormGroup;
  isSubmitted = false;

  constructor(public formBuilder: FormBuilder, private ds: DataService, private router: Router, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      acc_no: ['', [Validators.required]],
      acc_street: ['', [Validators.required]],
      acc_barangay: ['', [Validators.required]],
      acc_city: [''],
      acc_province: ['']
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
        this.successToast("Address Updated Successfully.");
      }, (err: any) => {
        this.errorToast("Address was not updated.");
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
