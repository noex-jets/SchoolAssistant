import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvatarPopOverModalPage } from './avatar-pop-over-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AvatarPopOverModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvatarPopOverModalPageRoutingModule {}
