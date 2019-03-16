import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPAgeComponent } from './main-page.component';

describe('MainPAgeComponent', () => {
  let component: MainPAgeComponent;
  let fixture: ComponentFixture<MainPAgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPAgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
