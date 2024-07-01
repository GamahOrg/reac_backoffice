import { TestBed } from '@angular/core/testing';

import { LawsuitReviewService } from './lawsuit-review.service';

describe('LawsuitReviewService', () => {
  let service: LawsuitReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LawsuitReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
