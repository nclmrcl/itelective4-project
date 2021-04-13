import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatproductsPage } from './catproducts.page';

const routes: Routes = [
  {
    path: '',
    component: CatproductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatproductsPageRoutingModule {}
