import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Homework, HomeworksService } from 'src/app/services/homeworks.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-add-homework-modal',
  templateUrl: './add-homework-modal.page.html',
  styleUrls: ['./add-homework-modal.page.scss'],
})
export class AddHomeworkModalPage implements OnInit {
  credentials: FormGroup;

  today = new Date().toISOString()

  subjects;

  selectedSubject;

  subjectSelectError = false

  homework: Homework = {title: '', notes: '', date: new Date(), subjectId: null, marked: false, done: false}

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private subjectService: SubjectService,
    private alertController: AlertController,
    private homeworksService: HomeworksService,
    private loadingController: LoadingController
  ) { 
    this.subjectService.getSubjectsAsObservable().subscribe((res) => {
      this.subjects = res
      console.log(this.subjects)
    })
  }

  get homeworkTitle() {
    return this.credentials.get('homeworkTitle')
  }

  get homeworkNotes() {
    return this.credentials.get('homeworkNotes')
  }

  ngOnInit() {
    this.credentials = this.formBuilder.group({
      homeworkTitle: ['', [Validators.required]],
      homeworkNotes: ['']
    })
  }

  async addHomework(){
    const load = await this.loadingController.create({})
    load.present()

    this.homework.title = this.credentials.value.homeworkTitle
    this.homework.notes = this.credentials.value.homeworkNotes

    if (this.homework.subjectId == null) {
      console.log('error')
      const alert = await this.alertController.create({
        header: 'Kein Fach ausgewählt',
        message: 'Du hast kein Fach ausgewählt. Möchtest du das noch tun?',
        buttons: [
          {
            text: 'Ja',
          },
          {
            text: 'Nein',
            handler: (val) => {
              this.homeworksService.addHomework(this.homework)
              this.modalController.dismiss()
            }
          }
        ]
      })
      alert.present()
    }
    else {
      this.homeworksService.addHomework(this.homework)
      this.modalController.dismiss()
    }

    load.dismiss()
  }

  dateChanged(e){
    console.log(e.detail.value)
    this.homework.date = new Date(e.detail.value)
  }

  selectSubjectChanged(e) {
    this.selectedSubject = e[0].id
    this.homework.subjectId = e[0].id
  }

  close() {
    this.modalController.dismiss()
  }

}
