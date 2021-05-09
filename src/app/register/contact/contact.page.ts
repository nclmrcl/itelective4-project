import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  constructor(private router: Router, private ds: DataService) { }

  ngOnInit() {
  }

  acc_email: any;
  acc_mobile: any;
  acc_contact: any = {};

  nextForm() {
    this.acc_contact.acc_email = this.acc_email;
    this.ds.sendApiRequest("checkEmail/", this.acc_contact).subscribe((data: { payload: any[]; }) => {
      
    }, (err: any) => {
      this.ds.acc_info.acc_email = this.acc_email;
      this.ds.acc_info.acc_mobile = this.acc_mobile;
      this.router.navigate(['/register/credentials'])
    });
    
  }
  
  prevForm() {
    this.router.navigate(['/register/birthday']);
  }

}
