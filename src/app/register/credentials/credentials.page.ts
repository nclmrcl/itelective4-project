import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController} from '@ionic/angular';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.page.html',
  styleUrls: ['./credentials.page.scss'],
})
export class CredentialsPage implements OnInit {

  registrationForm: FormGroup;
  isSubmitted = false;

  constructor(private router: Router, private ds: DataService, public formBuilder: FormBuilder, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      acc_username: ['', [Validators.required, Validators.minLength(2)]],
      acc_password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  get errorControl() {
    return this.registrationForm.controls;
  }

  acc_username: any;
  acc_password: any;
  acc_credentails: any = {};

  nextForm() {
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.registrationForm.value)
      this.acc_credentails.acc_username = this.acc_username;
      this.ds.sendApiRequest("checkUsername/", this.acc_credentails).subscribe((data: { payload: any[]; }) => {
        this.ds.acc_info.acc_username = this.acc_username;
        this.ds.acc_info.acc_password = this.acc_password;
        this.router.navigate(['/register/terms']);
      }, (err: any) => {
        this.presentToast('Username already exists','');
    });
    }
  }

  // acc_username: any;
  // acc_password: any;
  // acc_credentails: any = {};


  // nextForm() {
  //   this.acc_credentails.acc_username = this.acc_username;
  //   this.ds.sendApiRequest("checkEmail/", this.acc_credentails).subscribe((data: { payload: any[]; }) => {
      
  //   }, (err: any) => {
  //     this.ds.acc_info.acc_username = this.acc_username;
  //     this.ds.acc_info.acc_password = this.acc_password;
  //   this.router.navigate(['/register/terms']);
  //   });
    
  // }
  
  prevForm() {
    this.router.navigate(['/register/contact']);
  }

  
  async presentToast(messageError, headerError) {
    const toast = await this.toastCtrl.create({
        duration: 1200,
        color: 'danger',
        message: messageError,
        position: 'bottom',
        cssClass: 'my-custom-class'
      });
    toast.present();
  }
}
