import { TestBed, inject } from '@angular/core/testing';

import { ThinkingStateService } from './thinking-state.service';

describe('ThinkingStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThinkingStateService]
    });
  });

  it('should be created', inject([ThinkingStateService], (service: ThinkingStateService) => {
    expect(service).toBeTruthy();
  }));
});
