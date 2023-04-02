import { QuickActionComponent } from './quick-action/quick-action.component';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NextLessonComponent } from './next-lesson/next-lesson.component';



@NgModule({
  declarations: [
    HeaderComponent,
    QuickActionComponent,
    NextLessonComponent
  ],
  exports: [
    HeaderComponent,
    QuickActionComponent,
    NextLessonComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
