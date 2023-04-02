import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { ServiceWorkerModule } from '@angular/service-worker';

import {NgxColorsModule} from 'ngx-colors'; 
import { PipesModule } from './modals/pipes-module';
import { DateFormatterPipe } from './pipes/date-formatter.pipe';
import { PluspointsFormatterPipe } from './pipes/pluspoints-formatter.pipe';



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    NgxColorsModule,
    PipesModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)), 
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore()), 
    provideStorage(() => getStorage()),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    },
)],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],

})
export class AppModule {}
