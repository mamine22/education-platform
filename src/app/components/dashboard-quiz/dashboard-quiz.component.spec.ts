import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardQuizComponent } from './dashboard-quiz.component';

describe('DashboardQuizComponent', () => {
  let component: DashboardQuizComponent;
  let fixture: ComponentFixture<DashboardQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
