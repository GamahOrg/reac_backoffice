import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawsuitReviewComponent } from './lawsuit-review.component';

describe('LawsuitReviewComponent', () => {
  let component: LawsuitReviewComponent;
  let fixture: ComponentFixture<LawsuitReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LawsuitReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LawsuitReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
