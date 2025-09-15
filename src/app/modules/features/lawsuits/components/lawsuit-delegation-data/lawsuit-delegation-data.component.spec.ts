import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawsuitDelegationDataComponent } from './lawsuit-delegation-data.component';

describe('LawsuitDelegationDataComponent', () => {
  let component: LawsuitDelegationDataComponent;
  let fixture: ComponentFixture<LawsuitDelegationDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LawsuitDelegationDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LawsuitDelegationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
