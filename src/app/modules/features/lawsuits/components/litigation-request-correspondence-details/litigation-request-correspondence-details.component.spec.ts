import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LitigationRequestCorrespondenceDetailsComponent } from './litigation-request-correspondence-details.component';

describe('LitigationRequestCorrespondenceDetailsComponent', () => {
  let component: LitigationRequestCorrespondenceDetailsComponent;
  let fixture: ComponentFixture<LitigationRequestCorrespondenceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LitigationRequestCorrespondenceDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LitigationRequestCorrespondenceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
