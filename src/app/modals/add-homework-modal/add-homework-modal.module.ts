import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddHomeworkModalPageRoutingModule } from './add-homework-modal-routing.module';

import { AddHomeworkModalPage } from './add-homework-modal.page';
import { SearchableSelectComponent } from "../../components/searchable-select/searchable-select.component";

@NgModule({
    declarations: [AddHomeworkModalPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AddHomeworkModalPageRoutingModule,
        SearchableSelectComponent,
        ReactiveFormsModule
    ]
})
export class AddHomeworkModalPageModule {}
