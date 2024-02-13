import { TestBed } from '@angular/core/testing';

import { AuthenticationGuardsService } from './authentication-guards.service';

describe('AuthenticationGuardsService', () => {
  let service: AuthenticationGuardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationGuardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
