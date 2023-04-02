import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Lesson, LessonsService } from 'src/app/services/lessons.service';
import { SubjectService} from 'src/app/services/subject.service'
import { HomeworksService } from 'src/app/services/homeworks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HomePage implements OnInit {
  lesson: Lesson = {day: '', startingTime: 0, endTime: 0, duration: 0, subjectId: null}
  subject = {subjectName: 'Keine Lektionen heute', color: '#2dd36f'}

  homeworks = []
  homeworksSubjects =[]

  constructor(
    private authService: AuthService,
    private router: Router,
    private lessonsService: LessonsService,
    private subjectService: SubjectService,
    private homeworksService: HomeworksService
  ) { 
    
  }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    const today = new Date()
    this.lessonsService.getLessonsOfDayAsObservable(today.toLocaleDateString('ch-de', {weekday: 'long'})).subscribe( async res => {
      if (res.length != 0) {
        let lessons = res
        let goal = (today.getHours() * 60) + today.getMinutes()
        let curr = lessons[0]
        let diff = Math.abs(goal - curr.startingTime)

        for (let val = 0; val < lessons.length; val++) {
          // const element = lessons[val];
          if (lessons[val].startingTime >= goal){
            let newdiff = Math.abs(goal - lessons[val].startingTime)
            if (newdiff < diff) {
              diff = newdiff;
              curr = lessons[val]
            }
          }
          
          
        }

        if (curr.startingTime >= goal) {
          console.log(curr)
          this.lesson = {day: curr.day, startingTime: curr.startingTime, endTime: curr.endTime, subjectId: curr.subjectId, duration: curr.duration}
          console.log(await this.subjectService.getSubject(this.lesson.subjectId))
          let tempSubject =  await this.subjectService.getSubject(this.lesson.subjectId)
          this.subject.subjectName = tempSubject.subjectName
          this.subject.color = tempSubject.color
        }
        
        
      }
    })

    this.homeworksService.getMarkedHomeworksAsObservable().subscribe(async res => {
      this.homeworks = res
      this.homeworksSubjects = []
      for (let homework of this.homeworks) {
        this.homeworksSubjects.push( await this.subjectService.getSubject(homework.subjectId))
      }
    })
  }


  logOut() {
    this.authService.logout()
    this.router.navigateByUrl('start', {replaceUrl: true})
  }

  getUser() {
    this.authService.getCurrentUser().emailVerified
  }

  getNextLesson() {
    const today = new Date().toLocaleDateString('ch-de', {weekday: 'long'})
    let lessons = this.lessonsService.getLessonsOfDay(today)
    console.log(lessons)
  }

  checked(homework){
    homework.done = true
    const id = homework.id
    delete homework.id
    this.homeworksService.updateHomework(id, homework)
  }

}
