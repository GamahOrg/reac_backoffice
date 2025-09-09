import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedReconciliationRequestsDocumentsComponent } from './assigned-reconciliation-requests-documents.component';

describe('AssignedReconciliationRequestsDocumentsComponent', () => {
  let component: AssignedReconciliationRequestsDocumentsComponent;
  let fixture: ComponentFixture<AssignedReconciliationRequestsDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignedReconciliationRequestsDocumentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignedReconciliationRequestsDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
