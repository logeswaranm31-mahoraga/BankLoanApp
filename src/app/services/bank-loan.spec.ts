import { TestBed } from '@angular/core/testing';

import { BankLoan } from './bank-loan';

describe('BankLoan', () => {
  let service: BankLoan;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankLoan);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
