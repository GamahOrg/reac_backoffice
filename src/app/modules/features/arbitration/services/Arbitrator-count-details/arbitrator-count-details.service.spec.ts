import { TestBed } from '@angular/core/testing';

import { ArbitratorCountDetailsService } from './arbitrator-count-details.service';

describe('ArbitratorCountDetailsService', () => {
  let service: ArbitratorCountDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArbitratorCountDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
