import { AuthService } from './auth.service';
import { Firestore, addDoc, collectionData, doc, getDocs, setDoc, where, docData, getDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Grade } from './grades.service';
import { Lesson, LessonsService } from './lessons.service';
import { Homework } from './homeworks.service';
import { Injectable } from '@angular/core';
import { collection, query } from '@firebase/firestore';

export interface Subject {
  subjectName: string,
  color: string,
  grade: number
}

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  

  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private lessonsService: LessonsService,

  ) { }

  async getSubjectsWithSubjectNameFilter(filter){
    let filtredList: Subject[] = [];

    const user = this.authService.getCurrentUser()
    const q = query(collection(this.firestore, `users/${user.uid}/subjects`), where('subjectName', '==', filter));

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      filtredList.push({
        subjectName: doc.data().subjectName,
        color: doc.data().color,
        grade: doc.data().grade
      })
    })
    return filtredList
  }

  addSubject(subject: Subject, lessons) {
    const user = this.authService.getCurrentUser()
    const docRef = collection(this.firestore, `users/${user.uid}/subjects`, )

    let subjectId;

    addDoc(docRef, {
      subjectName: subject.subjectName,
      color: subject.color
    }).then(docRef => {
      subjectId = docRef.id
      for (let i = 0; i < lessons.length; i++) {
        const element = lessons[i];
        element.subjectId = subjectId
        this.lessonsService.createLesson(element)
      }
    })

  }

  updateSubject(subject: Subject, subjectId) {
    const user = this.authService.getCurrentUser()
    const docRef = doc(this.firestore, `users/${user.uid}/subjects/${subjectId}`, )


    updateDoc(docRef, {
      subjectName: subject.subjectName,
      color: subject.color
    })
  }

  async getSubjectsWithColorFilter(filter) {
    let filtredList: Subject[] = []

    const user = this.authService.getCurrentUser()
    const q = query(collection(this.firestore, `users/${user.uid}/subjects`), where("color", '==', filter));

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      filtredList.push({
        subjectName: doc.data().subjectName,
        color: doc.data().color,
        grade: doc.data().grade
      })
    })

    return filtredList
  }

  getSubjectsAsObservable() {
    const user = this.authService.getCurrentUser()
    const docRef = query(collection(this.firestore, `users/${user.uid}/subjects`))

    return collectionData(docRef, {idField: "id"})
  }

  async getSubject(subjectId) {
    const user = this.authService.getCurrentUser()
    const docRef = await doc(this.firestore, `users/${user.uid}/subjects/`, subjectId)

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(docSnap.data())
      return docSnap.data()

    }
    else {
      console.log("Error while getting Doc")
    }
  }

  getSubjectAsObservable(subjectId) {
    const user = this.authService.getCurrentUser()
    const q1 = doc(this.firestore, `users/${user.uid}/subjects/${subjectId}`)

    return docData(q1, {idField: 'id'})
  }

  deleteSubject(subjectId) {
    const user = this.authService.getCurrentUser()
    const docRef = doc(this.firestore, `users/${user.uid}/subjects/${subjectId}`)

    deleteDoc(docRef)

    this.lessonsService.deleteLessons(subjectId)
  }

  updateGradeOfSubject(subjectId, grade) {
    const user = this.authService.getCurrentUser()
    const docRef = doc(this.firestore, `users/${user.uid}/subjects/${subjectId}`)

    updateDoc(docRef, {
      grade: grade
    })
  }

}
