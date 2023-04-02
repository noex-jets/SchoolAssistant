import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSubjectModalPage } from './add-subject-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddSubjectModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSubjectModalPageRoutingModule {}
