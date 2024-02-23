import { TestBed } from '@angular/core/testing';

import { AuthorizationGuardsService } from './authorization-guards.service';

describe('AuthorizationGuardsService', () => {
  let service: AuthorizationGuardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorizationGuardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
