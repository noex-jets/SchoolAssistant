import { SearchableSelectComponent } from './../../components/searchable-select/searchable-select.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubjectModalPageRoutingModule } from './subject-modal-routing.module';

import { SubjectModalPage } from './subject-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubjectModalPageRoutingModule,
    SearchableSelectComponent
  ],
  declarations: [SubjectModalPage]
})
export class SubjectModalPageModule {}
