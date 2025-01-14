import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestToExtendSettlementPeriodListComponent } from './request-to-extend-settlement-period-list.component';

describe('RequestToExtendSettlementPeriodListComponent', () => {
  let component: RequestToExtendSettlementPeriodListComponent;
  let fixture: ComponentFixture<RequestToExtendSettlementPeriodListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestToExtendSettlementPeriodListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestToExtendSettlementPeriodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
