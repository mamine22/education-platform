import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroAreaComponent } from './hero-area.component';

describe('HeroAreaComponent', () => {
  let component: HeroAreaComponent;
  let fixture: ComponentFixture<HeroAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
