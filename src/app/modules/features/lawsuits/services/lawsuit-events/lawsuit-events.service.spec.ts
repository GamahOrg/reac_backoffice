import { TestBed } from '@angular/core/testing';

import { LawsuitEventsService } from './lawsuit-events.service';

describe('LawsuitEventsService', () => {
  let service: LawsuitEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LawsuitEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
