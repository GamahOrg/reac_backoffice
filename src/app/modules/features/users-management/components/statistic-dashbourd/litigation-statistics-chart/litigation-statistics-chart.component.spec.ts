import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LitigationStatisticsChartComponent } from './litigation-statistics-chart.component';

describe('LitigationStatisticsChartComponent', () => {
  let component: LitigationStatisticsChartComponent;
  let fixture: ComponentFixture<LitigationStatisticsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LitigationStatisticsChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LitigationStatisticsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
