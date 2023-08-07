import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmSMSComponent } from './confirm-sms.component';

describe('ConfirmSMSComponent', () => {
  let component: ConfirmSMSComponent;
  let fixture: ComponentFixture<ConfirmSMSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmSMSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmSMSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
