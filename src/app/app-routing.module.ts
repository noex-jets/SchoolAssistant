import { EmailVerificationGuard } from './guard/email-verification.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo, customClaims, emailVerified, hasCustomClaim, AuthPipe } from '@angular/fire/auth-guard';
import { map} from 'rxjs/operators'
import { pipe } from 'rxjs';
import { user } from '@angular/fire/auth';

const redirectUnauthorizedToStart = () => redirectUnauthorizedTo(['start'])
const redirectLoggedInToHome = () => redirectLoggedInTo(['home'])
// const redirectUnverifiedToEmailVerification = () => hasCustomClaim('emailVerified')
// const redirectUnverifiedToEmailVerification = () => emailVerified
// const redirectUnverifiedToEmailVerification = () => map(user => user == "test" ['email-verification'])
const redirectUnverifiedToEmailVerification:AuthPipe = map(user => user.emailVerified === false)

const routes: Routes = [
  {
    path: 'start',
    loadChildren: () => import('./start/start.module').then( m => m.StartPageModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full',
  },
  {
    path: 'log-in',
    loadChildren: () => import('./log-in/log-in.module').then( m => m.LogInPageModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'email-verification',
    loadChildren: () => import('./email-verification/email-verification.module').then( m => m.EmailVerificationPageModule),
    ...canActivate(redirectUnauthorizedToStart),
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./tabs/tabs/tabs.module').then( m => m.TabsPageModule),
    ...canActivate(redirectUnauthorizedToStart),
    canActivate: [EmailVerificationGuard]
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'avatar-pop-over-modal',
    loadChildren: () => import('./modals/avatar-pop-over-modal/avatar-pop-over-modal.module').then( m => m.AvatarPopOverModalPageModule)
  },
  {
    path: 'fullscreen-profile-image-modal',
    loadChildren: () => import('./modals/fullscreen-profile-image-modal/fullscreen-profile-image-modal.module').then( m => m.FullscreenProfileImageModalPageModule)
  },
  {
    path: 'grades',
    loadChildren: () => import('./tabs/grades/grades.module').then( m => m.GradesPageModule)
  },
  {
    path: 'timetable',
    loadChildren: () => import('./tabs/timetable/timetable.module').then( m => m.TimetablePageModule)
  },
  {
    path: 'subjects',
    loadChildren: () => import('./tabs/subjects/subjects.module').then( m => m.SubjectsPageModule)
  },
  {
    path: 'add-subject-modal',
    loadChildren: () => import('./modals/add-subject-modal/add-subject-modal.module').then( m => m.AddSubjectModalPageModule)
  },
  {
    path: 'add-lesson-modal',
    loadChildren: () => import('./modals/add-lesson-modal/add-lesson-modal.module').then( m => m.AddLessonModalPageModule)
  },
  {
    path: 'subject-modal',
    loadChildren: () => import('./modals/subject-modal/subject-modal.module').then( m => m.SubjectModalPageModule)
  },  {
    path: 'add-homework-modal',
    loadChildren: () => import('./modals/add-homework-modal/add-homework-modal.module').then( m => m.AddHomeworkModalPageModule)
  },
  {
    path: 'homework-modal',
    loadChildren: () => import('./modals/homework-modal/homework-modal.module').then( m => m.HomeworkModalPageModule)
  },
  {
    path: 'add-grade-modal',
    loadChildren: () => import('./modals/add-grade-modal/add-grade-modal.module').then( m => m.AddGradeModalPageModule)
  },
  {
    path: 'grades-of-subject-modal',
    loadChildren: () => import('./modals/grades-of-subject-modal/grades-of-subject-modal.module').then( m => m.GradesOfSubjectModalPageModule)
  },
  {
    path: 'grade-modal',
    loadChildren: () => import('./modals/grade-modal/grade-modal.module').then( m => m.GradeModalPageModule)
  },
  {
    path: 'grade-calculator-modal',
    loadChildren: () => import('./modals/grade-calculator-modal/grade-calculator-modal.module').then( m => m.GradeCalculatorModalPageModule)
  },
  {
    path: 'comming-soon',
    loadChildren: () => import('./comming-soon/comming-soon.module').then( m => m.CommingSoonPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
