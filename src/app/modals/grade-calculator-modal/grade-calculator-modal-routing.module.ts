import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GradeCalculatorModalPage } from './grade-calculator-modal.page';

const routes: Routes = [
  {
    path: '',
    component: GradeCalculatorModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GradeCalculatorModalPageRoutingModule {}
