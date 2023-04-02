import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FullscreenProfileImageModalPageRoutingModule } from './fullscreen-profile-image-modal-routing.module';

import { FullscreenProfileImageModalPage } from './fullscreen-profile-image-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FullscreenProfileImageModalPageRoutingModule
  ],
  declarations: [FullscreenProfileImageModalPage]
})
export class FullscreenProfileImageModalPageModule {}
