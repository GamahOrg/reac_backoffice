import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsReformerReportComponent } from './statistics-reformer-report.component';

describe('StatisticsReformerReportComponent', () => {
  let component: StatisticsReformerReportComponent;
  let fixture: ComponentFixture<StatisticsReformerReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticsReformerReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatisticsReformerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
