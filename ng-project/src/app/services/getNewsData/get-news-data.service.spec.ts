import { TestBed } from '@angular/core/testing';

import { GetNewsDataService } from './get-news-data.service';

describe('GetNewsDataService', () => {
  let service: GetNewsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetNewsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
