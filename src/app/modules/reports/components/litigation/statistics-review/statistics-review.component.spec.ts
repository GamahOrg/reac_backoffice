import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsReviewComponent } from './statistics-review.component';

describe('StatisticsReviewComponent', () => {
  let component: StatisticsReviewComponent;
  let fixture: ComponentFixture<StatisticsReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticsReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatisticsReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
