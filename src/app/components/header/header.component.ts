import { AvatarPopOverModalPage } from './../../modals/avatar-pop-over-modal/avatar-pop-over-modal.page';
import { AvatarService } from './../../services/avatar.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  image: any;
  firstname: string;
  lastname: string;
  @Input() headerValue: string;

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
  ) { 

  }

  ngOnInit() {
    this.authService.getUserAsObservable().subscribe((data) => {
      this.image = data.imageUrl;
      this.firstname = data.firstname;
      this.lastname = data.lastname;
    })
  }

  async openAvatarPopOverModal() {
    const avatarPopOverModal = await this.modalController.create({
      component: AvatarPopOverModalPage,
      cssClass: 'avatarPopOverModal',
      canDismiss: true,
      componentProps: {

      },
      backdropDismiss: true,
    })

    await avatarPopOverModal.present()
  }

}
