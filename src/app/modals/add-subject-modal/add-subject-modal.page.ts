import { AddLessonModalPage } from './../add-lesson-modal/add-lesson-modal.page';
import { Lesson } from './../../services/lessons.service';
import { DataService } from './../../services/data.service';
import { Subject, SubjectService } from './../../services/subject.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { ApplicationRef, Component, OnInit } from '@angular/core';
import {format} from 'date-fns'

@Component({
  selector: 'app-add-subject-modal',
  templateUrl: './add-subject-modal.page.html',
  styleUrls: ['./add-subject-modal.page.scss'],
})
export class AddSubjectModalPage implements OnInit {

  subjectNameError: boolean = false; 

  credentials: FormGroup;

  colors: any = [];

  selectedColor = {name: 'Blau', color: '#88B5BF'};

  color: string = '#88B5BF';

  tempLesson: Lesson;

  lessons:Lesson[] = [];

  textLessons: any[] = [];

  textLesson: any = {text: '', index: ''}

  subject: Subject = {subjectName: 'Mathematik', color: '#88B5Bf', grade: null}

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private subjectService: SubjectService,
    private alertController: AlertController,
    private dataService: DataService,
    private loadingController: LoadingController,
    private app: ApplicationRef
  ) { 
    this.dataService.getColorsAsObservable().subscribe((data) => {
      this.colors = data.sort((obj1, obj2) => {
        if(parseInt(obj1.color.substring(1), 16) > parseInt(obj2.color.substring(1), 16)) {
          return 1
        }

        if(parseInt(obj1.color.substring(1), 16) < parseInt(obj2.color.substring(1), 16)) {
          return -1
        }

        return 0

      })
    })
  }

  get subjectName() {
    return this.credentials.get('subjectName');
  }

  ngOnInit() {
    const regex = /[$-/:-?{-~!"^_@`\[\].,]/;
    this.credentials = this.formBuilder.group({
      subjectName: ['', [Validators.required]]
    });
    this.colors = this.dataService.getColors()
  }

  close() {
    this.modalController.dismiss()
  }

  async addSubject() {
    this.subject.subjectName = this.credentials.value.subjectName
    this.subject.color = this.selectedColor.color

    const filtredSubjectList: any[] = await this.subjectService.getSubjectsWithSubjectNameFilter(this.credentials.value.subjectName)
    if (filtredSubjectList.length > 0) {
      console.log("Name existiert bereits")
      this.subjectNameError = true;

      const alert = await this.alertController.create({
        header: 'Doppelter Name',
        message: 'Dieser Name wurde bereits verwendet',
        buttons: ['Abbrechen']
      })

      alert.present()

    }
    else if ((await this.subjectService.getSubjectsWithColorFilter(this.selectedColor)).length != 0) {
      const alert = await this.alertController.create({
        header: 'Farbe bereits verwendet',
        message: 'Dieser Farbe wurde bereits verwendet!',
        buttons: [
          {
            text: 'Abbrechen'
          },
          {
            text: 'Farbe behalten',
            handler: async () => {
              if (this.lessons.length == 0) {
      
                const alert = await this.alertController.create({
                  header: 'Keine Lektionen',
                  message: 'Teile diesem Fach bitte Lektionen zu!',
                  buttons: ['Abbrechen']
                })
          
                alert.present()
              } else {
                const loading = await this.loadingController.create()
                loading.present()
                this.subjectService.addSubject(this.subject, this.lessons)
                this.modalController.dismiss()
                loading.dismiss()
              }
            }
          }
        ]
      })

      alert.present()
    }
    else if (this.lessons.length == 0) {
      
      const alert = await this.alertController.create({
        header: 'Keine Lektionen',
        message: 'Teile diesem Fach bitte Lektionen zu!',
        buttons: ['Abbrechen']
      })

      alert.present()
    }
    else {
      const loading = await this.loadingController.create()
              loading.present()
              this.subjectService.addSubject(this.subject, this.lessons)
              this.modalController.dismiss()
              loading.dismiss()
    }
  }

  selectChanged(event) {
    console.log('Changed: ', event[0])
    this.selectedColor = event[0]
    return event[0]
  }

  async openAddLessonModal() {
    const addLessonModal = await this.modalController.create({
      component: AddLessonModalPage,
    })

    addLessonModal.onDidDismiss().then((data) => {
      if (data != null) {
        this.tempLesson = data.data
        this.lessons.push(this.tempLesson)
        if (Math.floor(this.tempLesson.startingTime/ 60) < 10 && this.tempLesson.startingTime % 60 >= 10 && Math.floor(this.tempLesson.endTime / 60) >= 10 && this.tempLesson.endTime % 60 >= 10) {
          this.textLesson = {text: this.tempLesson.day + ' 0' + Math.floor(this.tempLesson.startingTime/60) + ':' + this.tempLesson.startingTime%60 + ' - ' + Math.floor(this.tempLesson.endTime/60) + ':' + this.tempLesson.endTime%60, index: this.lessons.indexOf(this.tempLesson)}
        }
        else if (Math.floor(this.tempLesson.startingTime/ 60) < 10 && this.tempLesson.startingTime % 60 < 10 && Math.floor(this.tempLesson.endTime / 60) >= 10 && this.tempLesson.endTime % 60 >= 10){
          this.textLesson = {text: this.tempLesson.day + ' 0' + Math.floor(this.tempLesson.startingTime/60) + ':0' + this.tempLesson.startingTime%60 + ' - ' + Math.floor(this.tempLesson.endTime/60) + ':' + this.tempLesson.endTime%60, index: this.lessons.indexOf(this.tempLesson)}
        }
        else if (Math.floor(this.tempLesson.startingTime/ 60) < 10 && this.tempLesson.startingTime % 60 >= 10 && Math.floor(this.tempLesson.endTime / 60) < 10 && this.tempLesson.endTime % 60 >= 10){
          this.textLesson = {text: this.tempLesson.day + ' 0' + Math.floor(this.tempLesson.startingTime/60) + ':' + this.tempLesson.startingTime%60 + ' - 0' + Math.floor(this.tempLesson.endTime/60) + ':' + this.tempLesson.endTime%60, index: this.lessons.indexOf(this.tempLesson)}
        }
        else if (Math.floor(this.tempLesson.startingTime/ 60) < 10 && this.tempLesson.startingTime % 60 >= 10 && Math.floor(this.tempLesson.endTime / 60) >= 10 && this.tempLesson.endTime % 60 < 10){
          this.textLesson = {text: this.tempLesson.day + ' 0' + Math.floor(this.tempLesson.startingTime/60) + ':' + this.tempLesson.startingTime%60 + ' - ' + Math.floor(this.tempLesson.endTime/60) + ':0' + this.tempLesson.endTime%60, index: this.lessons.indexOf(this.tempLesson)}
        }
        else if (Math.floor(this.tempLesson.startingTime/ 60) < 10 && this.tempLesson.startingTime % 60 < 10 && Math.floor(this.tempLesson.endTime / 60) < 10 && this.tempLesson.endTime % 60 >= 10){
          this.textLesson = {text: this.tempLesson.day + ' 0' + Math.floor(this.tempLesson.startingTime/60) + ':0' + this.tempLesson.startingTime%60 + ' - 0' + Math.floor(this.tempLesson.endTime/60) + ':' + this.tempLesson.endTime%60, index: this.lessons.indexOf(this.tempLesson)}
        }
        else if (Math.floor(this.tempLesson.startingTime/ 60) < 10 && this.tempLesson.startingTime % 60 < 10 && Math.floor(this.tempLesson.endTime / 60) < 10 && this.tempLesson.endTime % 60 < 10){
          this.textLesson = {text: this.tempLesson.day + ' 0' + Math.floor(this.tempLesson.startingTime/60) + ':0' + this.tempLesson.startingTime%60 + ' - 0' + Math.floor(this.tempLesson.endTime/60) + ':0' + this.tempLesson.endTime%60, index: this.lessons.indexOf(this.tempLesson)}
        }
        else if (Math.floor(this.tempLesson.startingTime/ 60) >= 10 && this.tempLesson.startingTime % 60 < 10 && Math.floor(this.tempLesson.endTime / 60) >= 10 && this.tempLesson.endTime % 60 >= 10){
          this.textLesson = {text: this.tempLesson.day + ' ' + Math.floor(this.tempLesson.startingTime/60) + ':0' + this.tempLesson.startingTime%60 + ' - ' + Math.floor(this.tempLesson.endTime/60) + ':' + this.tempLesson.endTime%60, index: this.lessons.indexOf(this.tempLesson)}
        }
        else if (Math.floor(this.tempLesson.startingTime/ 60) >= 10 && this.tempLesson.startingTime % 60 < 10 && Math.floor(this.tempLesson.endTime / 60) < 10 && this.tempLesson.endTime % 60 >= 10){
          this.textLesson = {text: this.tempLesson.day + ' ' + Math.floor(this.tempLesson.startingTime/60) + ':0' + this.tempLesson.startingTime%60 + ' - 0' + Math.floor(this.tempLesson.endTime/60) + ':' + this.tempLesson.endTime%60, index: this.lessons.indexOf(this.tempLesson)}
        }
        else if (Math.floor(this.tempLesson.startingTime/ 60) >= 10 && this.tempLesson.startingTime % 60 < 10 && Math.floor(this.tempLesson.endTime / 60) >= 10 && this.tempLesson.endTime % 60 < 10){
          this.textLesson = {text: this.tempLesson.day + ' ' + Math.floor(this.tempLesson.startingTime/60) + ':0' + this.tempLesson.startingTime%60 + ' - ' + Math.floor(this.tempLesson.endTime/60) + ':0' + this.tempLesson.endTime%60, index: this.lessons.indexOf(this.tempLesson)}
        }
        else if (Math.floor(this.tempLesson.startingTime/ 60) >= 10 && this.tempLesson.startingTime % 60 < 10 && Math.floor(this.tempLesson.endTime / 60) >= 10 && this.tempLesson.endTime % 60 >= 10){
          this.textLesson = {text: this.tempLesson.day + ' ' + Math.floor(this.tempLesson.startingTime/60) + ':0' + this.tempLesson.startingTime%60 + ' - ' + Math.floor(this.tempLesson.endTime/60) + ':' + this.tempLesson.endTime%60, index: this.lessons.indexOf(this.tempLesson)}
        }
        else if (Math.floor(this.tempLesson.startingTime/ 60) >= 10 && this.tempLesson.startingTime % 60 < 10 && Math.floor(this.tempLesson.endTime / 60) < 10 && this.tempLesson.endTime % 60 < 10){
          this.textLesson = {text: this.tempLesson.day + ' ' + Math.floor(this.tempLesson.startingTime/60) + ':0' + this.tempLesson.startingTime%60 + ' - 0' + Math.floor(this.tempLesson.endTime/60) + ':0' + this.tempLesson.endTime%60, index: this.lessons.indexOf(this.tempLesson)}
        }
        else if (Math.floor(this.tempLesson.startingTime/ 60) >= 10 && this.tempLesson.startingTime % 60 >= 10 && Math.floor(this.tempLesson.endTime / 60) < 10 && this.tempLesson.endTime % 60 >= 10){
          this.textLesson = {text: this.tempLesson.day + ' ' + Math.floor(this.tempLesson.startingTime/60) + ':' + this.tempLesson.startingTime%60 + ' - 0' + Math.floor(this.tempLesson.endTime/60) + ':' + this.tempLesson.endTime%60, index: this.lessons.indexOf(this.tempLesson)}
        }
        else if (Math.floor(this.tempLesson.startingTime/ 60) >= 10 && this.tempLesson.startingTime % 60 >= 10 && Math.floor(this.tempLesson.endTime / 60) < 10 && this.tempLesson.endTime % 60 < 10){
          this.textLesson = {text: this.tempLesson.day + ' ' + Math.floor(this.tempLesson.startingTime/60) + ':' + this.tempLesson.startingTime%60 + ' - 0' + Math.floor(this.tempLesson.endTime/60) + ':0' + this.tempLesson.endTime%60, index: this.lessons.indexOf(this.tempLesson)}
        }
        else if (Math.floor(this.tempLesson.startingTime/ 60) >= 10 && this.tempLesson.startingTime % 60 >= 10 && Math.floor(this.tempLesson.endTime / 60) >= 10 && this.tempLesson.endTime % 60 < 10){
          this.textLesson = {text: this.tempLesson.day + ' ' + Math.floor(this.tempLesson.startingTime/60) + ':' + this.tempLesson.startingTime%60 + ' - 0' + Math.floor(this.tempLesson.endTime/60) + ':0' + this.tempLesson.endTime%60, index: this.lessons.indexOf(this.tempLesson)}
        }
        else {
          this.textLesson = {text: this.tempLesson.day + ' ' + Math.floor(this.tempLesson.startingTime/60) + ':' + this.tempLesson.startingTime%60 + ' - ' + Math.floor(this.tempLesson.endTime/60) + ':' + this.tempLesson.endTime%60, index: this.lessons.indexOf(this.tempLesson)}
        }
        this.textLessons.push(this.textLesson)
        console.log(this.textLessons)
      }
    })

    addLessonModal.present()
  }

  deleteLesson(indexLesson, indexTextLesson) {
    this.lessons.splice(indexLesson)
    this.textLessons.splice(indexTextLesson)
  }
}
