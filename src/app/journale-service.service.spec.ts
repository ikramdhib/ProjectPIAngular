import { TestBed } from '@angular/core/testing';

import { JournaleServiceService } from './journale-service.service';

describe('JournaleServiceService', () => {
  let service: JournaleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JournaleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
