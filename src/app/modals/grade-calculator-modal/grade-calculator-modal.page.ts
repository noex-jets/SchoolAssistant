import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GradesService } from 'src/app/services/grades.service';

@Component({
  selector: 'app-grade-calculator-modal',
  templateUrl: './grade-calculator-modal.page.html',
  styleUrls: ['./grade-calculator-modal.page.scss'],
})
export class GradeCalculatorModalPage implements OnInit {
  subject;
  grade = 6
  koeffizient = 1
  summ = 0
  count = 0

  constructor(
    private modalController: ModalController,
    private gradeService: GradesService
  ) { 
    console.log(this.subject)
    
  }

  ngOnInit() {
    console.log(this.subject)
    this.gradeService.getGradesOfSubjectAsObservable(this.subject.id).subscribe(res => {
      this.summ = 0
      this.count = 0
      for (let grade of res) {
        this.count += grade.koeffizient;
        this.summ += grade.grade*grade.koeffizient
      }
    })
  }

  close() {
    this.modalController.dismiss()
  }

}
