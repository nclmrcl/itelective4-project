import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditprofilePage } from './editprofile.page';

const routes: Routes = [
  {
    path: '',
    component: EditprofilePage
  },
  {
    path: 'editname',
    loadChildren: () => import('./editname/editname.module').then( m => m.EditnamePageModule)
  },
  {
    path: 'editaddress',
    loadChildren: () => import('./editaddress/editaddress.module').then( m => m.EditaddressPageModule)
  },
  {
    path: 'editcontactinfo',
    loadChildren: () => import('./editcontactinfo/editcontactinfo.module').then( m => m.EditcontactinfoPageModule)
  },
  {
    path: 'editpassword',
    loadChildren: () => import('./editpassword/editpassword.module').then( m => m.EditpasswordPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditprofilePageRoutingModule {}
