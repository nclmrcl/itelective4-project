import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatproductsPageRoutingModule } from './catproducts-routing.module';

import { CatproductsPage } from './catproducts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatproductsPageRoutingModule
  ],
  declarations: [CatproductsPage]
})
export class CatproductsPageModule {}
