import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullorderdetailsPage } from './fullorderdetails.page';

const routes: Routes = [
  {
    path: '',
    component: FullorderdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullorderdetailsPageRoutingModule {}
