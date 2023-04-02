import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { GradesService } from 'src/app/services/grades.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-grade-modal',
  templateUrl: './grade-modal.page.html',
  styleUrls: ['./grade-modal.page.scss'],
})
export class GradeModalPage implements OnInit {
  grade;
  subject;
  subjects = []

  constructor(
    private modalController: ModalController,
    private gradeService: GradesService,
    private subjectService: SubjectService,
    private toastController: ToastController
  ) { 
    this.subjectService.getSubjectsAsObservable().subscribe(res => {
      this.subjects = res
    })
  }

  ngOnInit() {
    
  }

  close() {
    this.modalController.dismiss()
    console.log(this.grade)
  }

  async updateGrade() {
    const toast = await this.toastController.create({
      message: 'Note wurde Aktualisiert',
      duration: 3000
    })
    toast.present()
    console.log(this.grade)
    this.gradeService.updateGrade(this.grade)
  }

  selectSubjectChanged(e) {
    this.grade.subjectId = e[0].id
    this.updateGrade()
  }

  dateChanged(e) {
    this.grade.date = new Date(e.detail.value)
    this.updateGrade()
  }

  toggleChanged(e) {
    console.log(e.detail.checked)
    this.grade.counting= e.detail.checked
    this.updateGrade()
  }

  deleteGrade() {
    this.gradeService.deletGrade(this.grade)
    this.modalController.dismiss()
  }

}
