import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvatarPopOverModalPageRoutingModule } from './avatar-pop-over-modal-routing.module';

import { AvatarPopOverModalPage } from './avatar-pop-over-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvatarPopOverModalPageRoutingModule
  ],
  declarations: [AvatarPopOverModalPage]
})
export class AvatarPopOverModalPageModule {}
