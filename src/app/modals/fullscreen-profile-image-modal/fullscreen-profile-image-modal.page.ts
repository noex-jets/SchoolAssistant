import { AuthService } from './../../services/auth.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fullscreen-profile-image-modal',
  templateUrl: './fullscreen-profile-image-modal.page.html',
  styleUrls: ['./fullscreen-profile-image-modal.page.scss'],
})
export class FullscreenProfileImageModalPage implements OnInit {

  image: any;
  firstname: string;
  lastname: string;

  constructor(
    private modalController: ModalController,
    private authService: AuthService
  ) { 
    this.authService.getUserAsObservable().subscribe((data) =>{
      this.image = data.imageUrl;
      this.firstname = data.firstname;
      this.lastname = data.lastname;
    })
  }

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss()
  }

}
