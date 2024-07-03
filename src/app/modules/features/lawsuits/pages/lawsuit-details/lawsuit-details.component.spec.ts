import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawsuitDetailsComponent } from './lawsuit-details.component';

describe('LawsuitDetailsComponent', () => {
  let component: LawsuitDetailsComponent;
  let fixture: ComponentFixture<LawsuitDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LawsuitDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LawsuitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
