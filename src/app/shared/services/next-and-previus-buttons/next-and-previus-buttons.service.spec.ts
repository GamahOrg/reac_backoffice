import { TestBed } from '@angular/core/testing';

import { NextAndPreviusButtonsService } from './next-and-previus-buttons.service';

describe('NextAndPreviusButtonsService', () => {
  let service: NextAndPreviusButtonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NextAndPreviusButtonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
