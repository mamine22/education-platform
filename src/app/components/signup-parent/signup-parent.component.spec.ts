import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupParentComponent } from './signup-parent.component';

describe('SignupParentComponent', () => {
  let component: SignupParentComponent;
  let fixture: ComponentFixture<SignupParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
