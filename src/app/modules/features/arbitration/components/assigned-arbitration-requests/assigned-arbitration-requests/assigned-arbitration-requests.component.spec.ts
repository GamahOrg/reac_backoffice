import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedArbitrationRequestsComponent } from './assigned-arbitration-requests.component';

describe('AssignedArbitrationRequestsComponent', () => {
  let component: AssignedArbitrationRequestsComponent;
  let fixture: ComponentFixture<AssignedArbitrationRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignedArbitrationRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignedArbitrationRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
