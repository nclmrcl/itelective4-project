import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catproducts',
  templateUrl: './catproducts.page.html',
  styleUrls: ['./catproducts.page.scss'],
})
export class CatproductsPage implements OnInit {

  cardContent: any = [
    {
      itemName: 'Gardenia Classic White Bread 400G',
      itemPrice: 47.50
    },
    {
      itemName: 'Gardenia Regular Slice White Bread 600G',
      itemPrice: 65.50
    },
    {
      itemName: 'Gardenia Thick Slice White Bread 600G',
      itemPrice: 65.50
    },
    {
      itemName: 'Marby Pinoy Tasty 450G',
      itemPrice: 35.00
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
