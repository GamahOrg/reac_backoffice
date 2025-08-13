import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawsuitFullDetailsComponent } from './lawsuit-full-details.component';

describe('LawsuitDetailsComponent', () => {
  let component: LawsuitFullDetailsComponent;
  let fixture: ComponentFixture<LawsuitFullDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LawsuitFullDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LawsuitFullDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
