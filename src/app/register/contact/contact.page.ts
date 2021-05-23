import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController} from '@ionic/angular';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  registrationForm: FormGroup;
  isSubmitted = false;

  constructor(private router: Router, private ds: DataService, public formBuilder: FormBuilder, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      acc_mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(11), Validators.minLength(11)]],
      acc_email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
    })
  }

  get errorControl() {
    return this.registrationForm.controls;
  }

  acc_email: any;
  acc_mobile: any;
  acc_contact: any = {};

  nextForm() {
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.registrationForm.value)
      this.acc_contact.acc_email = this.acc_email;
      
      this.ds.sendApiRequest("checkEmail/", this.acc_contact).subscribe((data: { payload: any[]; }) => {
        this.ds.acc_info.acc_mobile = this.acc_mobile;
        this.ds.acc_info.acc_email = this.acc_email;
        window.sessionStorage.setItem('email', this.acc_email);
        this.router.navigate(['/register/credentials'])
      }, (err: any) => {
        this.presentToast('Email address already exists','');
        return;
    });
    }
  }

  // acc_email: any;
  // acc_mobile: any;
  // acc_contact: any = {};

  // nextForm() {
  //   this.acc_contact.acc_email = this.acc_email;
  //   this.ds.sendApiRequest("checkEmail/", this.acc_contact).subscribe((data: { payload: any[]; }) => {
      
  //   }, (err: any) => {
  //     this.ds.acc_info.acc_email = this.acc_email;
  //     this.ds.acc_info.acc_mobile = this.acc_mobile;
  //     this.router.navigate(['/register/credentials'])
  //   });
    
  // }
  
  prevForm() {
    this.router.navigate(['/register/birthday']);
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
