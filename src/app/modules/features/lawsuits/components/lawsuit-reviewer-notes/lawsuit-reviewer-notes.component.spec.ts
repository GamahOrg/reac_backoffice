import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawsuitReviewerNotesComponent } from './lawsuit-reviewer-notes.component';

describe('LawsuitReviewerNotesComponent', () => {
  let component: LawsuitReviewerNotesComponent;
  let fixture: ComponentFixture<LawsuitReviewerNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LawsuitReviewerNotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LawsuitReviewerNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
