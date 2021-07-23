import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutSummaryComponent } from './check-out-summary.component';

describe('SummaryComponent', () => {
  let component: CheckOutSummaryComponent;
  let fixture: ComponentFixture<CheckOutSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckOutSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOutSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
