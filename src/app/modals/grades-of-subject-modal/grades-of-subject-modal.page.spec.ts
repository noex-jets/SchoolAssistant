import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GradesOfSubjectModalPage } from './grades-of-subject-modal.page';

describe('GradesOfSubjectModalPage', () => {
  let component: GradesOfSubjectModalPage;
  let fixture: ComponentFixture<GradesOfSubjectModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GradesOfSubjectModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GradesOfSubjectModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
