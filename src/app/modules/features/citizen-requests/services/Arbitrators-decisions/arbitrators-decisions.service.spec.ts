import { TestBed } from '@angular/core/testing';

import { ArbitratorsDecisionsService } from './arbitrators-decisions.service';

describe('ArbitratorsDecisionsService', () => {
  let service: ArbitratorsDecisionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArbitratorsDecisionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
