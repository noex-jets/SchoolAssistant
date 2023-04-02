import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AvatarPopOverModalPage } from './avatar-pop-over-modal.page';

describe('AvatarPopOverModalPage', () => {
  let component: AvatarPopOverModalPage;
  let fixture: ComponentFixture<AvatarPopOverModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AvatarPopOverModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarPopOverModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
