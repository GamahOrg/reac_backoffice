import { TestBed } from '@angular/core/testing';

import { ReformersDecisionsService } from './reformers-decisions.service';

describe('ReformersDecisionsService', () => {
  let service: ReformersDecisionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReformersDecisionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
