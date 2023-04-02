import { Injectable } from '@angular/core';
import { collectionData, deleteDoc, doc, docData, Firestore, limit, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
import { addDoc, collection } from '@firebase/firestore';
import { id } from 'date-fns/locale';
import { AuthService } from './auth.service';

export interface Homework {
  title: string,
  date: Date,
  notes: string,
  subjectId: string,
  marked: boolean,
  done: boolean
}

export type Importance = 'High' | 'Medium' | 'Low';
export type Status = 'Done' | 'In Progress' | 'To do';

@Injectable({
  providedIn: 'root'
})
export class HomeworksService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService,

  ) { }

  addHomework(homework) {
    const user = this.authService.getCurrentUser()
    const docRef = collection(this.firestore, `users/${user.uid}/homeworks`)
  
    addDoc(docRef, homework)
  }

  getHomeworksAsObservable() {
    const user = this.authService.getCurrentUser()
    const q1 = query(collection(this.firestore, `users/${user.uid}/homeworks`),where('done', '==', false), orderBy('marked', 'desc'), orderBy('date'))

    return collectionData(q1, {idField: 'id'})
  }

  getDoneHomeworksAsObservable() {
    const user = this.authService.getCurrentUser()
    const q1 = query(collection(this.firestore, `users/${user.uid}/homeworks`), where('done', '==', true), orderBy('date'))

    return collectionData(q1, {idField: 'id'})
  }

  getHomeworkAsObservable(homeworkId) {
    const user = this.authService.getCurrentUser()

    const q1 = doc(this.firestore, `users/${user.uid}/homeworks/${homeworkId}`)

    return docData(q1, {idField: 'id'})
  }

  updateHomework(homeworkId, homework) {
    const user = this.authService.getCurrentUser()
    const docRef = doc(this.firestore, `users/${user.uid}/homeworks/${homeworkId}`)

    updateDoc(docRef, homework)
  }

  getMarkedHomeworksAsObservable() {
    const user = this.authService.getCurrentUser()

    const q1 = query(collection(this.firestore, `users/${user.uid}/homeworks`), where('marked', '==', true), where('done','==',false), orderBy('date'), limit(3))

    return collectionData(q1, {idField: 'id'})
  }

  getUnmarkedHomeworksAsObservable() {
     const user = this.authService.getCurrentUser()

     const q1 = query(collection(this.firestore, `users/${user.uid}/homeworks`), where('marked', '==', false), orderBy('date'))

     return collectionData(q1, {idField: 'id'})
  }

  deleteHomework(homework) {
    const user = this.authService.getCurrentUser()
    const docRef = doc(this.firestore, `users/${user.uid}/homeworks/${homework.id}`)

    deleteDoc(docRef)
  }


}
