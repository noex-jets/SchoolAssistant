import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommingSoonPageRoutingModule } from './comming-soon-routing.module';

import { CommingSoonPage } from './comming-soon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommingSoonPageRoutingModule
  ],
  declarations: [CommingSoonPage]
})
export class CommingSoonPageModule {}
