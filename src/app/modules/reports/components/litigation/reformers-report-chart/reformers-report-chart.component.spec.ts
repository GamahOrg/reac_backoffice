import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReformersReportChartComponent } from './reformers-report-chart.component';

describe('ReformersReportChartComponent', () => {
  let component: ReformersReportChartComponent;
  let fixture: ComponentFixture<ReformersReportChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReformersReportChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReformersReportChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
