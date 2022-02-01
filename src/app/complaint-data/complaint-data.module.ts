import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComplaintDataPageRoutingModule } from './complaint-data-routing.module';

import { ComplaintDataPage } from './complaint-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComplaintDataPageRoutingModule
  ],
  declarations: [ComplaintDataPage]
})
export class ComplaintDataPageModule {}
