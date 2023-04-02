import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeworkModalPage } from './homework-modal.page';

const routes: Routes = [
  {
    path: '',
    component: HomeworkModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeworkModalPageRoutingModule {}
