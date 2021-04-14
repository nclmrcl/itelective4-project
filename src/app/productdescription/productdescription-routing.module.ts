import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductdescriptionPage } from './productdescription.page';

const routes: Routes = [
  {
    path: '',
    component: ProductdescriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductdescriptionPageRoutingModule {}
