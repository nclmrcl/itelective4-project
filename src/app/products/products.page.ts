import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  constructor(private router: Router, private ds: DataService) { }

  ngOnInit() {
  }

  category(cat: string) {
    this.ds.SharedData = cat;
    this.router.navigate(['/catproducts']);
  }
}
