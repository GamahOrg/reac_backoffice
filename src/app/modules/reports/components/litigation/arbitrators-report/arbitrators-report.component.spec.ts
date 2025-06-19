import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbitratorsReportComponent } from './arbitrators-report.component';

describe('ArbitratorsReportComponent', () => {
  let component: ArbitratorsReportComponent;
  let fixture: ComponentFixture<ArbitratorsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArbitratorsReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArbitratorsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
