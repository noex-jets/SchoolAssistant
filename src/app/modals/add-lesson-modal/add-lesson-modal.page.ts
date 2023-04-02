import { LessonsService } from './../../services/lessons.service';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Lesson } from 'src/app/services/lessons.service';
import { format } from 'path';

@Component({
  selector: 'app-add-lesson-modal',
  templateUrl: './add-lesson-modal.page.html',
  styleUrls: ['./add-lesson-modal.page.scss'],
})
export class AddLessonModalPage implements OnInit {

  credentials: FormGroup;

  days: any[] = [{name: 'Montag'}, {name: 'Dienstag'}, {name: 'Mittwoch'}, {name: 'Donnerstag'}, {name: 'Freitag'}]

  lesson= {day: null, startingTime: ((new Date().getHours())* 60) + new Date().getMinutes(), duration: 0, endTime: 0, subjectId: null }

  daySelectetError: boolean = false;

  @Output() addLessonEmitter: EventEmitter<any> = new EventEmitter();


  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private lessonsService: LessonsService


  ) { }

  get duration() {
    return this.credentials.get('duration')
  }

  ngOnInit() {
    this.credentials = this.formBuilder.group({
      duration: [45, [Validators.required]],
    });
  }

  selectChanged(e) {
    if (e[0].name != null) {
      this.lesson.day = e[0].name;
      this.daySelectetError = false
    }
  }

  timeChanged(e) {
    this.lesson.startingTime = (new Date(e.detail.value).getHours()* 60) + (new Date(e.detail.value).getMinutes())
    // console.log((new Date(e.detail.value).getHours()* 60) + (new Date(e.detail.value).getMinutes()) )
  }

  async addLesson() {
    const load = await this.loadingController.create({
      
    })

    load.present()

    this.lesson.duration = this.credentials.value.duration;
    this.lesson.endTime = this.lesson.startingTime + this.lesson.duration

    if(this.lesson.day === null) {
      const alert = await this.alertController.create({
        header: 'Kein Tag ausgewählt!',
        message: 'Du hasst keinen Tag ausgewählt. Bitte wähle einen Tag aus.',
        buttons: [{
          text: 'Abbrechen'
        }]
      })

      alert.present()

      this.daySelectetError = true;
    }
    else {
      this.modalController.dismiss(this.lesson)
    }
    
    load.dismiss()
  }

  dismiss() {
    this.modalController.dismiss()
  }

}
