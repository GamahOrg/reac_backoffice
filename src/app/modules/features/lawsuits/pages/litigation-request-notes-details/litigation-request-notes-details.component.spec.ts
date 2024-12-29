import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LitigationRequestNotesDetailsComponent } from './litigation-request-notes-details.component';

describe('LitigationRequestNotesDetailsComponent', () => {
  let component: LitigationRequestNotesDetailsComponent;
  let fixture: ComponentFixture<LitigationRequestNotesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LitigationRequestNotesDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LitigationRequestNotesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
