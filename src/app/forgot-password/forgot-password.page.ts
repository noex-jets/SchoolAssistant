import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  credentials: FormGroup;



  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private loadingController: LoadingController,
    private router: Router,
    private toastController: ToastController,
  ) { }

  get email(){
    return this.credentials.get('email')
  }

  ngOnInit() {
    this.credentials = this.formBuilder.group(
      {
        email: new FormControl('', Validators.compose([Validators.required, Validators.email]))
      }
    )
  }

  async sendPasswordReset() {
    const loading = await this.loadingController.create();
    await loading.present();

    await this.authService.sendPasswordReset(this.credentials.value.email)

    await this.router.navigateByUrl('/log-in', {replaceUrl: true});

    await this.presentToast('Passwort zurücksetzen E-Mail wurde versendet!',  'bottom', 1000);

    await loading.dismiss();
  }

  async presentToast(message, position, duration) {
    const toast = await this.toastController.create({
      message,
      duration,
      position
    });
    toast.present();
  }

}
