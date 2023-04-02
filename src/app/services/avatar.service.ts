import { doc, setDoc } from '@firebase/firestore';
import { docData, Firestore, updateDoc, getDoc, } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import {Photo} from '@capacitor/camera'
import { getDownloadURL, ref, Storage, uploadString } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage,
  ) { }

  getUserProfile() {
    const user = this.auth.currentUser;
    const userRef = doc(this.firestore, `users/${user.uid}`)
    return docData(userRef);
  }

  async uploadImage(cameraFile: Photo){
    const user = this.auth.currentUser;
    const path = `users/${user.uid}/profile.png`
    const storageRef = ref(this.storage, path)

    try{
      await uploadString(storageRef, cameraFile.base64String, 'base64');

      const imageUrl = await getDownloadURL(storageRef)

      const userRef = doc(this.firestore, `users/${user.uid}`)
      await updateDoc(userRef, {
        imageUrl,
      })
      console.log("Upload successful")
      return true;

    } catch (e) {
      return null;
    }
  }

  async getUserAvatar() {
    const user = this.auth.currentUser;
    const userRef = doc(this.firestore, `users/${user.uid}`)
    const userDocSnap = await getDoc(userRef)

    if(userDocSnap.exists()){
      console.log(userDocSnap.data().imageUrl)
      return userDocSnap.data().imageUrl
    }
  }
}
