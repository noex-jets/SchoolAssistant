import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GradesService } from 'src/app/services/grades.service';
import { SubjectService } from 'src/app/services/subject.service';
import { AddGradeModalPage } from '../add-grade-modal/add-grade-modal.page';
import { GradeCalculatorModalPage } from '../grade-calculator-modal/grade-calculator-modal.page';
import { GradeModalPage } from '../grade-modal/grade-modal.page';

@Component({
  selector: 'app-grades-of-subject-modal',
  templateUrl: './grades-of-subject-modal.page.html',
  styleUrls: ['./grades-of-subject-modal.page.scss'],
})
export class GradesOfSubjectModalPage implements OnInit {
  subject;
  grades = [];

  constructor(
    private modalController: ModalController,
    private subjectService: SubjectService,
    private gradeService: GradesService,
  ) { 
   
  }

  ngOnInit() {
    console.log(this.subject)
    this.gradeService.getGradesOfSubjectAsObservable(this.subject.id).subscribe(res => {
      this.grades = res
      console.log(this.grades)
      let summOfGrades = 0
      let count = 0
      for (let grade of res){
        if(grade.counting = true){
          summOfGrades += grade.grade*grade.koeffizient
          count += grade.koeffizient
        }
      }
      this.subject.grade = summOfGrades/count
      this.subjectService.updateGradeOfSubject(this.subject.id, summOfGrades/count)
    })
    
  }

  close() {
    this.modalController.dismiss()
    console.log(this.subject)
  }

  async openAddGradeModal() {
    const modal = await this.modalController.create({
      component: AddGradeModalPage
    })
    modal.present()
  }

  async openGradeModal(grade, subject) {
    console.log(grade)

    const modal = await this.modalController.create({
      component: GradeModalPage,
      componentProps: {
        grade: grade,
        subject: subject
      }
    })

    modal.onDidDismiss().then(async () => {
      console.log(await this.subjectService.getSubject(subject.id))
    })
    modal.present()
  }

  async openGradeCalculator(subject) {
    console.log(subject)
    const modal = await this.modalController.create( {
      component: GradeCalculatorModalPage,
      componentProps: {
        subject: subject
      }
    })
    modal.present()
  }
}
