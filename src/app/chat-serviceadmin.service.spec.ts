import { TestBed } from '@angular/core/testing';

import { ChatServiceadminService } from './chat-serviceadmin.service';

describe('ChatServiceadminService', () => {
  let service: ChatServiceadminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatServiceadminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
