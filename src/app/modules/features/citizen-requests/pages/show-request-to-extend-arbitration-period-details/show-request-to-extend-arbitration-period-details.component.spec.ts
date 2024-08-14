import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRequestToExtendArbitrationPeriodDetailsComponent } from './show-request-to-extend-arbitration-period-details.component';

describe('ShowRequestToExtendArbitrationPeriodDetailsComponent', () => {
  let component: ShowRequestToExtendArbitrationPeriodDetailsComponent;
  let fixture: ComponentFixture<ShowRequestToExtendArbitrationPeriodDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowRequestToExtendArbitrationPeriodDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowRequestToExtendArbitrationPeriodDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
