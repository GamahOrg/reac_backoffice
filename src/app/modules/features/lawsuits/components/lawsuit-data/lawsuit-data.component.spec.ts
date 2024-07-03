import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawsuitDataComponent } from './lawsuit-data.component';

describe('LawsuitDataComponent', () => {
  let component: LawsuitDataComponent;
  let fixture: ComponentFixture<LawsuitDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LawsuitDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LawsuitDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
