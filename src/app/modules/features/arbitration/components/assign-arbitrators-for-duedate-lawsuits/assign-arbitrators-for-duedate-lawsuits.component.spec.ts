import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignArbitratorsForDuedateLawsuitsComponent } from './assign-arbitrators-for-duedate-lawsuits.component';

describe('AssignArbitratorsForDuedateLawsuitsComponent', () => {
  let component: AssignArbitratorsForDuedateLawsuitsComponent;
  let fixture: ComponentFixture<AssignArbitratorsForDuedateLawsuitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignArbitratorsForDuedateLawsuitsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignArbitratorsForDuedateLawsuitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
