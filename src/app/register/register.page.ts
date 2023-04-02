import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CustomValidators } from '../custom-validators';
import { Photo } from '@capacitor/camera';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  credentials: FormGroup;

  registerError:boolean = false;

  profileImage:Photo = null;
  convertedProfileImage = null;

  result;

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private authService: AuthService,
    private router: Router
  ) { 
  }

  get email() {
    return this.credentials.get('email')
  }

  get password() {
    return this.credentials.get('password')
  }

  get password2() {
    return this.credentials.get('password2')
  }

  get errorControl() {
    return this.credentials.controls;
  }

  ngOnInit() {
    const regex = /[$-/:-?{-~!"^_@`\[\].,]/;
    this.credentials = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('',[
        Validators.required, 
        CustomValidators.lengthValidator({length: true}), 
        CustomValidators.patternValidator(/\d/, { hasNumber: true }), 
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        CustomValidators.patternValidator(regex, { hasSymbol: true})
      ]),
      password2:new FormControl('',Validators.compose([Validators.required])),
    },{
      validators: this.passwordf.bind(this)
    });
  }

  
  

  passwordf(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('password2');
      if(password !== confirmPassword) {
        formGroup.get('password2').setErrors({ passwordNotMatch: true })
      }
      else {
        formGroup.setErrors(null)
      }
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  async register() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.register(this.credentials.value);
    
    if (user) {
      await this.authService.sendEmailVerification()
      
      this.router.navigateByUrl('/email-verification', {replaceUrl: true}).catch(function (error) {
        console.log(error)
      })
      await loading.dismiss();
    }
    else {
      this.registerError = true;
      await loading.dismiss();
    }

  }

}
