import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawsuitDelegationDefendantDataComponent } from './lawsuit-delegation-defendant-data.component';

describe('LawsuitDelegationDefendantDataComponent', () => {
  let component: LawsuitDelegationDefendantDataComponent;
  let fixture: ComponentFixture<LawsuitDelegationDefendantDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LawsuitDelegationDefendantDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LawsuitDelegationDefendantDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
