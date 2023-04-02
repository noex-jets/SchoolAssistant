import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddGradeModalPage } from 'src/app/modals/add-grade-modal/add-grade-modal.page';
import { GradesOfSubjectModalPage } from 'src/app/modals/grades-of-subject-modal/grades-of-subject-modal.page';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.page.html',
  styleUrls: ['./grades.page.scss'],
})
export class GradesPage implements OnInit {
  subjects: any [] = []

  grade: number = 6

  pluspoints = 0

  constructor(
    private subjectService: SubjectService,
    private modalController: ModalController,
  ) { 
    this.subjectService.getSubjectsAsObservable().subscribe(res => {
      this.subjects = res
      this.pluspoints = 0
      let counter= 0
      let summ=0
      for (let subject of this.subjects) {
        counter += 1
        summ += Number(subject.grade)
        console.log(subject)
        let result = subject.grade -4
        if(result%0.5 > 0.25) {
          this.pluspoints += result +(0.5-result%0.5)
        }
        else {
          this.pluspoints += result -(result%0.5)
        }
      }
      this.grade = summ/counter
    })
  }

  ngOnInit() {
  }

  async openGradesOfSubjectModal(subject) {
    const modal = await this.modalController.create({
      component: GradesOfSubjectModalPage,
      componentProps: {
        subject: subject
      }
    })

    modal.present()
  }

  async openAddGradeModal() {
    const modal = await this.modalController.create({
      component: AddGradeModalPage
    })
    modal.present()
  }

}
