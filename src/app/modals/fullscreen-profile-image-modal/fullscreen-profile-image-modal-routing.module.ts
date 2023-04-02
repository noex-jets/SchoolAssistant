import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullscreenProfileImageModalPage } from './fullscreen-profile-image-modal.page';

const routes: Routes = [
  {
    path: '',
    component: FullscreenProfileImageModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullscreenProfileImageModalPageRoutingModule {}
