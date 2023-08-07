import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProfilComponent } from './dashboard-profil.component';

describe('DashboardProfilComponent', () => {
  let component: DashboardProfilComponent;
  let fixture: ComponentFixture<DashboardProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
