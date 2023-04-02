import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GradeCalculatorModalPageRoutingModule } from './grade-calculator-modal-routing.module';

import { GradeCalculatorModalPage } from './grade-calculator-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GradeCalculatorModalPageRoutingModule
  ],
  declarations: [GradeCalculatorModalPage]
})
export class GradeCalculatorModalPageModule {}
