import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.page.html',
  styleUrls: ['./myorders.page.scss'],
})
export class MyordersPage implements OnInit {

  type:string;

  constructor() { }

  ngOnInit() {
    //Set first tab as default selected segment
    this.type = "pendingOrders";
  }

}
