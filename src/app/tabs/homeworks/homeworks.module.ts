import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeworksPageRoutingModule } from './homeworks-routing.module';

import { HomeworksPage } from './homeworks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeworksPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [HomeworksPage]
})
export class HomeworksPageModule {}
