import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundtrackerSummaryComponent } from './fundtracker-summary.component';

describe('FundtrackerSummaryComponent', () => {
  let component: FundtrackerSummaryComponent;
  let fixture: ComponentFixture<FundtrackerSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundtrackerSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundtrackerSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
