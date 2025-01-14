import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LitigationRequestForArbitratorSelectionDurationListComponent } from './litigation-request-for-arbitrator-selection-duration-list.component';

describe('LitigationRequestForArbitratorSelectionDurationListComponent', () => {
  let component: LitigationRequestForArbitratorSelectionDurationListComponent;
  let fixture: ComponentFixture<LitigationRequestForArbitratorSelectionDurationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LitigationRequestForArbitratorSelectionDurationListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LitigationRequestForArbitratorSelectionDurationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
