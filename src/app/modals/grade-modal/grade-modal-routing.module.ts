import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GradeModalPage } from './grade-modal.page';

const routes: Routes = [
  {
    path: '',
    component: GradeModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GradeModalPageRoutingModule {}
