import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GradesPageRoutingModule } from './grades-routing.module';

import { GradesPage } from './grades.page';
import { GradeFormatterPipe } from 'src/app/pipes/grade-formatter.pipe';
import { AppModule } from 'src/app/app.module';
import { PipesModule } from 'src/app/modals/pipes-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GradesPageRoutingModule,
    ComponentsModule,
    PipesModule,
    ReactiveFormsModule
  ],
  declarations: [GradesPage]
})
export class GradesPageModule {}
