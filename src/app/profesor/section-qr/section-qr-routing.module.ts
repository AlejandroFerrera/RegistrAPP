import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SectionQrPage } from './section-qr.page';

const routes: Routes = [
  {
    path: '',
    component: SectionQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SectionQrPageRoutingModule {}
