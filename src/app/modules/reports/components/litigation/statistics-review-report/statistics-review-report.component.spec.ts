import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewDashbourdComponent } from './statistics-review-report.component';

describe('ReviewDashbourdComponent', () => {
  let component: ReviewDashbourdComponent;
  let fixture: ComponentFixture<ReviewDashbourdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewDashbourdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewDashbourdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
