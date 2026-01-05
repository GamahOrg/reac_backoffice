import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignArbitratorsForDuedateLawsuitsDetailsComponent } from './assign-arbitrators-for-duedate-lawsuits-details.component';

describe('AssignArbitratorsForDuedateLawsuitsDetailsComponent', () => {
  let component: AssignArbitratorsForDuedateLawsuitsDetailsComponent;
  let fixture: ComponentFixture<AssignArbitratorsForDuedateLawsuitsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignArbitratorsForDuedateLawsuitsDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignArbitratorsForDuedateLawsuitsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
