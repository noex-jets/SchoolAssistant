import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GradeCalculatorModalPage } from './grade-calculator-modal.page';

describe('GradeCalculatorModalPage', () => {
  let component: GradeCalculatorModalPage;
  let fixture: ComponentFixture<GradeCalculatorModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeCalculatorModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GradeCalculatorModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
