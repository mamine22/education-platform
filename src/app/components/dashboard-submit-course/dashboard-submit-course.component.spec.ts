import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSubmitCourseComponent } from './dashboard-submit-course.component';

describe('DashboardSubmitCourseComponent', () => {
  let component: DashboardSubmitCourseComponent;
  let fixture: ComponentFixture<DashboardSubmitCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSubmitCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSubmitCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
