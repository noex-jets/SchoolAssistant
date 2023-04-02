import { LessonsService } from './../../services/lessons.service';
import { DataService } from './../../services/data.service';
import { NavParams, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { Subject, SubjectService } from './../../services/subject.service';
import { Component, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { AddLessonModalPage } from '../add-lesson-modal/add-lesson-modal.page';
import { Lesson } from 'src/app/services/lessons.service';

@Component({
  selector: 'app-subject-modal',
  templateUrl: './subject-modal.page.html',
  styleUrls: ['./subject-modal.page.scss'],
})
export class SubjectModalPage implements OnInit {
  subjectId;
  subject: Subject = {subjectName: 'Mathematik', color: '#88B5BF', grade: null}

  colors: any;
  colorName: string;
  tempLesson;

  lessons= [];

  textLessons: any[] = [];

  textLesson: any = {text: '', index: '', id: ''}

  constructor(
    private subjectsService: SubjectService,
    private navParams: NavParams,
    private modalController: ModalController,
    private dataService: DataService,
    private lessonsService: LessonsService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    
  ) {
    this.subjectId = this.navParams.get('subjectId')
    console.log(this.subjectId)
    this.subjectsService.getSubject(this.subjectId).then((data) => {
      this.subject = {subjectName: data.subjectName, color: data.color, grade: data.grade}
      
    })

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
      this.colorName = this.getColorName(this.subject.color)
    })
    this.lessonsService.getLessonsOfSubjectAsObservable(this.subjectId).subscribe((data) => {
      this.lessons = data
    })
    
    
  }

  ngOnInit() {

  }

  close() {
    this.modalController.dismiss()
  }

  selectChanged(event) {
    console.log('Changed: ', event[0])
    this.subject.color = event[0].color
    console.log(this.subject.color)
    return event[0]
  }

  getColorName(searchedColor) {
    for (let color of this.colors) {
      if (color.color == searchedColor){
        return color.name
        break
      }
    }
  }

  async openAddLessonModal() {
    const addLessonModal = await this.modalController.create({
      component: AddLessonModalPage,
    })

    addLessonModal.onDidDismiss().then((data) => {
      if (data != null) {
        this.tempLesson = data.data
        this.tempLesson.subjectId = this.subjectId
        this.lessonsService.createLesson(this.tempLesson)
      }
    })

    addLessonModal.present()
  }

  deleteLesson(indexLesson, indexTextLesson, id) {
    console.log( this.lessons)
    this.lessons.splice(indexLesson,1)
    this.textLessons.splice(indexTextLesson,1)
    this.lessonsService.deleteLesson(id)
    console.log(id)

    
    console.log(this.lessons)
    
    
  }

  async updateSubject() {
    const toast = await this.toastController.create({
      message: 'Fach Aktualisiert',
      duration: 3000
    })
    toast.present()
    this.subjectsService.updateSubject(this.subject, this.subjectId)
  }

  deleteSubject() {
    
    this.subjectsService.deleteSubject(this.subjectId)
    this.modalController.dismiss()
  }

}
