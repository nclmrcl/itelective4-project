import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {

  constructor(private router: Router, private ds: DataService) { }

  ngOnInit() {
  }

  nextForm() {
    this.ds.sendApiRequest("register/", this.ds.acc_info).subscribe((data: { payload: any[]; }) => {
      this.router.navigate(['/register/otp']);
    }, (err: any) => {

    });
    
  }
  
  prevForm() {
    this.router.navigate(['/register/credentials']);
  }

}
