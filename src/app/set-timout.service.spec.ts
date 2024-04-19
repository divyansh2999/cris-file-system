import { TestBed } from '@angular/core/testing';

import { SetTimoutService } from './set-timout.service';

describe('SetTimoutService', () => {
  let service: SetTimoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetTimoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
