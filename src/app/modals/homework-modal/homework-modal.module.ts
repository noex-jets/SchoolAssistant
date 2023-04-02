import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeworkModalPageRoutingModule } from './homework-modal-routing.module';

import { HomeworkModalPage } from './homework-modal.page';
import { SearchableSelectComponent } from 'src/app/components/searchable-select/searchable-select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeworkModalPageRoutingModule,
    SearchableSelectComponent
  ],
  declarations: [HomeworkModalPage]
})
export class HomeworkModalPageModule {}
