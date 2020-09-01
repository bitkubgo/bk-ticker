import { TestBed } from '@angular/core/testing';

import { BitkubService } from './bitkub.service';

describe('BitkubService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BitkubService = TestBed.get(BitkubService);
    expect(service).toBeTruthy();
  });
});
