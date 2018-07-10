import { TestBed, inject } from '@angular/core/testing';

import { FundGetterService } from './fund-getter.service';

describe('FundGetterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FundGetterService]
    });
  });

  it('should be created', inject([FundGetterService], (service: FundGetterService) => {
    expect(service).toBeTruthy();
  }));
});
