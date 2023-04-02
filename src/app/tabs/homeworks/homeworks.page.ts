import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddHomeworkModalPage } from 'src/app/modals/add-homework-modal/add-homework-modal.page';
import { HomeworkModalPage } from 'src/app/modals/homework-modal/homework-modal.page';
import { HomeworksService } from 'src/app/services/homeworks.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-homeworks',
  templateUrl: './homeworks.page.html',
  styleUrls: ['./homeworks.page.scss'],
})
export class HomeworksPage implements OnInit {

  homeworks: any[] = []
  subjects: any[] = []

  doneHomeworks: any[] = []
  doneSubjects: any[] = []

  status = 'toDo'

  constructor(
    private modalController: ModalController,
    private homeworksService: HomeworksService,
    private subjectService: SubjectService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.homeworks = []
    this.subjects = []

    this.doneHomeworks = []
    this.doneSubjects = []

    this.homeworksService.getHomeworksAsObservable().subscribe(async (res) => {
      this.homeworks = res
      this.subjects = []
      for (let homework of this.homeworks) {
        this.subjects.push( await this.subjectService.getSubject(homework.subjectId))
      }
    })

    this.homeworksService.getDoneHomeworksAsObservable().subscribe(async (res) => {
      this.doneHomeworks = res
      this.doneSubjects = []
      for (let homework of this.doneHomeworks) {
        this.doneSubjects.push( await this.subjectService.getSubject(homework.subjectId))
      }
    })
  }

  async openAddHomeworkModal() {
    const modal = await this.modalController.create({
      component: AddHomeworkModalPage
    })
    modal.present()
  }

  dateConverter(date) {
    let newDate = new Date(date.toDate())
    return newDate.toLocaleDateString('ch-de', {dateStyle: 'full'})
  }

  async openHomeworkModal(homeworkId) {
    const modal = await this.modalController.create({
      component: HomeworkModalPage,
      componentProps: {
        homeworkId: homeworkId
      }
    })

    modal.onDidDismiss().then(() => {
      this.homeworks = []
      this.subjects = []

      this.homeworksService.getHomeworksAsObservable().subscribe(async (res) => {
        this.homeworks = res
        this.subjects = []
        for (let homework of this.homeworks) {
          this.subjects.push( await this.subjectService.getSubject(homework.subjectId))
        }
      })
  
      this.homeworksService.getDoneHomeworksAsObservable().subscribe(async (res) => {
        this.doneHomeworks = res
        this.doneSubjects = []
        for (let homework of this.doneHomeworks) {
          this.doneSubjects.push( await this.subjectService.getSubject(homework.subjectId))
        }
      })
    })

    modal.present()
  }

  markHomework(homework) {
    if (homework.marked == false){
      homework.marked = true
      const id = homework.id
      delete homework.id
      this.homeworksService.updateHomework(id, homework)
    }
    else {
      homework.marked = false
    const id = homework.id
    delete homework.id
    this.homeworksService.updateHomework(id, homework)
    }
    
  }

  homeworkIsDone(homework) {
    homework.done = true
    const id = homework.id
    delete homework.id
    this.homeworksService.updateHomework(id, homework)
  }

  homeworkIsNotDone(homework) {
    homework.done = false
    const id = homework.id
    delete homework.id
    this.homeworksService.updateHomework(id, homework)
  }

  deleteHomework(homework){
    this.homeworksService.deleteHomework(homework)
  }

  sync() {
    this.homeworksService.getHomeworksAsObservable().subscribe(async (res) => {
      this.homeworks = res
      this.subjects = []
      for (let homework of this.homeworks) {
        this.subjects.push( await this.subjectService.getSubject(homework.subjectId))
      }
    })

    this.homeworksService.getDoneHomeworksAsObservable().subscribe(async (res) => {
      this.doneHomeworks = res
      this.doneSubjects = []
      for (let homework of this.doneHomeworks) {
        this.doneSubjects.push( await this.subjectService.getSubject(homework.subjectId))
      }
    })
  }

}
