import { AvatarService } from './../services/avatar.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ActionSheetController, LoadingController, AlertController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.page.html',
  styleUrls: ['./email-verification.page.scss'],
})
export class EmailVerificationPage implements OnInit {

  @ViewChild(IonModal) modal: IonModal;

  credentials: FormGroup;

  profileImage:Photo = null;
  convertedProfileImage = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private actionSheetCtrl: ActionSheetController,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private avatarService: AvatarService,
    private alertController: AlertController
  ) {
  }

  get firstname () {
    return this.credentials.get('firstname')
  }

  get lastname () {
    return this.credentials.get('lastname')
  }

  ngOnInit() {
    this.credentials = this.formBuilder.group({
      firstname:new FormControl('', Validators.compose([Validators.required])),
      lastname:new FormControl('',Validators.compose([Validators.required]))
    })
  }

  async logout() {
    await this.authService.logout()
    this.router.navigateByUrl('/start', {replaceUrl: true})
  }

  sendEmailVerification() {
    this.authService.sendEmailVerification()
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async openModal() {
    if ( await this.authService.checkEmailVerification()){
      this.modal.present()
    } else {
      let alert = await this.alertController.create({
         header: "Email  nicht bestätigt!",
         message: "Deine E-Mail wurde noch nicht bestägtigt",
         buttons: [
          {
            text: 'Dissmiss',
            role: 'dissmiss'
          },
          {
            text: 'Resend Link',
            role: 'sendLink'
          }
         ]
      })

     await alert.present()

     await alert.onDidDismiss().then((data) => {
      if(data.role === 'sendLink') {
        this.sendEmailVerification()
      }
     })
    }
  }

  async confirm() {
    this.modal.dismiss('confirm');
    const loading = await this.loadingController.create();
    await loading.present();

    if(await this.authService.checkEmailVerification() === true){
      if (await this.authService.createUserDB(this.credentials.value) == true){
        const result = await this.avatarService.uploadImage(this.profileImage);
        await this.authService.logout()
        loading.dismiss()
        this.router.navigateByUrl('/start', {replaceUrl: true})
        console.log("noError")
      } else {
        console.log("Error")
        loading.dismiss()
      }
    }

    
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
    }
  }

  async selectImageSource() {
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
    this.convertedProfileImage = "data:/image/png;base64,"+this.profileImage.base64String
  }

  async getImageFromCamera() {
    this.profileImage = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    })
    this.convertedProfileImage = "data:/image/png;base64,"+this.profileImage.base64String
  }

}
