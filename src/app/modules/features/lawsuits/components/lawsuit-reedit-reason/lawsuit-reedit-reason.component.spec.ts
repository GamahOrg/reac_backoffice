import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawsuitReeditReasonComponent } from './lawsuit-reedit-reason.component';

describe('LawsuitReeditReasonComponent', () => {
  let component: LawsuitReeditReasonComponent;
  let fixture: ComponentFixture<LawsuitReeditReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LawsuitReeditReasonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LawsuitReeditReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
