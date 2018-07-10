import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeWisePageComponent } from './college-wise-page.component';

describe('CollegeWisePageComponent', () => {
  let component: CollegeWisePageComponent;
  let fixture: ComponentFixture<CollegeWisePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollegeWisePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeWisePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
