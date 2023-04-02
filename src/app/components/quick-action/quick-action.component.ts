import { AuthService } from './../../services/auth.service';
import { LessonsService } from './../../services/lessons.service';
import { DataService } from './../../services/data.service';
import { AddSubjectModalPage } from './../../modals/add-subject-modal/add-subject-modal.page';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { range } from 'src/app/services/lessons.service';
import { AddHomeworkModalPage } from 'src/app/modals/add-homework-modal/add-homework-modal.page';
import { AddGradeModalPage } from 'src/app/modals/add-grade-modal/add-grade-modal.page';

@Component({
  selector: 'app-quick-action',
  templateUrl: './quick-action.component.html',
  styleUrls: ['./quick-action.component.scss'],
})
export class QuickActionComponent implements OnInit {

  constructor(
    private modalController: ModalController,
    private dataService: DataService,
    private lessonsService: LessonsService,
    private authService: AuthService,
  ) { }

  ngOnInit() {}

  async openAddSubjectModal() {
    const modal = await this.modalController.create({
      component: AddSubjectModalPage
    })

    modal.present()

  }

  async openAddHomeworkModal() {
    const modal = await this.modalController.create({
      component: AddHomeworkModalPage
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
