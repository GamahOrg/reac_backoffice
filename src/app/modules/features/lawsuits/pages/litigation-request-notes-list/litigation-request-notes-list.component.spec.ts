import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LitigationRequestNotesListComponent } from './litigation-request-notes-list.component';

describe('LitigationRequestNotesListComponent', () => {
  let component: LitigationRequestNotesListComponent;
  let fixture: ComponentFixture<LitigationRequestNotesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LitigationRequestNotesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LitigationRequestNotesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
