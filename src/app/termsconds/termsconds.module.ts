import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermscondsPageRoutingModule } from './termsconds-routing.module';

import { TermscondsPage } from './termsconds.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermscondsPageRoutingModule
  ],
  declarations: [TermscondsPage]
})
export class TermscondsPageModule {}
