import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SectionQrPageRoutingModule } from './section-qr-routing.module';

import { SectionQrPage } from './section-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SectionQrPageRoutingModule
  ],
  declarations: [SectionQrPage]
})
export class SectionQrPageModule {}
