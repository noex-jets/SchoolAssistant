import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CustomValidators } from '../custom-validators';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  credentials: FormGroup;

  loginError: boolean = false;
  

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private authService: AuthService,
    private router: Router,
  ){}

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password')
  }
  

  ngOnInit() {
    const regex = /[$-/:-?{-~!"^_@`\[\].,]/;
    this.credentials = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required, 
        Validators.minLength(8), 
        CustomValidators.patternValidator(/\d/, { hasNumber: true }), 
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        CustomValidators.patternValidator(regex, { hasSymbol: true})
        
      ]]
    });
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.login(this.credentials.value);

    await loading.dismiss();

    if (user) {
      if(user.user.emailVerified == true){
        this.router.navigate(['/home']) 
        console.log("test")
      } else {
        this.router.navigateByUrl('/email-verification', {replaceUrl: true})
      }
      
    }
    else {
      this.loginError = true;
    }

  }

  async forgotPassword() {
    await this.router.navigateByUrl('/forgot-password', {replaceUrl: true});
  }

}
