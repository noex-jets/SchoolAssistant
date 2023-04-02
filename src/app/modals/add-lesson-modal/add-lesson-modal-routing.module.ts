import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddLessonModalPage } from './add-lesson-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddLessonModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddLessonModalPageRoutingModule {}
