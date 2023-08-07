import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectStudentComponent } from './affect-student.component';

describe('AffectStudentComponent', () => {
  let component: AffectStudentComponent;
  let fixture: ComponentFixture<AffectStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffectStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
