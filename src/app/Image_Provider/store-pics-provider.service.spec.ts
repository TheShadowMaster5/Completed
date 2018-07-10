import { TestBed, inject } from '@angular/core/testing';

import { StorePicsProviderService } from './store-pics-provider.service';

describe('StorePicsProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorePicsProviderService]
    });
  });

  it('should be created', inject([StorePicsProviderService], (service: StorePicsProviderService) => {
    expect(service).toBeTruthy();
  }));
});
