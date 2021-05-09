import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.page.html',
  styleUrls: ['./credentials.page.scss'],
})
export class CredentialsPage implements OnInit {

  constructor(private router: Router, private ds: DataService) { }

  ngOnInit() {
  }

  acc_username: any;
  acc_password: any;
  acc_credentails: any = {};


  nextForm() {
    this.acc_credentails.acc_username = this.acc_username;
    this.ds.sendApiRequest("checkEmail/", this.acc_credentails).subscribe((data: { payload: any[]; }) => {
      
    }, (err: any) => {
      this.ds.acc_info.acc_username = this.acc_username;
      this.ds.acc_info.acc_password = this.acc_password;
    this.router.navigate(['/register/terms']);
    });
    
  }
  
  prevForm() {
    this.router.navigate(['/register/contact']);
  }
}
