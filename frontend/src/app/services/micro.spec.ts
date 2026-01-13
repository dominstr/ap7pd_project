import { TestBed } from '@angular/core/testing';

import { MicroService } from './micro';

describe('Micro', () => {
  let service: MicroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MicroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
