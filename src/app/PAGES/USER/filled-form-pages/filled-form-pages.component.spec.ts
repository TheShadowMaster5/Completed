import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilledFormPagesComponent } from './filled-form-pages.component';

describe('FilledFormPagesComponent', () => {
  let component: FilledFormPagesComponent;
  let fixture: ComponentFixture<FilledFormPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilledFormPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilledFormPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
