import { Router } from '@angular/router';
  import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getAuth, sendEmailVerification, sendPasswordResetEmail, authState, user, authInstance$ } from '@angular/fire/auth'; 
import { Firestore, docData, deleteDoc, collection, getDocs } from '@angular/fire/firestore';
import { deleteObject, getStorage, ref } from '@angular/fire/storage';
import { doc, setDoc } from '@firebase/firestore';


export interface User {
  uId: string,
  firstname: string,
  lastname: string,
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
    ) { }

  async login({email, password}) {
    try{
      const user = await signInWithEmailAndPassword(
        this.auth,
        email, 
        password
      );
      return user;
    }
    catch (e) {
      return null;
    }
  }

  async register({email, password}) {
    try{
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email, 
        password
      );

      return user;
    }
    catch (e) {
      return null;
      
    }
  }

  logout() {
    return signOut(this.auth);
  }


  createUserDB(userCredentials) {
    try{
    const auth = getAuth()
    const user = auth.currentUser
    
    const userRef = doc(this.firestore, "users", user.uid)
    setDoc(userRef, {firstname: userCredentials.firstname, lastname: userCredentials.lastname, uId: user.uid})

    return true
    } catch (e){
      return false
    }

  }

  getCurrentUser() {
    const auth = getAuth()
    const user = auth.currentUser

    return user
  }

  sendEmailVerification() {
    const auth = getAuth()
    
    sendEmailVerification(auth.currentUser).then(
      () => {
        console.log("Test")
      }
    )
  }

  sendPasswordReset(email) {
    const auth = getAuth();

    sendPasswordResetEmail(this.auth, email)

  }

  async checkEmailVerification(){
    const user = await this.getCurrentUser()
    await user.reload()

    // console.log(user.emailVerified)

    if(user.emailVerified === true){
      return true
    } else {
      return false
    }
  }

  getUserAsObservable() {
    const auth = getAuth()
    const user = auth.currentUser

    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    return docData(userDocRef)
  }

  async deletAccount() {
    const auth = await getAuth()
    const user = await auth.currentUser

    const homeworkCollection = collection(this.firestore, `users/${user.uid}/homeworks`)
    const gradeCollection = collection(this.firestore, `users/${user.uid}/grades`)
    const lessonCollection = collection(this.firestore, `users/${user.uid}/lessons`)
    const subjectCollection = collection(this.firestore, `users/${user.uid}/subjects`)

    let collections = [{collection: homeworkCollection, name: 'homeworks'}, {collection: gradeCollection, name: 'grades'}, {collection: lessonCollection, name: 'lessons'}, {collection: subjectCollection, name: 'subjects'}]

    for (let collection of collections) {
      let docs = await getDocs(collection.collection)

      docs.forEach(res => {
        let docRef = doc(this.firestore, `users/${user.uid}/${collection.name}/${res.id}`);
        deleteDoc(docRef);
      })
    }

    const userDocRef = await doc(this.firestore, `users/${user.uid}`)
    await deleteDoc(userDocRef)

    const storage = await getStorage();
    const userImgRef = await ref(storage, `users/${user.uid}/profile.png`)
    await deleteObject(userImgRef)

    await user.delete()

    await auth.signOut()

    this.router.navigateByUrl('start', {replaceUrl: true})
  }

}

