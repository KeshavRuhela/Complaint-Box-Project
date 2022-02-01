import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComplaintDataPage } from './complaint-data.page';

const routes: Routes = [
  {
    path: '',
    component: ComplaintDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComplaintDataPageRoutingModule {}
