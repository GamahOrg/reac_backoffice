import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewersreformersarbitratorsreportComponent } from './reviewersreformersarbitratorsreport.component';

describe('ReviewersreformersarbitratorsreportComponent', () => {
  let component: ReviewersreformersarbitratorsreportComponent;
  let fixture: ComponentFixture<ReviewersreformersarbitratorsreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewersreformersarbitratorsreportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewersreformersarbitratorsreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
