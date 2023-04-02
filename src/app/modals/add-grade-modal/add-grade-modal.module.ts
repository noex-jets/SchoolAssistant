import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddGradeModalPageRoutingModule } from './add-grade-modal-routing.module';

import { AddGradeModalPage } from './add-grade-modal.page';
import { SearchableSelectComponent } from 'src/app/components/searchable-select/searchable-select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddGradeModalPageRoutingModule,
    ReactiveFormsModule,
    SearchableSelectComponent
  ],
  declarations: [AddGradeModalPage]
})
export class AddGradeModalPageModule {}
