import { TestBed } from '@angular/core/testing';

import { LinkedinScraperService } from './linkedin-scraper.service';

describe('LinkedinScraperService', () => {
  let service: LinkedinScraperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkedinScraperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
