import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar-pop-over-modal',
  templateUrl: './avatar-pop-over-modal.page.html',
  styleUrls: ['./avatar-pop-over-modal.page.scss'],
})
export class AvatarPopOverModalPage implements OnInit {

  image: any;
  firstname: string;
  lastname: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalController: ModalController,
  ) { 
    this.authService.getUserAsObservable().subscribe((data) => {
      this.image = data.imageUrl;
      this.firstname = data.firstname;
      this.lastname = data.lastname;
    })
  }

  ngOnInit() {
  }

  async logOut() {
    this.modalController.dismiss()
    await this.authService.logout()
    this.router.navigateByUrl('/start', {replaceUrl: true})


  }

  goToAccountPage() {
    this.router.navigateByUrl('/account')
    this.modalController.dismiss()
  }

  close() {
    this.modalController.dismiss()
  }

  openComingSoon() {
    console.log('test')
    this.router.navigateByUrl('/comming-soon')
    this.modalController.dismiss()
  }

}
