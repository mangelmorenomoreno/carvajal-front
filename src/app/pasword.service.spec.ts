import { TestBed } from '@angular/core/testing';

import { PaswordService } from './pasword.service';

describe('PaswordService', () => {
  let service: PaswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
