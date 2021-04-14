import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductdescriptionPageRoutingModule } from './productdescription-routing.module';

import { ProductdescriptionPage } from './productdescription.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductdescriptionPageRoutingModule
  ],
  declarations: [ProductdescriptionPage]
})
export class ProductdescriptionPageModule {}
