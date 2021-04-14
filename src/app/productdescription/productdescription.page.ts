import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productdescription',
  templateUrl: './productdescription.page.html',
  styleUrls: ['./productdescription.page.scss'],
})
export class ProductdescriptionPage implements OnInit {

  cardContent: any = [
    {
      itemName: 'Gardenia Classic White Bread',
      itemWeight: '400G',
      itemDesc: 'Taste the latest from Gardenia! Your freshly baked white bread filled with delicious spreads and perfectly sealed to lock in its freshness.',
      itemPrice: 47.50
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
