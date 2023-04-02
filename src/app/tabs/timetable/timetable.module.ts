import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimetablePageRoutingModule } from './timetable-routing.module';

import { TimetablePage } from './timetable.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimetablePageRoutingModule,
    ComponentsModule, 
    SwiperModule
  ],
  declarations: [TimetablePage]
})
export class TimetablePageModule {}
