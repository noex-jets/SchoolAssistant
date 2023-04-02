import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Grade, GradesService } from 'src/app/services/grades.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-add-grade-modal',
  templateUrl: './add-grade-modal.page.html',
  styleUrls: ['./add-grade-modal.page.scss'],
})
export class AddGradeModalPage implements OnInit {
  credentials: FormGroup;

  subjects = []

  grade: Grade = {title: '', date: new Date(), subjectId: null, grade: 0, koeffizient: 1, counting: true}

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder, 
    private subjectService: SubjectService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private gradeService: GradesService
  ) { 
    this.subjectService.getSubjectsAsObservable().subscribe((res) => {
      this.subjects = res
      console.log(this.subjects)
    })
  }

  get gradeTitle() {
    return this.credentials.get('gradeTitle')
  }

  get gradeNumber() {
    return this.credentials.get('grade')
  }

  get koeffizient() {
    return this.credentials.get('koeffizient')
  }

  ngOnInit() {
    this.credentials = this.formBuilder.group({
      gradeTitle: ['', [Validators.required]],
      gradeNumber: ['',[Validators.required]],
      koeffizient: ['', [Validators.required]]
    })
  }

  async addGrade() {
    const load = await this.loadingController.create({})
    load.present()

    this.grade.title = this.credentials.value.gradeTitle
    this.grade.grade = this.credentials.value.gradeNumber
    this.grade.koeffizient = this.credentials.value.koeffizient

    if (this.grade.subjectId == null) {
      const alert = this.alertController.create({
        header: 'Kein Fach ausgewählt!',
        message: 'Du hast kein Fach ausgewählt.',
        buttons: [
          {
            text: 'Okay'
          }
        ]
      })
    }
    else {
      this.gradeService.addGrade(this.grade)
      this.modalController.dismiss()
      this.gradeService.getGradesOfSubjectAsObservable(this.grade.subjectId).subscribe(res => {
        let summOfGrades = 0
        let count = 0
        for (let grade of res){
          if(grade.counting = true){
            console.log(res)
            summOfGrades += grade.grade*grade.koeffizient
            count += grade.koeffizient
          }
        }
        console.log(summOfGrades/count)
        this.subjectService.updateGradeOfSubject(this.grade.subjectId, summOfGrades/count)
      })
    }

    load.dismiss()

  }

  dateChanged(e) {
    this.grade.date = new Date(e.detail.value)
    console.log(new Date(e.detail.value))
  }

  selectSubjectChanged(e) {
    console.log(e[0].id)
    this.grade.subjectId = e[0].id
  }

  toggleChanged(e) {
    console.log(e.detail.checked)
    this.grade.counting= e.detail.checked
  }

  close() {
    this.modalController.dismiss()
  }

}
