import { TestBed, inject } from '@angular/core/testing';

import { FtinfoService } from './ftinfo.service';

describe('FtinfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FtinfoService]
    });
  });

  it('should be created', inject([FtinfoService], (service: FtinfoService) => {
    expect(service).toBeTruthy();
  }));
});
