import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditnamePage } from './editname.page';

const routes: Routes = [
  {
    path: '',
    component: EditnamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditnamePageRoutingModule {}
