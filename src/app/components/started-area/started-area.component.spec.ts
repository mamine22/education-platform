import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartedAreaComponent } from './started-area.component';

describe('StartedAreaComponent', () => {
  let component: StartedAreaComponent;
  let fixture: ComponentFixture<StartedAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartedAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartedAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
