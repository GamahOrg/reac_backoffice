import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbitratorDecisionDetailsComponent } from './arbitrator-decision-details.component';

describe('ArbitratorDecisionDetailsComponent', () => {
  let component: ArbitratorDecisionDetailsComponent;
  let fixture: ComponentFixture<ArbitratorDecisionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArbitratorDecisionDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArbitratorDecisionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
