import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunFactComponent } from './fun-fact.component';

describe('FunFactComponent', () => {
  let component: FunFactComponent;
  let fixture: ComponentFixture<FunFactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunFactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunFactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
