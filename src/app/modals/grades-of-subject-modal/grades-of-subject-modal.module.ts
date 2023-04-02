import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GradesOfSubjectModalPageRoutingModule } from './grades-of-subject-modal-routing.module';

import { GradesOfSubjectModalPage } from './grades-of-subject-modal.page';
import { PipesModule } from '../pipes-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GradesOfSubjectModalPageRoutingModule,
    PipesModule
  ],
  declarations: [GradesOfSubjectModalPage]
})
export class GradesOfSubjectModalPageModule {}
