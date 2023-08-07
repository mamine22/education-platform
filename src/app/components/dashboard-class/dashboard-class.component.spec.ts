import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardClassComponent } from './dashboard-class.component';

describe('DashboardClassComponent', () => {
  let component: DashboardClassComponent;
  let fixture: ComponentFixture<DashboardClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
