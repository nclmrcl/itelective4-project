import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatproductsPageRoutingModule } from './catproducts-routing.module';

import { CatproductsPage } from './catproducts.page';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatproductsPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [CatproductsPage]
})
export class CatproductsPageModule {}
