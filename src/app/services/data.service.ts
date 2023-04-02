import { DocumentData, QuerySnapshot, collection, query } from '@firebase/firestore';
import { doc, Firestore, getDoc, updateDoc, getDocs, docData, collectionData, where } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private firestore: Firestore,
  ) { }

  async checkUserExistanz() {
    const auth = getAuth();
    const user = auth.currentUser;

    const userRef = doc(this.firestore, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if(userSnap.exists()){
      return true;
    } else {
      return false;
    }
  }

  async changeUserFirstname(firstname) {
    const auth = getAuth()
    const user = auth.currentUser
    const userRef = doc(this.firestore, `users/${user.uid}`)

    await updateDoc(userRef, {
      firstname
    })
  }

  async changeUserLastname(lastname) {
    const auth = getAuth()
    const user = auth.currentUser
    const userRef = doc(this.firestore, `users/${user.uid}`)

    await updateDoc(userRef, {
      lastname
    })
  }

  async getColors(){
    const colors: any[] = []
    const querySnapshot = await getDocs(collection(this.firestore, "colors"))

    querySnapshot.forEach((doc) => {
      colors.push(doc.data())
    })
    
    console.log(colors)
    return colors
  }

  getColorsAsObservable(){
    const docRef = collection(this.firestore, 'colors');
    return collectionData (docRef, {idField: 'id'})
  }
  
}

// Anstehend: Schauen ob User in Firestore erstellt ist. 