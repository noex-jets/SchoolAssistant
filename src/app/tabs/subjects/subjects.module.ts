import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubjectsPageRoutingModule } from './subjects-routing.module';

import { SubjectsPage } from './subjects.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubjectsPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [SubjectsPage]
})
export class SubjectsPageModule {}
