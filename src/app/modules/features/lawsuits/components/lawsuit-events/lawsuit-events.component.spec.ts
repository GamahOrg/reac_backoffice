import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawsuitEventsComponent } from './lawsuit-events.component';

describe('LawsuitEventsComponent', () => {
  let component: LawsuitEventsComponent;
  let fixture: ComponentFixture<LawsuitEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LawsuitEventsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LawsuitEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
