import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegewiseFundtrackerPageComponent } from './collegewise-fundtracker-page.component';

describe('CollegewiseFundtrackerPageComponent', () => {
  let component: CollegewiseFundtrackerPageComponent;
  let fixture: ComponentFixture<CollegewiseFundtrackerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollegewiseFundtrackerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegewiseFundtrackerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
