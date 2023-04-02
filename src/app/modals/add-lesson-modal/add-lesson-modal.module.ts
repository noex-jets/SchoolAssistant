import { SearchableSelectComponent } from './../../components/searchable-select/searchable-select.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddLessonModalPageRoutingModule } from './add-lesson-modal-routing.module';

import { AddLessonModalPage } from './add-lesson-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddLessonModalPageRoutingModule,
    ReactiveFormsModule,
    SearchableSelectComponent
  ],
  declarations: [AddLessonModalPage]
})
export class AddLessonModalPageModule {}
