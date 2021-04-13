import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  cardContent: any = [
    {
      itemName: 'Bounty Chicken Nuggets 200G',
      itemPrice: 75.00
    },
    {
      itemName: 'Bounty Fresh Saucy Torikaraage Teriyaki 450G',
      itemPrice: 199.00
    },
    {
      itemName: 'Carnation Hash Brown 10S',
      itemPrice: 175.00
    },
    {
      itemName: 'Fat & Thin Premium Chinese Sausage 300G',
      itemPrice: 160.00
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
