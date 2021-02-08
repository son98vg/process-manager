import { TestBed } from '@angular/core/testing';

import { PcDockerService } from './pc-docker.service';

describe('PcDockerService', () => {
  let service: PcDockerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PcDockerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
