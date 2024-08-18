import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedArbitrationRequestsDocumnetsComponent } from './assigned-arbitration-requests-documnets.component';

describe('AssignedArbitrationRequestsDocumnetsComponent', () => {
  let component: AssignedArbitrationRequestsDocumnetsComponent;
  let fixture: ComponentFixture<AssignedArbitrationRequestsDocumnetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignedArbitrationRequestsDocumnetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignedArbitrationRequestsDocumnetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
