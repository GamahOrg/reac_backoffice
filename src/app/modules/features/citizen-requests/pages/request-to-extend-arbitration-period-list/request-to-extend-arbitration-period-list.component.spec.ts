import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestToExtendArbitrationPeriodListComponent } from './request-to-extend-arbitration-period-list.component';

describe('RequestToExtendArbitrationPeriodListComponent', () => {
  let component: RequestToExtendArbitrationPeriodListComponent;
  let fixture: ComponentFixture<RequestToExtendArbitrationPeriodListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestToExtendArbitrationPeriodListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestToExtendArbitrationPeriodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
