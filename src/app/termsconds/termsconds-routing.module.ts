import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermscondsPage } from './termsconds.page';

const routes: Routes = [
  {
    path: '',
    component: TermscondsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermscondsPageRoutingModule {}
