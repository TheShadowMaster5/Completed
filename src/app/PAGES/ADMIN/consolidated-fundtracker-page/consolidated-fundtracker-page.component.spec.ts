import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidatedFundtrackerPageComponent } from './consolidated-fundtracker-page.component';

describe('ConsolidatedFundtrackerPageComponent', () => {
  let component: ConsolidatedFundtrackerPageComponent;
  let fixture: ComponentFixture<ConsolidatedFundtrackerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsolidatedFundtrackerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidatedFundtrackerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
