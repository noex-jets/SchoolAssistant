import { Injectable } from '@angular/core';
import { collectionData, deleteDoc, doc, Firestore, query, updateDoc, where } from '@angular/fire/firestore';
import { addDoc, collection } from '@firebase/firestore';
import { AuthService } from './auth.service';

export interface Grade {
  title: string,
  grade: number,
  koeffizient: number,
  date: Date,
  counting: boolean,
  subjectId: string,
}

@Injectable({
  providedIn: 'root'
})
export class GradesService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) {

   }

  addGrade(grade) {
    const user = this.authService.getCurrentUser()
    const docRef = collection(this.firestore, `users/${user.uid}/grades`)

    addDoc(docRef, grade)
  }

  getGradesAsObservable() {
    const user = this.authService.getCurrentUser()
    const q1 = collection(this.firestore, `users/${user.uid}/grades`)

    return collectionData(q1, {idField: 'id'})
  }

  getGradesOfSubjectAsObservable(subjectId) {
    const user = this.authService.getCurrentUser()
    const q1 = query(collection(this.firestore, `users/${user.uid}/grades`), where('subjectId', '==', subjectId))

    return collectionData(q1, {idField: 'id'})
  }

  updateGrade(grade) {
    const user = this.authService.getCurrentUser()
    const docRef = doc(this.firestore, `users/${user.uid}/grades/${grade?.id}`)

    updateDoc(docRef, grade)
  }

  deletGrade(grade) {
    const user = this.authService.getCurrentUser()
    const docRef = doc(this.firestore, `users/${user.uid}/grades/${grade?.id}`)

    deleteDoc(docRef)
  }
}
