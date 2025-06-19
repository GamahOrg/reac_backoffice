import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewersReportComponent } from './reviewers-report.component';

describe('ReviewersReportComponent', () => {
  let component: ReviewersReportComponent;
  let fixture: ComponentFixture<ReviewersReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewersReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewersReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
