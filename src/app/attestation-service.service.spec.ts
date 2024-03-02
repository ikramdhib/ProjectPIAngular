import { TestBed } from '@angular/core/testing';

import { AttestationServiceService } from './attestation-service.service';

describe('AttestationServiceService', () => {
  let service: AttestationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttestationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
