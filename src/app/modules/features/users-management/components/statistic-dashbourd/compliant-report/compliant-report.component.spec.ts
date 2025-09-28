import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompliantReportComponent } from './compliant-report.component';

describe('CompliantReportComponent', () => {
  let component: CompliantReportComponent;
  let fixture: ComponentFixture<CompliantReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompliantReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompliantReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
