// Importe für die Seite
import SwiperCore, {Pagination } from 'swiper';
import { AfterContentChecked, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

import {SwiperComponent} from 'swiper/angular'

import {SwiperOptions} from 'swiper'
import { Router } from '@angular/router';

// Punktenavigation beim Slider
SwiperCore.use([Pagination])


// Standart Ionic Klasse
@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss']
})
export class StartPage implements AfterContentChecked {

  // Den Swpier als Viewchild importieren
  @ViewChild('swiper') swiper: SwiperComponent;

  // Den Swiper konfigurieren
  config: SwiperOptions = {
    pagination: {
      clickable: true,
    },
    centeredSlides: true,
  }

  //Variabel um zu bestimmen, ob der Skip-Button aktiv sein soll
  skipButtonActive: boolean = true;

  // Konstructor um andere Files zu benutzen
  constructor(
    private router: Router
    ) {

     }

  //Die Funktion, welche direkt beim Laden der Seite angezeigt wird
  ngOnInit() {
  }

  //Funktion welche ausgeführt wird, nachdem der Inhalt der Seite geladen wurde.
  ngAfterContentChecked() {
      if (this.swiper) {
        //Der Swiper wird geupdated
        this.swiper.updateSwiper({});
      }
  }

  // Funktion welche ausgeführt wird, wenn der Skip-Button angeklickt wird
  skipSlides() {
    this.swiper.swiperRef.slideTo(this.swiper.swiperRef.slides.length)
  }

  //Funktion welche ausgeführt wird, wenn die aktuelle Slide geändert hat
  slideChanged() {
    // Es wird überprüft, ob man auf der lezten Slide ist
    if(this.swiper.swiperRef.activeIndex == this.swiper.swiperRef.slides.length-1) {
      //Der Skip-Button und der Next-Button werden versteckt
      document.getElementById('skipButton').hidden = true;
      document.getElementById('nextButton').hidden = true;
    }
    else {
      //Der Skip-Button und der Next-Button werden angezeigt
      document.getElementById('skipButton').hidden = false;
      document.getElementById('nextButton').hidden = false;
    }
  }

  //Funktion welche aufgerufen wird, wenn der Log-In-Button geklickt wird
  goToLogIn() {
    //Navigiert zur Log-In-Seite
    this.router.navigateByUrl('/log-in')
  }

  //Funktion welche aufgerufen wird, wenn der Register-Button angeklickt wird
  goToRegister() {
    //Navigiert zur Register-Seite
    this.router.navigateByUrl('/register')
  }

  //Funktion welche aufgerufen wird, wenn der Next-Button angeklickt wird
  nextSlide() {
    this.swiper.swiperRef.slideNext(100);
  }

}
