import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbitratorsReportChartComponent } from './arbitrators-report-chart.component';

describe('ArbitratorsReportChartComponent', () => {
  let component: ArbitratorsReportChartComponent;
  let fixture: ComponentFixture<ArbitratorsReportChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArbitratorsReportChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArbitratorsReportChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
