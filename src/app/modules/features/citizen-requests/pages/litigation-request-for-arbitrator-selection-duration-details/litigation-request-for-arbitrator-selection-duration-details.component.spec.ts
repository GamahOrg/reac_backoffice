import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LitigationRequestForArbitratorSelectionDurationDetailsComponent } from './litigation-request-for-arbitrator-selection-duration-details.component';

describe('LitigationRequestForArbitratorSelectionDurationDetailsComponent', () => {
  let component: LitigationRequestForArbitratorSelectionDurationDetailsComponent;
  let fixture: ComponentFixture<LitigationRequestForArbitratorSelectionDurationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LitigationRequestForArbitratorSelectionDurationDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LitigationRequestForArbitratorSelectionDurationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
