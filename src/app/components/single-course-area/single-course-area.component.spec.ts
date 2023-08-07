import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCourseAreaComponent } from './single-course-area.component';

describe('SingleCourseAreaComponent', () => {
  let component: SingleCourseAreaComponent;
  let fixture: ComponentFixture<SingleCourseAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleCourseAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCourseAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
