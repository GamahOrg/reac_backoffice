import { TestBed } from '@angular/core/testing';

import { LawsuitEditReasonsService } from './lawsuit-edit-reasons.service';

describe('LawsuitEditReasonsService', () => {
  let service: LawsuitEditReasonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LawsuitEditReasonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
