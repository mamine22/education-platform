import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAreaComponent } from './course-area.component';

describe('CourseAreaComponent', () => {
  let component: CourseAreaComponent;
  let fixture: ComponentFixture<CourseAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
