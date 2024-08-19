import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRequestToExtendSettlementPeriodDetailsComponent } from './show-request-to-extend-settlement-period-details.component';

describe('ShowRequestToExtendSettlementPeriodDetailsComponent', () => {
  let component: ShowRequestToExtendSettlementPeriodDetailsComponent;
  let fixture: ComponentFixture<ShowRequestToExtendSettlementPeriodDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowRequestToExtendSettlementPeriodDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowRequestToExtendSettlementPeriodDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
