import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegationRequestsListComponent } from './delegation-requests-list.component';

describe('DelegationRequestsListComponent', () => {
  let component: DelegationRequestsListComponent;
  let fixture: ComponentFixture<DelegationRequestsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelegationRequestsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DelegationRequestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
