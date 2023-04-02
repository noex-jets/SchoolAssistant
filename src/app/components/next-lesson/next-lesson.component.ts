import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SubjectModalPage } from 'src/app/modals/subject-modal/subject-modal.page';
import { LessonsService } from 'src/app/services/lessons.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-next-lesson',
  templateUrl: './next-lesson.component.html',
  styleUrls: ['./next-lesson.component.scss'],
})
export class NextLessonComponent implements OnInit {

  @Input() lesson;
  @Input() subject;

  constructor(
    private lessonsService: LessonsService,
    private subjectService: SubjectService,
    private modalController: ModalController,
  ) { 

  }


  ngOnInit() {

  }

  async openSubjectModal(subjectId) {
    const modal  = await this.modalController.create({
      component: SubjectModalPage,
      componentProps: {
        subjectId: subjectId
      }
    })

    modal.present()
  }

}
