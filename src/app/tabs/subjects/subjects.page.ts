import { SubjectModalPage } from './../../modals/subject-modal/subject-modal.page';
import { Subject, SubjectService } from './../../services/subject.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AddSubjectModalPage } from 'src/app/modals/add-subject-modal/add-subject-modal.page';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.page.html',
  styleUrls: ['./subjects.page.scss'],
})
export class SubjectsPage implements OnInit {

  subjects: any = []

  constructor(
    private modalController: ModalController,
    private subjectService: SubjectService,

  ) { 
  }

  async ngOnInit() {
    (await this.subjectService.getSubjectsAsObservable()).subscribe( (res) => {
      this.subjects = res
    })
  }

  async openAddSubjectModal() {
    const modal = await this.modalController.create({
      component: AddSubjectModalPage
    })

    modal.present()

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

  onClick() {
    console.log('Hallo Welt')
  }

}
