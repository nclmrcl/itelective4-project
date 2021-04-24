import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

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

  constructor(private ds: DataService, private router: Router) { }

  ngOnInit() {
    this.categoryProducts();
  }

  catName: any = this.ds.SharedData;
  dt: any[] = [];

  categoryProducts() {
    this.ds.sendApiRequest("products/" + this.catName, null).subscribe((data: { payload: any[]; }) => {
      this.dt = data.payload;
      console.log(this.dt)
    });
  }

  viewProduct(id) {
    this.ds.productId = id;
    this.router.navigate(['productdescription']);
  }
}
