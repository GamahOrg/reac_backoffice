import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsArbitrationReportComponent } from './statistics-arbitration-report.component';

describe('StatisticsArbitrationReportComponent', () => {
  let component: StatisticsArbitrationReportComponent;
  let fixture: ComponentFixture<StatisticsArbitrationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticsArbitrationReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatisticsArbitrationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
