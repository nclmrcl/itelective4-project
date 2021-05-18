import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditcontactinfoPageRoutingModule } from './editcontactinfo-routing.module';

import { EditcontactinfoPage } from './editcontactinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditcontactinfoPageRoutingModule
  ],
  declarations: [EditcontactinfoPage]
})
export class EditcontactinfoPageModule {}
