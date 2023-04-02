import { AfterContentChecked, Component, OnInit, ViewChild} from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { SubjectModalPage } from 'src/app/modals/subject-modal/subject-modal.page';
import { Lesson, LessonsService } from 'src/app/services/lessons.service';
import { SubjectService } from 'src/app/services/subject.service';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
// import SwiperCore, {Pagination} from 'swiper'

// SwiperCore.use([Pagination])

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.page.html',
  styleUrls: ['./timetable.page.scss'],
})
export class TimetablePage implements AfterContentChecked {
  @ViewChild('swiper') swiper:SwiperComponent;

  today = new Date()
  checked: boolean = false
  dayIndex: number = 0;
  weekDays;
  config: SwiperOptions = {
    slidesPerView: 1,
    pagination: {
      clickable: true,
    },
  }

  lessonsOnMonday = []
  subjectsOnMonday = []

  lessonsOnTuesday = []
  subjectsOnTuesday = []

  lessonsOnWednesday = []
  subjectsOnWednesday = []

  lessonsOnThursday = []
  subjectsOnThursday = []

  lessonsOnFriday = []
  subjectsOnFriday = []

  constructor(
    private actionSheetController: ActionSheetController,
    private lessonsService: LessonsService,
    public subjectService: SubjectService,
    private modalController: ModalController
  ) {
    
   }

   ionViewWillEnter() {
    
    this.lessonsOnMonday = []
    this.subjectsOnMonday = []

    this.lessonsOnTuesday = []
    this.subjectsOnTuesday = []

    this.lessonsOnWednesday = []
    this.subjectsOnWednesday = []

    this.lessonsOnThursday = []
    this.subjectsOnThursday = []

    this.lessonsOnFriday = []
    this.subjectsOnFriday = []

    this.lessonsService.getLessonsOfDayAsObservable('Montag').subscribe(async (res) => {
      this.lessonsOnMonday = res
      for (let lesson of this.lessonsOnMonday) {
        this.subjectsOnMonday.push( await this.subjectService.getSubject(lesson.subjectId))
      }
    })
    this.lessonsService.getLessonsOfDayAsObservable('Dienstag').subscribe(async (res) => {
      this.lessonsOnTuesday = res
      for (let lesson of this.lessonsOnTuesday) {
        this.subjectsOnTuesday.push( await this.subjectService.getSubject(lesson.subjectId))
      }
    })
    this.lessonsService.getLessonsOfDayAsObservable('Mittwoch').subscribe(async (res) => {
      this.lessonsOnWednesday = res
      for (let lesson of this.lessonsOnWednesday) {
        this.subjectsOnWednesday.push( await this.subjectService.getSubject(lesson.subjectId))
      }
    })
    this.lessonsService.getLessonsOfDayAsObservable('Donnerstag').subscribe(async (res) => {
      this.lessonsOnThursday = res
      for (let lesson of this.lessonsOnThursday) {
        this.subjectsOnThursday.push( await this.subjectService.getSubject(lesson.subjectId))
      }
    })
    this.lessonsService.getLessonsOfDayAsObservable('Freitag').subscribe(async (res) => {
      this.lessonsOnFriday = res
      for (let lesson of this.lessonsOnFriday) {
        this.subjectsOnFriday.push( await this.subjectService.getSubject(lesson.subjectId))
      }
    })
   }

  ngAfterContentChecked() {
    if (this.swiper) {
      this.swiper.updateSwiper({});
      if (!this.checked) {
        this.weekDays = this.getWeekDays('ch-de')
        console.log(this.today.toLocaleDateString('ch-de'))
        console.log(this.weekDays)
        this.dayIndex = this.weekDays.indexOf(this.today.toLocaleDateString('ch-de', {weekday: 'long'}))
        console.log(this.dayIndex)
        this.swiper.swiperRef.slideTo(this.dayIndex)
        this.checked = true
      }

      

      // this.lessonsOnMonday = this.lessonsService.getLessonsOfDay('Montag')
      
    }

  }

  async getSubjectName(subjectId){
    console.log(await this.subjectService.getSubject(subjectId))
    return await this.subjectService.getSubject(subjectId)
  }

  getWeekDays(local) {
    var baseDate = new Date(Date.UTC(2017, 0, 2));
    var weekDays = []
    for (let i = 0; i < 7; i++) {
      console.log(baseDate.toLocaleDateString(local, {weekday: 'long'}))
      weekDays.push(baseDate.toLocaleDateString(local, {weekday: 'long'}))
      baseDate.setDate(baseDate.getDate() + 1)
    }
    console.log(weekDays)
    return weekDays
  }

  async selectView(){
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [
        {
          text: '1 Spalte',
          role: '1',
          data: {
            columns: 1
          },
          handler: () => {
            this.swiper.updateSwiper({
              slidesPerView: 1
            });
            this.config.slidesPerView = 1
            this.swiper.swiperRef.slideTo(this.dayIndex)
          }
        },
        {
          text: '2 Spalten',
          role: '2',
          data: {
            columns: 2
          },
          handler: () => {
            this.swiper.updateSwiper({
              slidesPerView: 2
            });
            this.config.slidesPerView = 2
            this.swiper.swiperRef.slideTo(this.dayIndex)
          }
        },
        {
          text: '3 Spalten',
          role: '3',
          data: {
            columns: 3
          },
          handler: () => {
            this.swiper.updateSwiper({
              slidesPerView: 3
            });
            this.config.slidesPerView = 3
            this.swiper.swiperRef.slideTo(this.dayIndex)
          }
        },
        {
          text: '4 Spalten',
          role: '4',
          data: {
            columns: 4
          },
          handler: () => {
            this.swiper.updateSwiper({
              slidesPerView: 4
            });
            this.config.slidesPerView = 4
            this.swiper.swiperRef.slideTo(this.dayIndex)
          }
        },
        {
          text: '5 Spalten',
          role: '5',
          data: {
            columns: 5
          },
          handler: () => {
            this.swiper.updateSwiper({
              slidesPerView: 5
            });
            this.config.slidesPerView = 5
            this.swiper.swiperRef.slideTo(this.dayIndex)
          }
        },
      ]
    })

    await actionSheet.present()

  }

  // async getLessonsOfDay(day) {
  //   const lessonList: Lesson[] = await this.lessonsService.getLessonsOfDay(day)
  //   return lessonList
  // }

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
