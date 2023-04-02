import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GradesOfSubjectModalPage } from './grades-of-subject-modal.page';

const routes: Routes = [
  {
    path: '',
    component: GradesOfSubjectModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GradesOfSubjectModalPageRoutingModule {}
