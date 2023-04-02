import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { Homework, HomeworksService } from 'src/app/services/homeworks.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-homework-modal',
  templateUrl: './homework-modal.page.html',
  styleUrls: ['./homework-modal.page.scss'],
})
export class HomeworkModalPage implements OnInit {
  homeworkId;
  homework;
  subject;
  subjects;

  today = new Date().toISOString()

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private homeworksService: HomeworksService,
    private subjectsService: SubjectService,
    private loadController: LoadingController,
    private toastController: ToastController
  ) { 
    this.homeworkId = this.navParams.get('homeworkId')
    this.homeworksService.getHomeworkAsObservable(this.homeworkId).subscribe(async res => {
      this.homework = res
      this.subject = await this.subjectsService.getSubject(this.homework.subjectId)
      console.log(this.subject)
    })
    this.subjectsService.getSubjectsAsObservable().subscribe((res) => {
      this.subjects = res
      console.log(this.subjects)
    })

  }

  ngOnInit() {
  }

  close() {
    this.modalController.dismiss()
  }

  async updateHomework() {
    const load = await this.loadController.create({})
    const toast = await this.toastController.create({
      message: 'Hausaufgabe wurde aktualisiert!',
      duration: 3000
    })
    load.present()
    toast.present()
    delete this.homework.id
    this.homeworksService.updateHomework(this.homeworkId, this.homework)
    load.dismiss()
  }

  selectSubjectChanged(e){
    console.log(e[0].id)
    this.homework.subjectId = e[0].id
    this.updateHomework()
  }

  dateChanged(e){
    console.log(e.detail.value)
    this.homework.date = new Date(e.detail.value)
    this.updateHomework()
  }

}
