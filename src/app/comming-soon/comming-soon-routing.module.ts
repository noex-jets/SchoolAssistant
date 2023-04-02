import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommingSoonPage } from './comming-soon.page';

const routes: Routes = [
  {
    path: '',
    component: CommingSoonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommingSoonPageRoutingModule {}
