import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditcontactinfoPage } from './editcontactinfo.page';

const routes: Routes = [
  {
    path: '',
    component: EditcontactinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditcontactinfoPageRoutingModule {}
