import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FullscreenProfileImageModalPage } from './fullscreen-profile-image-modal.page';

describe('FullscreenProfileImageModalPage', () => {
  let component: FullscreenProfileImageModalPage;
  let fixture: ComponentFixture<FullscreenProfileImageModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FullscreenProfileImageModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FullscreenProfileImageModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
