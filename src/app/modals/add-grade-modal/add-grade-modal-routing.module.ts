import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddGradeModalPage } from './add-grade-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddGradeModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddGradeModalPageRoutingModule {}
