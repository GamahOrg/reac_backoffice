import { TestBed } from '@angular/core/testing';

import { ArbitratorCountListService } from './arbitrator-count-list.service';

describe('ArbitratorCountListService', () => {
  let service: ArbitratorCountListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArbitratorCountListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
