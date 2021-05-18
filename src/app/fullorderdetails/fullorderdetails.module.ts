import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FullorderdetailsPageRoutingModule } from './fullorderdetails-routing.module';

import { FullorderdetailsPage } from './fullorderdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FullorderdetailsPageRoutingModule
  ],
  declarations: [FullorderdetailsPage]
})
export class FullorderdetailsPageModule {}
