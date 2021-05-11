import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CredentialsPageRoutingModule } from './credentials-routing.module';

import { CredentialsPage } from './credentials.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CredentialsPageRoutingModule
  ],
  declarations: [CredentialsPage]
})
export class CredentialsPageModule {}
