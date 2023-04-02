import { NgModule } from '@angular/core';
import { DateFormatterPipe } from '../pipes/date-formatter.pipe';
import { GradeFormatterPipe } from '../pipes/grade-formatter.pipe';
import { PluspointsFormatterPipe } from '../pipes/pluspoints-formatter.pipe';

@NgModule({
declarations: [GradeFormatterPipe, DateFormatterPipe, PluspointsFormatterPipe],
imports: [],
exports: [GradeFormatterPipe, DateFormatterPipe, PluspointsFormatterPipe],
})

export class PipesModule {}