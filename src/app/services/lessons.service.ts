import { query } from '@firebase/firestore';

import { Firestore, collection, collectionData, doc, setDoc, getDocs, where, deleteDoc, getDoc, orderBy, addDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { id } from 'date-fns/locale';

export interface Lesson {
  day: string;
  startingTime: number;
  duration: number; // In Minutes
  endTime: number;
  subjectId: string;
}

export function range(start: number, end: number, step: number){
  const range = Array.from(Array(Math.floor((end+(step-start))/step)).keys()).map(x => step*x+start)
  console.log(Math.floor((end+step)/step))
  return range
}


@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  constructor(
    private authService: AuthService,
    private firestore: Firestore,
  ) { }


  createLesson(lesson: Lesson, ) {
    const user = this.authService.getCurrentUser()
    const docRef = collection(this.firestore, `users/${user.uid}/lessons`, )

    addDoc(docRef, lesson).then(async (data) => {
      console.log(data.id)
      let id = await data.id
      return await id
      
    })

    
  }



  async getLessonsOfDay(day) {
    let lessonList = [];

    const user = this.authService.getCurrentUser()

    const  q1 = await getDocs(query(collection(this.firestore, `users/${user.uid}/lessons`), where('day', '==', day)))

    q1.forEach(doc => {
      lessonList.push(doc.data())
      console.log(doc.data())
    });

    return lessonList
  }

  getLessonsOfDayAsObservable(day) {
    const user = this.authService.getCurrentUser()
    const  q1 = query(collection(this.firestore, `users/${user.uid}/lessons`), where('day','==', day), orderBy('startingTime'))

    return collectionData(q1, {idField: 'id'})

  }

  getLessonsAsObservable(subjectId) {
    const user = this.authService.getCurrentUser()
    const docRef = collection(this.firestore, `users/${user.uid}/subjects/${subjectId}/lessons` )

    return collectionData(docRef, {idField: "id"})
  }

  async getLessonsOfSubject(subjectId) {
    let lessons = []
    const user = this.authService.getCurrentUser()
    const q1 = await getDocs(query(collection(this.firestore, `users/${user.uid}/lessons`), where('subjectId', '==', subjectId)))

    q1.forEach((doc) => {
      lessons.push({day: doc.data().day, startingTime: doc.data().startingTime, endTime: doc.data().endTime, duration: doc.data().duration, subjectId: doc.data().subjectId, id: doc.id})
    })

    return lessons
  }

  getLessonsOfSubjectAsObservable(subjectId) {
    const user = this.authService.getCurrentUser()
    const docRef = query(collection(this.firestore, `users/${user.uid}/lessons`), where('subjectId', '==', subjectId))

    return collectionData(docRef, {idField: 'id'})
  }

  async deleteLessons(subjectId) {
    let ids = []
    const user = this.authService.getCurrentUser()
    const querySnapshot = await getDocs(query(collection(this.firestore, `users/${user.uid}/lessons`), where('subjectId', '==', subjectId)))

    querySnapshot.forEach(async (doc) => {
      ids.push(doc.id)
    })

    for (let id of ids) {
      const docRef = doc(this.firestore, `users/${user.uid}/lessons/${id}`)
      await deleteDoc(docRef)
    }

  }

  async deleteLesson(lessonId) {
    const user = this.authService.getCurrentUser()
    const docRef = doc(this.firestore, `users/${user.uid}/lessons/${lessonId}`)

    await deleteDoc(docRef)

  }



}
