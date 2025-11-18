import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawsuitDetailsForReportComponent } from './lawsuit-details-for-report.component';

describe('LawsuitDetailsForReportComponent', () => {
  let component: LawsuitDetailsForReportComponent;
  let fixture: ComponentFixture<LawsuitDetailsForReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LawsuitDetailsForReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LawsuitDetailsForReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
