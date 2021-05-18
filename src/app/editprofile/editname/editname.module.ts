import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditnamePageRoutingModule } from './editname-routing.module';

import { EditnamePage } from './editname.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditnamePageRoutingModule
  ],
  declarations: [EditnamePage]
})
export class EditnamePageModule {}
