import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReformerDecisionDetailsComponent } from './reformer-decision-details.component';

describe('ReformerDecisionDetailsComponent', () => {
  let component: ReformerDecisionDetailsComponent;
  let fixture: ComponentFixture<ReformerDecisionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReformerDecisionDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReformerDecisionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
