import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ToastController} from '@ionic/angular';

@Component({
  selector: 'app-editcontactinfo',
  templateUrl: './editcontactinfo.page.html',
  styleUrls: ['./editcontactinfo.page.scss'],
})
export class EditcontactinfoPage implements OnInit {

  registrationForm: FormGroup;
  isSubmitted = false;

  constructor(public formBuilder: FormBuilder, private ds: DataService, private router: Router, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      acc_mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(11), Validators.minLength(11)]]
    })
  }

  get errorControl() {
    return this.registrationForm.controls;
  }

  acc_mobile: any;
  acc_contact: any = {};

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
        this.successToast("Contact Info Updated Successfully.");
      }, (err: any) => {
  
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
