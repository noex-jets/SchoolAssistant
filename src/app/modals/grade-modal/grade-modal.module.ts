import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GradeModalPageRoutingModule } from './grade-modal-routing.module';

import { GradeModalPage } from './grade-modal.page';
import { SearchableSelectComponent } from "../../components/searchable-select/searchable-select.component";

@NgModule({
    declarations: [GradeModalPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        GradeModalPageRoutingModule,
        SearchableSelectComponent
    ]
})
export class GradeModalPageModule {}
