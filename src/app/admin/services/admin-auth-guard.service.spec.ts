import { AdminAuthGuardService } from '/admin/services/admin-auth-guard.service';

import { TestBed } from '@angular/core/testing';


describe('AdminAuthGuardService', () => {
  let service: AdminAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
