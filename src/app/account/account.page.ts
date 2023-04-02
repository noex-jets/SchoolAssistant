import { FullscreenProfileImageModalPage } from './../modals/fullscreen-profile-image-modal/fullscreen-profile-image-modal.page';
import { DataService } from './../services/data.service';
import { AvatarService } from './../services/avatar.service';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { ActionSheetController, AlertController, ToastController, ModalController } from '@ionic/angular';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  image: any;
  firstname: string;
  firstnameInput: string;
  lastname: string;
  lastnameInput: string ;

  profileImage: Photo = null;
  convertedProfileImage = null;


  constructor(
    private authService: AuthService,
    private actionSheetCtrl: ActionSheetController,
    private avatarService: AvatarService,
    private dataService: DataService,
    private alertController: AlertController,
    private toastController: ToastController,
    private modalController: ModalController,
    private router: Router
  ) { 
    this.authService.getUserAsObservable().subscribe((data) =>{
      this.image = data.imageUrl;
      this.firstname = data.firstname;
      this.lastname = data.lastname;
    })
  }

  ngOnInit() {
  }

  async changeProfileImage() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Image Source',
      buttons: [
        {
          text: 'Camera',
          data: {
            action: 'camera',
          },
        },
        {
          text: 'Files',
          data: {
            action: 'files',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    console.log(result.data.action)
    if (result.data.action === "camera"){
      this.getImageFromCamera()
    }
    else if (result.data.action === "files"){
      this.getImageFromFiles()
    }
    else{}
  }

  async getImageFromFiles() {
    this.profileImage = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    })
    this.convertedProfileImage = "data:/image/png;base64,"+this.profileImage.base64String;
    this.avatarService.uploadImage(this.profileImage)
  }

  async getImageFromCamera() {
    this.profileImage = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    })
    this.convertedProfileImage = "data:/image/png;base64,"+this.profileImage.base64String
    this.avatarService.uploadImage(this.profileImage)
  }

  async changeFirstname() {
    if (this.firstname == this.firstnameInput || this.firstnameInput == undefined){
      const toast = await this.toastController.create({
        message: 'Gib einen neuen Vornamen ein!',
        duration: 3000,
        position: 'bottom'
      })
      await toast.present()
    } else {
      const alert = await this.alertController.create({
        header: 'Neuer Vorname',
        message: `Möchtest du den Vornamen wirklich von ${this.firstname} auf ${this.firstnameInput} ändern?`,
        buttons: [
          {
            text:'Ja',
            role: 'confirm'
          },
          {
            text: 'Nein',
            role: 'dissmiss'
          }
        ]
      });

      await alert.present()

      await alert.onDidDismiss().then((data) => {
        if(data.role == 'confirm') {
          this.dataService.changeUserFirstname(this.firstnameInput)
        } else {
          this.firstnameInput = this.firstname;
        }
      })
    }
  }

  async changeLastname() {
    if (this.lastname == this.lastnameInput || this.lastnameInput == undefined){
      const toast = await this.toastController.create({
        message: 'Gib einen neuen Nachnamen ein!',
        duration: 3000,
        position: 'bottom'
      })
      await toast.present()
    } else {
      const alert = await this.alertController.create({
        header: 'Neuer Nachname',
        message: `Möchtest du den Nachnamen wirklich von ${this.lastname} auf ${this.lastnameInput} ändern?`,
        buttons: [
          {
            text:'Ja',
            role: 'confirm'
          },
          {
            text: 'Nein',
            role: 'dissmiss'
          }
        ]
      });

      await alert.present()

      await alert.onDidDismiss().then((data) => {
        if(data.role == 'confirm') {
          this.dataService.changeUserLastname(this.lastnameInput)
        } else {
          this.lastnameInput = this.lastname;
        }
      })
    }
  }

  async resetPassword() {
    const alert = await this.alertController.create({
      header: 'Passwort zurücksetzen',
      subHeader:'Bitte gib deine E-Mailadresse ein!',
      buttons: [
        {
          text:'Ok',
          role: 'confirm',
          handler: (data) => {
            this.authService.sendPasswordReset(data.email)
          }
        },
        {
          text: 'Abbrechen',
          role: 'dissmiss'
        }
      ],
      inputs: [
        {
          name: 'email',
          placeholder: 'E-Mail'
        }
      ]

    })

    await alert.present()
  }

  async deletAccount() {
    const alert = await this.alertController.create({
      header: 'Account löschen',
      message: 'Willst du deinen Account wirklich löschen?',
      buttons: [
        {
          text:'Ja',
          role: 'confirm',
          handler: (data) => {
            this.authService.deletAccount()
            this.router.navigateByUrl('/start', {replaceUrl: true})
          }
        },
        {
          text: 'Nein',
          role: 'dissmiss'
        }
      ],
    })

    await alert.present()
  }

  async openFullscreenProfileImageModal() {
    const fullscreenProfileImageModal = await this.modalController.create({
      component: FullscreenProfileImageModalPage
    })

    fullscreenProfileImageModal.present()
  }

}


