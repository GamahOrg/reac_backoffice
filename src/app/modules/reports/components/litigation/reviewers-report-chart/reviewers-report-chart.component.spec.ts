import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewersReportChartComponent } from './reviewers-report-chart.component';

describe('ReviewersReportChartComponent', () => {
  let component: ReviewersReportChartComponent;
  let fixture: ComponentFixture<ReviewersReportChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewersReportChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewersReportChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
