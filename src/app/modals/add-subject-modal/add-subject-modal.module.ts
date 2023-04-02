import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddSubjectModalPageRoutingModule } from './add-subject-modal-routing.module';

import { AddSubjectModalPage } from './add-subject-modal.page';
import { SearchableSelectComponent } from "../../components/searchable-select/searchable-select.component";

@NgModule({
    declarations: [AddSubjectModalPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AddSubjectModalPageRoutingModule,
        ReactiveFormsModule,
        SearchableSelectComponent
    ]
})
export class AddSubjectModalPageModule {}
